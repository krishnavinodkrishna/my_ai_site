"use client";

import { useState } from "react";

const ORDERS = [
  { id: "#ORD-001", customer: "Priya Sharma", email: "priya@email.com", product: "Women's Floral Dress", amount: "₹500", status: "Delivered", date: "Jul 15, 2026", city: "Mumbai" },
  { id: "#ORD-002", customer: "Rahul Nair", email: "rahul@email.com", product: "Premium Leather Handbag", amount: "₹2,000", status: "Shipped", date: "Jul 15, 2026", city: "Bangalore" },
  { id: "#ORD-003", customer: "Aisha Khan", email: "aisha@email.com", product: "Women's Party Dress", amount: "₹1,500", status: "Processing", date: "Jul 14, 2026", city: "Delhi" },
  { id: "#ORD-004", customer: "Vikram Patel", email: "vikram@email.com", product: "Leather Backpack", amount: "₹3,000", status: "Delivered", date: "Jul 14, 2026", city: "Ahmedabad" },
  { id: "#ORD-005", customer: "Sunita Roy", email: "sunita@email.com", product: "Smart Watch", amount: "₹149", status: "Pending", date: "Jul 13, 2026", city: "Kolkata" },
  { id: "#ORD-006", customer: "Meera Pillai", email: "meera@email.com", product: "Women's Floral Dress", amount: "₹500", status: "Shipped", date: "Jul 13, 2026", city: "Chennai" },
  { id: "#ORD-007", customer: "Arjun Singh", email: "arjun@email.com", product: "Men's Formal Shirt", amount: "₹49", status: "Delivered", date: "Jul 12, 2026", city: "Hyderabad" },
  { id: "#ORD-008", customer: "Kavya Reddy", email: "kavya@email.com", product: "Gold Earrings", amount: "₹39", status: "Processing", date: "Jul 12, 2026", city: "Pune" },
];

const STATUS_STYLES: Record<string, string> = {
  Delivered: "bg-emerald-500/15 text-emerald-400",
  Shipped: "bg-sky-500/15 text-sky-400",
  Processing: "bg-amber-500/15 text-amber-400",
  Pending: "bg-rose-500/15 text-rose-400",
};

const ALL_STATUSES = ["All", "Pending", "Processing", "Shipped", "Delivered"];

export default function AdminOrdersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders, setOrders] = useState(ORDERS);

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.product.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || o.status === statusFilter;
    return matchSearch && matchStatus;
  });

  function updateStatus(id: string, newStatus: string) {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: newStatus } : o)));
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Orders</h1>
        <p className="text-sm text-white/40 mt-1">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Search by customer, order ID, or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#151820] border border-white/8 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 transition-all"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {ALL_STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                statusFilter === s
                  ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                  : "bg-[#151820] border border-white/8 text-white/50 hover:text-white"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-[#151820] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Order ID", "Customer", "Product", "Amount", "Status", "Date", "Action"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] font-bold text-white/30 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-white/30 text-sm">No orders found.</td>
                </tr>
              ) : (
                filtered.map((order) => (
                  <tr key={order.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4 text-xs font-mono text-white/60 whitespace-nowrap">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-[11px] font-bold flex-shrink-0">
                          {order.customer[0]}
                        </div>
                        <div>
                          <p className="text-xs text-white font-medium whitespace-nowrap">{order.customer}</p>
                          <p className="text-[10px] text-white/30">{order.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/60 max-w-[160px]">
                      <p className="truncate">{order.product}</p>
                    </td>
                    <td className="px-6 py-4 text-xs font-bold text-white whitespace-nowrap">{order.amount}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-white/40 whitespace-nowrap">{order.date}</td>
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order.id, e.target.value)}
                        className="bg-white/5 border border-white/10 text-white/70 text-[10px] rounded-lg px-2 py-1.5 focus:outline-none focus:border-emerald-500/50 cursor-pointer"
                      >
                        {["Pending","Processing","Shipped","Delivered"].map((s) => (
                          <option key={s} value={s} className="bg-[#151820]">{s}</option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
