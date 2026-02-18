"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", icon: "🏠", label: "ホーム" },
  { href: "/log", icon: "📝", label: "記録" },
  { href: "/diary", icon: "📖", label: "日記" },
  { href: "/premium", icon: "👑", label: "プレミアム" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <div className="flex justify-around items-center px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-b from-pink-100 to-purple-100"
                  : "opacity-50 hover:opacity-80"
              }`}
            >
              <span className={`text-2xl transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                {item.icon}
              </span>
              <span
                className={`text-xs font-medium transition-all duration-300 ${
                  isActive
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 font-bold"
                    : "text-gray-400"
                }`}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
