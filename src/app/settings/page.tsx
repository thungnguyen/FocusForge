"use client";

import React, { useState, useEffect } from "react";
import { Settings as SettingsIcon, Calendar, Palette, FileSpreadsheet, Info, Database, Layers, CheckCircle2 } from "lucide-react";
import SectionCard from "@/components/ui/SectionCard";
import { getSettingsData } from "@/app/actions";

export default function SettingsPage() {
  const [pageTitle, setPageTitle] = useState("Settings");
  const [journeyTitle, setJourneyTitle] = useState("Journey Settings");
  const [themeTitle, setThemeTitle] = useState("Theme");
  const [exportTitle, setExportTitle] = useState("Export Data");
  const [infoTitle, setInfoTitle] = useState("App Information");

  const [selectedTheme, setSelectedTheme] = useState("Brutalist Zen (Warm Sand)");
  const [dbInfo, setDbInfo] = useState("MySQL 8.0");
  const [startDate, setStartDate] = useState("June 07, 2026");
  const [endDate, setEndDate] = useState("Aug 06, 2026");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getSettingsData();
        setStartDate(data.startDate);
        setEndDate(data.endDate);
        setDbInfo(data.dbType);
      } catch (err) {
        console.error("Failed to load settings data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleExportData = () => {
    alert("Đang xuất gói dữ liệu Monk Mode (JSON)... Thành công! (Tính năng mô phỏng sao lưu dữ liệu)");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-stone-500 font-sans text-sm">
        Đang tải thông tin cấu hình...
      </div>
    );
  }

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
        <p className="text-xs text-stone-500 mt-1 font-sans">
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
            <div className="space-y-4 font-sans text-sm">
              <div className="flex items-center justify-between p-3.5 bg-stone-50 border rounded-xl">
                <div className="flex items-center gap-2.5">
                  <Calendar size={16} className="text-stone-500" />
                  <div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Mission Start Date</span>
                    <span className="text-sm font-bold text-stone-850">{startDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-stone-50 border rounded-xl">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-stone-500" />
                  <div>
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Mission End Date</span>
                    <span className="text-sm font-bold text-stone-850">{endDate}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-stone-50 border rounded-xl text-center">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Total Days</span>
                  <span className="text-base font-black text-stone-800">60 Ngày</span>
                </div>
                <div className="p-3 bg-stone-50 border rounded-xl text-center">
                  <span className="text-[10px] text-stone-400 font-bold uppercase block">Total Weeks</span>
                  <span className="text-base font-black text-stone-800">9 Tuần</span>
                </div>
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
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-2 font-sans">
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
                      <span className="text-xs font-bold font-sans">{theme.name}</span>
                      <span className={`text-[10px] font-sans ${selectedTheme === theme.name ? "text-stone-300" : "text-stone-400"}`}>
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
            <div className="space-y-4 font-sans">
              <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-4 flex gap-3 items-start">
                <FileSpreadsheet size={18} className="text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 leading-none">Backup Cycle Data</h4>
                  <p className="text-[10px] text-stone-400 mt-1 leading-normal">
                    Tải xuống tệp lưu trữ chứa toàn bộ nhật ký 60 ngày, kết quả thói quen và điểm số cân bằng cuộc sống dưới dạng tệp JSON để lưu trữ riêng tư.
                  </p>
                </div>
              </div>

              <button
                onClick={handleExportData}
                className="w-full bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              >
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
            <div className="space-y-4 font-sans">
              <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-4 flex gap-3 items-start">
                <Database size={18} className="text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 leading-none">Database Engine</h4>
                  <p className="text-[10px] text-stone-400 mt-1 leading-normal">
                    Động cơ lưu trữ: <span className="font-semibold text-stone-700">{dbInfo}</span>. Kết nối thông qua Prisma Client để bảo toàn dữ liệu đồng bộ cực nhanh.
                  </p>
                </div>
              </div>

              <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-4 flex gap-3 items-start">
                <Info size={18} className="text-stone-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-stone-800 leading-none">FocusForge v1.0</h4>
                  <p className="text-[10px] text-stone-400 mt-1 leading-normal">
                    FocusForge là sản phẩm số hóa cao cấp của cuốn sổ tay Monk Mode 60 ngày. Giao diện được thiết kế tối giản, tập trung sâu, phù hợp cho rèn luyện và theo dõi thói quen cá nhân.
                  </p>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
