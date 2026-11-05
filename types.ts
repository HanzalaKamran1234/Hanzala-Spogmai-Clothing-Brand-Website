export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  salePrice?: number | null;
  sku?: string;
  images: string[];
  colours: string[];
  sizes: string[];
  category?: string;
  collection?: string;
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  stock?: number;
  tags?: string[];
}
