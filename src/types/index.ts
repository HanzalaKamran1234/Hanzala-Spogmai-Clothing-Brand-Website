export interface Product {
  id: string;
  name: string;
  subtitle: string;
  sku: string;
  price: number; // in PKR
  originalPrice?: number;
  category: "Traditional Menswear" | "Formal Wear" | "Premium Casualwear" | "Everyday Essentials" | "Modern Classics" | "Accessories";
  collection: "Everyday Essentials" | "Premium Casualwear" | "Formal Wear" | "Traditional Menswear" | "Modern Classics" | "New Arrivals";
  description: string;
  details: string[];
  fabric: string;
  careInstructions: string[];
  sizes: ("XS" | "S" | "M" | "L" | "XL" | "XXL" | "Custom")[];
  colors: { name: string; hex: string }[];
  images: string[];
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  inStock: boolean;
  stockQuantity: number;
  rating: number;
  reviewsCount: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProductVariant {
  id: string;
  productId: string;
  size: string;
  color: string;
  sku: string;
  stock: number;
  priceModifier?: number;
}

export interface CollectionItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: number;
  isPublished: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor?: string;
  quantity: number;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  size: string;
  color?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  postalCode?: string;
  orderNotes?: string;
  paymentMethod: "Cash on Delivery" | "Card" | "Bank Transfer";
  paymentStatus: "Pending" | "Paid" | "Refunded";
  status: "Pending" | "Confirmed COD" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  items: OrderItem[];
  subtotal: number;
  shippingFee: number;
  discountAmount: number;
  couponCode?: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  createdAt: string;
}

export interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount?: number;
  expiryDate: string;
  usageLimit: number;
  usedCount: number;
  isActive: boolean;
}

export interface Review {
  id: string;
  productId: string;
  customerName: string;
  city: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
}
