"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle,
  HelpCircle,
  Moon,
  Briefcase,
  Dumbbell,
  Smile,
  Info,
  Calendar,
  Layers,
  Heart
} from "lucide-react";
import SectionCard from "@/components/ui/SectionCard";
import { getDayDetail, updateDayDetail } from "@/app/actions";

interface PageProps {
  params: Promise<{ id: string }>;
}

type TimeBlockCategory = "Sleep" | "Work" | "Health" | "Play" | "None";

interface TimeBlock {
  hour: number;
  category: TimeBlockCategory;
  description: string;
}

export default function DayDetail({ params }: PageProps) {
  const { id } = use(params);
  const dayId = parseInt(id) || 1;

  // Editable card titles
  const [focusAreaTitle, setFocusAreaTitle] = useState("Focus Area");
  const [mitTitle, setMitTitle] = useState("Most Important Task");
  const [prioritiesTitle, setPrioritiesTitle] = useState("Top Priorities");
  const [secondariesTitle, setSecondariesTitle] = useState("Secondary Tasks");
  const [reflectionTitle, setReflectionTitle] = useState("Kaizen Reflection");
  const [clockTitle, setClockTitle] = useState("Kaizen Time Clock");
  const [moodTitle, setMoodTitle] = useState("Mood & Energy");

  // Core day values state
  const [date, setDate] = useState("");
  const [weekNumber, setWeekNumber] = useState(1);
  const [focusArea, setFocusArea] = useState("");
  const [mit, setMit] = useState("");
  const [priorities, setPriorities] = useState<any[]>([]);
  const [secondaries, setSecondaries] = useState<any[]>([]);
  const [mood, setMood] = useState("");
  const [energy, setEnergy] = useState<"High" | "Medium" | "Low">("Medium");
  const [reflection, setReflection] = useState("");
  const [dayCompleted, setDayCompleted] = useState(false);

  // Time blocks (24 hours setup)
  const defaultBlocks: TimeBlock[] = Array.from({ length: 24 }, (_, i) => {
    let category: TimeBlockCategory = "None";
    let description = "";

    if (i >= 0 && i < 6) {
      category = "Sleep";
      description = "Ngủ sâu đêm";
    } else if (i === 6) {
      category = "Health";
      description = "Thức dậy, uống nước & tập giãn cơ";
    } else if (i >= 9 && i < 12) {
      category = "Work";
      description = "Code tập trung cao độ";
    } else if (i >= 13 && i < 17) {
      category = "Work";
      description = "Lập trình frontend Next.js";
    } else if (i === 17) {
      category = "Health";
      description = "Chạy bộ hoặc tập kháng lực";
    } else if (i >= 18 && i < 21) {
      category = "Play";
      description = "Ăn tối & nghỉ ngơi thư giãn";
    } else if (i >= 22 && i < 24) {
      category = "Sleep";
      description = "Đọc sách nhẹ nhàng & đi ngủ";
    }

    return { hour: i, category, description };
  });

  const [timeBlocks, setTimeBlocks] = useState<TimeBlock[]>(defaultBlocks);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<TimeBlockCategory>("Work");
  const [tempDesc, setTempDesc] = useState("");

  useEffect(() => {
    async function loadData() {
      const dbDay = await getDayDetail(dayId);
      if (dbDay) {
        setDate(dbDay.date);
        setWeekNumber(dbDay.weekNumber);
        setFocusArea(dbDay.focusArea);
        setMit(dbDay.mit);
        setPriorities(dbDay.priorities);
        setSecondaries(dbDay.secondaries);
        setMood(dbDay.mood);
        setEnergy(dbDay.energy as any);
        setReflection(dbDay.kaizenReflection);
        setDayCompleted(dbDay.completed);
        if (dbDay.timeBlocks && dbDay.timeBlocks.length > 0) {
          setTimeBlocks(dbDay.timeBlocks);
        }
      }
    }
    loadData();
  }, [dayId]);

  const persistDayData = async (updatedFields: any = {}) => {
    const finalData = {
      mit: mit,
      focusArea: focusArea,
      priorities: priorities,
      secondaries: secondaries,
      mood: mood,
      energy: energy,
      kaizenReflection: reflection,
      completed: dayCompleted,
      timeBlocks: timeBlocks,
      ...updatedFields
    };
    await updateDayDetail(dayId, finalData);
  };

  const togglePriority = async (id: string) => {
    const nextPriorities = priorities.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setPriorities(nextPriorities);
    await persistDayData({ priorities: nextPriorities });
  };

  const toggleSecondary = async (id: string) => {
    const nextSecondaries = secondaries.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    setSecondaries(nextSecondaries);
    await persistDayData({ secondaries: nextSecondaries });
  };

  // SVG Calculations for the 24-sector Kaizen Wheel
  const R = 130;
  const cx = 150;
  const cy = 150;

  const getWedgePath = (hour: number) => {
    const startAngle = hour * 15 - 90;
    const endAngle = (hour + 1) * 15 - 90;

    const startRad = (startAngle * Math.PI) / 180;
    const endRad = (endAngle * Math.PI) / 180;

    const x1 = cx + R * Math.cos(startRad);
    const y1 = cy + R * Math.sin(startRad);
    const x2 = cx + R * Math.cos(endRad);
    const y2 = cy + R * Math.sin(endRad);

    return `M ${cx} ${cy} L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`;
  };

  const getCategoryColor = (category: TimeBlockCategory) => {
    switch (category) {
      case "Sleep":
        return "#818cf8";
      case "Work":
        return "#1c1917";
      case "Health":
        return "#2dd4bf";
      case "Play":
        return "#fdba74";
      default:
        return "#f5f5f4";
    }
  };

  const selectHourBlock = (hour: number) => {
    setSelectedHour(hour);
    setTempDesc(timeBlocks[hour].description);
    setActiveCategory(timeBlocks[hour].category);
  };

  const saveBlockDetails = async () => {
    if (selectedHour === null) return;
    const nextBlocks = timeBlocks.map((b) =>
      b.hour === selectedHour
        ? { ...b, category: activeCategory, description: tempDesc }
        : b
    );
    setTimeBlocks(nextBlocks);
    setSelectedHour(null);
    await persistDayData({ timeBlocks: nextBlocks });
  };

  return (
    <div className="space-y-6">
      {/* Dynamic Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/days"
            className="p-2 bg-white rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-50 cursor-pointer shadow-sm shrink-0"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-stone-900 font-sans">
                Day {dayId}
              </h1>
              <span className="text-[10px] text-stone-400 font-bold uppercase bg-stone-100 px-2 py-0.5 rounded border">
                Week {weekNumber}
              </span>
            </div>
            <p className="text-xs text-stone-400 mt-0.5">Thời gian thực tế: {date}</p>
          </div>
        </div>

        {/* Status complete checkbox */}
        <div className="flex items-center gap-2 font-sans">
          <button
            onClick={async () => {
              const nextVal = !dayCompleted;
              setDayCompleted(nextVal);
              await persistDayData({ completed: nextVal });
            }}
            className={`px-4 py-2 rounded-xl text-xs font-semibold border flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
              dayCompleted
                ? "bg-emerald-900 border-emerald-900 text-emerald-50"
                : "bg-white border-stone-200 text-stone-700 hover:border-stone-400"
            }`}
          >
            <CheckCircle size={15} />
            <span>{dayCompleted ? "Completed" : "Mark Day Complete"}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 columns: Task logs & Reflections */}
        <div className="lg:col-span-2 space-y-6">
          {/* Focus Area */}
          <SectionCard 
            title={focusAreaTitle} 
            onTitleChange={setFocusAreaTitle}
            subtitle="Xác định lĩnh vực hoặc chủ đề kỹ thuật bạn cam kết tập trung cải thiện hôm nay. (Nhấp đúp tiêu đề để sửa)"
          >
            <div>
              <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-1 font-sans">
                Focus Area
              </label>
              <input
                type="text"
                value={focusArea}
                onChange={(e) => setFocusArea(e.target.value)}
                onBlur={() => persistDayData()}
                className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-base text-stone-800 font-handwriting focus:outline-none focus:ring-1 focus:ring-stone-400"
                placeholder="Nhập khía cạnh cần tập trung hôm nay..."
              />
            </div>
          </SectionCard>

          {/* Most Important Task */}
          <SectionCard 
            title={mitTitle} 
            onTitleChange={setMitTitle}
            subtitle="Nhiệm vụ cốt lõi duy nhất bắt buộc phải hoàn thành trong ngày để có một ngày thành công. (Nhấp đúp tiêu đề để sửa)"
          >
            <div>
              <label className="block text-[9px] font-bold text-stone-400 uppercase tracking-wider mb-1 font-sans">
                Most Important Task
              </label>
              <textarea
                value={mit}
                onChange={(e) => setMit(e.target.value)}
                onBlur={() => persistDayData()}
                rows={2}
                className="w-full bg-amber-50/20 border border-amber-200/80 rounded-xl p-3.5 text-lg text-stone-800 font-handwriting focus:outline-none focus:ring-1 focus:ring-amber-300 leading-normal"
                placeholder="Viết nhiệm vụ quan trọng nhất (MIT) của bạn vào đây..."
              />
            </div>
          </SectionCard>

          {/* Top Priorities */}
          <SectionCard
            title={prioritiesTitle}
            onTitleChange={setPrioritiesTitle}
            subtitle="Thiết lập 3 nhiệm vụ quan trọng tiếp theo cần thực hiện sau khi hoàn thành MIT."
          >
            <div className="space-y-2">
              {priorities.map((task, idx) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3.5 bg-stone-50/50 border border-stone-200/60 rounded-xl"
                >
                  <button
                    onClick={() => togglePriority(task.id)}
                    className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 cursor-pointer ${
                      task.completed
                        ? "bg-stone-900 border-stone-900 text-white"
                        : "bg-white border-stone-300"
                    }`}
                  >
                    {task.completed && <span className="text-[10px]">✓</span>}
                  </button>
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => {
                      const updated = [...priorities];
                      updated[idx].text = e.target.value;
                      setPriorities(updated);
                    }}
                    onBlur={() => persistDayData()}
                    className={`w-full bg-transparent border-none text-base focus:outline-none ${
                      task.completed ? "text-stone-400 line-through font-handwriting" : "text-stone-700 font-handwriting"
                    }`}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Secondary Tasks */}
          <SectionCard
            title={secondariesTitle}
            onTitleChange={setSecondariesTitle}
            subtitle="5 nhiệm vụ phụ, nhỏ hoặc phát sinh cần giải quyết trong các khoảng thời gian trống."
          >
            <div className="space-y-2">
              {secondaries.map((task, idx) => (
                <div
                  key={task.id}
                  className="flex items-center gap-3 p-3.5 bg-stone-50/50 border border-stone-200/60 rounded-xl"
                >
                  <button
                    onClick={() => toggleSecondary(task.id)}
                    className={`w-4.5 h-4.5 rounded border flex items-center justify-center shrink-0 cursor-pointer ${
                      task.completed
                        ? "bg-stone-900 border-stone-900 text-white"
                        : "bg-white border-stone-300"
                    }`}
                  >
                    {task.completed && <span className="text-[10px]">✓</span>}
                  </button>
                  <input
                    type="text"
                    value={task.text}
                    onChange={(e) => {
                      const updated = [...secondaries];
                      updated[idx].text = e.target.value;
                      setSecondaries(updated);
                    }}
                    onBlur={() => persistDayData()}
                    className={`w-full bg-transparent border-none text-base focus:outline-none ${
                      task.completed ? "text-stone-400 line-through font-handwriting" : "text-stone-700 font-handwriting"
                    }`}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Kaizen Reflection */}
          <SectionCard
            title={reflectionTitle}
            onTitleChange={setReflectionTitle}
            subtitle="Đánh giá chi tiết hiệu suất thực thi ngày hôm nay và đề xuất 1 cải tiến nhỏ (Kaizen) cho ngày mai."
          >
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              onBlur={() => persistDayData()}
              rows={4}
              className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3.5 text-base text-stone-800 font-handwriting focus:outline-none focus:ring-1 focus:ring-stone-400 leading-relaxed"
              placeholder="Bạn đã làm tốt điều gì hôm nay? Điểm nào cần khắc phục và giải pháp là gì?"
            />
          </SectionCard>
        </div>

        {/* Right column: Kaizen Clock & Mood */}
        <div className="space-y-6">
          {/* Kaizen Time Clock */}
          <SectionCard
            title={clockTitle}
            onTitleChange={setClockTitle}
            subtitle="Nhấp chuột chọn các phân đoạn trên đồng hồ 24 giờ để thiết lập thời gian biểu chi tiết."
          >
            <div className="flex flex-col items-center">
              <div className="relative w-[300px] h-[300px] select-none">
                <svg width="300" height="300" className="transform -rotate-90">
                  <circle cx={cx} cy={cy} r={R} fill="none" stroke="#e7e5e4" strokeWidth="1" />
                  
                  {timeBlocks.map((block) => (
                    <path
                      key={block.hour}
                      d={getWedgePath(block.hour)}
                      fill={getCategoryColor(block.category)}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                      className="cursor-pointer hover:opacity-95 transition-opacity"
                      onClick={() => selectHourBlock(block.hour)}
                    />
                  ))}

                  <circle cx={cx} cy={cy} r={65} fill="#ffffff" stroke="#e7e5e4" strokeWidth="1" />
                </svg>

                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                  <span className="text-[10px] font-bold text-stone-400 tracking-widest uppercase">
                    Kaizen
                  </span>
                  <span className="text-xl font-extrabold text-stone-900 leading-none">
                    Schedule
                  </span>
                  <span className="text-[9px] text-stone-400 mt-1 font-semibold">
                    Đồng hồ 24h
                  </span>
                </div>

                <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-stone-400">00:00 (Đêm)</div>
                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-stone-400">12:00 (Trưa)</div>
                <div className="absolute left-1 top-1/2 -translate-y-1/2 text-[9px] font-bold text-stone-400">18:00</div>
                <div className="absolute right-1 top-1/2 -translate-y-1/2 text-[9px] font-bold text-stone-400">06:00</div>
              </div>

              {/* Quick brush selector legend in Vietnamese */}
              <div className="mt-4 w-full">
                <h5 className="text-[9px] text-stone-400 font-bold uppercase tracking-wider text-center mb-2.5">
                  Danh mục tô màu lịch biểu
                </h5>
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {[
                    { type: "Sleep" as TimeBlockCategory, icon: Moon, color: "bg-indigo-100 border-indigo-200 text-indigo-700 font-semibold" },
                    { type: "Work" as TimeBlockCategory, icon: Briefcase, color: "bg-stone-900 border-stone-900 text-stone-100" },
                    { type: "Health" as TimeBlockCategory, icon: Dumbbell, color: "bg-teal-100 border-teal-200 text-teal-700 font-semibold" },
                    { type: "Play" as TimeBlockCategory, icon: Smile, color: "bg-orange-100 border-orange-200 text-orange-700 font-semibold" },
                  ].map((btn) => (
                    <button
                      key={btn.type}
                      type="button"
                      onClick={() => setActiveCategory(btn.type)}
                      className={`py-2 px-1 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                        activeCategory === btn.type
                          ? btn.color + " shadow-sm ring-2 ring-stone-900/10"
                          : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      <btn.icon size={13} />
                      <span className="text-[9px]">{btn.type === "Sleep" ? "Ngủ" : btn.type === "Work" ? "Code/Làm" : btn.type === "Health" ? "Sức khỏe" : "Giải trí"}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Hour Details Popover modal inline */}
              {selectedHour !== null && (
                <div className="mt-5 w-full bg-stone-50 border border-stone-200/80 rounded-xl p-4 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-800">
                      Khung giờ: {selectedHour}h - {selectedHour + 1}h
                    </span>
                    <span className="text-[9px] text-stone-400 font-bold uppercase">
                      Danh mục: {activeCategory}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={tempDesc}
                    onChange={(e) => setTempDesc(e.target.value)}
                    placeholder="Ghi chú nhanh hoạt động..."
                    className="w-full bg-white border border-stone-200 rounded-lg p-2 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => setSelectedHour(null)}
                      className="px-3 py-1.5 rounded-lg border border-stone-200 bg-white text-[10px] text-stone-600 hover:bg-stone-50 cursor-pointer"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={saveBlockDetails}
                      className="px-3 py-1.5 rounded-lg bg-stone-900 text-stone-50 text-[10px] font-semibold hover:bg-stone-800 cursor-pointer"
                    >
                      Lưu
                    </button>
                  </div>
                </div>
              )}
            </div>
          </SectionCard>

          {/* Mood & Energy */}
          <SectionCard 
            title={moodTitle} 
            onTitleChange={setMoodTitle}
            subtitle="Đánh giá trạng thái năng lượng thể chất và tâm lý của bạn trong ngày."
          >
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 font-sans">
                  Mood
                </label>
                <div className="grid grid-cols-2 gap-2 text-center text-xs font-sans">
                  {["Hào hứng & Tập trung", "Bình yên & Thư thái", "Mệt mỏi & Uể oải", "Sao nhãng & Trì hoãn"].map(
                    (m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={async () => {
                          setMood(m);
                          await persistDayData({ mood: m });
                        }}
                        className={`py-2 px-1.5 rounded-xl border text-[11px] font-semibold cursor-pointer transition-all ${
                          mood === m
                            ? "bg-stone-900 border-stone-900 text-stone-50 shadow-sm"
                            : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                        }`}
                      >
                        {m}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-stone-400 uppercase tracking-wider mb-2 font-sans">
                  Energy Level
                </label>
                <div className="grid grid-cols-3 gap-2 text-center font-sans">
                  {(["High", "Medium", "Low"] as const).map((e) => (
                    <button
                      key={e}
                      type="button"
                      onClick={async () => {
                        setEnergy(e);
                        await persistDayData({ energy: e });
                      }}
                      className={`py-2 px-1.5 rounded-xl border text-xs font-bold cursor-pointer transition-all ${
                        energy === e
                          ? "bg-stone-900 border-stone-900 text-stone-50 shadow-sm"
                          : "bg-white border-stone-200 text-stone-600 hover:border-stone-300"
                      }`}
                    >
                      {e === "High" ? "Cao" : e === "Medium" ? "Vừa" : "Thấp"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
