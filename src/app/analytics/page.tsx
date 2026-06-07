"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Award, Clock, Activity, Coffee, Moon, Monitor, Weight } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  Legend
} from "recharts";
import StatCard from "@/components/ui/StatCard";
import SectionCard from "@/components/ui/SectionCard";
import { HABITS_CHART_DATA, WEEKS_DATA } from "@/lib/mock-data";

export default function Analytics() {
  const [pageTitle, setPageTitle] = useState("Analytics");
  const [habitTrendTitle, setHabitTrendTitle] = useState("Habit Completion Trend");
  const [sleepTrendTitle, setSleepTrendTitle] = useState("Sleep Trend");
  const [screenTimeTrendTitle, setScreenTimeTrendTitle] = useState("Screen Time Trend");
  const [weightTrendTitle, setWeightTrendTitle] = useState("Weight Trend");
  const [weeklyProgressTitle, setWeeklyProgressTitle] = useState("Weekly Progress");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Map habits data to include weight values
  const habitsData = HABITS_CHART_DATA.map((d, idx) => ({
    ...d,
    weight: 78.5 - (idx * 0.12), // downward weight trend simulation
  }));

  // Week progress data
  const weeklyProgressData = WEEKS_DATA.map((w) => ({
    name: `W${w.number}`,
    "Progress": w.progress,
  }));

  return (
    <div className="space-y-6">
      {/* Intro section */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-workbook">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-stone-700" />
          <input
            type="text"
            value={pageTitle}
            onChange={(e) => setPageTitle(e.target.value)}
            className="text-base font-bold text-stone-800 font-sans bg-transparent border-none outline-none focus:bg-stone-100 rounded px-1 -ml-1 transition-colors w-full max-w-xs"
            title="Nhấp vào đây để đổi tiêu đề trang"
          />
        </div>
        <p className="text-xs text-stone-500 mt-1">
          Báo cáo thống kê trực quan hóa thói quen và chỉ số thể chất của bạn. Sử dụng các số liệu thực tế này để đánh giá và tối ưu hóa lối sống rèn luyện.
        </p>
      </div>

      {/* Analytics Summary Stats in Vietnamese descriptions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Award size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Avg Compliance</span>
            <span className="text-lg font-bold text-stone-900">82.1%</span>
            <span className="text-[9px] text-stone-400 block font-medium">Hoàn thành thói quen</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
            <Moon size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Avg Sleep Time</span>
            <span className="text-lg font-bold text-stone-900">7.56h</span>
            <span className="text-[9px] text-stone-400 block font-medium">Giờ ngủ trung bình</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center">
            <Monitor size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Avg Screen Time</span>
            <span className="text-lg font-bold text-stone-900">1.75h</span>
            <span className="text-[9px] text-stone-400 block font-medium">Thời gian màn hình TB</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-cyan-50 text-cyan-700 flex items-center justify-center">
            <Coffee size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block">Avg Water Intake</span>
            <span className="text-lg font-bold text-stone-900">3.04L</span>
            <span className="text-[9px] text-stone-400 block font-medium">Lượng nước uống TB</span>
          </div>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Habit Completion Trend */}
        <SectionCard
          title={habitTrendTitle}
          onTitleChange={setHabitTrendTitle}
          subtitle="Biểu đồ tỷ lệ hoàn thành thói quen (%) theo ngày của chu kỳ rèn luyện."
        >
          {mounted ? (
            <div className="w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={habitsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1c1917" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#1c1917" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#78716c" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#78716c" }} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e7e5e4" }} />
                  <Area
                    type="monotone"
                    dataKey="completion"
                    name="Completion (%)"
                    stroke="#1c1917"
                    strokeWidth={2}
                    fillOpacity={1}
                    fill="url(#colorComp)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400">
              Đang tải biểu đồ...
            </div>
          )}
        </SectionCard>

        {/* Sleep Trend */}
        <SectionCard
          title={sleepTrendTitle}
          onTitleChange={setSleepTrendTitle}
          subtitle="Thời lượng giấc ngủ ghi nhận mỗi tối (Mục tiêu tối thiểu duy trì 7.5h)."
        >
          {mounted ? (
            <div className="w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={habitsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#78716c" }} />
                  <YAxis domain={[0, 10]} tick={{ fontSize: 10, fill: "#78716c" }} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e7e5e4" }} />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Bar dataKey="sleep" name="Sleep (h)" fill="#818cf8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400">
              Đang tải biểu đồ...
            </div>
          )}
        </SectionCard>

        {/* Screen Time Trend */}
        <SectionCard
          title={screenTimeTrendTitle}
          onTitleChange={setScreenTimeTrendTitle}
          subtitle="Thời lượng sử dụng thiết bị màn hình (Mục tiêu giới hạn dưới 2.0h mỗi ngày)."
        >
          {mounted ? (
            <div className="w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={habitsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#78716c" }} />
                  <YAxis domain={[0, 5]} tick={{ fontSize: 10, fill: "#78716c" }} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e7e5e4" }} />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Line
                    type="monotone"
                    dataKey="screenTime"
                    name="Screen Time (h)"
                    stroke="#fda4af"
                    strokeWidth={2.5}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400">
              Đang tải biểu đồ...
            </div>
          )}
        </SectionCard>

        {/* Weight Trend */}
        <SectionCard
          title={weightTrendTitle}
          onTitleChange={setWeightTrendTitle}
          subtitle="Theo dõi chỉ số cân nặng cơ thể (kg) ghi nhận theo ngày để duy trì thể trạng."
        >
          {mounted ? (
            <div className="w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={habitsData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#78716c" }} />
                  <YAxis domain={[75, 80]} tick={{ fontSize: 10, fill: "#78716c" }} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e7e5e4" }} />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    name="Weight (kg)"
                    stroke="#2dd4bf"
                    strokeWidth={2}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400">
              Đang tải biểu đồ...
            </div>
          )}
        </SectionCard>

        {/* Weekly Progress */}
        <SectionCard
          title={weeklyProgressTitle}
          onTitleChange={setWeeklyProgressTitle}
          subtitle="Tiến độ hoàn thành các cam kết và mục tiêu lớn đề ra cho từng tuần trong chu kỳ."
        >
          {mounted ? (
            <div className="w-full h-[240px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyProgressData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#78716c" }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 10, fill: "#78716c" }} />
                  <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e7e5e4" }} />
                  <Legend wrapperStyle={{ fontSize: "10px" }} />
                  <Bar dataKey="Progress" name="Progress (%)" fill="#1c1917" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400">
              Đang tải biểu đồ...
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
