"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: "⊞" },
  { href: "/admin/products", label: "Products", icon: "🛍️" },
  { href: "/admin/orders", label: "Orders", icon: "📦" },
  { href: "/admin/leads", label: "Leads", icon: "📋" },
  { href: "/admin/customers", label: "Customers", icon: "👥" },
  { href: "/admin/analytics", label: "Analytics", icon: "📊" },
  { href: "/admin/settings", label: "Settings", icon: "⚙️" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [authed, setAuthed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const ok = sessionStorage.getItem("admin_authed");
    if (ok === "true") {
      setAuthed(true);
    }
    setLoading(false);
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("admin_authed");
    router.push("/admin/login");
  }

  if (loading) return null;

  if (!authed && pathname !== "/admin/login") {
    if (typeof window !== "undefined") router.replace("/admin/login");
    return null;
  }

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="flex min-h-screen bg-[#0f1117] text-white font-sans">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-16"
        } bg-[#151820] border-r border-white/5 flex flex-col`}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-white/5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center font-bold text-sm flex-shrink-0">
            M
          </div>
          {sidebarOpen && (
            <div>
              <p className="font-bold text-sm leading-tight">MAX Admin</p>
              <p className="text-[10px] text-white/40">Fashion Store</p>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 mx-2 rounded-xl mb-0.5 text-sm font-medium transition-all duration-200 group ${
                  active
                    ? "bg-emerald-500/15 text-emerald-400"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-base flex-shrink-0">{item.icon}</span>
                {sidebarOpen && <span>{item.label}</span>}
                {active && sidebarOpen && (
                  <span className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom */}
        <div className="border-t border-white/5 p-3">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 px-2 py-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold flex-shrink-0">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold truncate">Admin</p>
                <p className="text-[10px] text-white/40 truncate">admin@maxfashion.com</p>
              </div>
              <button onClick={handleLogout} className="text-white/30 hover:text-red-400 transition-colors cursor-pointer text-lg" title="Logout">
                ⏻
              </button>
            </div>
          ) : (
            <button onClick={handleLogout} className="w-full flex justify-center py-2 text-white/30 hover:text-red-400 transition-colors cursor-pointer" title="Logout">
              ⏻
            </button>
          )}
        </div>
      </aside>

      {/* Main */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-16"}`}>
        {/* Topbar */}
        <header className="sticky top-0 z-20 flex items-center gap-4 px-6 py-4 bg-[#0f1117]/80 backdrop-blur border-b border-white/5">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all cursor-pointer text-sm"
          >
            ☰
          </button>
          <div className="flex-1" />
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-white/40 hover:text-white transition-colors bg-white/5 px-3 py-1.5 rounded-lg"
          >
            🔗 View Site
          </Link>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-xs font-bold">
            A
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
