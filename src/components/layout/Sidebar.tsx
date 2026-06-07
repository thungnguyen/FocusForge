"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  Calendar,
  CalendarDays,
  CheckSquare,
  Activity,
  Heart,
  HelpCircle,
  TrendingUp,
  Settings,
  X,
  Compass
} from "lucide-react";

interface SidebarProps {
  onClose?: () => void;
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Mission", href: "/mission", icon: Target },
    { name: "Weekly Planner", href: "/weeks", icon: CalendarDays },
    { name: "Daily Planner", href: "/days", icon: CheckSquare },
    { name: "Habit Tracker", href: "/habits", icon: Activity },
    { name: "Life Score", href: "/life-score", icon: Heart },
    { name: "Ikigai", href: "/ikigai", icon: Compass },
    { name: "Analytics", href: "/analytics", icon: TrendingUp },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="h-full flex flex-col bg-white border-r border-stone-200 w-64 text-stone-800">
      {/* Brand Header */}
      <div className="p-6 border-b border-stone-200/60 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-stone-900 flex items-center justify-center text-white font-bold text-lg shadow-md">
            FF
          </div>
          <div>
            <h1 className="font-extrabold text-stone-900 tracking-tight text-lg leading-none">
              FocusForge
            </h1>
            <span className="text-[10px] text-stone-400 font-semibold tracking-widest uppercase">
              Monk Mode Cycle
            </span>
          </div>
        </Link>
        {onClose && (
          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-md text-stone-400 hover:text-stone-600 hover:bg-stone-50"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Cycle Progress Summary in Vietnamese */}
      <div className="px-6 py-5 bg-stone-50/50 border-b border-stone-200/40">
        <div className="flex justify-between items-center text-xs font-semibold text-stone-500 mb-1.5">
          <span>CYCLE DAY 1 / 60</span>
          <span>1.6%</span>
        </div>
        <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
          <div className="bg-stone-900 h-full w-[1.6%] rounded-full"></div>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-medium text-stone-400 mt-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span>Tuần 1, Ngày 1 (Đang diễn ra)</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                isActive
                  ? "bg-stone-900 text-white shadow-md shadow-stone-900/10"
                  : "text-stone-600 hover:bg-stone-100/70 hover:text-stone-900"
              }`}
            >
              <Icon size={18} className={isActive ? "text-white" : "text-stone-400"} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-stone-200/60 text-center">
        <span className="text-[10px] text-stone-400 font-semibold tracking-wider block">
          FOCUSFORGE PORTFOLIO MVP
        </span>
      </div>
    </div>
  );
}
