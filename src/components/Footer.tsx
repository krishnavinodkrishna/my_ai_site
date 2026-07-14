"use client";

import Link from "next/link";
import { FOOTER, BRAND_NAME } from "@/content";

export function Footer() {
  return (
    <footer className="bg-brand-green text-brand-beige border-t border-brand-green-hover py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-5 gap-12 mb-12">
        {/* Brand Info */}
        <div className="col-span-2 flex flex-col items-start pr-6">
          <Link href="/" className="text-2xl font-extrabold tracking-widest text-white mb-4">
            {BRAND_NAME}
          </Link>
          <p className="text-xs text-brand-rose opacity-80 leading-relaxed max-w-sm mb-6">
            Elevating your daily style with premium fashion, luxury timepieces, designer bags, and curated accessories. 
          </p>
        </div>

        {/* Column 1: Shop */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-xs text-brand-rose/85">
            <li><Link href="/shop/women" className="hover:text-white transition-colors">Women</Link></li>
            <li><Link href="/shop/men" className="hover:text-white transition-colors">Men</Link></li>
            <li><Link href="/shop/watches" className="hover:text-white transition-colors">Watches</Link></li>
            <li><Link href="/shop/bags" className="hover:text-white transition-colors">Bags</Link></li>
            <li><Link href="/shop/accessories" className="hover:text-white transition-colors">Accessories</Link></li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Company</h4>
          <ul className="space-y-2 text-xs text-brand-rose/85">
            <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Column 3: Customer Service */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-white mb-4">Customer Service</h4>
          <ul className="space-y-2 text-xs text-brand-rose/85">
            <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Shipping</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
            <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 text-[10px] text-brand-rose/65">
        <p>{FOOTER.copyright}</p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-white transition-colors">Facebook</a>
          <a href="#" className="hover:text-white transition-colors">Instagram</a>
          <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
          <a href="#" className="hover:text-white transition-colors">YouTube</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
