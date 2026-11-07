"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Product,
  Order,
  Customer,
  Coupon,
  ReturnRequest,
  SiteSettings,
  AdminNotification,
  SalesAnalytics,
} from "@/types";
import { formatPKR } from "@/utils/format";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Tag,
  Boxes,
  Plus,
  Trash2,
  Edit3,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  XCircle,
  AlertTriangle,
  ArrowUpRight,
  TrendingUp,
  ShieldCheck,
  ChevronDown,
  RefreshCw,
  LogOut,
  Lock,
  Bell,
  Download,
  MessageCircle,
  Layers,
  Settings as SettingsIcon,
  Check,
  X,
  ExternalLink,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [sessionToken, setSessionToken] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders" | "inventory" | "returns" | "customers" | "cms" | "coupons"
  >("overview");

  // Live data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [returns, setReturns] = useState<ReturnRequest[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);
  const [analytics, setAnalytics] = useState<SalesAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");

  // Notifications dropdown
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  // Modals & form states
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    subtitle: "",
    sku: "",
    price: "",
    originalPrice: "",
    category: "Traditional Menswear",
    collection: "Traditional Menswear",
    description: "",
    fabric: "Pure 80g Raw Silk & Worsted Wool",
    stockQuantity: "20",
    images: "",
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
  });

  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "10",
    minOrderAmount: "5000",
    expiryDate: "2027-12-31",
    usageLimit: "100",
  });

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerNotesInput, setCustomerNotesInput] = useState("");
  const [customerTierInput, setCustomerTierInput] = useState<Customer["tier"]>("VIP Patron");

  // Dispatch Courier state
  const [dispatchCourier, setDispatchCourier] = useState<"Trax" | "PostEx" | "Leopards" | "TCS">("Trax");

  // CMS Settings form state
  const [cmsSaved, setCmsSaved] = useState(false);

  // Check stored session on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("spogmai_admin_token");
    if (savedToken) {
      verifyToken(savedToken);
    }
  }, []);

  const verifyToken = async (token: string) => {
    try {
      const res = await fetch("/api/admin/auth/verify", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        setIsAuthenticated(true);
        setSessionToken(token);
      } else {
        localStorage.removeItem("spogmai_admin_token");
      }
    } catch {
      localStorage.removeItem("spogmai_admin_token");
    }
  };

  // Secure Server-Side Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: adminPassword }),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setIsAuthenticated(true);
        setSessionToken(data.token);
        localStorage.setItem("spogmai_admin_token", data.token);
      } else {
        setAuthError(data.error || "Invalid administrator credentials (Hint: spogmai2026)");
      }
    } catch {
      setAuthError("Failed to authenticate with security gateway");
    } finally {
      setAuthLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("spogmai_admin_token");
    setIsAuthenticated(false);
    setSessionToken(null);
  };

  // Fetch all live dashboard data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [
        resProd,
        resOrd,
        resCust,
        resCoup,
        resRet,
        resSettings,
        resNotif,
        resAnalytics,
      ] = await Promise.all([
        fetch("/api/products").then((r) => r.json()),
        fetch("/api/orders").then((r) => r.json()),
        fetch("/api/customers").then((r) => r.json()),
        fetch("/api/coupons").then((r) => r.json()),
        fetch("/api/returns").then((r) => r.json()),
        fetch("/api/settings").then((r) => r.json()),
        fetch("/api/notifications").then((r) => r.json()),
        fetch("/api/analytics").then((r) => r.json()),
      ]);

      if (resProd?.success) setProducts(resProd.products);
      if (resOrd?.success) setOrders(resOrd.orders);
      if (resCust?.success) setCustomers(resCust.customers);
      if (resCoup?.success) setCoupons(resCoup.coupons);
      if (Array.isArray(resRet)) setReturns(resRet);
      if (resSettings?.heroHeadline) setSettings(resSettings);
      if (Array.isArray(resNotif)) setNotifications(resNotif);
      if (resAnalytics?.totalRevenue !== undefined) setAnalytics(resAnalytics);
    } catch (e) {
      console.error("Failed to load dashboard data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  // Mark notification read
  const handleMarkNotifRead = async (id: string) => {
    try {
      await fetch("/api/notifications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch {}
  };

  // Create Product
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newProduct,
          price: Number(newProduct.price),
          originalPrice: newProduct.originalPrice ? Number(newProduct.originalPrice) : undefined,
          stockQuantity: Number(newProduct.stockQuantity),
          images: newProduct.images
            ? newProduct.images.split(",").map((s) => s.trim())
            : [
                "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1200&auto=format&fit=crop",
              ],
        }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddProductOpen(false);
        fetchData();
      }
    } catch {
      alert("Error adding product");
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to remove this garment from the atelier?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchData();
    } catch {
      alert("Error deleting product");
    }
  };

  // Update Order Status & Courier Dispatch
  const handleUpdateOrderStatus = async (
    orderId: string,
    status: Order["status"],
    autoBookCourier = false
  ) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          autoBookCourier,
          courierChoice: dispatchCourier,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(data.order);
        }
        fetchData();
      }
    } catch {
      alert("Error updating order status");
    }
  };

  // Update COD Verification Status
  const handleUpdateCodVerification = async (
    orderId: string,
    codVerificationStatus: Order["codVerificationStatus"]
  ) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codVerificationStatus }),
      });
      const data = await res.json();
      if (data.success) {
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(data.order);
        }
        fetchData();
      }
    } catch {
      alert("Error updating verification");
    }
  };

  // Update Inventory Stock
  const handleUpdateStock = async (productId: string, newQty: number) => {
    try {
      await fetch("/api/inventory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: newQty }),
      });
      fetchData();
    } catch {
      alert("Error updating inventory");
    }
  };

  // Update Return Request Status
  const handleUpdateReturnStatus = async (
    id: string,
    status: ReturnRequest["status"],
    autoBookPickup = false
  ) => {
    try {
      await fetch("/api/returns", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status, autoBookPickup }),
      });
      fetchData();
    } catch {
      alert("Error updating return request");
    }
  };

  // Save Customer CRM Notes & Tier
  const handleSaveCustomerMeta = async () => {
    if (!selectedCustomer) return;
    try {
      await fetch(`/api/customers/${selectedCustomer.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: selectedCustomer.email,
          notes: customerNotesInput,
          tier: customerTierInput,
        }),
      });
      setSelectedCustomer(null);
      fetchData();
    } catch {
      alert("Error saving customer CRM notes");
    }
  };

  // Save CMS Content
  const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      setCmsSaved(true);
      setTimeout(() => setCmsSaved(false), 2500);
      fetchData();
    } catch {
      alert("Error saving settings");
    }
  };

  // Create Coupon
  const handleCreateCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCoupon),
      });
      const data = await res.json();
      if (data.success) {
        setIsAddCouponOpen(false);
        fetchData();
      }
    } catch {
      alert("Error creating coupon");
    }
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === "All" || o.status === orderStatusFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  const unreadNotifs = notifications.filter((n) => !n.read);

  // ================= LOGIN SCREEN =================
  if (!isAuthenticated) {
    return (
      <div className="bg-[#050505] min-h-screen text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white">
              <Lock className="w-5 h-5 text-emerald-400" />
            </div>
            <h1 className="text-2xl font-serif font-bold uppercase tracking-wider">
              SPOGMAI Atelier Admin
            </h1>
            <p className="text-xs text-neutral-400">
              Enter administrator passkey to access inventory, orders, and products.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-neutral-400 block mb-1">
                Security Passkey
              </label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-white font-mono"
              />
            </div>

            {authError && (
              <p className="text-xs text-red-400 bg-red-950/30 border border-red-500/20 p-2.5 rounded-xl">
                {authError}
              </p>
            )}

            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3.5 bg-white text-black text-xs uppercase tracking-widest font-bold rounded-xl hover:bg-neutral-200 transition-colors disabled:opacity-50 shadow-lg"
            >
              {authLoading ? "Verifying Authorization..." : "Access Command Center"}
            </button>

            <div className="text-center pt-2">
              <Link href="/" className="text-xs text-neutral-500 hover:text-white transition-colors">
                ← Return to Public Storefront
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ================= MAIN DASHBOARD =================
  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col">
      {/* Top Header */}
      <header className="border-b border-white/10 bg-[#0a0a0a] sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-lg font-serif font-bold uppercase tracking-[0.2em] bg-gradient-to-r from-white to-neutral-400 bg-clip-text text-transparent"
            >
              SPOGMAI
            </Link>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Atelier Management • PK
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Download JSON Backup */}
            <a
              href="/api/admin/backup"
              target="_blank"
              download
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 hover:bg-white/10 transition-colors"
              title="Download Complete Database JSON Snapshot"
            >
              <Download className="w-3.5 h-3.5 text-emerald-400" />
              <span>Backup DB</span>
            </a>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setIsNotifOpen(!isNotifOpen)}
                className="relative p-2 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 text-black text-[9px] font-bold flex items-center justify-center animate-pulse">
                    {unreadNotifs.length}
                  </span>
                )}
              </button>

              {/* Notification Dropdown */}
              {isNotifOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl bg-[#0c0c0c] border border-white/15 p-4 shadow-2xl z-50 space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="text-xs font-semibold text-white uppercase tracking-wider">
                      Atelier Alerts ({unreadNotifs.length} unread)
                    </span>
                    <button
                      onClick={() => setIsNotifOpen(false)}
                      className="text-white/40 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="max-h-80 overflow-y-auto space-y-2">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-white/40 py-4 text-center">No alerts recorded.</p>
                    ) : (
                      notifications.slice(0, 8).map((notif) => (
                        <div
                          key={notif.id}
                          onClick={() => handleMarkNotifRead(notif.id)}
                          className={`p-3 rounded-xl border text-left cursor-pointer transition-colors ${
                            notif.read
                              ? "bg-white/[0.02] border-white/5 text-white/50"
                              : "bg-white/10 border-white/20 text-white"
                          }`}
                        >
                          <div className="text-xs font-semibold text-white">{notif.title}</div>
                          <div className="text-[11px] text-white/70 mt-0.5">{notif.message}</div>
                          <div className="text-[9px] text-white/40 mt-1">
                            {new Date(notif.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={fetchData}
              className="p-2 text-neutral-400 hover:text-white rounded-xl bg-white/5 border border-white/10 transition-colors"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:border-red-500/30 text-xs font-medium text-neutral-300 hover:text-red-400 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none">
          {[
            { id: "overview", label: "Executive Analytics", icon: LayoutDashboard },
            { id: "orders", label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: "products", label: `Products (${products.length})`, icon: Package },
            { id: "inventory", label: "Inventory Audit", icon: Boxes },
            { id: "returns", label: `Returns & Exchanges (${returns.length})`, icon: RefreshCw },
            { id: "customers", label: `Patron CRM (${customers.length})`, icon: Users },
            { id: "cms", label: "Content & Banners", icon: Layers },
            { id: "coupons", label: "Promo Codes", icon: Tag },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-white text-black font-semibold shadow-md"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Tab Viewports */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* ================= TAB 1: EXECUTIVE ANALYTICS ================= */}
        {activeTab === "overview" && (
          <div className="space-y-8 animate-fade-in">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">Total Revenue (GMV)</span>
                <div className="text-2xl font-bold font-mono text-white">
                  PKR {analytics?.totalRevenue?.toLocaleString() || "0"}
                </div>
                <div className="text-xs text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>PKR {analytics?.dailyRevenue?.toLocaleString() || "0"} in last 24h</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">Average Order Value (AOV)</span>
                <div className="text-2xl font-bold font-mono text-white">
                  PKR {analytics?.averageOrderValue?.toLocaleString() || "0"}
                </div>
                <div className="text-xs text-neutral-400">
                  Across {orders.length} registered orders
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">COD Verification Rate</span>
                <div className="text-2xl font-bold font-mono text-emerald-400">
                  {analytics?.codVerificationRate || 100}%
                </div>
                <div className="text-xs text-emerald-400">
                  Verified via WhatsApp workflow
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400">Active Patrons</span>
                <div className="text-2xl font-bold font-mono text-white">{customers.length}</div>
                <div className="text-xs text-neutral-400">
                  {returns.length} return / exchange request(s)
                </div>
              </div>
            </div>

            {/* Middle Section: Best Sellers & Size Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Best Selling Menswear Pieces (7 cols) */}
              <div className="lg:col-span-7 bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                  Top-Performing Menswear Ensembles
                </h3>

                <div className="space-y-3">
                  {analytics?.bestSellingProducts?.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-10 h-12 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0">
                          <Image src={item.image} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="text-xs font-semibold text-white truncate max-w-xs">{item.name}</div>
                          <div className="text-[11px] text-neutral-400">{item.salesCount} units ordered</div>
                        </div>
                      </div>

                      <div className="text-xs font-mono font-bold text-emerald-400">
                        PKR {item.revenue.toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Size Distribution (5 cols) */}
              <div className="lg:col-span-5 bg-white/5 border border-white/10 rounded-2xl p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">
                  Best-Selling Sizes Breakdown
                </h3>

                <div className="space-y-4">
                  {analytics?.sizeBreakdown?.map((sz) => (
                    <div key={sz.size} className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-white font-medium">Size {sz.size}</span>
                        <span className="text-neutral-400 font-mono">
                          {sz.count} pieces ({sz.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-emerald-400 h-2 rounded-full"
                          style={{ width: `${sz.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: ORDERS PIPELINE ================= */}
        {activeTab === "orders" && (
          <div className="space-y-6 animate-fade-in">
            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-3 w-4 h-4 text-neutral-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order #, patron name, phone, or city..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto">
                {["All", "Confirmed COD", "Processing", "Shipped", "Delivered", "Cancelled"].map((st) => (
                  <button
                    key={st}
                    onClick={() => setOrderStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-colors ${
                      orderStatusFilter === st
                        ? "bg-white text-black font-semibold"
                        : "bg-white/5 text-neutral-400 hover:text-white"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-neutral-400 uppercase tracking-wider bg-white/[0.02]">
                      <th className="py-3 px-4">Order Ref</th>
                      <th className="py-3 px-4">Patron</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Items</th>
                      <th className="py-3 px-4">COD Total</th>
                      <th className="py-3 px-4">COD Verification</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-neutral-300">
                    {filteredOrders.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="py-8 text-center text-neutral-500">
                          No matching orders found.
                        </td>
                      </tr>
                    ) : (
                      filteredOrders.map((order) => (
                        <tr key={order.id} className="hover:bg-white/[0.02]">
                          <td className="py-3.5 px-4 font-mono font-semibold text-white">
                            #{order.orderNumber}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-medium text-white">{order.customerName}</div>
                            <div className="text-[11px] text-neutral-400">{order.customerPhone}</div>
                          </td>
                          <td className="py-3.5 px-4">{order.city}</td>
                          <td className="py-3.5 px-4">{order.items.length} piece(s)</td>
                          <td className="py-3.5 px-4 font-mono font-bold text-white">
                            PKR {order.total.toLocaleString()}
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wider font-semibold ${
                                order.codVerificationStatus === "Verified"
                                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                  : "bg-amber-500/20 text-amber-400 border border-amber-500/30"
                              }`}
                            >
                              {order.codVerificationStatus || "Unverified"}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as any)}
                              className="bg-[#111] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white focus:outline-none"
                            >
                              <option value="Confirmed COD">Confirmed COD</option>
                              <option value="Processing">Processing</option>
                              <option value="Shipped">Shipped</option>
                              <option value="Delivered">Delivered</option>
                              <option value="Cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="px-3 py-1 rounded-lg bg-white/10 hover:bg-white text-white hover:text-black font-semibold text-[11px] transition-colors"
                            >
                              Manage
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Selected Order Detailed Modal */}
            {selectedOrder && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="absolute top-5 right-5 p-2 text-white/50 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-3 mb-6">
                    <h2 className="text-xl font-mono font-bold text-white">
                      Order #{selectedOrder.orderNumber}
                    </h2>
                    <span className="px-2.5 py-0.5 rounded-full text-xs bg-white/10 text-white">
                      {selectedOrder.status}
                    </span>
                  </div>

                  {/* Customer Information */}
                  <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs mb-6">
                    <div>
                      <span className="text-white/40 block">Patron:</span>
                      <strong className="text-white text-sm">{selectedOrder.customerName}</strong>
                      <div className="text-white/60">{selectedOrder.customerEmail}</div>
                      <div className="text-white/80 font-mono mt-1">{selectedOrder.customerPhone}</div>
                    </div>
                    <div>
                      <span className="text-white/40 block">Destination:</span>
                      <div className="text-white">{selectedOrder.shippingAddress}</div>
                      <div className="text-white/70">{selectedOrder.city}, Pakistan</div>
                    </div>
                  </div>

                  {/* WhatsApp Quick Trigger */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <a
                      href={`https://wa.me/${selectedOrder.customerPhone.replace(/[^0-9]/g, "").replace(/^0/, "92")}?text=${encodeURIComponent(
                        `*SPOGMAI COD VERIFICATION*\nSalaam ${selectedOrder.customerName}, we have received your order #${selectedOrder.orderNumber}. Reply "CONFIRM" to initiate express dispatch.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-500/30"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      Send WhatsApp COD Verification
                    </a>

                    <button
                      onClick={() => handleUpdateCodVerification(selectedOrder.id, "Verified")}
                      className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-xs font-semibold transition-colors"
                    >
                      Mark COD as Verified
                    </button>
                  </div>

                  {/* Courier Integration Dispatch Box */}
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs uppercase tracking-wider text-white font-semibold flex items-center gap-2">
                        <Truck className="w-4 h-4 text-emerald-400" />
                        Courier Consignment Integration
                      </span>
                      {selectedOrder.courierInfo && (
                        <span className="text-[11px] text-emerald-400 font-mono">
                          {selectedOrder.courierInfo.courierName} ({selectedOrder.courierInfo.trackingNumber})
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={dispatchCourier}
                        onChange={(e) => setDispatchCourier(e.target.value as any)}
                        className="bg-[#111] border border-white/10 rounded-lg px-3 py-2 text-xs text-white"
                      >
                        <option value="Trax">Trax Logistics</option>
                        <option value="PostEx">PostEx Express</option>
                        <option value="Leopards">Leopards Courier</option>
                        <option value="TCS">TCS Express</option>
                      </select>

                      <button
                        onClick={() => handleUpdateOrderStatus(selectedOrder.id, "Shipped", true)}
                        className="px-4 py-2 bg-emerald-400 text-black text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-emerald-300 transition-colors"
                      >
                        Auto-Book & Dispatch with {dispatchCourier}
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="space-y-3 border-t border-white/10 pt-4">
                    <h3 className="text-xs uppercase tracking-wider text-white/50 font-semibold">
                      Items Ordered ({selectedOrder.items.length})
                    </h3>
                    {selectedOrder.items.map((it, idx) => (
                      <div key={idx} className="flex justify-between items-center text-xs text-neutral-300">
                        <div>
                          <span className="text-white font-medium">{it.productName}</span>
                          <span className="text-white/50 block">Size: {it.size} • Qty: {it.quantity}</span>
                        </div>
                        <span className="font-mono text-white">
                          PKR {(it.price * it.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Total */}
                  <div className="border-t border-white/10 pt-4 mt-4 flex justify-between items-center">
                    <span className="text-xs text-white/50">Total Payable:</span>
                    <span className="text-lg font-mono font-bold text-emerald-400">
                      PKR {selectedOrder.total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 3: PRODUCTS CATALOG ================= */}
        {activeTab === "products" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-white">Atelier Menswear Catalog</h2>
                <p className="text-xs text-neutral-400">Manage garments, fabrics, pricing, and stock.</p>
              </div>

              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 bg-white text-black text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" /> Add Garment
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {products.map((p) => (
                <div key={p.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-neutral-900 mb-3">
                      <Image src={p.images[0] || ""} alt={p.name} fill className="object-cover" />
                      <div className="absolute top-2 left-2">
                        <span className="px-2 py-0.5 rounded text-[10px] uppercase font-mono bg-black/60 text-white">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xs font-semibold text-white truncate">{p.name}</h3>
                    <div className="text-xs font-mono font-bold text-white mt-1">
                      PKR {p.price.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-white/50 mt-1">
                      Stock: <strong className="text-white">{p.stockQuantity} pcs</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/10 flex gap-2">
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="flex-1 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-medium transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Product Modal */}
            {isAddProductOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/15 rounded-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                  <h3 className="text-lg font-bold text-white mb-4">Add Menswear Creation</h3>
                  <form onSubmit={handleCreateProduct} className="space-y-4">
                    <div>
                      <label className="text-xs text-white/50 block mb-1">Name</label>
                      <input
                        type="text"
                        required
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-white/50 block mb-1">Price (PKR)</label>
                        <input
                          type="number"
                          required
                          value={newProduct.price}
                          onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-white/50 block mb-1">Stock Quantity</label>
                        <input
                          type="number"
                          required
                          value={newProduct.stockQuantity}
                          onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-white/50 block mb-1">Image URLs (comma separated)</label>
                      <input
                        type="text"
                        value={newProduct.images}
                        onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })}
                        placeholder="https://images.unsplash.com/..."
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                      />
                    </div>

                    <div className="flex gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsAddProductOpen(false)}
                        className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2.5 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider"
                      >
                        Publish Garment
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: INVENTORY AUDIT ================= */}
        {activeTab === "inventory" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-white">Real-Time Atelier Inventory Audit</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider">
                    <th className="py-3 px-4">Garment</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Current Stock</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick Restock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td className="py-3 px-4 font-medium text-white">{p.name}</td>
                      <td className="py-3 px-4 text-white/50">{p.category}</td>
                      <td className="py-3 px-4 font-mono font-bold text-white">{p.stockQuantity} pcs</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            p.stockQuantity <= 3
                              ? "bg-red-500/20 text-red-400"
                              : p.stockQuantity < 15
                              ? "bg-amber-500/20 text-amber-400"
                              : "bg-emerald-500/20 text-emerald-400"
                          }`}
                        >
                          {p.stockQuantity <= 3 ? "CRITICAL LOW" : p.stockQuantity < 15 ? "LOW STOCK" : "OPTIMAL"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleUpdateStock(p.id, p.stockQuantity + 5)}
                          className="px-2 py-1 bg-white/10 hover:bg-white text-white hover:text-black rounded text-[11px]"
                        >
                          +5
                        </button>
                        <button
                          onClick={() => handleUpdateStock(p.id, p.stockQuantity + 15)}
                          className="px-2 py-1 bg-white/10 hover:bg-white text-white hover:text-black rounded text-[11px]"
                        >
                          +15
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 5: RETURNS & EXCHANGES ================= */}
        {activeTab === "returns" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-white">Return & Exchange Requests</h2>
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-white/10 text-white/50 uppercase tracking-wider">
                    <th className="py-3 px-4">Ticket</th>
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Patron</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4">Action</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-white/80">
                  {returns.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-white/40">
                        No return or exchange requests logged.
                      </td>
                    </tr>
                  ) : (
                    returns.map((ret) => (
                      <tr key={ret.id}>
                        <td className="py-3 px-4 font-mono font-bold text-white">{ret.ticketNumber}</td>
                        <td className="py-3 px-4 font-mono text-white/60">#{ret.orderNumber}</td>
                        <td className="py-3 px-4">
                          <div>{ret.customerName}</div>
                          <div className="text-[10px] text-white/40">{ret.customerPhone}</div>
                        </td>
                        <td className="py-3 px-4">{ret.reason}</td>
                        <td className="py-3 px-4">
                          <span className="text-emerald-400">{ret.action}</span>
                          {ret.replacementSize && ` (Size ${ret.replacementSize})`}
                        </td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded text-[10px] bg-white/10 text-white font-medium">
                            {ret.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => handleUpdateReturnStatus(ret.id, "Pickup Scheduled", true)}
                            className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[11px] hover:bg-emerald-500/30 font-semibold"
                          >
                            Schedule Trax Pickup
                          </button>
                          <button
                            onClick={() => handleUpdateReturnStatus(ret.id, "Completed")}
                            className="px-2.5 py-1 rounded bg-white/10 hover:bg-white text-white hover:text-black text-[11px]"
                          >
                            Complete
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 6: PATRON CRM ================= */}
        {activeTab === "customers" && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-lg font-semibold text-white">Gentlemen Patron CRM</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {customers.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex justify-between items-start">
                      <h3 className="text-sm font-semibold text-white">{c.name}</h3>
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-mono font-bold">
                        {c.tier || "VIP Patron"}
                      </span>
                    </div>
                    <div className="text-xs text-white/60">{c.email}</div>
                    <div className="text-xs font-mono text-white/80">{c.phone}</div>
                    <div className="text-xs text-white/50">{c.city}, Pakistan</div>

                    <div className="pt-2 border-t border-white/10 flex justify-between text-xs">
                      <span>Total Spent:</span>
                      <span className="font-mono font-bold text-white">PKR {c.totalSpent.toLocaleString()}</span>
                    </div>

                    {c.notes && (
                      <p className="text-[11px] text-amber-300 bg-amber-500/10 p-2 rounded-lg italic">
                        "{c.notes}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      setSelectedCustomer(c);
                      setCustomerNotesInput(c.notes || "");
                      setCustomerTierInput(c.tier || "VIP Patron");
                    }}
                    className="mt-4 py-2 w-full rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-xs font-semibold transition-colors"
                  >
                    Edit Tailor Notes & Tier
                  </button>
                </div>
              ))}
            </div>

            {/* Edit Notes Modal */}
            {selectedCustomer && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                    Client CRM: {selectedCustomer.name}
                  </h3>

                  <div>
                    <label className="text-xs text-white/50 block mb-1">Patron Tier</label>
                    <select
                      value={customerTierInput}
                      onChange={(e) => setCustomerTierInput(e.target.value as any)}
                      className="w-full bg-[#111] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                    >
                      <option value="VIP Patron">VIP Patron (Heirloom Circle)</option>
                      <option value="Gold">Gold Patron</option>
                      <option value="Frequent">Frequent Gentleman</option>
                      <option value="New">New Patron</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-white/50 block mb-1">Private Atelier Notes</label>
                    <textarea
                      rows={3}
                      value={customerNotesInput}
                      onChange={(e) => setCustomerNotesInput(e.target.value)}
                      placeholder="e.g. Requires 1 inch extra shoulder room, prefers weekend delivery..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => setSelectedCustomer(null)}
                      className="flex-1 py-2 rounded-xl border border-white/10 text-xs text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveCustomerMeta}
                      className="flex-1 py-2 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider"
                    >
                      Save CRM Profile
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 7: WEBSITE CMS & BANNERS ================= */}
        {activeTab === "cms" && settings && (
          <form onSubmit={handleSaveCMS} className="max-w-3xl space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-white">Website Content & Banner Management</h2>
                <p className="text-xs text-neutral-400">Control homepage hero typography, announcement ticker, and promos.</p>
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 bg-white text-black text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-neutral-200 transition-colors shadow"
              >
                {cmsSaved ? "Saved to Atelier!" : "Save Content Changes"}
              </button>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                1. Announcement Bar Ticker
              </h3>
              <div>
                <label className="text-xs text-white/50 block mb-1">Ticker Text</label>
                <input
                  type="text"
                  value={settings.announcementBarText}
                  onChange={(e) => setSettings({ ...settings, announcementBarText: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="ann-active"
                  checked={settings.isAnnouncementActive}
                  onChange={(e) => setSettings({ ...settings, isAnnouncementActive: e.target.checked })}
                  className="rounded text-white"
                />
                <label htmlFor="ann-active" className="text-xs text-white/70">Enable Announcement Bar</label>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                2. Homepage Hero Section
              </h3>
              <div>
                <label className="text-xs text-white/50 block mb-1">Hero Main Headline</label>
                <input
                  type="text"
                  value={settings.heroHeadline}
                  onChange={(e) => setSettings({ ...settings, heroHeadline: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Supporting Headline</label>
                <input
                  type="text"
                  value={settings.heroSubHeadline}
                  onChange={(e) => setSettings({ ...settings, heroSubHeadline: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
              <div>
                <label className="text-xs text-white/50 block mb-1">Hero Description</label>
                <textarea
                  rows={3}
                  value={settings.heroDescription}
                  onChange={(e) => setSettings({ ...settings, heroDescription: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                3. Shipping Rates & Thresholds
              </h3>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs text-white/50 block mb-1">Major Cities (PKR)</label>
                  <input
                    type="number"
                    value={settings.shippingRates.majorCities}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        shippingRates: { ...settings.shippingRates, majorCities: Number(e.target.value) },
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">Rest of Pakistan (PKR)</label>
                  <input
                    type="number"
                    value={settings.shippingRates.restOfPakistan}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        shippingRates: { ...settings.shippingRates, restOfPakistan: Number(e.target.value) },
                      })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-xs text-white/50 block mb-1">Free Shipping Above (PKR)</label>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                    className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ================= TAB 8: COUPONS & PROMOS ================= */}
        {activeTab === "coupons" && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-white">Promo Vouchers & Courtesy Concessions</h2>
              <button
                onClick={() => setIsAddCouponOpen(true)}
                className="px-4 py-2 bg-white text-black text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-neutral-200 transition-colors flex items-center gap-2 shadow"
              >
                <Plus className="w-4 h-4" /> Create Promo Voucher
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {coupons.map((c) => (
                <div key={c.id} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-mono font-bold text-white tracking-widest">{c.code}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-400 font-semibold">
                      {c.discountType === "percentage" ? `${c.discountValue}% OFF` : `PKR ${c.discountValue} OFF`}
                    </span>
                  </div>
                  <div className="text-xs text-white/50">Used {c.usedCount} times</div>
                  <div className="text-[11px] text-white/40">
                    Min Order: PKR {c.minOrderAmount?.toLocaleString() || "0"}
                  </div>
                </div>
              ))}
            </div>

            {/* Add Coupon Modal */}
            {isAddCouponOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
                <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/15 rounded-2xl p-6 shadow-2xl space-y-4">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider">Create Voucher Code</h3>
                  <form onSubmit={handleCreateCoupon} className="space-y-3">
                    <div>
                      <label className="text-xs text-white/50 block mb-1">Code</label>
                      <input
                        type="text"
                        required
                        value={newCoupon.code}
                        onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                        className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white uppercase font-mono"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-white/50 block mb-1">Type</label>
                        <select
                          value={newCoupon.discountType}
                          onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                          className="w-full bg-[#111] border border-white/10 rounded-lg p-2.5 text-xs text-white"
                        >
                          <option value="percentage">Percentage (%)</option>
                          <option value="fixed">Fixed PKR</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-white/50 block mb-1">Discount Value</label>
                        <input
                          type="number"
                          required
                          value={newCoupon.discountValue}
                          onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-lg p-2.5 text-xs text-white font-mono"
                        />
                      </div>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setIsAddCouponOpen(false)}
                        className="flex-1 py-2 rounded-xl border border-white/10 text-xs text-white"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-white text-black text-xs font-semibold uppercase tracking-wider"
                      >
                        Create Voucher
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
