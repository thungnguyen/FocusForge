import React from "react";
import Link from "next/link";
import { CheckCircle, Clock, Lock, Search } from "lucide-react";
import { getDayMockData } from "@/lib/mock-data";

export default function Days() {
  // Generate all 60 days of the cycle
  const daysList = Array.from({ length: 60 }, (_, i) => getDayMockData(i + 1));

  return (
    <div className="space-y-6">
      {/* Overview Block */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-workbook flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-md font-bold text-stone-800 flex items-center gap-2 font-sans">
            <CheckCircle size={18} className="text-stone-700" />
            Daily Planner
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Danh sách nhật ký tác vụ hàng ngày của bạn. Mỗi ngày bao gồm một danh sách nhiệm vụ ưu tiên 1-3-5, theo dõi trạng thái năng lượng, tâm trạng và phân chia lịch biểu thời gian Kaizen. Nhấp vào Day 1 để xem thử chi tiết.
          </p>
        </div>
        
        {/* Status filters */}
        <div className="flex gap-2.5 text-xs text-stone-500 font-medium">
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-stone-300"></span>
            <span>Upcoming</span>
          </div>
        </div>
      </div>

      {/* Grid of 60 Day Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {daysList.map((day) => {
          const isInProgress = day.status === "In Progress";
          const isCompleted = day.status === "Completed";
          const isUpcoming = day.status === "Upcoming";

          return (
            <Link
              key={day.number}
              href={`/days/${day.number}`}
              className={`bg-white rounded-xl border p-4 flex flex-col justify-between h-36 transition-all duration-300 hover:-translate-y-0.5 cursor-pointer shadow-workbook hover:shadow-workbook-lg group ${
                isInProgress
                  ? "border-stone-900 ring-1 ring-stone-900/5 bg-stone-50/10"
                  : isCompleted
                  ? "border-emerald-500/20"
                  : "border-stone-200 opacity-80 hover:opacity-100"
              }`}
            >
              {/* Day info */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-stone-900 group-hover:underline">
                    Day {day.number}
                  </span>
                  
                  {/* Small icon indicator */}
                  {isCompleted && <CheckCircle size={11} className="text-emerald-600 shrink-0" />}
                  {isInProgress && <Clock size={11} className="text-amber-600 shrink-0" />}
                  {isUpcoming && <Lock size={10} className="text-stone-300 shrink-0" />}
                </div>
                
                <span className="text-[9px] text-stone-400 font-semibold block uppercase">
                  Week {day.weekNumber} • {day.date}
                </span>
              </div>

              {/* MIT preview */}
              <div className="my-2.5">
                <p className="text-[10px] text-stone-500 line-clamp-2 font-medium leading-tight">
                  <strong className="text-stone-700">MIT:</strong> {day.mit}
                </p>
              </div>

              {/* Day footer/status text */}
              <div className="border-t border-stone-100 pt-1.5 flex items-center justify-between text-[9px] font-bold tracking-wider">
                <span
                  className={
                    isCompleted
                      ? "text-emerald-700"
                      : isInProgress
                      ? "text-amber-700 animate-pulse"
                      : "text-stone-400"
                  }
                >
                  {isCompleted ? "COMPLETED" : isInProgress ? "IN PROGRESS" : "UPCOMING"}
                </span>
                <span className="text-stone-400 group-hover:text-stone-800 transition-colors">
                  Details →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
