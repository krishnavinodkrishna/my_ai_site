"use client";

const CUSTOMERS = [
  { id: "USR-001", name: "Priya Sharma", email: "priya@email.com", city: "Mumbai", orders: 5, spent: "₹8,200", joined: "Jan 2026", status: "Active" },
  { id: "USR-002", name: "Rahul Nair", email: "rahul@email.com", city: "Bangalore", orders: 3, spent: "₹5,500", joined: "Feb 2026", status: "Active" },
  { id: "USR-003", name: "Aisha Khan", email: "aisha@email.com", city: "Delhi", orders: 7, spent: "₹12,000", joined: "Dec 2025", status: "Active" },
  { id: "USR-004", name: "Vikram Patel", email: "vikram@email.com", city: "Ahmedabad", orders: 2, spent: "₹3,000", joined: "Mar 2026", status: "Active" },
  { id: "USR-005", name: "Sunita Roy", email: "sunita@email.com", city: "Kolkata", orders: 1, spent: "₹149", joined: "Jul 2026", status: "New" },
  { id: "USR-006", name: "Meera Pillai", email: "meera@email.com", city: "Chennai", orders: 4, spent: "₹6,800", joined: "Apr 2026", status: "Active" },
  { id: "USR-007", name: "Arjun Singh", email: "arjun@email.com", city: "Hyderabad", orders: 6, spent: "₹9,100", joined: "Nov 2025", status: "Active" },
  { id: "USR-008", name: "Kavya Reddy", email: "kavya@email.com", city: "Pune", orders: 2, spent: "₹2,300", joined: "May 2026", status: "Active" },
];

export default function AdminCustomersPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-sm text-white/40 mt-1">{CUSTOMERS.length} registered customers</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-center bg-[#151820] border border-white/5 rounded-xl px-4 py-2">
            <p className="text-lg font-bold text-white">{CUSTOMERS.length}</p>
            <p className="text-[10px] text-white/30">Total</p>
          </div>
          <div className="text-center bg-[#151820] border border-white/5 rounded-xl px-4 py-2">
            <p className="text-lg font-bold text-emerald-400">{CUSTOMERS.filter(c => c.status === "Active").length}</p>
            <p className="text-[10px] text-white/30">Active</p>
          </div>
          <div className="text-center bg-[#151820] border border-white/5 rounded-xl px-4 py-2">
            <p className="text-lg font-bold text-sky-400">{CUSTOMERS.filter(c => c.status === "New").length}</p>
            <p className="text-[10px] text-white/30">New</p>
          </div>
        </div>
      </div>

      <div className="bg-[#151820] border border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {["Customer", "Email", "City", "Orders", "Total Spent", "Joined", "Status"].map((h) => (
                  <th key={h} className="text-left px-6 py-3 text-[10px] font-bold text-white/30 uppercase tracking-widest whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.id} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {c.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{c.name}</p>
                        <p className="text-[10px] text-white/30 font-mono">{c.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs text-white/50">{c.email}</td>
                  <td className="px-6 py-4 text-xs text-white/60">{c.city}</td>
                  <td className="px-6 py-4 text-xs font-bold text-white">{c.orders}</td>
                  <td className="px-6 py-4 text-xs font-bold text-emerald-400">{c.spent}</td>
                  <td className="px-6 py-4 text-xs text-white/40 whitespace-nowrap">{c.joined}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      c.status === "Active" ? "bg-emerald-500/15 text-emerald-400" : "bg-sky-500/15 text-sky-400"
                    }`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
