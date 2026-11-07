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
  stylingPairings?: string[]; // IDs of products that complete the look
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

export interface CourierInfo {
  courierName: "Trax" | "PostEx" | "Leopards" | "TCS" | "CallCourier";
  trackingNumber: string;
  trackingUrl: string;
  dispatchedAt?: string;
}

export interface OrderMilestone {
  title: string;
  description: string;
  timestamp: string;
  completed: boolean;
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
  paymentMethod: "Cash on Delivery" | "JazzCash" | "Easypaisa" | "Card" | "Bank Transfer";
  paymentStatus: "Pending" | "Paid" | "Refunded";
  status: "Pending" | "Confirmed COD" | "Processing" | "Shipped" | "Delivered" | "Cancelled";
  codVerificationStatus?: "Unverified" | "WhatsApp Sent" | "Verified" | "Failed";
  courierInfo?: CourierInfo;
  milestones?: OrderMilestone[];
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
  tier?: "VIP Patron" | "Gold" | "Frequent" | "New";
  codRisk?: "Low" | "Medium" | "High";
  notes?: string;
  tags?: string[];
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
  sizePurchased?: string;
  date: string;
  verified: boolean;
  helpfulCount?: number;
}

export interface ReturnRequest {
  id: string;
  ticketNumber: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  items: {
    productId: string;
    productName: string;
    size: string;
    quantity: number;
  }[];
  reason: "Size too small" | "Size too large" | "Fabric / Style preference" | "Defective / Damaged" | "Incorrect item received";
  action: "Exchange Size" | "Refund to Bank Account" | "Refund to JazzCash / Easypaisa" | "Store Credit";
  replacementSize?: string;
  bankDetails?: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
  };
  status: "Pending Review" | "Approved" | "Pickup Scheduled" | "Item Received" | "Completed" | "Rejected";
  courierTracking?: string;
  adminNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  announcementBarText: string;
  isAnnouncementActive: boolean;
  heroHeadline: string;
  heroSubHeadline: string;
  heroDescription: string;
  promoBannerActive: boolean;
  promoBannerText: string;
  promoBannerCode: string;
  freeShippingThreshold: number;
  shippingRates: {
    majorCities: number;
    restOfPakistan: number;
  };
}

export interface AdminNotification {
  id: string;
  type: "order" | "low_stock" | "return" | "cod_alert" | "system";
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

export interface SalesAnalytics {
  totalRevenue: number;
  dailyRevenue: number;
  weeklyRevenue: number;
  monthlyRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  conversionRate: number;
  codVerificationRate: number;
  bestSellingProducts: {
    id: string;
    name: string;
    salesCount: number;
    revenue: number;
    image: string;
  }[];
  sizeBreakdown: {
    size: string;
    percentage: number;
    count: number;
  }[];
}
