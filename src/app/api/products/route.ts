import { NextResponse } from 'next/server';
import { getAllProducts } from '@/lib/actions/product';
import { parseFilterParams } from '@/lib/utils/query';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const params: Record<string, string | string[]> = {};
    searchParams.forEach((value, key) => {
      const existing = params[key];
      if (existing) {
        params[key] = Array.isArray(existing)
          ? [...existing, value]
          : [existing, value];
      } else {
        params[key] = value;
      }
    });

    const filters = parseFilterParams(params);
    const result = await getAllProducts(filters);
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}
