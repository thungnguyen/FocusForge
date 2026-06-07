"use client";

import React, { useState, useEffect } from "react";
import { Compass, Sparkles, Plus, Trash2 } from "lucide-react";
import SectionCard from "@/components/ui/SectionCard";
import { getIkigai, updateIkigai } from "@/app/actions";

export default function Ikigai() {
  const [ikigaiId, setIkigaiId] = useState<string>("");
  const [love, setLove] = useState<string[]>([]);
  const [goodAt, setGoodAt] = useState<string[]>([]);
  const [needs, setNeeds] = useState<string[]>([]);
  const [paidFor, setPaidFor] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(true);

  const [loveTitle, setLoveTitle] = useState("What I Love");
  const [goodAtTitle, setGoodAtTitle] = useState("What I Am Good At");
  const [needsTitle, setNeedsTitle] = useState("What The World Needs");
  const [paidForTitle, setPaidForTitle] = useState("What I Can Be Paid For");
  const [summaryTitle, setSummaryTitle] = useState("My Ikigai Summary");

  const [newLove, setNewLove] = useState("");
  const [newGoodAt, setNewGoodAt] = useState("");
  const [newNeeds, setNewNeeds] = useState("");
  const [newPaidFor, setNewPaidFor] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getIkigai();
        if (data) {
          setIkigaiId(data.id);
          setLove(data.love);
          setGoodAt(data.goodAt);
          setNeeds(data.worldNeeds);
          setPaidFor(data.paidFor);
          setSummary(data.summary);
        }
      } catch (err) {
        console.error("Failed to load ikigai data", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const persistAll = async (overrides: any = {}) => {
    if (!ikigaiId) return;
    await updateIkigai(ikigaiId, {
      love: overrides.love ?? love,
      goodAt: overrides.goodAt ?? goodAt,
      worldNeeds: overrides.needs ?? needs,
      paidFor: overrides.paidFor ?? paidFor,
      summary: overrides.summary ?? summary,
    });
  };

  const handleAddItem = (
    listType: "love" | "goodAt" | "needs" | "paidFor",
    text: string,
    setVal: React.Dispatch<React.SetStateAction<string[]>>,
    setInput: React.Dispatch<React.SetStateAction<string>>
  ) => {
    if (!text.trim()) return;
    const newList = [...(listType === "love" ? love : listType === "goodAt" ? goodAt : listType === "needs" ? needs : paidFor), text.trim()];
    setVal(newList);
    setInput("");
    persistAll({ [listType]: newList });
  };

  const handleRemoveItem = (
    listType: "love" | "goodAt" | "needs" | "paidFor",
    index: number,
    setVal: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const current = listType === "love" ? love : listType === "goodAt" ? goodAt : listType === "needs" ? needs : paidFor;
    const newList = current.filter((_, idx) => idx !== index);
    setVal(newList);
    persistAll({ [listType]: newList });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-stone-500 font-sans text-sm">
        Đang tải dữ liệu Ikigai...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Intro Box */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-workbook">
        <h3 className="text-md font-bold text-stone-800 flex items-center gap-2 font-sans">
          <Compass size={18} className="text-stone-700" />
          Ikigai
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Ikigai là khái niệm sống của người Nhật có nghĩa là &ldquo;Lý do để tồn tại&rdquo;. Hãy điền vào 4 vòng tròn giao thoa để định vị bản thân và tìm kiếm động lực rèn luyện kỷ luật sâu sắc. (Nhấp đúp vào tiêu đề bất kỳ để sửa).
        </p>
      </div>

      {/* Visual circles */}
      <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-workbook flex flex-col items-center justify-center space-y-4">
        <h4 className="text-[10px] text-stone-400 font-bold uppercase tracking-widest text-center font-sans">
          Venn Intersection Diagram
        </h4>
        <div className="relative w-56 h-56 md:w-64 md:h-64 flex items-center justify-center">
          <div className="absolute top-4 w-28 h-28 md:w-32 md:h-32 rounded-full bg-rose-200/50 border border-rose-300 flex items-center justify-center text-center p-2 backdrop-blur-xs select-none">
            <span className="text-[10px] font-bold text-rose-700 font-sans">Passion / Love</span>
          </div>
          <div className="absolute left-4 w-28 h-28 md:w-32 md:h-32 rounded-full bg-indigo-200/50 border border-indigo-300 flex items-center justify-center text-center p-2 backdrop-blur-xs select-none">
            <span className="text-[10px] font-bold text-indigo-700 font-sans">Profession / Good At</span>
          </div>
          <div className="absolute right-4 w-28 h-28 md:w-32 md:h-32 rounded-full bg-emerald-200/50 border border-emerald-300 flex items-center justify-center text-center p-2 backdrop-blur-xs select-none">
            <span className="text-[10px] font-bold text-emerald-700 font-sans">Mission / World Needs</span>
          </div>
          <div className="absolute bottom-4 w-28 h-28 md:w-32 md:h-32 rounded-full bg-amber-200/50 border border-amber-300 flex items-center justify-center text-center p-2 backdrop-blur-xs select-none">
            <span className="text-[10px] font-bold text-amber-700 font-sans">Vocation / Paid For</span>
          </div>
          <div className="absolute w-12 h-12 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center text-center p-1 z-10 shadow-md">
            <span className="text-[7px] font-black text-white uppercase tracking-widest leading-none">Ikigai</span>
          </div>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Love */}
        <SectionCard title={loveTitle} onTitleChange={setLoveTitle} subtitle="Những điều khiến trái tim bạn rung động, mang lại niềm vui và động lực sống tự nhiên.">
          <div className="space-y-4">
            <ul className="space-y-2">
              {love.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-100 rounded-lg text-base text-stone-700 font-handwriting">
                  <span className="line-clamp-2 pr-2">{item}</span>
                  <button onClick={() => handleRemoveItem("love", idx, setLove)} className="p-1 rounded text-stone-400 hover:text-rose-600 cursor-pointer font-sans"><Trash2 size={13} /></button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input type="text" value={newLove} onChange={(e) => setNewLove(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddItem("love", newLove, setLove, setNewLove)} placeholder="Thêm điều bạn thích..." className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-base text-stone-800 font-handwriting focus:outline-none" />
              <button onClick={() => handleAddItem("love", newLove, setLove, setNewLove)} className="bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer font-sans">Add</button>
            </div>
          </div>
        </SectionCard>

        {/* Good At */}
        <SectionCard title={goodAtTitle} onTitleChange={setGoodAtTitle} subtitle="Những thế mạnh, kỹ năng chuyên môn hoặc năng khiếu đặc thù bạn sở hữu.">
          <div className="space-y-4">
            <ul className="space-y-2">
              {goodAt.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-100 rounded-lg text-base text-stone-700 font-handwriting">
                  <span className="line-clamp-2 pr-2">{item}</span>
                  <button onClick={() => handleRemoveItem("goodAt", idx, setGoodAt)} className="p-1 rounded text-stone-400 hover:text-rose-600 cursor-pointer font-sans"><Trash2 size={13} /></button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input type="text" value={newGoodAt} onChange={(e) => setNewGoodAt(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddItem("goodAt", newGoodAt, setGoodAt, setNewGoodAt)} placeholder="Thêm thế mạnh của bạn..." className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-base text-stone-800 font-handwriting focus:outline-none" />
              <button onClick={() => handleAddItem("goodAt", newGoodAt, setGoodAt, setNewGoodAt)} className="bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer font-sans">Add</button>
            </div>
          </div>
        </SectionCard>

        {/* World Needs */}
        <SectionCard title={needsTitle} onTitleChange={setNeedsTitle} subtitle="Những vấn đề của xã hội, khách hàng hoặc cộng đồng mà bạn có thể đóng góp giải quyết.">
          <div className="space-y-4">
            <ul className="space-y-2">
              {needs.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-100 rounded-lg text-base text-stone-700 font-handwriting">
                  <span className="line-clamp-2 pr-2">{item}</span>
                  <button onClick={() => handleRemoveItem("needs", idx, setNeeds)} className="p-1 rounded text-stone-400 hover:text-rose-600 cursor-pointer font-sans"><Trash2 size={13} /></button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input type="text" value={newNeeds} onChange={(e) => setNewNeeds(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddItem("needs", newNeeds, setNeeds, setNewNeeds)} placeholder="Thêm nhu cầu xã hội..." className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-base text-stone-800 font-handwriting focus:outline-none" />
              <button onClick={() => handleAddItem("needs", newNeeds, setNeeds, setNewNeeds)} className="bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer font-sans">Add</button>
            </div>
          </div>
        </SectionCard>

        {/* Paid For */}
        <SectionCard title={paidForTitle} onTitleChange={setPaidForTitle} subtitle="Những công việc, dịch vụ hoặc vai trò chuyên môn thị trường sẵn sàng chi trả thu nhập cho bạn.">
          <div className="space-y-4">
            <ul className="space-y-2">
              {paidFor.map((item, idx) => (
                <li key={idx} className="flex items-center justify-between p-2.5 bg-stone-50 border border-stone-100 rounded-lg text-base text-stone-700 font-handwriting">
                  <span className="line-clamp-2 pr-2">{item}</span>
                  <button onClick={() => handleRemoveItem("paidFor", idx, setPaidFor)} className="p-1 rounded text-stone-400 hover:text-rose-600 cursor-pointer font-sans"><Trash2 size={13} /></button>
                </li>
              ))}
            </ul>
            <div className="flex gap-2">
              <input type="text" value={newPaidFor} onChange={(e) => setNewPaidFor(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleAddItem("paidFor", newPaidFor, setPaidFor, setNewPaidFor)} placeholder="Thêm kỹ năng kiếm tiền..." className="w-full bg-stone-50 border border-stone-200 rounded-lg px-2.5 py-1.5 text-base text-stone-800 font-handwriting focus:outline-none" />
              <button onClick={() => handleAddItem("paidFor", newPaidFor, setPaidFor, setNewPaidFor)} className="bg-stone-900 hover:bg-stone-800 text-stone-50 rounded-lg px-3 py-1.5 text-xs font-bold cursor-pointer font-sans">Add</button>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Summary */}
      <SectionCard title={summaryTitle} onTitleChange={setSummaryTitle} subtitle="Tuyên bố định vị bản thân tại điểm giao thoa để định hướng cuộc sống và sự nghiệp.">
        <div className="space-y-3">
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            onBlur={() => persistAll()}
            rows={3}
            className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-base text-stone-800 font-handwriting focus:outline-none focus:bg-white focus:ring-1 focus:ring-stone-400 leading-relaxed"
            placeholder="Viết lời tóm tắt tuyên bố Ikigai của bạn..."
          />
          <div className="flex items-center gap-1.5 text-[10px] text-stone-400 mt-1 font-semibold font-sans">
            <Sparkles size={12} className="text-stone-300" />
            <span>Hãy đối chiếu các hành động của chu kỳ Monk Mode 60 ngày để bám sát theo định hướng này.</span>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
