import fs from "fs";
import path from "path";
import {
  Product,
  Order,
  Customer,
  Coupon,
  CollectionItem,
  Review,
  ReturnRequest,
  SiteSettings,
  AdminNotification,
  SalesAnalytics,
  CourierInfo,
} from "@/types";
import { PRODUCTS as INITIAL_PRODUCTS, COLLECTIONS as INITIAL_COLLECTIONS } from "@/data/products";

// Default Initial Reviews
const INITIAL_REVIEWS: Review[] = [
  {
    id: "rev-01",
    productId: "spog-m01",
    customerName: "Barrister Daniyal Khan",
    city: "Lahore",
    rating: 5,
    comment: "The raw silk drape is magnificent. Tailored precisely to bespoke proportions with exceptional shoulder line. Commanded great presence at our dinner.",
    sizePurchased: "L",
    date: "2026-10-24T12:00:00.000Z",
    verified: true,
    helpfulCount: 14,
  },
  {
    id: "rev-02",
    productId: "spog-m02",
    customerName: "Dr. Shahmeer Afridi",
    city: "Islamabad",
    rating: 5,
    comment: "The peak lapels in Duchess satin match Savile Row quality. Incomparable evening piece. Prompt delivery by SPOGMAI concierge in under 48 hours.",
    sizePurchased: "M",
    date: "2026-10-28T16:30:00.000Z",
    verified: true,
    helpfulCount: 9,
  },
  {
    id: "rev-03",
    productId: "spog-m03",
    customerName: "Omer Farooq",
    city: "Karachi",
    rating: 5,
    comment: "Genuine Irish linen. Stays crisp yet breathable through humid coastal evenings. The concealed mother-of-pearl buttons are a subtle master touch.",
    sizePurchased: "L",
    date: "2026-11-02T09:15:00.000Z",
    verified: true,
    helpfulCount: 7,
  },
];

// Initial Site Settings
const INITIAL_SETTINGS: SiteSettings = {
  announcementBarText: "COMPLIMENTARY WHITE-GLOVE EXPRESS DISPATCH ACROSS PAKISTAN ON ORDERS OVER PKR 10,000",
  isAnnouncementActive: true,
  heroHeadline: "WEAR THE LEGACY.",
  heroSubHeadline: "Crafted for Men. Designed to Last.",
  heroDescription: "Discover refined menswear where timeless sophistication meets modern character. Exceptional fabrics, impeccable details, and a distinctive presence in every piece.",
  promoBannerActive: true,
  promoBannerText: "WINTER SARTORIAL SOIRÉE: ACQUIRE HEIRLOOM PIECES WITH CODE LEGACY10 FOR 10% COURTESY",
  promoBannerCode: "LEGACY10",
  freeShippingThreshold: 10000,
  shippingRates: {
    majorCities: 250,
    restOfPakistan: 350,
  },
};

// Initial Orders
const INITIAL_ORDERS: Order[] = [
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
    codVerificationStatus: "Verified",
    courierInfo: {
      courierName: "Trax",
      trackingNumber: "TRX-7849201",
      trackingUrl: "https://sonic.pk/tracking?tracking_number=TRX-7849201",
      dispatchedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    },
    milestones: [
      { title: "Order Placed", description: "Order received via online atelier", timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), completed: true },
      { title: "COD Verified", description: "Customer confirmed via WhatsApp", timestamp: new Date(Date.now() - 86400000 * 1.5).toISOString(), completed: true },
      { title: "Atelier Tailoring", description: "Quality inspection and hand-press completed", timestamp: new Date(Date.now() - 86400000).toISOString(), completed: true },
      { title: "Dispatched", description: "Handed over to Trax Express (CN: TRX-7849201)", timestamp: new Date(Date.now() - 3600000 * 12).toISOString(), completed: true },
      { title: "Delivered", description: "Expected delivery to patron", timestamp: new Date(Date.now() + 86400000).toISOString(), completed: false },
    ],
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
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
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
    codVerificationStatus: "Verified",
    milestones: [
      { title: "Order Placed", description: "Order received via online checkout", timestamp: new Date(Date.now() - 3600000 * 8).toISOString(), completed: true },
      { title: "COD Verified", description: "Verified via WhatsApp message", timestamp: new Date(Date.now() - 3600000 * 6).toISOString(), completed: true },
      { title: "Atelier Tailoring", description: "Items staged for packaging", timestamp: new Date(Date.now() - 3600000 * 4).toISOString(), completed: true },
      { title: "Dispatched", description: "Ready for courier pickup", timestamp: new Date(Date.now() + 3600000 * 4).toISOString(), completed: false },
      { title: "Delivered", description: "Destination arrival", timestamp: new Date(Date.now() + 86400000 * 2).toISOString(), completed: false },
    ],
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
    updatedAt: new Date(Date.now() - 3600000 * 6).toISOString(),
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
    codVerificationStatus: "Verified",
    courierInfo: {
      courierName: "TCS",
      trackingNumber: "TCS-9021482",
      trackingUrl: "https://www.tcsexpress.com/track/TCS-9021482",
      dispatchedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    },
    milestones: [
      { title: "Order Placed", description: "Order confirmed", timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), completed: true },
      { title: "COD Verified", description: "Customer confirmed order", timestamp: new Date(Date.now() - 86400000 * 5).toISOString(), completed: true },
      { title: "Atelier Tailoring", description: "Packed in bespoke garment bag", timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), completed: true },
      { title: "Dispatched", description: "Dispatched via TCS Priority", timestamp: new Date(Date.now() - 86400000 * 4).toISOString(), completed: true },
      { title: "Delivered", description: "Received & signed by patron. Cash collected.", timestamp: new Date(Date.now() - 86400000 * 2).toISOString(), completed: true },
    ],
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

const INITIAL_RETURNS: ReturnRequest[] = [
  {
    id: "ret-01",
    ticketNumber: "RET-89412",
    orderNumber: "SPOG-314980",
    customerName: "Usman Ghani",
    customerPhone: "0333 4567890",
    customerEmail: "usman.ghani@outlook.com",
    items: [
      {
        productId: "spog-m02",
        productName: "Architectural Noir Tuxedo Blazer",
        size: "M",
        quantity: 1,
      },
    ],
    reason: "Size too small",
    action: "Exchange Size",
    replacementSize: "L",
    status: "Approved",
    courierTracking: "TRX-PICKUP-4910",
    adminNotes: "Client requested chest size 42. Replacement size L prepared at atelier.",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
];

const INITIAL_NOTIFICATIONS: AdminNotification[] = [
  {
    id: "notif-01",
    type: "order",
    title: "New High-Value Acquisition",
    message: "Order #SPOG-784210 placed by Hamza Tariq (PKR 48,500)",
    link: "/admin?tab=orders",
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: "notif-02",
    type: "low_stock",
    title: "Atelier Stock Alert",
    message: "Double-Breasted Wool Cashmere Overcoat has only 11 units left in inventory.",
    link: "/admin?tab=inventory",
    read: false,
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
  },
  {
    id: "notif-03",
    type: "return",
    title: "Return & Exchange Request",
    message: "Ticket #RET-89412 submitted for Order #SPOG-314980 (Size Exchange M -> L)",
    link: "/admin?tab=returns",
    read: true,
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

class DataStore {
  private products: Product[] = [];
  private collections: CollectionItem[] = [];
  private orders: Order[] = [];
  private coupons: Coupon[] = [];
  private reviews: Review[] = [];
  private returns: ReturnRequest[] = [];
  private settings: SiteSettings = { ...INITIAL_SETTINGS };
  private notifications: AdminNotification[] = [];
  private subscribers: string[] = ["patron@spogmai.com", "tariq@menswear.pk"];
  private customerNotes: Map<string, { notes?: string; tags?: string[]; tier?: "VIP Patron" | "Gold" | "Frequent" | "New" }> = new Map();

  // Deduplication & Idempotency cache (stores order fingerprint -> timestamp)
  private idempotencyCache: Map<string, number> = new Map();
  private dataFilePath: string;

  constructor() {
    const dataDir = path.join(process.cwd(), "data");
    this.dataFilePath = path.join(dataDir, "store.json");
    this.initStore();
  }

  private initStore() {
    try {
      const dataDir = path.dirname(this.dataFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      if (fs.existsSync(this.dataFilePath)) {
        const fileContent = fs.readFileSync(this.dataFilePath, "utf-8");
        const parsed = JSON.parse(fileContent);

        this.products = parsed.products || [...INITIAL_PRODUCTS];
        this.collections = parsed.collections || [...INITIAL_COLLECTIONS];
        this.orders = parsed.orders || [...INITIAL_ORDERS];
        this.coupons = parsed.coupons || this.getDefaultCoupons();
        this.reviews = parsed.reviews || [...INITIAL_REVIEWS];
        this.returns = parsed.returns || [...INITIAL_RETURNS];
        this.settings = parsed.settings || { ...INITIAL_SETTINGS };
        this.notifications = parsed.notifications || [...INITIAL_NOTIFICATIONS];
        this.subscribers = parsed.subscribers || ["patron@spogmai.com", "tariq@menswear.pk"];
        if (parsed.customerNotes) {
          this.customerNotes = new Map(Object.entries(parsed.customerNotes));
        }
        return;
      }
    } catch (err) {
      console.warn("Could not load stored database file, initializing defaults:", err);
    }

    // Default initialization
    this.products = [...INITIAL_PRODUCTS];
    this.collections = [...INITIAL_COLLECTIONS];
    this.orders = [...INITIAL_ORDERS];
    this.coupons = this.getDefaultCoupons();
    this.reviews = [...INITIAL_REVIEWS];
    this.returns = [...INITIAL_RETURNS];
    this.settings = { ...INITIAL_SETTINGS };
    this.notifications = [...INITIAL_NOTIFICATIONS];
    this.persistToDisk();
  }

  private getDefaultCoupons(): Coupon[] {
    return [
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
        code: "LEGACY10",
        discountType: "percentage",
        discountValue: 10,
        minOrderAmount: 10000,
        expiryDate: "2027-12-31T23:59:59.000Z",
        usageLimit: 500,
        usedCount: 18,
        isActive: true,
      },
      {
        id: "coup-3",
        code: "LEGACY5000",
        discountType: "fixed",
        discountValue: 5000,
        minOrderAmount: 35000,
        expiryDate: "2027-12-31T23:59:59.000Z",
        usageLimit: 200,
        usedCount: 14,
        isActive: true,
      },
    ];
  }

  private persistToDisk() {
    try {
      const dataDir = path.dirname(this.dataFilePath);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }

      const payload = {
        products: this.products,
        collections: this.collections,
        orders: this.orders,
        coupons: this.coupons,
        reviews: this.reviews,
        returns: this.returns,
        settings: this.settings,
        notifications: this.notifications,
        subscribers: this.subscribers,
        customerNotes: Object.fromEntries(this.customerNotes),
        savedAt: new Date().toISOString(),
      };

      fs.writeFileSync(this.dataFilePath, JSON.stringify(payload, null, 2), "utf-8");
    } catch (err) {
      console.error("Failed to persist data store to disk:", err);
    }
  }

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
    this.persistToDisk();
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
    this.persistToDisk();
    return this.products[idx];
  }

  public deleteProduct(id: string): boolean {
    const initialLen = this.products.length;
    this.products = this.products.filter((p) => p.id !== id);
    const deleted = this.products.length < initialLen;
    if (deleted) this.persistToDisk();
    return deleted;
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
    this.persistToDisk();
    return col;
  }

  // ================= ORDERS & TRANSACTIONAL INVENTORY =================
  public getOrders(): Order[] {
    return this.orders;
  }

  public getOrderById(id: string): Order | undefined {
    const query = id.trim().toUpperCase();
    return this.orders.find(
      (o) => o.id.toUpperCase() === query || o.orderNumber.toUpperCase() === query
    );
  }

  public getOrdersByPhone(phone: string): Order[] {
    const cleanPhone = phone.replace(/[^0-9]/g, "");
    return this.orders.filter((o) => {
      const orderPhone = o.customerPhone.replace(/[^0-9]/g, "");
      return orderPhone.includes(cleanPhone) || cleanPhone.includes(orderPhone);
    });
  }

  public createOrder(orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    shippingAddress: string;
    city: string;
    postalCode?: string;
    orderNotes?: string;
    paymentMethod?: Order["paymentMethod"];
    items: {
      productId: string;
      size: string;
      color?: string;
      quantity: number;
    }[];
    couponCode?: string;
    idempotencyKey?: string;
  }): { order: Order; success: boolean } {
    // 0. Duplicate order prevention check
    const dedupeFingerprint = `${orderData.customerPhone}:${orderData.city}:${orderData.items.map((i) => `${i.productId}-${i.quantity}`).join(",")}`;
    const lastSubmission = this.idempotencyCache.get(dedupeFingerprint);
    if (lastSubmission && Date.now() - lastSubmission < 10000) {
      throw new Error("Duplicate order detected. Your previous submission is already being processed.");
    }
    this.idempotencyCache.set(dedupeFingerprint, Date.now());

    // 1. Transactional Pre-Check: Validate stock for all items BEFORE mutating
    for (const item of orderData.items) {
      const product = this.getProductById(item.productId);
      if (!product) {
        throw new Error(`Product not found: ${item.productId}`);
      }
      if (item.quantity <= 0) {
        throw new Error(`Invalid item quantity specified.`);
      }
      if (product.stockQuantity < item.quantity) {
        throw new Error(`Insufficient stock for "${product.name}". Only ${product.stockQuantity} remaining in the atelier.`);
      }
    }

    // 2. Atomic Stock Decrement with Rollback Safety
    const backupQuantities = new Map<string, number>();
    const validatedItems = [];
    let subtotal = 0;

    try {
      for (const item of orderData.items) {
        const product = this.getProductById(item.productId)!;
        backupQuantities.set(product.id, product.stockQuantity);

        product.stockQuantity -= item.quantity;
        if (product.stockQuantity === 0) {
          product.inStock = false;
        }

        // Low stock alert check
        if (product.stockQuantity <= 3) {
          this.addNotification({
            type: "low_stock",
            title: `Low Stock: ${product.name}`,
            message: `Only ${product.stockQuantity} pieces remaining in atelier inventory.`,
            link: "/admin?tab=inventory",
          });
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
    } catch (rollbackErr) {
      // Revert in-flight modifications
      for (const [prodId, originalStock] of backupQuantities.entries()) {
        const prod = this.getProductById(prodId);
        if (prod) {
          prod.stockQuantity = originalStock;
          prod.inStock = originalStock > 0;
        }
      }
      throw rollbackErr;
    }

    // 3. Validate Coupon server-side
    let discountAmount = 0;
    if (orderData.couponCode) {
      const coupon = this.validateCoupon(orderData.couponCode, subtotal);
      if (coupon.valid) {
        discountAmount = coupon.discount;
      }
    }

    // 4. Dynamic City Shipping Calculation
    const majorCities = ["karachi", "lahore", "islamabad", "rawalpindi", "faisalabad", "peshawar", "multan", "sialkot"];
    const isMajor = majorCities.includes(orderData.city.trim().toLowerCase());
    const baseShipping = isMajor ? this.settings.shippingRates.majorCities : this.settings.shippingRates.restOfPakistan;
    const shippingFee = subtotal >= this.settings.freeShippingThreshold || subtotal === 0 ? 0 : baseShipping;

    const total = Math.max(0, subtotal - discountAmount + shippingFee);
    const orderNumber = `SPOG-${Math.floor(100000 + Math.random() * 900000)}`;

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      customerName: orderData.customerName,
      customerEmail: orderData.customerEmail,
      customerPhone: orderData.customerPhone,
      shippingAddress: orderData.shippingAddress,
      city: orderData.city,
      postalCode: orderData.postalCode || "",
      orderNotes: orderData.orderNotes || "",
      paymentMethod: orderData.paymentMethod || "Cash on Delivery",
      paymentStatus: "Pending",
      status: "Confirmed COD",
      codVerificationStatus: "Unverified",
      items: validatedItems,
      subtotal,
      shippingFee,
      discountAmount,
      couponCode: orderData.couponCode,
      total,
      milestones: [
        {
          title: "Order Placed",
          description: "Order submitted to the SPOGMAI online atelier",
          timestamp: new Date().toISOString(),
          completed: true,
        },
        {
          title: "COD Verification",
          description: "WhatsApp confirmation dispatched to patron",
          timestamp: new Date().toISOString(),
          completed: false,
        },
        {
          title: "Atelier Inspection",
          description: "Garment hand-finished and prepared for packaging",
          timestamp: "",
          completed: false,
        },
        {
          title: "Courier Dispatch",
          description: "Handed over to priority logistics",
          timestamp: "",
          completed: false,
        },
        {
          title: "Delivered",
          description: "Arrived at destination address",
          timestamp: "",
          completed: false,
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.orders.unshift(newOrder);

    // Create Admin Notification
    this.addNotification({
      type: "order",
      title: `New Order: ${orderNumber}`,
      message: `${newOrder.customerName} ordered ${newOrder.items.length} item(s) for PKR ${newOrder.total.toLocaleString()} (${newOrder.city})`,
      link: "/admin?tab=orders",
    });

    this.persistToDisk();
    return { order: newOrder, success: true };
  }

  public updateOrderStatus(
    orderId: string,
    status: Order["status"],
    paymentStatus?: Order["paymentStatus"],
    courierInfo?: CourierInfo
  ): Order | null {
    const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;

    const previousStatus = order.status;
    order.status = status;
    if (paymentStatus) order.paymentStatus = paymentStatus;
    if (courierInfo) order.courierInfo = courierInfo;

    // Automatic inventory restock if order is cancelled
    if (status === "Cancelled" && previousStatus !== "Cancelled") {
      for (const item of order.items) {
        const prod = this.getProductById(item.productId);
        if (prod) {
          prod.stockQuantity += item.quantity;
          prod.inStock = prod.stockQuantity > 0;
        }
      }
    }

    if (status === "Delivered" && order.paymentMethod === "Cash on Delivery") {
      order.paymentStatus = "Paid";
    }

    // Update milestones
    if (order.milestones) {
      if (status === "Confirmed COD") {
        order.milestones[1].completed = true;
        order.milestones[1].timestamp = new Date().toISOString();
      } else if (status === "Processing") {
        order.milestones[1].completed = true;
        order.milestones[2].completed = true;
        order.milestones[2].timestamp = new Date().toISOString();
      } else if (status === "Shipped") {
        order.milestones[1].completed = true;
        order.milestones[2].completed = true;
        order.milestones[3].completed = true;
        order.milestones[3].timestamp = new Date().toISOString();
        if (courierInfo) {
          order.milestones[3].description = `Dispatched via ${courierInfo.courierName} (CN: ${courierInfo.trackingNumber})`;
        }
      } else if (status === "Delivered") {
        order.milestones.forEach((m) => (m.completed = true));
        order.milestones[4].timestamp = new Date().toISOString();
      }
    }

    order.updatedAt = new Date().toISOString();
    this.persistToDisk();
    return order;
  }

  public updateCodVerification(orderId: string, status: Order["codVerificationStatus"]): Order | null {
    const order = this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
    if (!order) return null;
    order.codVerificationStatus = status;
    if (status === "Verified" && order.milestones) {
      order.milestones[1].completed = true;
      order.milestones[1].timestamp = new Date().toISOString();
    }
    order.updatedAt = new Date().toISOString();
    this.persistToDisk();
    return order;
  }

  // ================= INVENTORY =================
  public updateStock(productId: string, quantity: number): boolean {
    const product = this.getProductById(productId);
    if (!product) return false;
    product.stockQuantity = Math.max(0, quantity);
    product.inStock = product.stockQuantity > 0;
    product.updatedAt = new Date().toISOString();
    this.persistToDisk();
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
    this.persistToDisk();
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

  // ================= REVIEWS =================
  public getReviews(productId?: string): Review[] {
    if (productId) {
      return this.reviews.filter((r) => r.productId === productId);
    }
    return this.reviews;
  }

  public createReview(data: Omit<Review, "id" | "date">): Review {
    const newReview: Review = {
      ...data,
      id: `rev-${Date.now()}`,
      date: new Date().toISOString(),
      helpfulCount: 0,
    };
    this.reviews.unshift(newReview);

    // Recalculate product rating
    const prodReviews = this.reviews.filter((r) => r.productId === data.productId);
    const avgRating = prodReviews.reduce((sum, r) => sum + r.rating, 0) / prodReviews.length;
    const product = this.getProductById(data.productId);
    if (product) {
      product.rating = Math.round(avgRating * 10) / 10;
      product.reviewsCount = prodReviews.length;
    }

    this.persistToDisk();
    return newReview;
  }

  // ================= RETURNS & EXCHANGES =================
  public getReturns(): ReturnRequest[] {
    return this.returns;
  }

  public getReturnById(id: string): ReturnRequest | undefined {
    return this.returns.find((r) => r.id === id || r.ticketNumber === id);
  }

  public createReturn(data: Omit<ReturnRequest, "id" | "ticketNumber" | "status" | "createdAt" | "updatedAt">): ReturnRequest {
    const ticketNumber = `RET-${Math.floor(10000 + Math.random() * 90000)}`;
    const newReturn: ReturnRequest = {
      ...data,
      id: `ret-${Date.now()}`,
      ticketNumber,
      status: "Pending Review",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.returns.unshift(newReturn);

    this.addNotification({
      type: "return",
      title: `Return Request: ${ticketNumber}`,
      message: `${data.customerName} submitted an exchange/return request for #${data.orderNumber}`,
      link: "/admin?tab=returns",
    });

    this.persistToDisk();
    return newReturn;
  }

  public updateReturnStatus(
    id: string,
    status: ReturnRequest["status"],
    adminNotes?: string,
    courierTracking?: string
  ): ReturnRequest | null {
    const item = this.returns.find((r) => r.id === id || r.ticketNumber === id);
    if (!item) return null;
    item.status = status;
    if (adminNotes !== undefined) item.adminNotes = adminNotes;
    if (courierTracking !== undefined) item.courierTracking = courierTracking;
    item.updatedAt = new Date().toISOString();
    this.persistToDisk();
    return item;
  }

  // ================= SETTINGS & CMS =================
  public getSettings(): SiteSettings {
    return this.settings;
  }

  public updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    this.settings = {
      ...this.settings,
      ...updates,
    };
    this.persistToDisk();
    return this.settings;
  }

  // ================= NOTIFICATIONS =================
  public getNotifications(): AdminNotification[] {
    return this.notifications;
  }

  public addNotification(notification: Omit<AdminNotification, "id" | "read" | "createdAt">): AdminNotification {
    const newNotif: AdminNotification = {
      ...notification,
      id: `notif-${Date.now()}-${Math.random().toString().slice(-4)}`,
      read: false,
      createdAt: new Date().toISOString(),
    };
    this.notifications.unshift(newNotif);
    if (this.notifications.length > 50) {
      this.notifications = this.notifications.slice(0, 50);
    }
    this.persistToDisk();
    return newNotif;
  }

  public markNotificationRead(id: string): boolean {
    const notif = this.notifications.find((n) => n.id === id);
    if (!notif) return false;
    notif.read = true;
    this.persistToDisk();
    return true;
  }

  // ================= CUSTOMERS & CRM =================
  public getCustomers(): Customer[] {
    const map = new Map<string, Customer>();

    for (const order of this.orders) {
      const key = order.customerEmail.toLowerCase().trim();
      const existing = map.get(key);
      const customMeta = this.customerNotes.get(key);

      if (!existing) {
        map.set(key, {
          id: `cust-${Math.abs(key.split("").reduce((a, b) => (a << 5) - a + b.charCodeAt(0), 0))}`,
          name: order.customerName,
          email: order.customerEmail,
          phone: order.customerPhone,
          city: order.city,
          address: order.shippingAddress,
          totalOrders: 1,
          totalSpent: order.total,
          tier: customMeta?.tier || (order.total > 50000 ? "VIP Patron" : "New"),
          codRisk: order.status === "Cancelled" ? "High" : "Low",
          notes: customMeta?.notes || "",
          tags: customMeta?.tags || ["E-Store Patron"],
          createdAt: order.createdAt,
        });
      } else {
        existing.totalOrders += 1;
        existing.totalSpent += order.total;
        if (existing.totalSpent > 100000) existing.tier = "VIP Patron";
        else if (existing.totalSpent > 50000) existing.tier = "Gold";
        else existing.tier = "Frequent";
      }
    }

    return Array.from(map.values());
  }

  public updateCustomerMeta(
    email: string,
    meta: { notes?: string; tags?: string[]; tier?: Customer["tier"] }
  ): boolean {
    const key = email.toLowerCase().trim();
    const current = this.customerNotes.get(key) || {};
    this.customerNotes.set(key, {
      ...current,
      ...meta,
    });
    this.persistToDisk();
    return true;
  }

  // ================= ADVANCED SALES ANALYTICS =================
  public getAnalytics(): SalesAnalytics {
    const now = Date.now();
    const oneDay = 86400000;
    const sevenDays = oneDay * 7;
    const thirtyDays = oneDay * 30;

    let dailyRevenue = 0;
    let weeklyRevenue = 0;
    let monthlyRevenue = 0;
    let totalRevenue = 0;

    const validOrders = this.orders.filter((o) => o.status !== "Cancelled");
    const totalOrders = validOrders.length;

    let verifiedCodCount = 0;
    const productSalesMap = new Map<string, { name: string; count: number; revenue: number; image: string }>();
    const sizeMap = new Map<string, number>();

    for (const order of validOrders) {
      const orderTime = new Date(order.createdAt).getTime();
      const age = now - orderTime;

      totalRevenue += order.total;
      if (age <= oneDay) dailyRevenue += order.total;
      if (age <= sevenDays) weeklyRevenue += order.total;
      if (age <= thirtyDays) monthlyRevenue += order.total;

      if (order.codVerificationStatus === "Verified") {
        verifiedCodCount += 1;
      }

      for (const item of order.items) {
        // Product stats
        const currentProd = productSalesMap.get(item.productId) || {
          name: item.productName,
          count: 0,
          revenue: 0,
          image: item.productImage,
        };
        currentProd.count += item.quantity;
        currentProd.revenue += item.price * item.quantity;
        productSalesMap.set(item.productId, currentProd);

        // Size stats
        const currentSizeCount = sizeMap.get(item.size) || 0;
        sizeMap.set(item.size, currentSizeCount + item.quantity);
      }
    }

    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    const codVerificationRate = totalOrders > 0 ? Math.round((verifiedCodCount / totalOrders) * 100) : 0;

    // Best-selling products
    const bestSellingProducts = Array.from(productSalesMap.entries())
      .map(([id, data]) => ({
        id,
        name: data.name,
        salesCount: data.count,
        revenue: data.revenue,
        image: data.image,
      }))
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Size distribution breakdown
    const totalPieces = Array.from(sizeMap.values()).reduce((a, b) => a + b, 0);
    const sizeBreakdown = Array.from(sizeMap.entries()).map(([size, count]) => ({
      size,
      count,
      percentage: totalPieces > 0 ? Math.round((count / totalPieces) * 100) : 0,
    }));

    return {
      totalRevenue,
      dailyRevenue,
      weeklyRevenue,
      monthlyRevenue,
      totalOrders,
      averageOrderValue,
      conversionRate: 3.8, // 3.8% e-commerce conversion baseline
      codVerificationRate,
      bestSellingProducts,
      sizeBreakdown,
    };
  }

  // ================= BACKUP & HEALTH =================
  public exportBackup() {
    return {
      version: "2.0-production",
      exportedAt: new Date().toISOString(),
      productsCount: this.products.length,
      ordersCount: this.orders.length,
      customersCount: this.getCustomers().length,
      data: {
        products: this.products,
        collections: this.collections,
        orders: this.orders,
        coupons: this.coupons,
        reviews: this.reviews,
        returns: this.returns,
        settings: this.settings,
        notifications: this.notifications,
        customerNotes: Object.fromEntries(this.customerNotes),
      },
    };
  }

  // ================= NEWSLETTER =================
  public addSubscriber(email: string): boolean {
    if (!this.subscribers.includes(email.toLowerCase())) {
      this.subscribers.push(email.toLowerCase());
      this.persistToDisk();
      return true;
    }
    return false;
  }
}

// Global singleton instance
const globalForStore = globalThis as unknown as { storeInstance?: DataStore };
export const db = globalForStore.storeInstance ?? new DataStore();
if (process.env.NODE_ENV !== "production") globalForStore.storeInstance = db;
