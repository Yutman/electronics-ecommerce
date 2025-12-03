"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "../auth";
import { db } from "../db";
import { guest } from "../db/schema";
import { eq } from "drizzle-orm";
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
        error: validationResult.error.errors[0]?.message || "Invalid input",
      };
    }

    const { name, email, password } = validationResult.data;

    const response = await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      },
    });

    if (!response) {
      return { success: false, error: "Failed to create account" };
    }

    await mergeGuestCartWithUserCart();

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
        error: validationResult.error.errors[0]?.message || "Invalid input",
      };
    }

    const { email, password } = validationResult.data;

    const response = await auth.api.signInEmail({
      body: {
        email,
        password,
      },
    });

    if (!response) {
      return { success: false, error: "Invalid email or password" };
    }

    await mergeGuestCartWithUserCart();

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

export async function guestSession(): Promise<{ sessionToken: string } | null> {
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

    return { sessionToken: guestData.sessionToken };
  } catch (error) {
    console.error("Get guest session error:", error);
    return null;
  }
}

export async function createGuestSession(): Promise<ActionResult<{ sessionToken: string }>> {
  try {
    const existingSession = await guestSession();
    if (existingSession) {
      return { success: true, data: existingSession };
    }

    const sessionToken = crypto.randomUUID();
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + GUEST_SESSION_EXPIRY_DAYS);

    await db.insert(guest).values({
      sessionToken,
      expiresAt,
    });

    const cookieStore = await cookies();
    cookieStore.set(GUEST_SESSION_COOKIE, sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      expires: expiresAt,
    });

    return { success: true, data: { sessionToken } };
  } catch (error) {
    console.error("Create guest session error:", error);
    return { success: false, error: "Failed to create guest session" };
  }
}

export async function mergeGuestCartWithUserCart(): Promise<ActionResult> {
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

    // TODO: Implement cart migration logic when cart tables are added
    // This will involve:
    // 1. Getting the current user's session
    // 2. Finding all cart items associated with the guest session
    // 3. Moving those cart items to the authenticated user's cart
    // 4. Handling any conflicts (e.g., same product in both carts)

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

export async function getOrCreateGuestSession(): Promise<string> {
  const existingSession = await guestSession();
  if (existingSession) {
    return existingSession.sessionToken;
  }

  const result = await createGuestSession();
  if (result.success && result.data) {
    return result.data.sessionToken;
  }

  throw new Error("Failed to create guest session");
}

async function getAuthHeaders(): Promise<Headers> {
  const cookieStore = await cookies();
  const headers = new Headers();
  headers.set("cookie", cookieStore.toString());
  return headers;
}
