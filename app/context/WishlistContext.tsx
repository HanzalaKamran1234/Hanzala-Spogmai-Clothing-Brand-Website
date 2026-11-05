"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export type WishlistItem = {
  productId: string;
  variantId: string;
  name: string;
  image: string;
  colour?: string;
  size?: string;
};

type WishlistContextType = {
  items: WishlistItem[];
  add: (item: WishlistItem) => Promise<void>;
  remove: (productId: string, variantId: string) => Promise<void>;
  isInWishlist: (productId: string, variantId: string) => boolean;
  refresh: () => Promise<void>;
};

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<WishlistItem[]>([]);

  const fetch = async () => {
    const { data, error } = await supabase.from("wishlist_items").select("*", { count: "exact" });
    if (!error && data) setItems(data as WishlistItem[]);
  };

  useEffect(() => {
    fetch();
  }, []);

  const add = async (item: WishlistItem) => {
    const { error } = await supabase.from("wishlist_items").insert(item);
    if (!error) setItems((prev) => [...prev, item]);
  };

  const remove = async (productId: string, variantId: string) => {
    const { error } = await supabase
      .from("wishlist_items")
      .delete()
      .match({ productId, variantId });
    if (!error) setItems((prev) => prev.filter((i) => !(i.productId === productId && i.variantId === variantId)));
  };

  const isInWishlist = (productId: string, variantId: string) =>
    items.some((i) => i.productId === productId && i.variantId === variantId);

  return (
    <WishlistContext.Provider value={{ items, add, remove, isInWishlist, refresh: fetch }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = (): WishlistContextType => {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
};
