"use client";

const MONTHLY = [
  { month: "Jan", revenue: 28000, orders: 92 },
  { month: "Feb", revenue: 45000, orders: 140 },
  { month: "Mar", revenue: 38000, orders: 118 },
  { month: "Apr", revenue: 62000, orders: 195 },
  { month: "May", revenue: 51000, orders: 160 },
  { month: "Jun", revenue: 74000, orders: 235 },
  { month: "Jul", revenue: 58000, orders: 180 },
];

const TOP_PRODUCTS = [
  { name: "Leather Backpack", sales: 184, revenue: "₹5,52,000", growth: "+24%" },
  { name: "Premium Leather Handbag", sales: 142, revenue: "₹2,84,000", growth: "+18%" },
  { name: "Women's Party Dress", sales: 128, revenue: "₹1,92,000", growth: "+12%" },
  { name: "Women's Floral Dress", sales: 96, revenue: "₹48,000", growth: "+9%" },
  { name: "Smart Watch", sales: 73, revenue: "₹10,877", growth: "+6%" },
];

const maxRevenue = Math.max(...MONTHLY.map((m) => m.revenue));

export default function AdminAnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="text-sm text-white/40 mt-1">Store performance overview</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Avg. Order Value", value: "₹1,640", icon: "📈" },
          { label: "Conversion Rate", value: "3.8%", icon: "🎯" },
          { label: "Return Rate", value: "1.2%", icon: "↩️" },
          { label: "Customer LTV", value: "₹5,820", icon: "💎" },
        ].map((k) => (
          <div key={k.label} className="bg-[#151820] border border-white/5 rounded-2xl p-5">
            <span className="text-2xl">{k.icon}</span>
            <p className="text-2xl font-bold text-white mt-3">{k.value}</p>
            <p className="text-xs text-white/40 mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Revenue chart */}
      <div className="bg-[#151820] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-bold text-white">Monthly Revenue & Orders</h2>
          <span className="text-[10px] text-white/30 bg-white/5 px-3 py-1.5 rounded-lg">2026</span>
        </div>
        <div className="flex items-end gap-4 h-48">
          {MONTHLY.map((m) => (
            <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
              <p className="text-[9px] text-emerald-400 font-bold">{m.orders}</p>
              <div className="w-full flex flex-col gap-1" style={{ height: "80%" }}>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-emerald-600/70 to-emerald-400 hover:from-emerald-500 hover:to-emerald-300 transition-all duration-300 cursor-pointer"
                  style={{ height: `${(m.revenue / maxRevenue) * 100}%` }}
                  title={`₹${m.revenue.toLocaleString()}`}
                />
              </div>
              <span className="text-[9px] text-white/30">{m.month}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded bg-emerald-400" />
            <span className="text-[10px] text-white/40">Revenue (₹)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-white/40">Numbers above bars = orders</span>
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="bg-[#151820] border border-white/5 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-bold text-white">Top Performing Products</h2>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              {["#", "Product", "Sales", "Revenue", "Growth"].map((h) => (
                <th key={h} className="text-left px-6 py-3 text-[10px] font-bold text-white/30 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOP_PRODUCTS.map((p, i) => (
              <tr key={p.name} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                <td className="px-6 py-4 text-white/30 font-mono text-xs">{i + 1}</td>
                <td className="px-6 py-4 text-sm font-semibold text-white">{p.name}</td>
                <td className="px-6 py-4 text-xs text-white/60">{p.sales} units</td>
                <td className="px-6 py-4 text-xs font-bold text-white">{p.revenue}</td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold text-emerald-400">{p.growth}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
