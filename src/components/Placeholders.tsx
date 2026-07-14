// Stylized premium SVG assets
export function HandbagSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ecd5ce" />
          <stop offset="100%" stopColor="#c5a89f" />
        </linearGradient>
      </defs>
      <rect x="25" y="35" width="50" height="40" rx="8" fill="url(#bagGrad)" />
      <path d="M35 35 V25 C35 15, 65 15, 65 25 V35" stroke="#7c6055" strokeWidth="4" strokeLinecap="round" />
      <rect x="44" y="50" width="12" height="10" rx="2" fill="#7c6055" />
      <circle cx="50" cy="55" r="2" fill="#fff" />
    </svg>
  );
}

export function WatchSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="watchGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect x="44" y="10" width="12" height="80" rx="2" fill="url(#watchGrad)" />
      <circle cx="50" cy="50" r="24" fill="url(#goldGrad)" stroke="#1e293b" strokeWidth="2" />
      <circle cx="50" cy="50" r="18" fill="#fff" />
      <line x1="50" y1="50" x2="50" y2="38" stroke="#1e293b" strokeWidth="2" strokeLinecap="round" />
      <line x1="50" y1="50" x2="62" y2="50" stroke="#1e293b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function DressSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="dressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fb7185" />
          <stop offset="100%" stopColor="#e11d48" />
        </linearGradient>
      </defs>
      <path d="M35 15 L45 22 L35 50 L25 85 L75 85 L65 50 L55 22 L65 15 Z" fill="url(#dressGrad)" />
      <path d="M35 15 C40 22, 60 22, 65 15" stroke="#fff" strokeWidth="2" fill="none" />
      <path d="M45 22 C48 30, 52 30, 55 22" stroke="#fff" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

export function SneakersSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="shoeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4f4f5" />
          <stop offset="100%" stopColor="#d4d4d8" />
        </linearGradient>
      </defs>
      <path d="M15 65 L30 40 L55 35 L85 52 L85 70 L15 70 Z" fill="url(#shoeGrad)" />
      <path d="M15 70 H85 L85 74 H15 Z" fill="#71717a" />
      <path d="M40 38 L44 48 M45 37 L49 47" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function AccessoriesSVG({ className = "w-full h-full" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="accGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>
      </defs>
      <circle cx="35" cy="50" r="14" stroke="url(#accGrad)" strokeWidth="5" fill="none" />
      <circle cx="65" cy="50" r="14" stroke="url(#accGrad)" strokeWidth="5" fill="none" />
      <path d="M35 36 H65" stroke="url(#accGrad)" strokeWidth="3" />
    </svg>
  );
}

export function ImagePlaceholder({ type, className = "w-full h-full" }: { type: string; className?: string }) {
  switch (type.toLowerCase()) {
    case "handbag":
    case "bags":
    case "bag":
    case "backpack":
    case "leather handbag":
    case "premium leather handbag":
    case "designer handbags":
    case "leather backpack":
    case "leather wallets":
      return <HandbagSVG className={className} />;
    case "watches":
    case "watch":
    case "luxury wrist watch":
    case "smart watch":
    case "analog watches":
      return <WatchSVG className={className} />;
    case "women":
    case "dress":
    case "floral dress":
    case "women's floral dress":
    case "party dress":
    case "women's party dress":
    case "maxi dresses":
      return <DressSVG className={className} />;
    case "footwear":
    case "sneakers":
    case "white sneakers":
    case "casual sneakers":
      return <SneakersSVG className={className} />;
    case "accessories":
    case "sunglasses":
    case "gold earrings":
    case "earrings":
    case "perfumes":
      return <AccessoriesSVG className={className} />;
    default:
      return (
        <div className={`bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center ${className}`}>
          <span className="text-zinc-600 text-xs font-semibold uppercase tracking-wider">{type}</span>
        </div>
      );
  }
}
