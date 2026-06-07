"use client";

import React, { useState, useEffect } from "react";
import { Calendar, CheckCircle, Clock, BookOpen, Smile, PenTool } from "lucide-react";
import SectionCard from "@/components/ui/SectionCard";
import { getWeeks, updateWeek } from "@/app/actions";

export default function Weeks() {
  const [selectedWeekNum, setSelectedWeekNum] = useState(1);
  const [weeksState, setWeeksState] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [overviewTitle, setOverviewTitle] = useState("Week Overview");
  const [goalsTitle, setGoalsTitle] = useState("Weekly Goals");
  const [dumpTitle, setDumpTitle] = useState("Brain Dump");
  const [affirmationTitle, setAffirmationTitle] = useState("Weekly Affirmation");
  const [reflectionTitle, setReflectionTitle] = useState("Weekly Reflection");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getWeeks();
        setWeeksState(data);
      } catch (err) {
        console.error("Failed to load weeks", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const activeWeek = weeksState.find((w) => w.number === selectedWeekNum) || weeksState[0];

  const persistWeek = async (overrides: any = {}) => {
    if (!activeWeek) return;
    const data = { ...activeWeek, ...overrides };
    await updateWeek(data.number, {
      brainDump: data.brainDump || "",
      goals: data.goals || [],
      status: data.status || "Upcoming",
      affirmation: data.affirmation || "",
      reflection: data.reflection || "",
    });
  };

  const updateBrainDump = (text: string) => {
    setWeeksState((prev) =>
      prev.map((w) => (w.number === selectedWeekNum ? { ...w, brainDump: text } : w))
    );
  };

  const updateGoal = (idx: number, text: string) => {
    setWeeksState((prev) =>
      prev.map((w) => {
        if (w.number === selectedWeekNum) {
          const updatedGoals = [...(w.goals || [])];
          updatedGoals[idx] = text;
          return { ...w, goals: updatedGoals };
        }
        return w;
      })
    );
  };

  const updateAffirmation = (text: string) => {
    setWeeksState((prev) =>
      prev.map((w) => (w.number === selectedWeekNum ? { ...w, affirmation: text } : w))
    );
  };

  const updateReflection = (text: string) => {
    setWeeksState((prev) =>
      prev.map((w) => (w.number === selectedWeekNum ? { ...w, reflection: text } : w))
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-stone-500 font-sans text-sm">
        Đang tải kế hoạch tuần...
      </div>
    );
  }

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
        <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-widest mb-3 text-center md:text-left font-sans">
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
                className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer font-sans ${
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

      {activeWeek && (
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
                      Date Range
                    </span>
                    <span className="text-xs font-bold text-stone-800 font-sans">{activeWeek.dateRange}</span>
                  </div>
                  
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
                    <span>WEEKLY COMPLIANCE</span>
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
                      value={(activeWeek.goals || [])[idx] || ""}
                      onChange={(e) => updateGoal(idx, e.target.value)}
                      onBlur={() => persistWeek()}
                      placeholder={`Mục tiêu tuần thứ ${idx + 1}...`}
                      className="w-full bg-stone-50/50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-sm text-stone-800 font-semibold focus:outline-none focus:bg-white font-sans"
                    />
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* Right column: Brain Dump, Affirmation & Reflection */}
          <div className="lg:col-span-2 space-y-6">
            {/* Brain Dump */}
            <SectionCard
              title={dumpTitle}
              onTitleChange={setDumpTitle}
              subtitle="Viết hết mọi suy nghĩ, lo lắng hay kế hoạch phát sinh ra đây để giải phóng tâm trí cho sự tập trung sâu."
            >
              <textarea
                value={activeWeek.brainDump || ""}
                onChange={(e) => updateBrainDump(e.target.value)}
                onBlur={() => persistWeek()}
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
              <input
                type="text"
                value={activeWeek.affirmation || ""}
                onChange={(e) => updateAffirmation(e.target.value)}
                onBlur={() => persistWeek()}
                placeholder="Ví dụ: Tôi kiên định, bình tĩnh và kiểm soát tốt các thói quen xấu hôm nay..."
                className="w-full bg-stone-50 border border-stone-200 rounded-xl px-3.5 py-2.5 text-base text-stone-800 font-handwriting focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-400"
              />
            </SectionCard>

            {/* Weekly Reflection */}
            <SectionCard 
              title={reflectionTitle} 
              onTitleChange={setReflectionTitle}
              subtitle="Nhìn nhận lại tuần đã qua, đúc rút bài học kinh nghiệm và đưa ra cải tiến tốt hơn cho tuần tới."
            >
              <textarea
                value={activeWeek.reflection || ""}
                onChange={(e) => updateReflection(e.target.value)}
                onBlur={() => persistWeek()}
                rows={4}
                placeholder="Điểm tốt trong tuần? Điều gì chưa làm tốt và giải pháp cải tiến Kaizen tiếp theo?"
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-base text-stone-800 font-handwriting focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-400 leading-relaxed"
              />
            </SectionCard>
          </div>
        </div>
      )}
    </div>
  );
}
