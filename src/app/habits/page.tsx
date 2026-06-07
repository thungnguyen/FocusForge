"use client";

import React, { useState } from "react";
import { Activity, ClipboardList, Info, HelpCircle, Save, Plus } from "lucide-react";
import SectionCard from "@/components/ui/SectionCard";
import { getDayMockData } from "@/lib/mock-data";

interface HabitRow {
  dayNumber: number;
  screenTime: number; // hrs
  weight: number; // kg
  sleepTime: number; // hrs
  wakeUpTime: string;
  waterIntake: number; // L
  workout: boolean;
  reading: boolean;
  english: boolean;
  coding: boolean;
  noSocialMedia: boolean;
}

export default function Habits() {
  const [pageTitle, setPageTitle] = useState("Habit Tracker");
  const [gridTitle, setGridTitle] = useState("Weekly Metric Tracker Grid");
  // Load initial sample logs for Days 1 to 7
  const initialRows: HabitRow[] = Array.from({ length: 7 }, (_, idx) => {
    const dayData = getDayMockData(idx + 1);
    return {
      dayNumber: idx + 1,
      screenTime: dayData.habits.screenTime || 2.0,
      weight: dayData.habits.weight || 78.5,
      sleepTime: dayData.habits.sleepTime || 7.5,
      wakeUpTime: dayData.habits.wakeUpTime || "06:00",
      waterIntake: dayData.habits.waterIntake || 3.0,
      workout: dayData.habits.workout,
      reading: dayData.habits.reading,
      english: dayData.habits.english,
      coding: dayData.habits.coding,
      noSocialMedia: dayData.habits.noSocialMedia,
    };
  });

  const [rows, setRows] = useState<HabitRow[]>(initialRows);

  const handleNumericChange = (dayNum: number, field: keyof HabitRow, val: string) => {
    const parsed = parseFloat(val) || 0;
    setRows((prev) =>
      prev.map((r) => (r.dayNumber === dayNum ? { ...r, [field]: parsed } : r))
    );
  };

  const handleTextChange = (dayNum: number, field: keyof HabitRow, val: string) => {
    setRows((prev) =>
      prev.map((r) => (r.dayNumber === dayNum ? { ...r, [field]: val } : r))
    );
  };

  const handleToggle = (dayNum: number, field: keyof HabitRow) => {
    setRows((prev) =>
      prev.map((r) => (r.dayNumber === dayNum ? { ...r, [field]: !r[field] } : r))
    );
  };

  // Add a new day row to the spreadsheet
  const addSpreadsheetRow = () => {
    const nextDay = rows.length + 1;
    if (nextDay > 60) return;
    setRows((prev) => [
      ...prev,
      {
        dayNumber: nextDay,
        screenTime: 2.0,
        weight: prev[prev.length - 1]?.weight || 78.0,
        sleepTime: 7.5,
        wakeUpTime: "06:00",
        waterIntake: 3.0,
        workout: false,
        reading: false,
        english: false,
        coding: false,
        noSocialMedia: false,
      },
    ]);
  };

  const getRowCompletionPercent = (row: HabitRow) => {
    let successChecks = 0;
    let totalRules = 10;

    if (row.screenTime > 0 && row.screenTime <= 2.0) successChecks++;
    if (row.weight > 0) successChecks++;
    if (row.sleepTime >= 7.5) successChecks++;
    if (row.wakeUpTime !== "") successChecks++;
    if (row.waterIntake >= 3.0) successChecks++;
    if (row.workout) successChecks++;
    if (row.reading) successChecks++;
    if (row.english) successChecks++;
    if (row.coding) successChecks++;
    if (row.noSocialMedia) successChecks++;

    return Math.round((successChecks / totalRules) * 100);
  };

  return (
    <div className="space-y-6">
      {/* Intro info box */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-workbook flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList size={18} className="text-stone-700" />
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="text-base font-bold text-stone-800 font-sans bg-transparent border-none outline-none focus:bg-stone-100 rounded px-1 -ml-1 transition-colors w-full max-w-xs"
              title="Nhấp vào đây để đổi tiêu đề trang"
            />
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Ghi chép các thói quen hàng ngày bằng cách nhập trực tiếp số liệu hoặc nhấp ô tích chọn. Điểm số phần trăm tuân thủ ở cột cuối sẽ tự động tính toán.
          </p>
        </div>
        <button
          onClick={addSpreadsheetRow}
          className="bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-xl px-4 py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm cursor-pointer shrink-0"
        >
          <Plus size={14} />
          Add Logged Day
        </button>
      </div>

      {/* Spreadsheet grid */}
      <SectionCard
        title={gridTitle}
        onTitleChange={setGridTitle}
        subtitle="Bảng theo dõi và thống kê thói quen (đáp ứng nguyên tắc hiển thị cột tiếng Anh)."
      >
        <div className="overflow-x-auto custom-scrollbar -mx-6">
          <div className="inline-block min-w-full align-middle px-6">
            <table className="min-w-full border-collapse text-stone-800">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-[10px] font-bold uppercase tracking-wider text-stone-500 text-center">
                  <th className="py-3 px-3 text-left w-14">Day</th>
                  <th className="py-3 px-3 w-24">Screen Time</th>
                  <th className="py-3 px-2 w-20">Weight</th>
                  <th className="py-3 px-2 w-20">Sleep</th>
                  <th className="py-3 px-3 w-24">Wake Up</th>
                  <th className="py-3 px-3 w-28">Water Intake</th>
                  <th className="py-3 px-2">Workout</th>
                  <th className="py-3 px-2">Reading</th>
                  <th className="py-3 px-2">English</th>
                  <th className="py-3 px-2">Coding</th>
                  <th className="py-3 px-2 text-nowrap">No Social Media</th>
                  <th className="py-3 px-3 w-20">Completion</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs font-mono text-center">
                {rows.map((row) => {
                  const percent = getRowCompletionPercent(row);
                  return (
                    <tr key={row.dayNumber} className="hover:bg-stone-50/50 transition-colors">
                      {/* Day Label */}
                      <td className="py-2.5 px-3 text-left font-sans font-bold text-stone-900 border-r border-stone-100">
                        Day {row.dayNumber}
                      </td>

                      {/* Screen Time numeric */}
                      <td className="py-2.5 px-2">
                        <input
                          type="number"
                          step="0.1"
                          value={row.screenTime}
                          onChange={(e) =>
                            handleNumericChange(row.dayNumber, "screenTime", e.target.value)
                          }
                          className="w-14 bg-stone-50/50 border border-stone-200 rounded text-center py-1 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 font-semibold"
                        />
                      </td>

                      {/* Weight numeric */}
                      <td className="py-2.5 px-2">
                        <input
                          type="number"
                          step="0.1"
                          value={row.weight}
                          onChange={(e) =>
                            handleNumericChange(row.dayNumber, "weight", e.target.value)
                          }
                          className="w-14 bg-stone-50/50 border border-stone-200 rounded text-center py-1 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 font-semibold"
                        />
                      </td>

                      {/* Sleep Time numeric */}
                      <td className="py-2.5 px-2">
                        <input
                          type="number"
                          step="0.5"
                          value={row.sleepTime}
                          onChange={(e) =>
                            handleNumericChange(row.dayNumber, "sleepTime", e.target.value)
                          }
                          className="w-14 bg-stone-50/50 border border-stone-200 rounded text-center py-1 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 font-semibold"
                        />
                      </td>

                      {/* Wake Up Time string */}
                      <td className="py-2.5 px-2">
                        <input
                          type="text"
                          value={row.wakeUpTime}
                          onChange={(e) =>
                            handleTextChange(row.dayNumber, "wakeUpTime", e.target.value)
                          }
                          className="w-20 bg-stone-50/50 border border-stone-200 rounded text-center py-1 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 font-semibold"
                        />
                      </td>

                      {/* Water numeric */}
                      <td className="py-2.5 px-2">
                        <input
                          type="number"
                          step="0.1"
                          value={row.waterIntake}
                          onChange={(e) =>
                            handleNumericChange(row.dayNumber, "waterIntake", e.target.value)
                          }
                          className="w-14 bg-stone-50/50 border border-stone-200 rounded text-center py-1 text-xs focus:bg-white focus:outline-none focus:ring-1 focus:ring-stone-400 font-semibold"
                        />
                      </td>

                      {/* Workout checkbox */}
                      <td className="py-2.5 px-1">
                        <button
                          type="button"
                          onClick={() => handleToggle(row.dayNumber, "workout")}
                          className={`w-5 h-5 mx-auto rounded border flex items-center justify-center cursor-pointer transition-all ${
                            row.workout
                              ? "bg-stone-900 border-stone-900 text-white font-bold"
                              : "bg-white border-stone-300"
                          }`}
                        >
                          {row.workout && <span>✓</span>}
                        </button>
                      </td>

                      {/* Reading checkbox */}
                      <td className="py-2.5 px-1">
                        <button
                          type="button"
                          onClick={() => handleToggle(row.dayNumber, "reading")}
                          className={`w-5 h-5 mx-auto rounded border flex items-center justify-center cursor-pointer transition-all ${
                            row.reading
                              ? "bg-stone-900 border-stone-900 text-white font-bold"
                              : "bg-white border-stone-300"
                          }`}
                        >
                          {row.reading && <span>✓</span>}
                        </button>
                      </td>

                      {/* English checkbox */}
                      <td className="py-2.5 px-1">
                        <button
                          type="button"
                          onClick={() => handleToggle(row.dayNumber, "english")}
                          className={`w-5 h-5 mx-auto rounded border flex items-center justify-center cursor-pointer transition-all ${
                            row.english
                              ? "bg-stone-900 border-stone-900 text-white font-bold"
                              : "bg-white border-stone-300"
                          }`}
                        >
                          {row.english && <span>✓</span>}
                        </button>
                      </td>

                      {/* Coding checkbox */}
                      <td className="py-2.5 px-1">
                        <button
                          type="button"
                          onClick={() => handleToggle(row.dayNumber, "coding")}
                          className={`w-5 h-5 mx-auto rounded border flex items-center justify-center cursor-pointer transition-all ${
                            row.coding
                              ? "bg-stone-900 border-stone-900 text-white font-bold"
                              : "bg-white border-stone-300"
                          }`}
                        >
                          {row.coding && <span>✓</span>}
                        </button>
                      </td>

                      {/* No Social Media checkbox */}
                      <td className="py-2.5 px-1">
                        <button
                          type="button"
                          onClick={() => handleToggle(row.dayNumber, "noSocialMedia")}
                          className={`w-5 h-5 mx-auto rounded border flex items-center justify-center cursor-pointer transition-all ${
                            row.noSocialMedia
                              ? "bg-stone-900 border-stone-900 text-white font-bold"
                              : "bg-white border-stone-300"
                          }`}
                        >
                          {row.noSocialMedia && <span>✓</span>}
                        </button>
                      </td>

                      {/* Completion rate percentage */}
                      <td className="py-2.5 px-3 border-l border-stone-100 font-sans">
                        <span
                          className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                            percent >= 80
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : percent >= 50
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                          }`}
                        >
                          {percent}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
