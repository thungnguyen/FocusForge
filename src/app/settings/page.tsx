"use client";

import React, { useState } from "react";
import { Settings as SettingsIcon, Calendar, Palette, FileSpreadsheet, AlertOctagon, HelpCircle, HardDriveDownload, Info } from "lucide-react";
import SectionCard from "@/components/ui/SectionCard";

export default function SettingsPage() {
  const [pageTitle, setPageTitle] = useState("Settings");
  const [journeyTitle, setJourneyTitle] = useState("Journey Settings");
  const [themeTitle, setThemeTitle] = useState("Theme");
  const [exportTitle, setExportTitle] = useState("Export Data");
  const [infoTitle, setInfoTitle] = useState("App Information");

  const [startDate, setStartDate] = useState("2026-06-07");
  const [selectedTheme, setSelectedTheme] = useState("Brutalist Zen (Warm Sand)");
  const [userName, setUserName] = useState("Portfolio Developer");

  const handleExportData = () => {
    alert("Đang xuất gói dữ liệu Monk Mode (JSON)... Thành công!");
  };

  const handleResetData = () => {
    if (
      confirm(
        "Bạn có chắc chắn muốn đặt lại chu kỳ Monk Mode 60 ngày? Toàn bộ nhật ký thói quen giả lập sẽ bị làm trống."
      )
    ) {
      alert("Đã khôi phục dữ liệu chu kỳ về mặc định.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-workbook">
        <div className="flex items-center gap-2">
          <SettingsIcon size={18} className="text-stone-700" />
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            className="text-base font-bold text-stone-800 font-sans bg-transparent border-none outline-none focus:bg-stone-100 rounded px-1 -ml-1 transition-colors w-full max-w-xs"
            title="Nhấp vào đây để đổi tiêu đề trang"
          />
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Cấu hình các tham số và tùy chọn hiển thị cho chu kỳ Monk Mode của bạn. Tất cả thay đổi được lưu trữ cục bộ.
        </p>
      </div>

      {/* Main Configurations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Journey Settings & Theme */}
        <div className="space-y-6">
          {/* Journey Settings */}
          <SectionCard 
            title={journeyTitle}
            onTitleChange={setJourneyTitle}
            subtitle="Cấu hình ngày bắt đầu hành trình Monk Mode và thông tin cá nhân."
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Tên hiển thị (User Profile Title)
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-stone-50/50 border border-stone-200 rounded-lg p-2.5 text-sm text-stone-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-400 font-handwriting"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1">
                  Ngày bắt đầu chu kỳ (Start Date)
                </label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-lg p-2.5 text-xs text-stone-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-400 font-sans font-semibold"
                  />
                </div>
                <p className="text-[10px] text-stone-400 mt-1.5 font-medium">
                  Thay đổi ngày bắt đầu sẽ tự động căn chỉnh khoảng thời gian hiển thị ở các trang lịch tuần và kế hoạch hàng ngày.
                </p>
              </div>
            </div>
          </SectionCard>

          {/* Theme */}
          <SectionCard 
            title={themeTitle}
            onTitleChange={setThemeTitle}
            subtitle="Chọn giao diện hiển thị cho cuốn sổ tay rèn luyện."
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2">
                  Tông màu chủ đạo (Color Preset)
                </label>
                <div className="space-y-2">
                  {[
                    { name: "Brutalist Zen (Warm Sand)", desc: "Tông màu cát đá ấm áp, phong cách sổ tay giấy Moleskine tối giản (Đang chọn)" },
                    { name: "Minimalist Slate (Neutral Gray)", desc: "Xám đá trung tính kết hợp đường nét Brutalist kẻ viền mảnh" },
                    { name: "Deep Charcoal (Dark Mode)", desc: "Chế độ nền tối ngọc thạch giảm mỏi mắt khi sử dụng ban đêm (Chưa kích hoạt)" },
                  ].map((theme) => (
                    <button
                      key={theme.name}
                      type="button"
                      onClick={() => setSelectedTheme(theme.name)}
                      className={`w-full text-left p-3 rounded-xl border flex flex-col justify-center transition-all cursor-pointer ${
                        selectedTheme === theme.name
                          ? "bg-stone-900 border-stone-900 text-stone-50 shadow-sm"
                          : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <span className="text-xs font-bold">{theme.name}</span>
                      <span className={`text-[10px] ${selectedTheme === theme.name ? "text-stone-300" : "text-stone-400"}`}>
                        {theme.desc}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right Column: Export Data & App Info */}
        <div className="space-y-6">
          {/* Export Data */}
          <SectionCard 
            title={exportTitle}
            onTitleChange={setExportTitle}
            subtitle="Sao lưu và xuất dữ liệu lịch sử rèn luyện Monk Mode."
          >
            <div className="space-y-4">
              <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-4 flex gap-3 items-start">
                <FileSpreadsheet size={18} className="text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 leading-none">Backup Cycle</h4>
                  <p className="text-[10px] text-stone-400 mt-1 leading-normal">
                    Tải xuống tệp lưu trữ chứa toàn bộ nhật ký 60 ngày, kết quả thói quen và điểm số cân bằng cuộc sống dưới dạng tệp JSON để lưu trữ riêng tư.
                  </p>
                </div>
              </div>

              <button
                onClick={handleExportData}
                className="w-full bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
                <HardDriveDownload size={14} />
                Export JSON Package
              </button>
            </div>
          </SectionCard>

          {/* App Information */}
          <SectionCard 
            title={infoTitle}
            onTitleChange={setInfoTitle}
            subtitle="Thông tin ứng dụng rèn luyện FocusForge."
          >
            <div className="space-y-4">
              <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-4 flex gap-3 items-start">
                <Info size={18} className="text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 leading-none">FocusForge MVP</h4>
                  <p className="text-[10px] text-stone-400 mt-1 leading-normal">
                    FocusForge là sản phẩm số hóa cao cấp của cuốn sổ tay Monk Mode 60 ngày. Giao diện được thiết kế tối giản, tập trung sâu, phù hợp cho rèn luyện và theo dõi thói quen cá nhân.
                  </p>
                </div>
              </div>

              {/* Reset triggers */}
              <div className="bg-rose-50 border border-rose-100 rounded-xl p-4 flex gap-3 items-start">
                <AlertOctagon size={18} className="text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-rose-800 leading-none">Reset All Data</h4>
                  <p className="text-[10px] text-rose-500 mt-1 leading-normal">
                    Lưu ý: Hành động này sẽ xóa hoàn toàn tất cả nhật ký, tích chọn và thiết lập. Dữ liệu sẽ khôi phục về trạng thái ban đầu của chu kỳ.
                  </p>
                </div>
              </div>

              <button
                onClick={handleResetData}
                className="w-full bg-white hover:bg-rose-50 text-rose-700 border border-rose-200 rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm transition-colors"
              >
                Reset Journey Data
              </button>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
