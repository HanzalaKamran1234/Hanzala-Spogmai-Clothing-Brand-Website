"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Product, Order, Customer, Coupon } from "@/types";
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
} from "lucide-react";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const [activeTab, setActiveTab] = useState<
    "overview" | "products" | "orders" | "inventory" | "customers" | "coupons"
  >("overview");

  // Live data states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [orderStatusFilter, setOrderStatusFilter] = useState("All");

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

  // Authenticate Admin
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPassword === "spogmai2026" || adminPassword === "admin") {
      setIsAuthenticated(true);
      setAuthError("");
    } else {
      setAuthError("Invalid credentials. (Hint: spogmai2026)");
    }
  };

  // Fetch all data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resProd, resOrd, resCust, resCoup] = await Promise.all([
        fetch("/api/products").then((r) => r.json()),
        fetch("/api/orders").then((r) => r.json()),
        fetch("/api/customers").then((r) => r.json()),
        fetch("/api/coupons").then((r) => r.json()),
      ]);

      if (resProd.success) setProducts(resProd.products);
      if (resOrd.success) setOrders(resOrd.orders);
      if (resCust.success) setCustomers(resCust.customers);
      if (resCoup.success) setCoupons(resCoup.coupons);
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
    } catch (err) {
      alert("Error adding product");
    }
  };

  // Delete Product
  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to remove this product?")) return;
    try {
      await fetch(`/api/products/${id}`, { method: "DELETE" });
      fetchData();
    } catch (err) {
      alert("Error deleting product");
    }
  };

  // Update Order Status
  const handleUpdateOrderStatus = async (orderId: string, status: Order["status"]) => {
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        if (selectedOrder?.id === orderId) {
          setSelectedOrder(data.order);
        }
        fetchData();
      }
    } catch (err) {
      alert("Error updating order status");
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
    } catch (err) {
      alert("Error updating inventory");
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
    } catch (err) {
      alert("Error creating coupon");
    }
  };

  // Metrics calculation
  const totalSales = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "Pending" || o.status === "Confirmed COD").length;
  const lowStockCount = products.filter((p) => p.stockQuantity < 15).length;

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesStatus = orderStatusFilter === "All" || o.status === orderStatusFilter;
    const matchesSearch =
      !searchQuery.trim() ||
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div className="bg-[#050505] min-h-screen text-white flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md shadow-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mx-auto text-white">
              <Lock className="w-5 h-5" />
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
              <label className="text-xs text-neutral-400 mb-1 block">Passkey</label>
              <input
                type="password"
                required
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter admin passkey (spogmai2026)"
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
              {authError && <p className="text-xs text-rose-400 mt-1">{authError}</p>}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all shadow-lg"
            >
              Authenticate & Enter
            </button>
          </form>

          <div className="text-center">
            <Link href="/" className="text-xs text-neutral-500 hover:text-white transition-colors">
              ← Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-black/40 p-6 flex flex-col justify-between flex-shrink-0">
        <div className="space-y-8">
          <div>
            <Link href="/" className="font-serif text-xl font-bold uppercase tracking-[0.2em] text-white">
              SPOGMAI
            </Link>
            <p className="text-[10px] uppercase tracking-widest text-emerald-400 mt-0.5">
              Atelier Management
            </p>
          </div>

          <nav className="space-y-1.5 text-xs font-medium">
            <button
              onClick={() => setActiveTab("overview")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "overview"
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "products"
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "orders"
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Orders</span>
              </div>
              {pendingOrders > 0 && (
                <span className="w-5 h-5 rounded-full bg-emerald-500 text-black text-[10px] font-bold flex items-center justify-center">
                  {pendingOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("inventory")}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "inventory"
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Boxes className="w-4 h-4" />
                <span>Inventory</span>
              </div>
              {lowStockCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center">
                  {lowStockCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("customers")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "customers"
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Customers ({customers.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("coupons")}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                activeTab === "coupons"
                  ? "bg-white text-black font-semibold shadow-md"
                  : "text-neutral-400 hover:text-white hover:bg-white/5"
              }`}
            >
              <Tag className="w-4 h-4" />
              <span>Discount Vouchers</span>
            </button>
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>View Public Storefront</span>
          </Link>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Lock & Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-white/10 gap-4">
          <div>
            <h2 className="text-2xl font-serif font-bold capitalize">
              {activeTab === "overview" ? "Atelier Performance" : activeTab}
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Real-time synchronization with local database and Supabase schema.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10 transition-colors"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>

            {activeTab === "products" && (
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="px-4 py-2 bg-white text-black text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-neutral-200 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            )}

            {activeTab === "coupons" && (
              <button
                onClick={() => setIsAddCouponOpen(true)}
                className="px-4 py-2 bg-white text-black text-xs uppercase tracking-wider font-bold rounded-xl hover:bg-neutral-200 transition-all flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Voucher</span>
              </button>
            )}
          </div>
        </div>

        {/* ================= TAB 1: OVERVIEW ================= */}
        {activeTab === "overview" && (
          <div className="pt-8 space-y-8 animate-fade-in">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono">
                  Gross Sales (PKR)
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {formatPKR(totalSales)}
                </p>
                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5" /> 100% Cash On Delivery Verified
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono">
                  Total Orders
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-white">{orders.length}</p>
                <span className="text-[11px] text-neutral-400">
                  {pendingOrders} awaiting fulfillment
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono">
                  Registered Patrons
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-white">
                  {customers.length}
                </p>
                <span className="text-[11px] text-neutral-400">Karachi, Lahore & Islamabad</span>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-mono">
                  Low-Stock Alerts
                </span>
                <p className="text-2xl sm:text-3xl font-serif font-bold text-amber-400">
                  {lowStockCount}
                </p>
                <span className="text-[11px] text-amber-300">Requires atelier restock</span>
              </div>
            </div>

            {/* Recent Orders Overview */}
            <div className="p-6 rounded-3xl bg-white/5 border border-white/10 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-serif font-bold text-white">Recent Orders</h3>
                <button
                  onClick={() => setActiveTab("orders")}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  View All Orders
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="border-b border-white/10 text-neutral-500 uppercase tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Order #</th>
                      <th className="py-3 px-4">Customer</th>
                      <th className="py-3 px-4">City</th>
                      <th className="py-3 px-4">Amount</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-white/[0.02]">
                        <td className="py-3 px-4 font-mono font-bold text-white">
                          {order.orderNumber}
                        </td>
                        <td className="py-3 px-4">
                          <p className="text-white font-medium">{order.customerName}</p>
                          <p className="text-[10px] text-neutral-500">{order.customerPhone}</p>
                        </td>
                        <td className="py-3 px-4 text-neutral-300">{order.city}</td>
                        <td className="py-3 px-4 font-semibold text-white">
                          {formatPKR(order.total)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider ${
                              order.status === "Delivered"
                                ? "bg-emerald-950 text-emerald-400 border border-emerald-500/30"
                                : order.status === "Confirmed COD"
                                ? "bg-blue-950 text-blue-400 border border-blue-500/30"
                                : "bg-amber-950 text-amber-400 border border-amber-500/30"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setActiveTab("orders");
                            }}
                            className="text-white hover:underline"
                          >
                            Manage
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: PRODUCTS ================= */}
        {activeTab === "products" && (
          <div className="pt-8 space-y-6 animate-fade-in">
            <div className="overflow-x-auto rounded-3xl bg-white/5 border border-white/10 p-4">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-white/10 text-neutral-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Product</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Price (PKR)</th>
                    <th className="py-3 px-4">Stock</th>
                    <th className="py-3 px-4">Highlights</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <div className="relative w-12 h-14 rounded-lg overflow-hidden bg-neutral-900 flex-shrink-0">
                          <Image src={p.images[0]} alt={p.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-serif font-bold text-white text-sm">{p.name}</p>
                          <p className="text-[10px] text-neutral-500 font-mono">{p.sku}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-neutral-300">{p.category}</td>
                      <td className="py-3 px-4 font-semibold text-white">{formatPKR(p.price)}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`font-semibold ${
                            p.stockQuantity < 15 ? "text-amber-400" : "text-emerald-400"
                          }`}
                        >
                          {p.stockQuantity} units
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-1.5 flex-wrap">
                          {p.isNewArrival && (
                            <span className="px-2 py-0.5 rounded text-[9px] bg-white text-black font-bold uppercase">
                              New
                            </span>
                          )}
                          {p.isBestSeller && (
                            <span className="px-2 py-0.5 rounded text-[9px] bg-neutral-800 text-white font-medium uppercase">
                              Bestseller
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/product/${p.id}`}
                            target="_blank"
                            className="p-1.5 text-neutral-400 hover:text-white"
                            title="View Public Page"
                          >
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(p.id)}
                            className="p-1.5 text-neutral-400 hover:text-rose-400"
                            title="Delete Product"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 3: ORDERS ================= */}
        {activeTab === "orders" && (
          <div className="pt-8 space-y-6 animate-fade-in">
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by order #, customer, city..."
                  className="w-full bg-white/5 border border-white/15 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
              </div>

              <div className="flex items-center gap-2">
                {["All", "Pending", "Confirmed COD", "Processing", "Shipped", "Delivered"].map(
                  (st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                        orderStatusFilter === st
                          ? "bg-white text-black font-semibold"
                          : "bg-white/5 border border-white/10 text-neutral-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-x-auto rounded-3xl bg-white/5 border border-white/10 p-4">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-white/10 text-neutral-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Order Ref</th>
                    <th className="py-3 px-4">Customer & Contact</th>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total (PKR)</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredOrders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono font-bold text-white">
                        {ord.orderNumber}
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-white font-medium">{ord.customerName}</p>
                        <a
                          href={`https://wa.me/${ord.customerPhone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
                        >
                          {ord.customerPhone}
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <p className="text-white">{ord.city}</p>
                        <p className="text-[10px] text-neutral-500 line-clamp-1">{ord.shippingAddress}</p>
                      </td>
                      <td className="py-3 px-4 text-neutral-300">
                        {ord.items.map((i) => `${i.quantity}x ${i.productName} (${i.size})`).join(", ")}
                      </td>
                      <td className="py-3 px-4 font-semibold text-white">{formatPKR(ord.total)}</td>
                      <td className="py-3 px-4">
                        <select
                          value={ord.status}
                          onChange={(e) => handleUpdateOrderStatus(ord.id, e.target.value as any)}
                          className="bg-neutral-900 border border-white/20 rounded-lg px-2 py-1 text-xs text-white focus:outline-none cursor-pointer"
                        >
                          <option value="Pending">Pending</option>
                          <option value="Confirmed COD">Confirmed COD</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                <div className="bg-[#0c0c0c] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest text-neutral-500 font-mono">
                        Order Details
                      </span>
                      <h3 className="text-xl font-serif font-bold text-white">
                        {selectedOrder.orderNumber}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedOrder(null)}
                      className="text-neutral-400 hover:text-white"
                    >
                      ✕
                    </button>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-xs space-y-2">
                    <p>
                      <strong>Recipient:</strong> {selectedOrder.customerName}
                    </p>
                    <p>
                      <strong>WhatsApp / Phone:</strong> {selectedOrder.customerPhone}
                    </p>
                    <p>
                      <strong>Delivery Destination:</strong> {selectedOrder.shippingAddress},{" "}
                      {selectedOrder.city}
                    </p>
                    {selectedOrder.orderNotes && (
                      <p>
                        <strong>Client Instructions:</strong> {selectedOrder.orderNotes}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-white">Ordered Items:</span>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                      {selectedOrder.items.map((it, idx) => (
                        <div
                          key={idx}
                          className="flex justify-between items-center text-xs p-2.5 rounded-xl bg-white/[0.02] border border-white/5"
                        >
                          <div>
                            <p className="font-serif font-semibold">{it.productName}</p>
                            <p className="text-[10px] text-neutral-400">
                              Size: {it.size} {it.color && `• ${it.color}`} • Qty: {it.quantity}
                            </p>
                          </div>
                          <span className="font-semibold">{formatPKR(it.price * it.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-white/10 flex justify-between items-center text-sm">
                    <span>Payable on Arrival (COD):</span>
                    <span className="font-serif font-bold text-emerald-400 text-base">
                      {formatPKR(selectedOrder.total)}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleUpdateOrderStatus(selectedOrder.id, "Delivered")}
                      className="flex-1 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                    >
                      Mark Delivered (Paid)
                    </button>
                    <button
                      onClick={() => handleUpdateOrderStatus(selectedOrder.id, "Cancelled")}
                      className="py-2.5 px-4 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: INVENTORY ================= */}
        {activeTab === "inventory" && (
          <div className="pt-8 space-y-6 animate-fade-in">
            <div className="overflow-x-auto rounded-3xl bg-white/5 border border-white/10 p-4">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-white/10 text-neutral-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">SKU</th>
                    <th className="py-3 px-4">Creations</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Available Units</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Quick Stock Adjustment</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono font-bold text-neutral-400">{p.sku}</td>
                      <td className="py-3 px-4 font-serif font-semibold text-white">{p.name}</td>
                      <td className="py-3 px-4 text-neutral-300">{p.category}</td>
                      <td className="py-3 px-4 font-bold text-sm text-white">{p.stockQuantity}</td>
                      <td className="py-3 px-4">
                        {p.stockQuantity <= 0 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-rose-950 text-rose-400 border border-rose-500/30">
                            Out of Stock
                          </span>
                        ) : p.stockQuantity < 15 ? (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-amber-950 text-amber-400 border border-amber-500/30">
                            Low Stock
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                            In Stock
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleUpdateStock(p.id, Math.max(0, p.stockQuantity - 1))}
                            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white font-bold"
                          >
                            -1
                          </button>
                          <button
                            onClick={() => handleUpdateStock(p.id, p.stockQuantity + 5)}
                            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-[11px]"
                          >
                            +5 Restock
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 5: CUSTOMERS ================= */}
        {activeTab === "customers" && (
          <div className="pt-8 space-y-6 animate-fade-in">
            <div className="overflow-x-auto rounded-3xl bg-white/5 border border-white/10 p-4">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-white/10 text-neutral-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Patron Name</th>
                    <th className="py-3 px-4">Email</th>
                    <th className="py-3 px-4">WhatsApp / Phone</th>
                    <th className="py-3 px-4">City</th>
                    <th className="py-3 px-4">Lifetime Orders</th>
                    <th className="py-3 px-4 text-right">Total Spend (PKR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {customers.map((c) => (
                    <tr key={c.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-semibold text-white">{c.name}</td>
                      <td className="py-3 px-4 text-neutral-400">{c.email}</td>
                      <td className="py-3 px-4 text-emerald-400 font-mono">{c.phone}</td>
                      <td className="py-3 px-4 text-neutral-300">{c.city}</td>
                      <td className="py-3 px-4">{c.totalOrders} order(s)</td>
                      <td className="py-3 px-4 text-right font-bold text-white">
                        {formatPKR(c.totalSpent)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= TAB 6: COUPONS ================= */}
        {activeTab === "coupons" && (
          <div className="pt-8 space-y-6 animate-fade-in">
            <div className="overflow-x-auto rounded-3xl bg-white/5 border border-white/10 p-4">
              <table className="w-full text-xs text-left">
                <thead className="border-b border-white/10 text-neutral-500 uppercase tracking-wider">
                  <tr>
                    <th className="py-3 px-4">Voucher Code</th>
                    <th className="py-3 px-4">Benefit</th>
                    <th className="py-3 px-4">Min. Spend</th>
                    <th className="py-3 px-4">Redemptions</th>
                    <th className="py-3 px-4">Expiration</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {coupons.map((coup) => (
                    <tr key={coup.id} className="hover:bg-white/[0.02]">
                      <td className="py-3 px-4 font-mono font-bold text-white">{coup.code}</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold">
                        {coup.discountType === "percentage"
                          ? `${coup.discountValue}% OFF`
                          : formatPKR(coup.discountValue)}
                      </td>
                      <td className="py-3 px-4 text-neutral-400">
                        {coup.minOrderAmount ? formatPKR(coup.minOrderAmount) : "None"}
                      </td>
                      <td className="py-3 px-4 text-neutral-300">
                        {coup.usedCount} / {coup.usageLimit}
                      </td>
                      <td className="py-3 px-4 text-neutral-400 font-mono">
                        {new Date(coup.expiryDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Modal: Add Product */}
        {isAddProductOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="bg-[#0c0c0c] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-white space-y-4 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <h3 className="text-xl font-serif font-bold">Add Men's Creation</h3>
                <button onClick={() => setIsAddProductOpen(false)} className="text-neutral-400 hover:text-white">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateProduct} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">Product Title *</label>
                  <input
                    type="text"
                    required
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="e.g. Bandhgala Prince Coat"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">Price in PKR *</label>
                    <input
                      type="number"
                      required
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      placeholder="e.g. 45000"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">Stock Quantity *</label>
                    <input
                      type="number"
                      required
                      value={newProduct.stockQuantity}
                      onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                      placeholder="e.g. 25"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">Category</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value as any })}
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="Traditional Menswear">Traditional Menswear</option>
                      <option value="Formal Wear">Formal Wear</option>
                      <option value="Modern Classics">Modern Classics</option>
                      <option value="Everyday Essentials">Everyday Essentials</option>
                      <option value="Premium Casualwear">Premium Casualwear</option>
                      <option value="Accessories">Accessories</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">Collection</label>
                    <select
                      value={newProduct.collection}
                      onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value as any })}
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="Traditional Menswear">Traditional Menswear</option>
                      <option value="Formal Wear">Formal Wear</option>
                      <option value="Modern Classics">Modern Classics</option>
                      <option value="Everyday Essentials">Everyday Essentials</option>
                      <option value="Premium Casualwear">Premium Casualwear</option>
                      <option value="New Arrivals">New Arrivals</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Fabric & Texture</label>
                  <input
                    type="text"
                    value={newProduct.fabric}
                    onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                    placeholder="e.g. 100% Pure Raw Silk"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Image URLs (comma separated)</label>
                  <input
                    type="text"
                    value={newProduct.images}
                    onChange={(e) => setNewProduct({ ...newProduct, images: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Master tailoring details..."
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all mt-2"
                >
                  Publish Creation
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Modal: Add Coupon */}
        {isAddCouponOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="bg-[#0c0c0c] border border-white/20 rounded-3xl p-6 sm:p-8 max-w-md w-full text-white space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <h3 className="text-xl font-serif font-bold">New Discount Voucher</h3>
                <button onClick={() => setIsAddCouponOpen(false)} className="text-neutral-400 hover:text-white">
                  ✕
                </button>
              </div>

              <form onSubmit={handleCreateCoupon} className="space-y-3 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">Voucher Code *</label>
                  <input
                    type="text"
                    required
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                    placeholder="e.g. VIP20"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white font-mono uppercase"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">Discount Type</label>
                    <select
                      value={newCoupon.discountType}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discountType: e.target.value as any })}
                      className="w-full bg-neutral-900 border border-white/15 rounded-xl px-3 py-2 text-white"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed PKR</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">Value *</label>
                    <input
                      type="number"
                      required
                      value={newCoupon.discountValue}
                      onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                      placeholder="10"
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Min Order Amount (PKR)</label>
                  <input
                    type="number"
                    value={newCoupon.minOrderAmount}
                    onChange={(e) => setNewCoupon({ ...newCoupon, minOrderAmount: e.target.value })}
                    placeholder="5000"
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-widest rounded-full hover:bg-neutral-200 transition-all mt-2"
                >
                  Activate Voucher
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
