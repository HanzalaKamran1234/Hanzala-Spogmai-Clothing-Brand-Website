"use server";
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types';

export async function GET() {
  // If Supabase URL not set, return seed data
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
    const { products } = await import('@/data/seedProducts');
    return NextResponse.json(products);
  }

  const { data, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Supabase products fetch error', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}
