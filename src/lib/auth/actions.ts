"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { db } from "../db";
import { guest, cart, cartItem } from "../db/schema";
import { eq, and } from "drizzle-orm";
import { signUpSchema, signInSchema } from "./schemas";

const GUEST_SESSION_COOKIE = "guest_session";
const GUEST_SESSION_EXPIRY_DAYS = 7;

type ActionResult<T = void> = 
  | { success: true; data?: T }
  | { success: false; error: string };

export async function signUp(formData: FormData): Promise<ActionResult<{ userId: string }>> {
  try {
    const rawData = {
      name: formData.get("fullName") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validationResult = signUpSchema.safeParse(rawData);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.issues[0]?.message || "Invalid input",
      };
    }

    const { name, email, password } = validationResult.data;

    const headers = await getAuthHeaders();
    const response = await auth.api.signUpEmail({
      headers,
      body: {
        name,
        email,
        password,
      },
    });

    if (!response) {
      return { success: false, error: "Failed to create account" };
    }

    // Merge guest cart (don't fail sign-up if this fails)
    try {
      const mergeResult = await mergeGuestCartWithUserCart(response.user.id);
      if (!mergeResult.success) {
        console.warn("Cart merge failed but sign-up succeeded:", mergeResult.error);
      }
    } catch (mergeError) {
      console.error("Cart merge error (non-blocking):", mergeError);
      // Don't fail sign-up if cart merge fails
    }

    return { success: true, data: { userId: response.user.id } };
  } catch (error) {
    console.error("Sign up error:", error);
    if (error instanceof Error) {
      if (error.message.includes("already exists") || error.message.includes("duplicate")) {
        return { success: false, error: "An account with this email already exists" };
      }
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function signIn(formData: FormData): Promise<ActionResult> {
  try {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const validationResult = signInSchema.safeParse(rawData);
    if (!validationResult.success) {
      return {
        success: false,
        error: validationResult.error.issues[0]?.message || "Invalid input",
      };
    }

    const { email, password } = validationResult.data;

    const headers = await getAuthHeaders();
    const response = await auth.api.signInEmail({
      headers,
      body: {
        email,
        password,
      },
    });

    if (!response) {
      return { success: false, error: "Invalid email or password" };
    }

    // Merge guest cart (don't fail sign-in if this fails)
    try {
      const mergeResult = await mergeGuestCartWithUserCart(response.user.id);
      if (!mergeResult.success) {
        console.warn("Cart merge failed but sign-in succeeded:", mergeResult.error);
      }
    } catch (mergeError) {
      console.error("Cart merge error (non-blocking):", mergeError);
      // Don't fail sign-in if cart merge fails
    }

    return { success: true };
  } catch (error) {
    console.error("Sign in error:", error);
    if (error instanceof Error) {
      if (error.message.includes("Invalid") || error.message.includes("credentials")) {
        return { success: false, error: "Invalid email or password" };
      }
      return { success: false, error: error.message };
    }
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function signOut(): Promise<ActionResult> {
  try {
    await auth.api.signOut({
      headers: await getAuthHeaders(),
    });

    return { success: true };
  } catch (error) {
    console.error("Sign out error:", error);
    return { success: false, error: "Failed to sign out" };
  }
}

export async function getSession() {
  try {
    const session = await auth.api.getSession({
      headers: await getAuthHeaders(),
    });
    return session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}

export async function guestSession(): Promise<{ sessionToken: string; guestId: string } | null> {
  try {
    const cookieStore = await cookies();
    const guestSessionCookie = cookieStore.get(GUEST_SESSION_COOKIE);

    if (!guestSessionCookie?.value) {
      return null;
    }

    const guestRecord = await db
      .select()
      .from(guest)
      .where(eq(guest.sessionToken, guestSessionCookie.value))
      .limit(1);

    if (guestRecord.length === 0) {
      return null;
    }

    const guestData = guestRecord[0];
    if (new Date(guestData.expiresAt) < new Date()) {
      await db.delete(guest).where(eq(guest.id, guestData.id));
      cookieStore.delete(GUEST_SESSION_COOKIE);
      return null;
    }

    return { sessionToken: guestData.sessionToken, guestId: guestData.id };
  } catch (error) {
    console.error("Get guest session error:", error);
    return null;
  }
}

export async function createGuestSession(): Promise<ActionResult<{ sessionToken: string; guestId: string }>> {
  try {
    const existingSession = await guestSession();
    if (existingSession) {
      return { success: true, data: existingSession };
    }

    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + GUEST_SESSION_EXPIRY_DAYS);

    const [newGuest] = await db.insert(guest).values({
      sessionToken,
      expiresAt,
    }).returning();

    const cookieStore = await cookies();
    cookieStore.set(GUEST_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: expiresAt,
    });

    return { success: true, data: { sessionToken, guestId: newGuest.id } };
  } catch (error) {
    console.error("Create guest session error:", error);
    return { success: false, error: "Failed to create guest session" };
  }
}

export async function mergeGuestCartWithUserCart(userId: string): Promise<ActionResult> {
  try {
    const cookieStore = await cookies();
    const guestSessionCookie = cookieStore.get(GUEST_SESSION_COOKIE);

    if (!guestSessionCookie?.value) {
      return { success: true };
    }

    const guestRecord = await db
      .select()
      .from(guest)
      .where(eq(guest.sessionToken, guestSessionCookie.value))
      .limit(1);

    if (guestRecord.length === 0) {
      cookieStore.delete(GUEST_SESSION_COOKIE);
      return { success: true };
    }

    const guestData = guestRecord[0];

    // Find the guest's cart
    const guestCartRecord = await db
      .select()
      .from(cart)
      .where(eq(cart.guestId, guestData.id))
      .limit(1);

    if (guestCartRecord.length > 0) {
      const guestCart = guestCartRecord[0];

      // Get all items from the guest cart
      const guestCartItems = await db
        .select()
        .from(cartItem)
        .where(eq(cartItem.cartId, guestCart.id));

      if (guestCartItems.length > 0) {
        // Find or create the user's cart
        let userCartRecord = await db
          .select()
          .from(cart)
          .where(eq(cart.userId, userId))
          .limit(1);

        let userCart;
        if (userCartRecord.length === 0) {
          // Create a new cart for the user
          const [newCart] = await db.insert(cart).values({
            userId,
          }).returning();
          userCart = newCart;
        } else {
          userCart = userCartRecord[0];
        }

        // Get existing user cart items to check for duplicates
        const userCartItems = await db
          .select()
          .from(cartItem)
          .where(eq(cartItem.cartId, userCart.id));

        const userCartItemMap = new Map(
          userCartItems.map(item => [item.productId, item])
        );

        // Merge guest cart items into user cart
        for (const guestItem of guestCartItems) {
          const existingUserItem = userCartItemMap.get(guestItem.productId);

          if (existingUserItem) {
            // Product already exists in user's cart - add quantities
            await db
              .update(cartItem)
              .set({
                quantity: existingUserItem.quantity + guestItem.quantity,
                updatedAt: new Date(),
              })
              .where(eq(cartItem.id, existingUserItem.id));
          } else {
            // Product doesn't exist in user's cart - move the item
            await db
              .update(cartItem)
              .set({
                cartId: userCart.id,
                updatedAt: new Date(),
              })
              .where(eq(cartItem.id, guestItem.id));
          }
        }

        // Delete the guest cart (remaining items that were duplicates)
        await db.delete(cartItem).where(eq(cartItem.cartId, guestCart.id));
        await db.delete(cart).where(eq(cart.id, guestCart.id));
      }
    }

    // Clean up guest session
    await db.delete(guest).where(eq(guest.id, guestData.id));
    cookieStore.delete(GUEST_SESSION_COOKIE);

    return { success: true };
  } catch (error) {
    console.error("Merge guest cart error:", error);
    return { success: false, error: "Failed to merge cart" };
  }
}

export async function requireAuth(redirectTo: string = "/sign-in"): Promise<void> {
  const session = await getSession();
  if (!session?.user) {
    redirect(redirectTo);
  }
}

export async function getOrCreateGuestSession(): Promise<{ sessionToken: string; guestId: string }> {
  const existingSession = await guestSession();
  if (existingSession) {
    return existingSession;
  }

  const result = await createGuestSession();
  if (result.success && result.data) {
    return result.data;
  }

  throw new Error("Failed to create guest session");
}

async function getAuthHeaders(): Promise<Headers> {
  const cookieStore = await cookies();
  const headers = new Headers();
  headers.set("cookie", cookieStore.toString());
  return headers;
}
