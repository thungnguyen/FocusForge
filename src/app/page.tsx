"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  CheckCircle,
  Calendar,
  Target,
  ArrowRight,
  TrendingUp,
  Activity,
  Compass,
  FileText,
  HelpCircle,
  CheckSquare,
  Square
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import SectionCard from "@/components/ui/SectionCard";
import { MONK_RULES, RECENT_REFLECTIONS } from "@/lib/mock-data";

export default function Dashboard() {
  // Section titles editable states
  const [protocolsTitle, setProtocolsTitle] = useState("Daily Protocols");
  const [prioritiesTitle, setPrioritiesTitle] = useState("Today's Priorities");
  const [weeklySummaryTitle, setWeeklySummaryTitle] = useState("Weekly Summary");
  const [reflectionsTitle, setReflectionsTitle] = useState("Recent Reflections");
  const [navigationTitle, setNavigationTitle] = useState("Workbook Quick Navigation");

  // Today's rules completion state
  const [habits, setHabits] = useState([
    { id: 1, name: "Screen Time Control", target: "< 2 hours", completed: true },
    { id: 2, name: "Water Intake", target: "3 Liters", completed: false },
    { id: 3, name: "Sleep Hours", target: "7.5+ hours", completed: true },
    { id: 4, name: "Daily Exercise", target: "30+ mins", completed: false },
    { id: 5, name: "Coding Practice", target: "1+ hours", completed: true },
    { id: 6, name: "No Social Media", target: "Except for work", completed: true },
  ]);

  const toggleHabit = (id: number) => {
    setHabits((prev) =>
      prev.map((h) => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
  };

  const completedCount = habits.filter((h) => h.completed).length;
  const habitCompletionPercent = Math.round((completedCount / habits.length) * 100);

  // Today's 1-3-5 checklist state
  const [tasks, setTasks] = useState([
    { id: "t1", text: "Xây dựng các trang giao diện chính FocusForge và khung điều hướng", type: "MIT", completed: true },
    { id: "t2", text: "Tạo cấu trúc tệp dữ liệu giả lập mock-data", type: "Priority", completed: true },
    { id: "t3", text: "Thiết kế thanh điều hướng Sidebar và Header của AppShell", type: "Priority", completed: true },
    { id: "t4", text: "Thiết lập các mẫu layout responsive cho tất cả các trang", type: "Priority", completed: false },
    { id: "t5", text: "Cấu hình màu sắc và kiểu dáng Tailwind toàn cục", type: "Minor", completed: true },
    { id: "t6", text: "Thêm các biểu tượng lucide cho các tab menu", type: "Minor", completed: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-stone-900 text-stone-100 p-6 rounded-2xl border-stone-800 shadow-workbook-lg">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans">
            FocusForge
          </h1>
          <p className="text-stone-400 text-sm mt-1 max-w-xl">
            Chào mừng bạn đến với FocusForge. Bạn đang ở ngày đầu tiên của chu kỳ Monk Mode 60 ngày. Duy trì sự tập trung, tuân thủ các quy tắc và rèn luyện kỷ luật bản thân.
          </p>
        </div>
        <div className="flex gap-4">
          <div className="bg-stone-800 border border-stone-700/60 rounded-xl px-4 py-3 text-center min-w-[90px]">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase">Current Day</span>
            <span className="text-2xl font-black text-stone-100">01 / 60</span>
          </div>
          <div className="bg-stone-800 border border-stone-700/60 rounded-xl px-4 py-3 text-center min-w-[90px]">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase">Current Week</span>
            <span className="text-2xl font-black text-stone-100">01 / 09</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Progress"
          value="1.6%"
          subtext="Đã hoàn thành 1 trong số 60 ngày"
          icon={<Calendar size={16} />}
          progress={2}
        />
        <StatCard
          title="Habit Completion"
          value={`${completedCount} / 6`}
          subtext={`Còn lại ${6 - completedCount} quy tắc chưa hoàn thành hôm nay`}
          icon={<CheckCircle size={16} />}
          progress={habitCompletionPercent}
        />
        <StatCard
          title="Current Streak"
          value="1 Ngày"
          subtext="Giữ vững ngọn lửa kỷ luật!"
          icon={<Flame size={16} />}
          trend="+1 ngày"
        />
        <StatCard
          title="Today's Focus"
          value="Thiết lập khung"
          subtext="Tập trung vào hạ tầng và khung UI chính"
          icon={<Target size={16} />}
        />
      </div>

      {/* Quick Actions Panel */}
      <SectionCard 
        title={navigationTitle} 
        onTitleChange={setNavigationTitle}
        subtitle="Đi tới nhanh các biểu mẫu thiết lập và theo dõi trong sổ tay. (Nhấp đúp vào tiêu đề để sửa)"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            href="/mission"
            className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/50 transition-all font-medium text-stone-700 group text-sm"
          >
            <span>Open Mission</span>
            <ArrowRight size={14} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/days/1"
            className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/50 transition-all font-medium text-stone-700 group text-sm"
          >
            <span>Open Today</span>
            <ArrowRight size={14} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/habits"
            className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/50 transition-all font-medium text-stone-700 group text-sm"
          >
            <span>Open Habits</span>
            <ArrowRight size={14} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/analytics"
            className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/50 transition-all font-medium text-stone-700 group text-sm"
          >
            <span>Open Analytics</span>
            <ArrowRight size={14} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </SectionCard>

      {/* Main Two-Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Habits & Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Habits Check-off */}
          <SectionCard
            title={protocolsTitle}
            onTitleChange={setProtocolsTitle}
            subtitle="Đánh dấu hoàn thành các quy tắc không thể thương lượng của bạn trong ngày. (Nhấp tiêu đề để sửa)"
            headerAction={
              <span className="text-xs font-semibold text-stone-500 bg-stone-100 border px-2 py-0.5 rounded-full font-sans">
                {habitCompletionPercent}% Hoàn thành
              </span>
            }
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {habits.map((habit) => (
                <button
                  key={habit.id}
                  onClick={() => toggleHabit(habit.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    habit.completed
                      ? "bg-stone-900 border-stone-900 text-stone-100 shadow-md"
                      : "bg-white border-stone-200 text-stone-700 hover:border-stone-400"
                  }`}
                >
                  <span
                    className={`w-5 h-5 rounded-md flex items-center justify-center border transition-all ${
                      habit.completed
                        ? "bg-white border-white text-stone-900"
                        : "bg-transparent border-stone-300"
                    }`}
                  >
                    {habit.completed && <span className="font-bold text-xs">✓</span>}
                  </span>
                  <div>
                    <h4 className="font-semibold text-sm leading-tight">{habit.name}</h4>
                    <p className={`text-[10px] ${habit.completed ? "text-stone-300" : "text-stone-400"}`}>
                      Mục tiêu: {habit.target}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </SectionCard>

          {/* Today's 1-3-5 Checklist */}
          <SectionCard
            title={prioritiesTitle}
            onTitleChange={setPrioritiesTitle}
            subtitle="Tập trung hoàn thành 1 nhiệm vụ quan trọng nhất (MIT) đầu tiên trước khi xử lý các việc khác."
            headerAction={
              <Link href="/days/1" className="text-xs font-semibold text-stone-900 underline hover:text-stone-700 font-sans">
                Chi tiết ngày →
              </Link>
            }
          >
            <div className="space-y-4">
              {/* MIT Item */}
              <div>
                <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2 font-sans">
                  1 Most Important Task (MIT) — Nhiệm vụ quan trọng nhất
                </h4>
                {tasks
                  .filter((t) => t.type === "MIT")
                  .map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                        task.completed
                          ? "bg-stone-50 border-stone-200/60 text-stone-400 line-through"
                          : "bg-amber-50/40 border-amber-200/60 text-stone-800 hover:border-amber-300"
                      }`}
                    >
                      {task.completed ? (
                        <CheckSquare size={18} className="text-stone-500 shrink-0" />
                      ) : (
                        <Square size={18} className="text-amber-600 shrink-0" />
                      )}
                      <span className="text-sm font-semibold">{task.text}</span>
                    </div>
                  ))}
              </div>

              {/* Priorities */}
              <div>
                <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2 font-sans">
                  3 Secondary Priorities — Nhiệm vụ ưu tiên tiếp theo
                </h4>
                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.type === "Priority")
                    .map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          task.completed
                            ? "bg-stone-50 border-stone-200/60 text-stone-400 line-through"
                            : "bg-white border-stone-200 text-stone-700 hover:border-stone-400"
                        }`}
                      >
                        {task.completed ? (
                          <CheckSquare size={16} className="text-stone-400 shrink-0" />
                        ) : (
                          <Square size={16} className="text-stone-400 shrink-0" />
                        )}
                        <span className="text-xs font-medium">{task.text}</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Minor Tasks */}
              <div>
                <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2 font-sans">
                  5 Minor Tasks — Nhiệm vụ phụ phát sinh
                </h4>
                <div className="space-y-2">
                  {tasks
                    .filter((t) => t.type === "Minor")
                    .map((task) => (
                      <div
                        key={task.id}
                        onClick={() => toggleTask(task.id)}
                        className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                          task.completed
                            ? "bg-stone-50 border-stone-200/60 text-stone-400 line-through"
                            : "bg-white border-stone-200 text-stone-700 hover:border-stone-400"
                        }`}
                      >
                        {task.completed ? (
                          <CheckSquare size={16} className="text-stone-400 shrink-0" />
                        ) : (
                          <Square size={16} className="text-stone-400 shrink-0" />
                        )}
                        <span className="text-xs">{task.text}</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right 1 Col: Weekly Summary & Reflections */}
        <div className="space-y-6">
          {/* Week progress card */}
          <SectionCard 
            title={weeklySummaryTitle} 
            onTitleChange={setWeeklySummaryTitle}
            subtitle="Tuần 07/06 - 13/06 (Tuần đầu thiết lập)"
          >
            <div className="space-y-3.5">
              <p className="text-base text-stone-700 font-handwriting leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/50">
                &ldquo;Tập trung xây dựng khung layout và các màn hình UI cơ bản. Cần duy trì phong cách thiết kế tối giản, tông màu cát/đá dịu nhẹ.&rdquo;
              </p>
              <div className="h-[1px] bg-stone-200/60 my-2"></div>
              <h5 className="text-[10px] text-stone-400 font-bold uppercase tracking-wider font-sans">
                Mục tiêu trọng tâm tuần
              </h5>
              <ul className="space-y-2.5 font-sans">
                {[
                  "Xây dựng 10 route cốt lõi Next.js",
                  "Thiết kế layout bảng điều khiển responsive",
                  "Cấu hình dữ liệu giả lập cho toàn ứng dụng",
                  "Kiểm tra kiểu chữ CSS và font tải",
                ].map((goal, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs">
                    <span className="bg-stone-900 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-stone-700 font-medium">{goal}</span>
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>

          {/* Reflections List */}
          <SectionCard 
            title={reflectionsTitle} 
            onTitleChange={setReflectionsTitle}
            subtitle="Các ghi chép trải nghiệm rút ra từ những ngày trước."
          >
            <div className="space-y-3">
              {RECENT_REFLECTIONS.map((ref) => (
                <div key={ref.day} className="p-3.5 bg-stone-50 rounded-xl border border-stone-200/40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold text-stone-800 bg-stone-200/60 px-1.5 py-0.5 rounded font-sans">
                      Nhật ký Ngày {ref.day}
                    </span>
                    <span className="text-[9px] text-stone-400 font-medium font-sans">Đã lưu</span>
                  </div>
                  <p className="text-base text-stone-700 font-handwriting leading-relaxed">
                    &ldquo;{ref.note}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
