"use server";
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

/**
 * POST /api/orders
 * Expected body: { items: CartItem[], shipping: { name, email, phone, address } }
 * Returns order id on success.
 */
export async function POST(request: Request) {
  try {
    const { items, shipping } = await request.json();
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
    }

    // Validate and compute total securely from DB
    let total = 0;
    for (const item of items) {
      const { data: product, error } = await supabase
        .from('product_variants')
        .select('price, stock')
        .eq('id', item.variantId)
        .single();
      if (error) return NextResponse.json({ error: 'Invalid product variant' }, { status: 400 });
      if (product.stock < item.qty) {
        return NextResponse.json({ error: `Insufficient stock for ${item.name}` }, { status: 400 });
      }
      total += Number(product.price) * item.qty;
    }

    // Create order
    const { data: order, error: orderErr } = await supabase.from('orders').insert({
      user_id: shipping?.userId || null,
      total,
      currency: 'PKR',
      shipping_address: shipping,
    }).select('id').single();
    if (orderErr) {
      console.error('order insert error', orderErr);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // Insert order items and decrement stock using the helper function
    const orderId = order.id;
    for (const item of items) {
      await supabase.from('order_items').insert({
        order_id: orderId,
        variant_id: item.variantId,
        quantity: item.qty,
        price_at_purchase: item.price,
      });
      // Decrement stock atomically
      const { error: decErr } = await supabase.rpc('decrement_stock', {
        p_variant_id: item.variantId,
        p_qty: item.qty,
      });
      if (decErr) {
        console.error('stock decrement error', decErr);
        // Ideally we would roll back, but for simplicity we just report
        return NextResponse.json({ error: 'Stock update failed' }, { status: 500 });
      }
    }

    return NextResponse.json({ orderId }, { status: 201 });
  } catch (e) {
    console.error('order POST exception', e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
