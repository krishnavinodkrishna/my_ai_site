export interface NavItem {
  label: string;
  href: string;
}

export interface HeroContent {
  smallHeading: string;
  mainHeading: string;
  description: string;
  primaryCtaText: string;
  secondaryCtaText: string;
}

export interface ValuePropItem {
  title: string;
  description: string;
  icon: string;
}

export interface CategoryItem {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  href: string;
  itemCount: string;
}

export interface FeaturedOfferContent {
  title: string;
  discount: string;
  description: string;
  ctaText: string;
}

export interface ProductItem {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  description?: string;
  rating?: number;
  gallery?: string[];
}

export interface ReviewItem {
  stars: number;
  author: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hours: string;
}

export const NAV: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "FAQ", href: "/faq" }
];

export const BRAND_NAME = "MAX";
export const TAGLINE = "Style That Defines You";

export const HERO: HeroContent = {
  smallHeading: "NEW SEASON COLLECTION",
  mainHeading: "Discover Your Perfect Style. Shop Fashion Effortlessly.",
  description: "Explore premium fashion, luxury watches, handbags, footwear, accessories, and more. Quality products delivered straight to your doorstep.",
  primaryCtaText: "Shop Now",
  secondaryCtaText: "Explore Collection"
};

export const VALUE_PROPS: ValuePropItem[] = [
  {
    title: "Free Shipping",
    description: "Free delivery on orders above $75.",
    icon: "🚚"
  },
  {
    title: "Secure Payment",
    description: "100% safe and encrypted payment.",
    icon: "🔒"
  },
  {
    title: "Easy Returns",
    description: "30-day hassle-free returns.",
    icon: "↩️"
  },
  {
    title: "Premium Quality",
    description: "Handpicked products from trusted brands.",
    icon: "⭐"
  }
];

export const CATEGORIES: CategoryItem[] = [
  {
    id: "women",
    name: "Women",
    description: "Elegant dresses, tops, jeans, handbags, heels, and accessories.",
    imageUrl: "/images/categories/women.jpg",
    href: "/shop/women",
    itemCount: "120+ items"
  },
  {
    id: "men",
    name: "Men",
    description: "Shirts, t-shirts, jeans, jackets, watches, and footwear.",
    imageUrl: "/images/categories/men.jpg",
    href: "/shop/men",
    itemCount: "98+ items"
  },
  {
    id: "watches",
    name: "Watches",
    description: "Luxury, sports, smart, and classic watches for every occasion.",
    imageUrl: "/images/categories/watches.jpg",
    href: "/shop/watches",
    itemCount: "85+ items"
  },
  {
    id: "footwear",
    name: "Footwear",
    description: "Sneakers, formal shoes, sandals, heels, and boots.",
    imageUrl: "/images/categories/footwear.jpg",
    href: "/shop/footwear",
    itemCount: "70+ items"
  },
  {
    id: "bags",
    name: "Bags",
    description: "Handbags, backpacks, wallets, travel bags, and crossbody bags.",
    imageUrl: "/images/categories/bags.jpg",
    href: "/shop/bags",
    itemCount: "60+ items"
  },
  {
    id: "accessories",
    name: "Accessories",
    description: "Jewelry, sunglasses, belts, perfumes, and caps.",
    imageUrl: "/images/categories/accessories.jpg",
    href: "/shop/accessories",
    itemCount: "50+ items"
  }
];

export const FEATURED_OFFER: FeaturedOfferContent = {
  title: "Summer Fashion Sale",
  discount: "Up To 50% OFF",
  description: "Refresh your wardrobe with the latest fashion trends.",
  ctaText: "Shop Deals"
};

export const NEW_ARRIVALS: ProductItem[] = [
  {
    id: "new-1",
    title: "Women's Floral Dress",
    price: "₹500",
    imageUrl: "/images/floral-dress.jpg",
    description: "Elegant floral dress perfect for every occasion. Crafted with premium fabric for a graceful, feminine look.",
    gallery: [
      "/images/floral-dress.jpg",
      "/images/floral-dress-2.jpg",
      "/images/floral-dress-3.jpg",
      "/images/floral-dress-4.jpg",
      "/images/floral-dress-5.jpg",
      "/images/floral-dress-6.jpg"
    ]
  },
  {
    id: "new-2",
    title: "Premium Leather Handbag",
    price: "₹2,000",
    imageUrl: "/images/leather-handbag.jpg"
  },
  {
    id: "new-3",
    title: "Luxury Wrist Watch",
    price: "$179",
    imageUrl: "/images/products/luxury-watch.jpg"
  },
  {
    id: "new-4",
    title: "White Sneakers",
    price: "$89",
    imageUrl: "/images/products/white-sneakers.jpg"
  },
  {
    id: "new-5",
    title: "Sunglasses",
    price: "$49",
    imageUrl: "/images/products/sunglasses.jpg"
  },
  {
    id: "new-6",
    title: "Gold Earrings",
    price: "$39",
    imageUrl: "/images/products/gold-earrings.jpg"
  }
];

export const TRENDING_PRODUCTS = [
  "Maxi Dresses",
  "Oversized Shirts",
  "Analog Watches",
  "Designer Handbags",
  "Casual Sneakers",
  "Hoodies",
  "Leather Wallets",
  "Perfumes"
];

export const BEST_SELLERS: ProductItem[] = [
  {
    id: "best-1",
    title: "Women's Party Dress",
    price: "₹1,500",
    imageUrl: "/images/party-dress.jpg",
    description: "Premium quality evening dress."
  },
  {
    id: "best-2",
    title: "Men's Formal Shirt",
    price: "$49",
    imageUrl: "/images/products/formal-shirt.jpg",
    description: "Perfect for office and casual wear."
  },
  {
    id: "best-3",
    title: "Smart Watch",
    price: "$149",
    imageUrl: "/images/products/smart-watch.jpg",
    description: "Track fitness and stay connected."
  },
  {
    id: "best-4",
    title: "Leather Backpack",
    price: "₹3,000",
    imageUrl: "/images/leather-backpack.jpg",
    description: "Designed for style and comfort."
  }
];

export const REVIEWS: ReviewItem[] = [
  {
    stars: 5,
    author: "Priya Sharma",
    content: '"The quality is amazing. Delivery was fast and the dress looks exactly like the pictures."'
  },
  {
    stars: 5,
    author: "Rahul Nair",
    content: '"Bought a watch from MAX. Excellent quality and premium packaging."'
  },
  {
    stars: 5,
    author: "Aisha Khan",
    content: '"Great collection and affordable prices. Highly recommended."'
  }
];

export const ABOUT_CONTENT = {
  title: "About MAX",
  intro: "MAX is a modern fashion destination offering premium clothing, luxury watches, handbags, footwear, and accessories for men and women.",
  missionStatement: "Our mission is to make shopping simple, stylish, and affordable while delivering exceptional customer service.",
  visionTitle: "Our Vision",
  visionText: "To become one of the world's most trusted online fashion brands.",
  missionTitle: "Our Mission",
  missionText: "Deliver premium products at affordable prices with fast and secure shopping."
};

export const FILTERS = {
  categories: ["Women", "Men", "Watches", "Bags", "Shoes", "Accessories"],
  brands: ["MAX Premium", "Aura", "Chronos", "UrbanWear", "Vogue"],
  prices: ["Under $50", "$50 - $100", "$100 - $200", "Over $200"],
  colors: ["Black", "White", "Beige", "Brown", "Blue", "Gold"],
  sizes: ["XS", "S", "M", "L", "XL", "Free Size"],
  ratings: ["5 Stars", "4 Stars & Up", "3 Stars & Up"]
};

export const COLLECTION_PAGES = {
  women: {
    title: "Women's Collection",
    description: "Fashion for Every Occasion. Discover dresses, tops, skirts, jeans, handbags, heels, and accessories designed to make every woman feel confident and stylish."
  },
  men: {
    title: "Men's Collection",
    description: "Upgrade your wardrobe with premium shirts, t-shirts, jackets, trousers, shoes, belts, and accessories."
  },
  watches: {
    title: "Watches Collection",
    description: "Timeless Elegance. Explore luxury, smart, sports, and classic watches from leading brands.",
    subcategories: ["Smart Watches", "Analog Watches", "Digital Watches", "Luxury Watches"]
  },
  bags: {
    title: "Bags Collection",
    description: "Choose from our stylish collection of Handbags, Tote Bags, Backpacks, Crossbody Bags, Wallets, and Travel Bags."
  },
  accessories: {
    title: "Accessories Collection",
    description: "Complete your look with Necklaces, Rings, Earrings, Bracelets, Sunglasses, Belts, Caps, and Perfumes."
  }
};

export const CONTACT_INFO: ContactInfo = {
  address: "MAX Fashion Store, New York, USA",
  phone: "+1 234 567 890",
  email: "support@maxfashion.com",
  hours: "Monday – Saturday: 9:00 AM – 8:00 PM"
};

export const FAQS: FAQItem[] = [
  {
    question: "How long does shipping take?",
    answer: "Orders are delivered within 3–7 business days."
  },
  {
    question: "Can I return a product?",
    answer: "Yes, we offer a 30-day return policy."
  },
  {
    question: "Is online payment secure?",
    answer: "Yes, all payments are protected with advanced encryption."
  },
  {
    question: "Do you offer Cash on Delivery?",
    answer: "Yes, COD is available in selected locations."
  }
];

export const FOOTER = {
  copyright: "© 2026 MAX. All Rights Reserved."
};
