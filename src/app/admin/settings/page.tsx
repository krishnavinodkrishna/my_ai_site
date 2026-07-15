"use client";

import { useState } from "react";

export default function AdminSettingsPage() {
  const [store, setStore] = useState({
    name: "MAX Fashion Store",
    email: "support@maxfashion.com",
    phone: "+1 234 567 890",
    address: "MAX Fashion Store, New York, USA",
    currency: "INR (₹)",
    timezone: "Asia/Kolkata",
  });

  const [notif, setNotif] = useState({
    newOrders: true,
    lowStock: true,
    newCustomers: false,
    weeklyReport: true,
  });

  const [saved, setSaved] = useState(false);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div className="flex flex-col gap-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-sm text-white/40 mt-1">Manage your store configuration</p>
      </div>

      {/* Store Info */}
      <form onSubmit={handleSave} className="bg-[#151820] border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
        <h2 className="text-sm font-bold text-white border-b border-white/5 pb-4">Store Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(Object.keys(store) as (keyof typeof store)[]).map((key) => (
            <div key={key}>
              <label className="block text-[10px] font-bold text-white/40 uppercase tracking-widest mb-1.5">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </label>
              <input
                value={store[key]}
                onChange={(e) => setStore({ ...store, [key]: e.target.value })}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-500/50 transition-all"
              />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-bold hover:opacity-90 active:scale-95 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            Save Changes
          </button>
          {saved && (
            <span className="text-xs text-emerald-400 font-semibold animate-pulse">✓ Saved successfully!</span>
          )}
        </div>
      </form>

      {/* Notifications */}
      <div className="bg-[#151820] border border-white/5 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-sm font-bold text-white border-b border-white/5 pb-4">Notification Preferences</h2>
        {(Object.keys(notif) as (keyof typeof notif)[]).map((key) => (
          <div key={key} className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium text-white/80">
                {key === "newOrders" && "New Orders"}
                {key === "lowStock" && "Low Stock Alerts"}
                {key === "newCustomers" && "New Customer Sign-ups"}
                {key === "weeklyReport" && "Weekly Performance Report"}
              </p>
              <p className="text-xs text-white/30">
                {key === "newOrders" && "Get notified when a new order is placed"}
                {key === "lowStock" && "Alert when product stock is below 5"}
                {key === "newCustomers" && "Notify when a new customer registers"}
                {key === "weeklyReport" && "Receive weekly analytics summary"}
              </p>
            </div>
            <button
              onClick={() => setNotif({ ...notif, [key]: !notif[key] })}
              className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer flex-shrink-0 ${
                notif[key] ? "bg-emerald-500" : "bg-white/10"
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                notif[key] ? "translate-x-5" : "translate-x-0.5"
              }`} />
            </button>
          </div>
        ))}
      </div>

      {/* Danger zone */}
      <div className="bg-[#151820] border border-red-500/20 rounded-2xl p-6 flex flex-col gap-4">
        <h2 className="text-sm font-bold text-red-400 border-b border-red-500/10 pb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">Clear All Orders</p>
            <p className="text-xs text-white/30">Permanently delete all order records</p>
          </div>
          <button className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/10 transition-all cursor-pointer">
            Clear Orders
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">Reset Admin Password</p>
            <p className="text-xs text-white/30">Send a password reset link to your email</p>
          </div>
          <button className="px-4 py-2 rounded-xl border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/10 transition-all cursor-pointer">
            Reset Password
          </button>
        </div>
      </div>
    </div>
  );
}
