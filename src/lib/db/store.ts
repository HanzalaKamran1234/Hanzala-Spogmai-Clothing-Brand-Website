import { Product, Order, Customer, Coupon, CollectionItem } from "@/types";
import { PRODUCTS as INITIAL_PRODUCTS, COLLECTIONS as INITIAL_COLLECTIONS } from "@/data/products";

// Server-side database store
class DataStore {
  private products: Product[] = [...INITIAL_PRODUCTS];
  private collections: CollectionItem[] = [...INITIAL_COLLECTIONS];
  private orders: Order[] = [
    {
      id: "ord-101",
      orderNumber: "SPOG-784210",
      customerName: "Hamza Tariq",
      customerEmail: "hamza.tariq@gmail.com",
      customerPhone: "0300 8472911",
      shippingAddress: "House 42, Street 8, Sector F-8/3",
      city: "Islamabad",
      postalCode: "44000",
      orderNotes: "Please deliver before Friday afternoon",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      status: "Processing",
      items: [
        {
          productId: "spog-m01",
          productName: "Obsidian Raw Silk Prince Coat",
          productImage: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=400&auto=format&fit=crop",
          price: 48500,
          quantity: 1,
          size: "L",
          color: "Obsidian Black",
        },
      ],
      subtotal: 48500,
      shippingFee: 0,
      discountAmount: 0,
      total: 48500,
      createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "ord-102",
      orderNumber: "SPOG-591244",
      customerName: "Bilal Mansoor",
      customerEmail: "bilal.m@yahoo.com",
      customerPhone: "0321 9923841",
      shippingAddress: "Apartment 4B, Creek Vistas, DHA Phase 8",
      city: "Karachi",
      postalCode: "75500",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      status: "Confirmed COD",
      items: [
        {
          productId: "spog-m03",
          productName: "Monochrome Pure Irish Linen Kurta Set",
          productImage: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=400&auto=format&fit=crop",
          price: 19500,
          quantity: 2,
          size: "M",
          color: "Matte Black",
        },
      ],
      subtotal: 39000,
      shippingFee: 0,
      discountAmount: 3900,
      couponCode: "SPOGMAI10",
      total: 35100,
      createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    },
    {
      id: "ord-103",
      orderNumber: "SPOG-314980",
      customerName: "Usman Ghani",
      customerEmail: "usman.ghani@outlook.com",
      customerPhone: "0333 4567890",
      shippingAddress: "Villa 18, Block G, Model Town",
      city: "Lahore",
      postalCode: "54700",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Paid",
      status: "Delivered",
      items: [
        {
          productId: "spog-m02",
          productName: "Architectural Noir Tuxedo Blazer",
          productImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=400&auto=format&fit=crop",
          price: 38000,
          quantity: 1,
          size: "M",
          color: "Pitch Black",
        },
      ],
      subtotal: 38000,
      shippingFee: 0,
      discountAmount: 0,
      total: 38000,
      createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
      updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    },
  ];

  private coupons: Coupon[] = [
    {
      id: "coup-1",
      code: "SPOGMAI10",
      discountType: "percentage",
      discountValue: 10,
      minOrderAmount: 5000,
      expiryDate: "2027-12-31T23:59:59.000Z",
      usageLimit: 500,
      usedCount: 42,
      isActive: true,
    },
    {
      id: "coup-2",
      code: "LEGACY5000",
      discountType: "fixed",
      discountValue: 5000,
      minOrderAmount: 35000,
      expiryDate: "2027-12-31T23:59:59.000Z",
      usageLimit: 200,
      usedCount: 18,
      isActive: true,
    },
  ];

  private subscribers: string[] = ["patron@spogmai.com", "tariq@menswear.pk"];

  // ================= PRODUCTS =================
  public getProducts(): Product[] {
    return this.products;
  }

  public getProductById(id: string): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  public createProduct(data: Omit<Product, "id">): Product {
    const newProduct: Product = {
      ...data,
      id: `spog-m${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  public updateProduct(id: string, updates: Partial<Product>): Product | null {
    const idx = this.products.findIndex((p) => p.id === id);
    if (idx === -1) return null;
    this.products[idx] = {
      ...this.products[idx],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    return this.products[idx];
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    return this.products.length < initialLen;
  }

  // ================= COLLECTIONS =================
  public getCollections(): CollectionItem[] {
    return this.collections;
  }

  public createCollection(data: Omit<CollectionItem, "id">): CollectionItem {
    const col: CollectionItem = {
      ...data,
      id: `col-${Date.now().toString().slice(-3)}`,
    };
    this.collections.push(col);
    return col;
  }

  // ================= ORDERS =================
  public getOrders(): Order[] {
    return this.orders;
  }

  public getOrderById(id: string): Order | undefined {
    return this.orders.find((o) => o.id === id || o.orderNumber === id);
  }

  public createOrder(orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    postalCode?: string;
    orderNotes?: string;
    items: {
      productId: string;
      size: string;
      color?: string;
      quantity: number;
    }[];
    couponCode?: string;
  }): { order: Order; success: boolean } {
    // 1. Server-side validation of products and price calculation
    let subtotal = 0;
    const validatedItems = [];

    for (const item of orderData.items) {
      const product = this.getProductById(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      if (item.quantity <= 0) {
        throw new Error(`Invalid quantity for: ${product.name}`);
      }
      if (product.stockQuantity < item.quantity) {
        throw new Error(`Insufficient stock for: ${product.name}`);
      }

      // Deduct inventory
      product.stockQuantity -= item.quantity;
      if (product.stockQuantity === 0) {
        product.inStock = false;
      }

      subtotal += product.price * item.quantity;
      validatedItems.push({
        productId: product.id,
        productName: product.name,
        productImage: product.images[0] || "",
        price: product.price,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      });
    }

    // 2. Validate Coupon server-side
    let discountAmount = 0;
    if (orderData.couponCode) {
      const coupon = this.validateCoupon(orderData.couponCode, subtotal);
      if (coupon.valid) {
        discountAmount = coupon.discount;
      }
    }

    const freeShippingThreshold = 10000;
    const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 450;
    const total = Math.max(0, subtotal - discountAmount + shippingFee);

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `SPOG-${Math.floor(100000 + Math.random() * 900000)}`,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      city: orderData.city,
      postalCode: orderData.postalCode || "",
      orderNotes: orderData.orderNotes || "",
      paymentMethod: "Cash on Delivery",
      paymentStatus: "Pending",
      status: "Confirmed COD",
      items: validatedItems,
      subtotal,
      shippingFee,
      discountAmount,
      couponCode: orderData.couponCode,
      total,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.orders.unshift(newOrder);
    return { order: newOrder, success: true };
  }

  public updateOrderStatus(
    orderId: string,
    status: Order["status"],
    paymentStatus?: Order["paymentStatus"]
  ): Order | null {
    const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;
    order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (status === "Delivered" && order.paymentMethod === "Cash on Delivery") {
      order.paymentStatus = "Paid";
    }
    order.updatedAt = new Date().toISOString();
    return order;
  }

  // ================= INVENTORY =================
  public updateStock(productId: string, quantity: number): boolean {
    const product = this.getProductById(productId);
    if (!product) return false;
    product.stockQuantity = Math.max(0, quantity);
    product.inStock = product.stockQuantity > 0;
    product.updatedAt = new Date().toISOString();
    return true;
  }

  // ================= COUPONS =================
  public getCoupons(): Coupon[] {
    return this.coupons;
  }

  public createCoupon(coupon: Omit<Coupon, "id" | "usedCount">): Coupon {
    const newCoupon: Coupon = {
      ...coupon,
      id: `coup-${Date.now()}`,
      usedCount: 0,
    };
    this.coupons.push(newCoupon);
    return newCoupon;
  }

  public validateCoupon(
    code: string,
    orderSubtotal: number
  ): { valid: boolean; discount: number; message: string } {
    const coupon = this.coupons.find(
      (c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive
    );

    if (!coupon) {
      return { valid: false, discount: 0, message: "Invalid promo code" };
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return { valid: false, discount: 0, message: "Coupon has expired" };
    }

    if (coupon.minOrderAmount && orderSubtotal < coupon.minOrderAmount) {
      return {
        valid: false,
        discount: 0,
        message: `Minimum order amount of PKR ${coupon.minOrderAmount.toLocaleString()} required`,
      };
    }

    let discount = 0;
    if (coupon.discountType === "percentage") {
      discount = (orderSubtotal * coupon.discountValue) / 100;
    } else {
      discount = coupon.discountValue;
    }

    return {
      valid: true,
      discount: Math.min(discount, orderSubtotal),
      message: `Promo code applied successfully!`,
    };
  }

  // ================= CUSTOMERS =================
  public getCustomers(): Customer[] {
    const map = new Map<string, Customer>();

    for (const order of this.orders) {
      const key = order.customerEmail.toLowerCase();
      if (!map.has(key)) {
        map.set(key, {
          id: `cust-${Math.abs(key.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0))}`,
          name: order.customerName,
          email: order.customerEmail,
          phone: order.customerPhone,
          city: order.city,
          address: order.shippingAddress,
          totalOrders: 1,
          totalSpent: order.total,
          createdAt: order.createdAt,
        });
      } else {
        const c = map.get(key)!;
        c.totalOrders += 1;
        c.totalSpent += order.total;
      }
    }

    return Array.from(map.values());
  }

  // ================= NEWSLETTER =================
  public addSubscriber(email: string): boolean {
    if (!this.subscribers.includes(email.toLowerCase())) {
      this.subscribers.push(email.toLowerCase());
      return true;
    }
    return false;
  }
}

// Global singleton instance
const globalForStore = globalThis as unknown as { storeInstance?: DataStore };
export const db = globalForStore.storeInstance ?? new DataStore();
if (process.env.NODE_ENV !== "production") globalForStore.storeInstance = db;
