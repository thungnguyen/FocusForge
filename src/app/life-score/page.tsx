"use client";

import React, { useState, useEffect } from "react";
import { Heart, RefreshCw } from "lucide-react";
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend } from "recharts";
import SectionCard from "@/components/ui/SectionCard";
import { getLifeScores, updateLifeScore } from "@/app/actions";

export default function LifeScore() {
  const [pageTitle, setPageTitle] = useState("Life Score");
  const [diagramTitle, setDiagramTitle] = useState("Wheel of Life Diagram");
  const [areas, setAreas] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);
    async function loadData() {
      try {
        const data = await getLifeScores();
        if (data && data.length > 0) {
          setAreas(data);
        }
      } catch (err) {
        console.error("Failed to load life scores", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleScoreChange = (index: number, field: "currentScore" | "targetScore", val: number) => {
    setAreas((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, [field]: val } : item))
    );
  };

  const handleNoteChange = (index: number, val: string) => {
    setAreas((prev) =>
      prev.map((item, idx) => (idx === index ? { ...item, note: val } : item))
    );
  };

  const persistArea = async (index: number) => {
    const area = areas[index];
    if (!area) return;
    await updateLifeScore(area.name, area.currentScore, area.targetScore, area.note);
  };

  const chartData = areas.map((a) => ({
    subject: a.name,
    "Current Score": a.currentScore,
    "Target Score": a.targetScore,
    fullMark: 10,
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-stone-500 font-sans text-sm">
        Đang tải điểm số cuộc sống...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Explanation Banner */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-workbook flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Heart size={18} className="text-stone-700" />
            <input
              type="text"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="text-base font-bold text-stone-800 font-sans bg-transparent border-none outline-none focus:bg-stone-100 rounded px-1 -ml-1 transition-colors"
              title="Nhấp vào đây để đổi tiêu đề trang"
            />
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Đánh giá điểm cân bằng bánh xe cuộc đời. Hãy kéo thanh trượt ở danh sách các khía cạnh bên phải để cập nhật biểu đồ phân tích đa trục. Nhả thanh trượt để tự động lưu.
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Column: Radar chart */}
        <div className="lg:col-span-2 space-y-6">
          <SectionCard
            title={diagramTitle}
            onTitleChange={setDiagramTitle}
            subtitle="Đồ thị liên kết điểm số. Sự đối xứng biểu thị mức độ cân bằng cuộc sống của bạn."
          >
            {mounted ? (
              <div className="w-full h-[320px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={chartData}>
                    <PolarGrid stroke="#e7e5e4" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "#78716c", fontSize: 10, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={{ fill: "#a8a29e" }} />
                    <Radar name="Current Score" dataKey="Current Score" stroke="#1c1917" fill="#1c1917" fillOpacity={0.06} />
                    <Radar name="Target Score" dataKey="Target Score" stroke="#818cf8" fill="#818cf8" fillOpacity={0.1} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="w-full h-[320px] bg-stone-50 rounded-xl flex items-center justify-center text-xs text-stone-400">
                Đang nạp đồ thị...
              </div>
            )}
            
            <div className="bg-stone-50 border border-stone-200/50 rounded-xl p-3.5 mt-2">
              <span className="text-[10px] text-stone-400 font-bold uppercase tracking-wider block mb-1">
                Leverage Analysis
              </span>
              <p className="text-xs text-stone-600 leading-normal">
                Các khía cạnh có khoảng cách chênh lệch lớn nhất giữa thực tế và mục tiêu là những điểm cần dồn năng lượng rèn luyện sâu để cải thiện trong 60 ngày tới.
              </p>
            </div>
          </SectionCard>
        </div>

        {/* Right Column: Sliders */}
        <div className="lg:col-span-3 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
          {areas.map((area, index) => (
            <div
              key={area.name}
              className="bg-white rounded-xl border border-stone-200 p-4 shadow-workbook space-y-3"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-2">
                <h4 className="font-bold text-sm text-stone-900 font-sans">{area.name}</h4>
                <div className="flex gap-4 text-xs font-mono font-bold">
                  <span className="text-stone-800">Hiện tại: {area.currentScore}/10</span>
                  <span className="text-indigo-600">Mục tiêu: {area.targetScore}/10</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Current slider */}
                <div>
                  <label className="block text-[9px] font-bold text-stone-400 uppercase mb-1">Current Score</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={area.currentScore}
                    onChange={(e) => handleScoreChange(index, "currentScore", parseInt(e.target.value))}
                    onMouseUp={() => persistArea(index)}
                    onTouchEnd={() => persistArea(index)}
                    className="w-full h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-stone-900"
                  />
                </div>

                {/* Target slider */}
                <div>
                  <label className="block text-[9px] font-bold text-stone-400 uppercase mb-1">Target Score</label>
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={area.targetScore}
                    onChange={(e) => handleScoreChange(index, "targetScore", parseInt(e.target.value))}
                    onMouseUp={() => persistArea(index)}
                    onTouchEnd={() => persistArea(index)}
                    className="w-full h-1 bg-stone-100 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                </div>
              </div>

              {/* Action Note */}
              <div>
                <label className="block text-[9px] font-bold text-stone-400 uppercase mb-1">Action Plan</label>
                <input
                  type="text"
                  value={area.note}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                  onBlur={() => persistArea(index)}
                  placeholder="Viết hành động cụ thể tại đây..."
                  className="w-full bg-stone-50 border border-stone-200/80 rounded-lg p-2 text-sm text-stone-800 focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-400 font-handwriting"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
