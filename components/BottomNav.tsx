"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, LogIcon, PetIcon, DiaryIcon, SettingsIcon } from "@/components/Icons";

const navItems = [
  { href: "/", icon: HomeIcon, label: "ホーム" },
  { href: "/log", icon: LogIcon, label: "記録" },
  { href: "/pet", icon: PetIcon, label: "ペット" },
  { href: "/diary", icon: DiaryIcon, label: "日記" },
  { href: "/settings", icon: SettingsIcon, label: "設定" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav">
      <div className="flex justify-around items-center px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-2xl transition-all duration-300 ${
                isActive
                  ? "bg-gradient-to-b from-pink-100 to-purple-100"
                  : "opacity-40 hover:opacity-70"
              }`}
            >
              <div className={`transition-transform duration-300 ${isActive ? "scale-110" : ""}`}>
                <Icon
                  size={22}
                  className={
                    isActive
                      ? "text-pink-400"
                      : "text-gray-500"
                  }
                />
              </div>
              <span
                className={`text-[10px] font-medium transition-all duration-300 ${
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
