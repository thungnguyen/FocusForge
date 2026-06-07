"use client";

import { usePathname } from "next/navigation";
import { Menu, Calendar, Sparkles } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const pathname = usePathname();

  // Standard English page titles
  const getPageTitle = (path: string) => {
    if (path === "/") return "Dashboard";
    if (path.startsWith("/mission")) return "Mission";
    if (path.startsWith("/weeks")) return "Weekly Planner";
    if (path.startsWith("/days")) {
      if (path === "/days") return "Daily Planner";
      return "Daily Planner Details";
    }
    if (path.startsWith("/habits")) return "Habit Tracker";
    if (path.startsWith("/life-score")) return "Life Score";
    if (path.startsWith("/ikigai")) return "Ikigai";
    if (path.startsWith("/analytics")) return "Analytics";
    if (path.startsWith("/settings")) return "Settings";
    return "FocusForge";
  };

  // Vietnamese page subtitles for user-facing guidance
  const getPageSubtitle = (path: string) => {
    if (path === "/") return "Theo dõi các quy tắc Monk Mode hàng ngày và tóm tắt tiến trình thực hiện.";
    if (path.startsWith("/mission")) return "Xác định điểm yếu cốt lõi, thiết lập mục tiêu chính và các quy tắc hàng ngày.";
    if (path.startsWith("/weeks")) return "Ghi chép ý tưởng tự do, thiết lập lời khẳng định tích cực và theo dõi mục tiêu tuần.";
    if (path.startsWith("/days")) return "Thiết lập nhiệm vụ 1-3-5 hàng ngày và phân chia lịch trình thời gian Kaizen.";
    if (path.startsWith("/habits")) return "Ghi nhận chỉ số định lượng hàng ngày và tính toán phần trăm hoàn thành thói quen.";
    if (path.startsWith("/life-score")) return "Đánh giá mức độ cân bằng cuộc sống của bạn trên 10 khía cạnh quan trọng.";
    if (path.startsWith("/ikigai")) return "Suy ngẫm về sự giao thoa giữa đam mê, thế mạnh, nhu cầu xã hội và cơ hội nghề nghiệp.";
    if (path.startsWith("/analytics")) return "Biểu đồ trực quan hóa xu hướng ngủ, cân nặng, thời gian sử dụng màn hình và mức độ tuân thủ.";
    if (path.startsWith("/settings")) return "Cấu hình ngày bắt đầu hành trình Monk Mode và các tùy chọn hồ sơ cá nhân.";
    return "Sổ tay rèn luyện kỷ luật bản thân.";
  };

  const todayDate = new Date().toLocaleDateString("vi-VN", {
    weekday: "long",
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b border-stone-200/80 px-6 py-4 flex items-center justify-between sticky top-0 z-10 shadow-sm">
      {/* Mobile Drawer Trigger & Page Titles */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 -ml-2 rounded-lg text-stone-500 hover:text-stone-700 hover:bg-stone-50 cursor-pointer"
        >
          <Menu size={20} />
        </button>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-stone-900 font-sans leading-none flex items-center gap-1.5">
            {getPageTitle(pathname)}
          </h2>
          <p className="text-xs text-stone-400 mt-1 hidden sm:block">
            {getPageSubtitle(pathname)}
          </p>
        </div>
      </div>

      {/* Date & Cycle Day Pill */}
      <div className="flex items-center gap-3">
        {/* Date block */}
        <div className="hidden md:flex items-center gap-1.5 text-xs text-stone-500 bg-stone-50 border border-stone-200/50 rounded-lg px-3 py-1.5">
          <Calendar size={13} className="text-stone-400" />
          <span className="font-medium">{todayDate}</span>
        </div>

        {/* Cycle Pill */}
        <div className="flex items-center gap-1.5 bg-stone-900 text-stone-50 border border-stone-800 rounded-lg px-3 py-1.5 shadow-sm text-xs font-semibold">
          <Sparkles size={13} className="text-stone-300 animate-pulse" />
          <span>DAY 1 / 60</span>
        </div>
      </div>
    </header>
  );
}
