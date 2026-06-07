"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  CheckCircle,
  Calendar,
  Target,
  ArrowRight,
  HelpCircle,
  CheckSquare,
  Square,
  Trophy
} from "lucide-react";
import StatCard from "@/components/ui/StatCard";
import SectionCard from "@/components/ui/SectionCard";
import { getDashboardData, updateDayDetail, updateHabitLog } from "@/app/actions";

export default function Dashboard() {
  const [protocolsTitle, setProtocolsTitle] = useState("Daily Protocols");
  const [prioritiesTitle, setPrioritiesTitle] = useState("Today's Priorities");
  const [weeklySummaryTitle, setWeeklySummaryTitle] = useState("Weekly Summary");
  const [navigationTitle, setNavigationTitle] = useState("Workbook Quick Navigation");

  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDashboardData();
        setDashboardData(data);
      } catch (err) {
        console.error("Failed to load dashboard data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-stone-500 font-sans text-sm">
        Đang tải trang tổng quan FocusForge...
      </div>
    );
  }

  const {
    activeDayNumber,
    activeWeekNumber,
    activeDay,
    activeDayLog,
    completedDaysCount,
    currentStreak,
    week,
    goals,
    dailyRules
  } = dashboardData || {};

  // Habits list mapping from activeDayLog
  const habitsList = [
    { key: "workout", name: "Workout / Thể thao", target: "30+ mins", completed: activeDayLog?.workout },
    { key: "reading", name: "Reading / Đọc sách", target: "10+ pages", completed: activeDayLog?.reading },
    { key: "english", name: "English / Tiếng Anh", target: "30+ mins practice", completed: activeDayLog?.english },
    { key: "coding", name: "Coding / Lập trình", target: "1+ hours project", completed: activeDayLog?.coding },
    { key: "noSocialMedia", name: "No Social Media / Không mxh", target: "Except for work", completed: activeDayLog?.noSocialMedia },
  ];

  const toggleHabit = async (key: string) => {
    if (!activeDayLog) return;
    const nextVal = !activeDayLog[key];
    const updatedLog = { ...activeDayLog, [key]: nextVal };
    
    // Optimistic UI update
    setDashboardData({
      ...dashboardData,
      activeDayLog: updatedLog
    });

    await updateHabitLog(activeDayNumber, updatedLog);
  };

  // Habit completion percent
  const completedHabitsCount = habitsList.filter(h => h.completed).length;
  const habitCompletionPercent = Math.round((completedHabitsCount / habitsList.length) * 100);

  // Toggle tasks on dashboard
  const toggleMit = async () => {
    const nextCompleted = !activeDay.completed;
    const updatedDay = { ...activeDay, completed: nextCompleted };

    setDashboardData({
      ...dashboardData,
      activeDay: updatedDay
    });

    await updateDayDetail(activeDayNumber, updatedDay);
  };

  const togglePriorityTask = async (id: string) => {
    const nextPriorities = activeDay.priorities.map((t: any) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    const updatedDay = { ...activeDay, priorities: nextPriorities };

    setDashboardData({
      ...dashboardData,
      activeDay: updatedDay
    });

    await updateDayDetail(activeDayNumber, updatedDay);
  };

  const toggleSecondaryTask = async (id: string) => {
    const nextSecondaries = activeDay.secondaries.map((t: any) =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    const updatedDay = { ...activeDay, secondaries: nextSecondaries };

    setDashboardData({
      ...dashboardData,
      activeDay: updatedDay
    });

    await updateDayDetail(activeDayNumber, updatedDay);
  };

  const overallProgressPercent = Math.round((completedDaysCount / 60) * 100);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-stone-900 text-stone-100 p-6 rounded-2xl border border-stone-800 shadow-workbook-lg">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-sans">
            FocusForge
          </h1>
          <p className="text-stone-400 text-xs mt-1.5 max-w-xl font-sans leading-relaxed">
            Chào mừng bạn đến với FocusForge. Bạn đang ở ngày thứ {activeDayNumber} của chu kỳ Monk Mode 60 ngày. Duy trì sự tập trung, tuân thủ các quy tắc và rèn luyện kỷ luật bản thân.
          </p>
        </div>
        <div className="flex gap-4 shrink-0 font-sans">
          <div className="bg-stone-850 border border-stone-700/60 rounded-xl px-4 py-3 text-center min-w-[95px]">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase">Current Day</span>
            <span className="text-xl font-black text-stone-100">{String(activeDayNumber).padStart(2, "0")} / 60</span>
          </div>
          <div className="bg-stone-850 border border-stone-700/60 rounded-xl px-4 py-3 text-center min-w-[95px]">
            <span className="text-[10px] text-stone-400 font-semibold block uppercase">Current Week</span>
            <span className="text-xl font-black text-stone-100">{String(activeWeekNumber).padStart(2, "0")} / 09</span>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Overall Progress"
          value={`${overallProgressPercent}%`}
          subtext={`Đã hoàn thành ${completedDaysCount} trong số 60 ngày`}
          icon={<Calendar size={16} />}
          progress={overallProgressPercent}
        />
        <StatCard
          title="Habit Completion"
          value={`${completedHabitsCount} / ${habitsList.length}`}
          subtext={`Còn lại ${habitsList.length - completedHabitsCount} thói quen chưa thực hiện`}
          icon={<CheckCircle size={16} />}
          progress={habitCompletionPercent}
        />
        <StatCard
          title="Current Streak"
          value={`${currentStreak} Ngày`}
          subtext="Giữ vững ngọn lửa kỷ luật!"
          icon={<Flame size={16} />}
          trend={`+${currentStreak} ngày`}
        />
        <StatCard
          title="Today's Focus"
          value={activeDay?.focusArea || "Chưa xác định"}
          subtext="Khía cạnh tập trung cốt lõi của ngày hôm nay"
          icon={<Target size={16} />}
        />
      </div>

      {/* Quick Actions Panel */}
      <SectionCard 
        title={navigationTitle} 
        onTitleChange={setNavigationTitle}
        subtitle="Đi tới nhanh các biểu mẫu thiết lập và theo dõi trong sổ tay. (Nhấp đúp vào tiêu đề để sửa)"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 font-sans">
          <Link
            href="/mission"
            className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/50 transition-all font-medium text-stone-700 group text-xs"
          >
            <span>Open Mission</span>
            <ArrowRight size={14} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href={`/days/${activeDayNumber}`}
            className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/50 transition-all font-medium text-stone-700 group text-xs"
          >
            <span>Open Today (Day {activeDayNumber})</span>
            <ArrowRight size={14} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/habits"
            className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/50 transition-all font-medium text-stone-700 group text-xs"
          >
            <span>Open Habits</span>
            <ArrowRight size={14} className="text-stone-400 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/analytics"
            className="flex items-center justify-between p-3.5 bg-stone-50 hover:bg-stone-100/80 rounded-xl border border-stone-200/50 transition-all font-medium text-stone-700 group text-xs"
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
              {habitsList.map((habit) => (
                <button
                  key={habit.key}
                  onClick={() => toggleHabit(habit.key)}
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
                    <h4 className="font-semibold text-sm leading-tight font-sans">{habit.name}</h4>
                    <p className={`text-[10px] font-sans ${habit.completed ? "text-stone-300" : "text-stone-400"}`}>
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
              <Link href={`/days/${activeDayNumber}`} className="text-xs font-semibold text-stone-900 underline hover:text-stone-700 font-sans">
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
                <div
                  onClick={toggleMit}
                  className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                    activeDay?.completed
                      ? "bg-stone-50 border-stone-200/60 text-stone-400 line-through"
                      : "bg-amber-50/40 border-amber-200/60 text-stone-850 hover:border-amber-300"
                  }`}
                >
                  {activeDay?.completed ? (
                    <CheckSquare size={18} className="text-stone-550 shrink-0" />
                  ) : (
                    <Square size={18} className="text-amber-700 shrink-0" />
                  )}
                  <span className="text-sm font-bold font-handwriting">{activeDay?.mit || "Chưa có MIT được ghi"}</span>
                </div>
              </div>

              {/* Priorities */}
              <div>
                <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-wider mb-2 font-sans">
                  3 Secondary Priorities — Nhiệm vụ ưu tiên tiếp theo
                </h4>
                <div className="space-y-2">
                  {(activeDay?.priorities || []).map((task: any) => (
                    <div
                      key={task.id}
                      onClick={() => togglePriorityTask(task.id)}
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
                      <span className="text-xs font-semibold font-handwriting">{task.text || "Chưa có nhiệm vụ"}</span>
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
                  {(activeDay?.secondaries || []).map((task: any) => (
                    <div
                      key={task.id}
                      onClick={() => toggleSecondaryTask(task.id)}
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
                      <span className="text-xs font-medium font-handwriting">{task.text || "Chưa có nhiệm vụ"}</span>
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
            subtitle={week ? `Tuần ${week.dateRange}` : "Tuần hiện tại"}
          >
            <div className="space-y-3.5">
              {week?.brainDump ? (
                <p className="text-base text-stone-700 font-handwriting leading-relaxed bg-stone-50 p-3.5 rounded-xl border border-stone-200/50">
                  &ldquo;{week.brainDump}&rdquo;
                </p>
              ) : (
                <p className="text-xs text-stone-400 font-sans italic">Chưa có ghi chép nào cho tuần này.</p>
              )}
              <div className="h-[1px] bg-stone-200/60 my-2"></div>
              <h5 className="text-[10px] text-stone-400 font-bold uppercase tracking-wider font-sans">
                Mục tiêu trọng tâm tuần
              </h5>
              {week?.goals && week.goals.length > 0 ? (
                <ul className="space-y-2.5 font-sans">
                  {week.goals.map((goal: string, idx: number) => (
                    <li key={idx} className="flex gap-2.5 items-start text-xs">
                      <span className="bg-stone-900 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="text-stone-700 font-medium">{goal}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-xs text-stone-400 font-sans italic">Chưa có mục tiêu cho tuần này.</p>
              )}
            </div>
          </SectionCard>

          {/* Core Goals List */}
          <SectionCard 
            title="Monk Mode Core Goals"
            subtitle="Mục tiêu lớn đang rèn luyện"
          >
            <div className="space-y-3 font-sans text-xs">
              {(goals || []).map((g: any, idx: number) => (
                <div key={g.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200/50">
                  <span className="text-[9px] font-bold text-stone-500 block uppercase mb-1">Mục tiêu {idx + 1}</span>
                  <p className="font-bold text-stone-800 text-xs mb-1.5">{g.title}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
