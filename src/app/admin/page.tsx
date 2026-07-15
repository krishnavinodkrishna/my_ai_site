"use client";

import { NEW_ARRIVALS, BEST_SELLERS } from "@/content";

const allProducts = [...NEW_ARRIVALS, ...BEST_SELLERS];

const STATS = [
  { label: "Total Revenue", value: "₹4,28,500", change: "+18.2%", up: true, icon: "₹", color: "from-emerald-500 to-teal-500" },
  { label: "Total Orders", value: "1,284", change: "+9.4%", up: true, icon: "📦", color: "from-violet-500 to-purple-600" },
  { label: "Products", value: String(allProducts.length), change: "+2 new", up: true, icon: "🛍️", color: "from-orange-400 to-pink-500" },
  { label: "Customers", value: "3,921", change: "+5.1%", up: true, icon: "👥", color: "from-sky-400 to-blue-600" },
];

const RECENT_ORDERS = [
  { id: "#ORD-001", customer: "Priya Sharma", product: "Women's Floral Dress", amount: "₹500", status: "Delivered", date: "Jul 15" },
  { id: "#ORD-002", customer: "Rahul Nair", product: "Premium Leather Handbag", amount: "₹2,000", status: "Shipped", date: "Jul 15" },
  { id: "#ORD-003", customer: "Aisha Khan", product: "Women's Party Dress", amount: "₹1,500", status: "Processing", date: "Jul 14" },
  { id: "#ORD-004", customer: "Vikram Patel", product: "Leather Backpack", amount: "₹3,000", status: "Delivered", date: "Jul 14" },
  { id: "#ORD-005", customer: "Sunita Roy", product: "Smart Watch", amount: "₹149", status: "Pending", date: "Jul 13" },
];

const STATUS_STYLES: Record<string, string> = {
  Delivered: "bg-emerald-500/15 text-emerald-400",
  Shipped: "bg-sky-500/15 text-sky-400",
  Processing: "bg-amber-500/15 text-amber-400",
  Pending: "bg-rose-500/15 text-rose-400",
};

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-sm text-white/40 mt-1">Welcome back, Admin. Here's what's happening today.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-[#151820] border border-white/5 rounded-2xl p-5 flex flex-col gap-3 hover:border-white/10 transition-colors">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-white/40 uppercase tracking-widest">{stat.label}</p>
              <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-sm shadow-lg`}>
                {stat.icon}
              </div>
            </div>
            <p className="text-3xl font-bold text-white">{stat.value}</p>
            <p className={`text-xs font-semibold ${stat.up ? "text-emerald-400" : "text-red-400"}`}>
              {stat.up ? "▲" : "▼"} {stat.change} <span className="text-white/30 font-normal">vs last month</span>
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue bar chart (visual mock) */}
        <div className="lg:col-span-2 bg-[#151820] border border-white/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-sm font-bold text-white">Revenue Overview</h2>
              <p className="text-xs text-white/30 mt-0.5">Last 7 months</p>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 font-bold px-2 py-1 rounded-lg">+18.2%</span>
          </div>
          <div className="flex items-end gap-3 h-36">
            {[40, 65, 50, 80, 60, 90, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600/60 to-emerald-400/80 transition-all duration-700 hover:from-emerald-500 hover:to-emerald-300"
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-white/30">{["Jan","Feb","Mar","Apr","May","Jun","Jul"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Category breakdown */}
        <div className="bg-[#151820] border border-white/5 rounded-2xl p-6">
          <h2 className="text-sm font-bold text-white mb-1">Sales by Category</h2>
          <p className="text-xs text-white/30 mb-6">This month</p>
          <div className="flex flex-col gap-4">
            {[
              { label: "Women", pct: 42, color: "bg-pink-500" },
              { label: "Bags", pct: 28, color: "bg-emerald-500" },
              { label: "Watches", pct: 18, color: "bg-violet-500" },
              { label: "Men", pct: 12, color: "bg-sky-500" },
            ].map((cat) => (
              <div key={cat.label}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="text-white/60 font-medium">{cat.label}</span>
                  <span className="text-white font-bold">{cat.pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${cat.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-[#151820] border border-white/5 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Recent Orders</h2>
          <a href="/admin/orders" className="text-xs text-emerald-400 hover:text-emerald-300 transition-colors font-semibold">View all →</a>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Order ID", "Customer", "Product", "Amount", "Status", "Date"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-white/60">{order.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-[10px] font-bold">
                        {order.customer[0]}
                      </div>
                      <span className="text-xs text-white/80 font-medium">{order.customer}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/60">{order.product}</td>
                  <td className="px-6 py-4 text-xs font-bold text-white">{order.amount}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${STATUS_STYLES[order.status]}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/40">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
