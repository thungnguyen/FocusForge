"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Award, Clock, Activity, Coffee, Moon, Monitor, Flame, CheckCircle, Trophy, BarChart2 } from "lucide-react";
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
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import SectionCard from "@/components/ui/SectionCard";
import { getAnalyticsData } from "@/app/actions";

export default function Analytics() {
  const [pageTitle, setPageTitle] = useState("Analytics");
  const [habitTrendTitle, setHabitTrendTitle] = useState("Habit Completion Trend");
  const [sleepTrendTitle, setSleepTrendTitle] = useState("Sleep Trend");
  const [screenTimeTrendTitle, setScreenTimeTrendTitle] = useState("Screen Time Trend");
  const [weightTrendTitle, setWeightTrendTitle] = useState("Weight Trend");
  const [completionRateTitle, setCompletionRateTitle] = useState("Daily Completion Rate");
  const [weeklyProgressTitle, setWeeklyProgressTitle] = useState("Weekly Progress");
  
  const [mounted, setMounted] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getAnalyticsData();
        setData(result);
      } catch (err) {
        console.error("Failed to load analytics data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
    setMounted(true);
  }, []);

  const COLORS = ["#1c1917", "#e7e5e4"]; // Dark stone and light stone

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-stone-500 font-sans text-sm">
        Đang tải dữ liệu báo cáo phân tích...
      </div>
    );
  }

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
        <p className="text-xs text-stone-500 mt-1 font-sans">
          Báo cáo thống kê trực quan hóa thói quen và chỉ số thể chất của bạn. Sử dụng các số liệu thực tế này để đánh giá và tối ưu hóa lối sống rèn luyện.
        </p>
      </div>

      {/* Main Stats Cards (Completed Days, Current Streak, Avg Habit, Best Week) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-stone-100 text-stone-800 flex items-center justify-center shrink-0">
            <CheckCircle size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block font-sans">Completed Days</span>
            <span className="text-lg font-black text-stone-900 font-sans">{data?.completedDaysCount || 0} / 60</span>
            <span className="text-[9px] text-stone-400 block font-medium font-sans">Số ngày hoàn thành</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center shrink-0">
            <Flame size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block font-sans">Current Streak</span>
            <span className="text-lg font-black text-stone-900 font-sans">{data?.currentStreak || 0} Ngày</span>
            <span className="text-[9px] text-stone-400 block font-medium font-sans">Chuỗi ngày liên tục</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
            <Award size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block font-sans">Avg Habit Comp</span>
            <span className="text-lg font-black text-stone-900 font-sans">{data?.avgHabitCompletion || 0}%</span>
            <span className="text-[9px] text-stone-400 block font-medium font-sans">Tỷ lệ thói quen TB</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
            <Trophy size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block font-sans">Best Week</span>
            <span className="text-lg font-black text-stone-900 font-sans">{data?.bestWeek || "Week 1"}</span>
            <span className="text-[9px] text-stone-400 block font-medium font-sans">Tuần xuất sắc nhất</span>
          </div>
        </div>
      </div>

      {/* Analytics Summary Stats in Vietnamese descriptions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center shrink-0">
            <Moon size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block font-sans">Avg Sleep Time</span>
            <span className="text-lg font-black text-stone-900 font-sans">{data?.avgSleep || 0}h</span>
            <span className="text-[9px] text-stone-400 block font-medium font-sans">Giờ ngủ trung bình</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-rose-50 text-rose-700 flex items-center justify-center shrink-0">
            <Monitor size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block font-sans">Avg Screen Time</span>
            <span className="text-lg font-black text-stone-900 font-sans">{data?.avgScreen || 0}h</span>
            <span className="text-[9px] text-stone-400 block font-medium font-sans">Thời gian màn hình TB</span>
          </div>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
            <Coffee size={18} />
          </div>
          <div>
            <span className="text-[10px] text-stone-400 font-bold uppercase block font-sans">Avg Water Intake</span>
            <span className="text-lg font-black text-stone-900 font-sans">{data?.avgWater || 0}L</span>
            <span className="text-[9px] text-stone-400 block font-medium font-sans">Lượng nước uống TB</span>
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
                <AreaChart data={data?.habitTrendData || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400 font-sans">
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
                <BarChart data={data?.habitTrendData || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400 font-sans">
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
                <LineChart data={data?.habitTrendData || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400 font-sans">
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
                <LineChart data={data?.habitTrendData || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
                  <XAxis dataKey="name" tick={{ fontSize: 10, fill: "#78716c" }} />
                  <YAxis domain={["dataMin - 1", "dataMax + 1"]} tick={{ fontSize: 10, fill: "#78716c" }} />
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
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400 font-sans">
              Đang tải biểu đồ...
            </div>
          )}
        </SectionCard>

        {/* Daily Completion Rate Pie Chart */}
        <SectionCard
          title={completionRateTitle}
          onTitleChange={setCompletionRateTitle}
          subtitle="Tỷ lệ hoàn thành tổng quan 60 ngày của hành trình Monk Mode."
        >
          {mounted ? (
            <div className="w-full h-[240px] flex items-center justify-center gap-6">
              <div className="w-[180px] h-[180px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={data?.dailyCompletionRateData || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={75}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {(data?.dailyCompletionRateData || []).map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ fontSize: "11px", borderRadius: "8px", border: "1px solid #e7e5e4" }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col gap-2 font-sans text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-stone-900"></div>
                  <span className="font-semibold text-stone-700">Completed: {data?.completedDaysCount || 0} days</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3.5 h-3.5 rounded bg-stone-200"></div>
                  <span className="font-semibold text-stone-500">Remaining: {60 - (data?.completedDaysCount || 0)} days</span>
                </div>
                <div className="h-[1px] bg-stone-200 my-1"></div>
                <div className="text-[11px] font-bold text-stone-850">
                  Rate: {Math.round(((data?.completedDaysCount || 0) / 60) * 100)}%
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400 font-sans">
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
                <BarChart data={data?.weeklyProgressData || []} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
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
            <div className="h-[240px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400 font-sans">
              Đang tải biểu đồ...
            </div>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
