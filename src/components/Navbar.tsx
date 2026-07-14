"use client";

import Link from "next/link";
import { NAV, BRAND_NAME } from "@/content";
import { useLead } from "@/lead";

export function Navbar() {
  const { openModal } = useLead();

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-brand-beige/80 border-b border-brand-rose/20">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2 text-2xl font-extrabold tracking-widest text-brand-green">
          {BRAND_NAME}
        </Link>

        {/* Navigation Items */}
        <nav className="hidden md:flex items-center space-x-8">
          {NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="relative text-text-light hover:text-brand-green font-medium text-sm py-2 transition-colors duration-200 group"
            >
              {item.label}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-green transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-6">
          {/* Search Icon */}
          <button className="text-brand-green hover:opacity-80 transition-opacity cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.608 10.608Z" />
            </svg>
          </button>
          
          {/* Account/Profile Icon */}
          <button className="text-brand-green hover:opacity-80 transition-opacity cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
            </svg>
          </button>

          {/* Cart Icon / Open Waitlist */}
          <button onClick={openModal} className="relative text-brand-green hover:opacity-80 transition-opacity cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
            <span className="absolute -top-1.5 -right-1.5 bg-brand-green text-brand-beige text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              2
            </span>
          </button>

          {/* CTA Waitlist */}
          <button
            onClick={openModal}
            className="hidden sm:inline-block px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-brand-green text-brand-beige hover:bg-brand-green-hover transition-colors cursor-pointer"
          >
            Join Waitlist
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
