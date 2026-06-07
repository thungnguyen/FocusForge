"use client";

import React, { useState } from "react";
import { Calendar, HelpCircle, CheckCircle, Clock, BookOpen, Smile, PenTool } from "lucide-react";
import SectionCard from "@/components/ui/SectionCard";
import { WEEKS_DATA } from "@/lib/mock-data";

export default function Weeks() {
  const [selectedWeekNum, setSelectedWeekNum] = useState(1);
  const [weeksState, setWeeksState] = useState(WEEKS_DATA);

  // Card titles editable states
  const [overviewTitle, setOverviewTitle] = useState("Week Overview");
  const [goalsTitle, setGoalsTitle] = useState("Weekly Goals");
  const [dumpTitle, setDumpTitle] = useState("Brain Dump");
  const [affirmationTitle, setAffirmationTitle] = useState("Weekly Affirmation");
  const [reflectionTitle, setReflectionTitle] = useState("Weekly Reflection");

  const activeWeek = weeksState.find((w) => w.number === selectedWeekNum) || weeksState[0];

  const updateBrainDump = (text: string) => {
    setWeeksState((prev) =>
      prev.map((w) => (w.number === selectedWeekNum ? { ...w, brainDump: text } : w))
    );
  };

  const updateGoal = (idx: number, text: string) => {
    setWeeksState((prev) =>
      prev.map((w) => {
        if (w.number === selectedWeekNum) {
          const updatedGoals = [...w.goals];
          updatedGoals[idx] = text;
          return { ...w, goals: updatedGoals };
        }
        return w;
      })
    );
  };

  // State for affirmations and reflection notes per week
  const [affirmations, setAffirmations] = useState<{ [key: number]: string }>({
    1: "Tôi kỷ luật, kiên định và có khả năng hoàn thành xuất sắc các mục tiêu đã đề ra.",
  });
  const [reflections, setReflections] = useState<{ [key: number]: string }>({
    1: "Tuần đầu tiên diễn ra tương đối ổn thỏa. Khung giao diện cơ bản đã hoàn thiện, tuy nhiên cần kiểm soát giờ ngủ tốt hơn.",
  });

  return (
    <div className="space-y-6">
      {/* Intro details */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-workbook">
        <h3 className="text-md font-bold text-stone-800 flex items-center gap-2 font-sans">
          <Calendar size={18} className="text-stone-700" />
          Weekly Planner
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Lập kế hoạch vĩ mô cho từng tuần trong chu kỳ Monk Mode. Hãy viết ra các mục tiêu lớn, ghi chép tự do để làm sạch tâm trí, viết lời khẳng định tự nhắc nhở và đúc rút bài học kinh nghiệm vào cuối tuần. (Nhấp đúp các tiêu đề thẻ bên dưới để tự sửa đổi tiêu đề).
        </p>
      </div>

      {/* 9 Weeks selection tabs */}
      <div className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook">
        <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-3 text-center md:text-left">
          Select Week (Chọn tuần làm việc)
        </h4>
        <div className="flex flex-wrap gap-2">
          {weeksState.map((w) => {
            const isSelected = w.number === selectedWeekNum;
            const isInProgress = w.status === "In Progress";
            const isCompleted = w.status === "Completed";

            return (
              <button
                key={w.number}
                onClick={() => setSelectedWeekNum(w.number)}
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                  isSelected
                    ? "bg-stone-900 border-stone-900 text-stone-50 shadow-md"
                    : isInProgress
                    ? "bg-amber-50 border-amber-200 text-amber-800 hover:border-amber-400"
                    : isCompleted
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 hover:border-emerald-400"
                    : "bg-stone-50 border-stone-200 text-stone-500 hover:bg-stone-100"
                }`}
              >
                Week {w.number}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main planner grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Overview & Goals */}
        <div className="space-y-6">
          {/* Week Overview */}
          <SectionCard 
            title={overviewTitle} 
            onTitleChange={setOverviewTitle}
            subtitle="Thông tin tổng quan và tiến độ hoàn thành các quy tắc cam kết."
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[9px] text-stone-400 font-bold uppercase tracking-wider block font-sans">
                    Date Range (Khoảng thời gian)
                  </span>
                  <span className="text-xs font-bold text-stone-800 font-sans">{activeWeek.dateRange}</span>
                </div>
                
                {/* Status indicator */}
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-full border font-sans ${
                    activeWeek.status === "In Progress"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : activeWeek.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-stone-50 text-stone-400 border-stone-200"
                  }`}
                >
                  {activeWeek.status}
                </span>
              </div>

              <div>
                <div className="flex justify-between items-center text-[9px] font-bold text-stone-500 mb-1 font-sans">
                  <span>WEEKLY COMPLIANCE (Mức độ tuân thủ)</span>
                  <span>{activeWeek.progress}%</span>
                </div>
                <div className="w-full bg-stone-100 h-1.5 rounded-full overflow-hidden border">
                  <div
                    className="bg-stone-900 h-full transition-all duration-500"
                    style={{ width: `${activeWeek.progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </SectionCard>

          {/* Weekly Goals */}
          <SectionCard 
            title={goalsTitle} 
            onTitleChange={setGoalsTitle}
            subtitle="Thiết lập tối đa 4 mục tiêu cụ thể bạn cam kết đạt được trong tuần này."
          >
            <div className="space-y-3">
              {[0, 1, 2, 3].map((idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="bg-stone-900 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[9px] shrink-0 font-sans">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={activeWeek.goals[idx] || ""}
                    onChange={(e) => updateGoal(idx, e.target.value)}
                    placeholder={`Mục tiêu tuần thứ ${idx + 1}...`}
                    className="w-full bg-stone-50/50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-sm text-stone-800 font-semibold focus:outline-none focus:bg-white"
                  />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Right column: Brain Dump, Affirmation & Reflection */}
        <div className="lg:col-span-2 space-y-6">
          {/* Brain Dump with dot-grid styling */}
          <SectionCard
            title={dumpTitle}
            onTitleChange={setDumpTitle}
            subtitle="Viết hết mọi suy nghĩ, lo lắng hay kế hoạch phát sinh ra đây để giải phóng tâm trí cho sự tập trung sâu."
            dotGrid
          >
            <textarea
              value={activeWeek.brainDump}
              onChange={(e) => updateBrainDump(e.target.value)}
              rows={6}
              className="w-full bg-transparent border-none text-base text-stone-700 font-handwriting leading-relaxed focus:outline-none placeholder:text-stone-400"
              placeholder="Viết tự do không cần cấu trúc tại đây..."
            />
          </SectionCard>

          {/* Weekly Affirmation */}
          <SectionCard 
            title={affirmationTitle} 
            onTitleChange={setAffirmationTitle}
            subtitle="Viết ra lời khẳng định bản thân tự nhắc nhở động lực để rèn luyện kỷ luật vượt qua khó khăn."
          >
            <div className="flex gap-3">
              <input
                type="text"
                value={affirmations[selectedWeekNum] || ""}
                onChange={(e) =>
                  setAffirmations((prev) => ({ ...prev, [selectedWeekNum]: e.target.value }))
                }
                placeholder="Ví dụ: Tôi kiên định, bình tĩnh và kiểm soát tốt các thói quen xấu hôm nay..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-base text-stone-800 font-handwriting focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-400"
              />
            </div>
          </SectionCard>

          {/* Weekly Reflection */}
          <SectionCard 
            title={reflectionTitle} 
            onTitleChange={setReflectionTitle}
            subtitle="Nhìn nhận lại tuần đã qua, đúc rút bài học kinh nghiệm và đưa ra cải tiến tốt hơn cho tuần tới."
          >
            <textarea
              value={reflections[selectedWeekNum] || ""}
              onChange={(e) =>
                setReflections((prev) => ({ ...prev, [selectedWeekNum]: e.target.value }))
              }
              rows={4}
              placeholder="Điểm tốt trong tuần? Điều gì chưa làm tốt và giải pháp cải tiến Kaizen tiếp theo?"
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-base text-stone-800 font-handwriting focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-400 leading-relaxed"
            />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
