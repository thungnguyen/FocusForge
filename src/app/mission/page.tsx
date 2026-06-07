"use client";

import React, { useState, useEffect } from "react";
import { Target, HelpCircle, AlertTriangle, ShieldCheck, Plus, Trash2 } from "lucide-react";
import SectionCard from "@/components/ui/SectionCard";
import {
  getMission,
  updateMission,
  getGoals,
  updateGoal,
  getDailyRules,
  addDailyRule,
  deleteDailyRule,
} from "@/app/actions";

interface DailyRuleItem {
  id: number;
  name: string;
  target: string;
}

interface GoalAction {
  id: string;
  text: string;
}

interface GoalItem {
  id: string;
  title: string;
  actions: GoalAction[];
}

export default function Mission() {
  const [mission, setMission] = useState("");
  const [whyStarted, setWhyStarted] = useState("");
  const [weakestArea, setWeakestArea] = useState("");

  // Editable card titles
  const [missionTitle, setMissionTitle] = useState("Mission Statement");
  const [goalsTitle, setGoalsTitle] = useState("Main Goals");
  const [protocolsTitle, setProtocolsTitle] = useState("Daily Protocols");

  // Editable rules state
  const [rules, setRules] = useState<DailyRuleItem[]>([]);
  const [newRuleName, setNewRuleName] = useState("");
  const [newRuleTarget, setNewRuleTarget] = useState("");

  // Editable goals state
  const [goals, setGoals] = useState<GoalItem[]>([]);

  useEffect(() => {
    async function loadData() {
      const dbMission = await getMission();
      if (dbMission) {
        setMission(dbMission.content);
        setWhyStarted(dbMission.whyStarted);
        setWeakestArea(dbMission.weakestArea);
      }
      const dbGoals = await getGoals();
      if (dbGoals) {
        setGoals(
          dbGoals.map((g) => ({
            id: g.id,
            title: g.title,
            actions: JSON.parse(g.actionsJson),
          }))
        );
      }
      const dbRules = await getDailyRules();
      if (dbRules) {
        setRules(dbRules);
      }
    }
    loadData();
  }, []);

  const saveMissionData = async () => {
    await updateMission(mission, whyStarted, weakestArea);
  };

  const saveGoalData = async (goalId: string) => {
    const goal = goals.find((g) => g.id === goalId);
    if (goal) {
      await updateGoal(goal.id, goal.title, goal.actions);
    }
  };

  const handleAddRule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRuleName || !newRuleTarget) return;
    const dbRule = await addDailyRule(newRuleName, newRuleTarget);
    setRules((prev) => [...prev, dbRule]);
    setNewRuleName("");
    setNewRuleTarget("");
  };

  const handleRemoveRule = async (id: number) => {
    await deleteDailyRule(id);
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const updateGoalTitle = (goalId: string, value: string) => {
    setGoals((prev) =>
      prev.map((g) => (g.id === goalId ? { ...g, title: value } : g))
    );
  };

  const updateActionText = (goalId: string, actionId: string, value: string) => {
    setGoals((prev) =>
      prev.map((g) =>
        g.id === goalId
          ? {
              ...g,
              actions: g.actions.map((a) =>
                a.id === actionId ? { ...a, text: value } : a
              ),
            }
          : g
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Intro info box in Vietnamese */}
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 shadow-workbook">
        <h3 className="text-md font-bold text-stone-800 flex items-center gap-2 font-sans">
          <ShieldCheck size={18} className="text-stone-700" />
          Bản Đăng Ký Cam Kết & Phác Thảo Chu Kỳ
        </h3>
        <p className="text-xs text-stone-500 mt-1">
          Đây là nơi bạn định hình khuôn khổ Monk Mode của mình. Sự thực thi hàng ngày của bạn sẽ bám sát theo những cam kết cốt lõi này. Hãy tự do chỉnh sửa để tạo ra lộ trình của riêng bạn. (Nhấp đúp vào tiêu đề thẻ bất kỳ để sửa).
        </p>
      </div>

      {/* Main Core Commitments & Rules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <SectionCard 
            title={missionTitle} 
            onTitleChange={setMissionTitle}
            subtitle="Xác định mục tiêu lớn nhất và lý do đằng sau hành trình rèn luyện của bạn."
          >
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 font-sans">
                  Mission Statement
                </label>
                <textarea
                  value={mission}
                  onChange={(e) => setMission(e.target.value)}
                  onBlur={saveMissionData}
                  rows={3}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-base text-stone-800 font-handwriting focus:outline-none focus:ring-1 focus:ring-stone-400"
                  placeholder="Mục tiêu lớn nhất bạn cam kết đạt được trong 60 ngày tới là gì?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 font-sans">
                  Why I Started
                </label>
                <textarea
                  value={whyStarted}
                  onChange={(e) => setWhyStarted(e.target.value)}
                  onBlur={saveMissionData}
                  rows={3}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-base text-stone-800 font-handwriting focus:outline-none focus:ring-1 focus:ring-stone-400"
                  placeholder="Tại sao bạn buộc phải thay đổi bây giờ? Nỗi đau lớn nhất nếu bạn tiếp tục trì hoãn là gì?"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-500 uppercase tracking-wider mb-1 font-sans">
                  Main Life Area
                </label>
                <input
                  type="text"
                  value={weakestArea}
                  onChange={(e) => setWeakestArea(e.target.value)}
                  onBlur={saveMissionData}
                  className="w-full bg-stone-50 border border-stone-200 rounded-xl p-3 text-base text-stone-800 font-handwriting focus:outline-none focus:ring-1 focus:ring-stone-400 font-semibold"
                  placeholder="Khía cạnh yếu nhất bạn cần sửa đổi (Ví dụ: Kỷ luật, Sức khỏe, Sự nghiệp...)"
                />
              </div>
            </div>
          </SectionCard>

          {/* Goal Tree Mapper */}
          <SectionCard
            title={goalsTitle}
            onTitleChange={setGoalsTitle}
            subtitle="Cụ thể hóa khía cạnh cần sửa đổi thành 3 mục tiêu lớn và 3 hành động cụ thể cho từng mục tiêu."
          >
            <div className="space-y-6">
              {/* Weakness root representation */}
              <div className="flex flex-col items-center">
                <div className="px-4 py-2 bg-amber-50 border border-amber-300 rounded-lg text-center shadow-sm max-w-xs font-sans">
                  <span className="text-[10px] text-amber-600 font-bold uppercase block tracking-widest">
                    Weakest Domain (Khía cạnh cần cải thiện)
                  </span>
                  <span className="text-xs font-bold text-stone-800 italic">{weakestArea || "Chưa xác định"}</span>
                </div>
                <div className="w-[1px] h-6 bg-stone-300 my-1"></div>
              </div>

              {/* Goal nodes grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                {goals.map((goal, idx) => (
                  <div
                    key={goal.id}
                    className="bg-white border border-stone-200 rounded-xl p-4 shadow-workbook relative flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 mb-2.5 font-sans">
                        <span className="bg-stone-900 text-white rounded-full w-4 h-4 flex items-center justify-center font-bold text-[9px] shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                          Goal {idx + 1}
                        </span>
                      </div>
                      
                      <input
                        type="text"
                        value={goal.title}
                        onChange={(e) => updateGoalTitle(goal.id, e.target.value)}
                        onBlur={() => saveGoalData(goal.id)}
                        className="w-full font-bold text-stone-800 text-sm border-b border-stone-200/50 pb-1.5 focus:outline-none focus:border-stone-500 mb-3 font-sans"
                        placeholder={`Mục tiêu số ${idx + 1}`}
                      />

                      <div className="space-y-2.5">
                        {goal.actions.map((action, actionIdx) => (
                          <div key={action.id} className="space-y-1">
                            <span className="text-[9px] text-stone-400 font-bold uppercase block tracking-wider font-sans">
                              Action {idx + 1}.{actionIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={action.text}
                              onChange={(e) =>
                                updateActionText(goal.id, action.id, e.target.value)
                              }
                              onBlur={() => saveGoalData(goal.id)}
                              className="w-full text-xs text-stone-600 bg-stone-50/50 border border-stone-200/40 rounded px-2 py-1 focus:outline-none focus:bg-stone-50 focus:border-stone-400 font-handwriting"
                              placeholder={`Hành động ${actionIdx + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* Right 1 Col: Protocols & Rules Setup */}
        <div className="space-y-6">
          <SectionCard
            title={protocolsTitle}
            onTitleChange={setProtocolsTitle}
            subtitle="6 nguyên tắc bắt buộc bạn phải tích chọn hoàn thành mỗi ngày để giữ trạng thái Monk Mode."
          >
            <div className="space-y-4">
              {/* Rules list */}
              <div className="space-y-2 font-sans">
                {rules.map((rule, index) => (
                  <div
                    key={rule.id}
                    className="flex items-center justify-between p-3 bg-stone-50 border border-stone-200/60 rounded-xl"
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[9px] font-bold text-stone-400 uppercase">
                          Protocol {index + 1}
                        </span>
                      </div>
                      <h4 className="font-semibold text-xs text-stone-800">{rule.name}</h4>
                      <p className="text-[9px] text-stone-400 font-medium">Mục tiêu: {rule.target}</p>
                    </div>
                    <button
                      onClick={() => handleRemoveRule(rule.id)}
                      className="p-1 rounded-md text-stone-400 hover:text-rose-600 hover:bg-stone-200/30 transition-colors cursor-pointer"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add rule form */}
              <form onSubmit={handleAddRule} className="border-t border-stone-200/60 pt-4 space-y-3 font-sans">
                <h5 className="text-[10px] text-stone-400 font-bold uppercase tracking-wider">
                  Tạo quy tắc mới
                </h5>
                <div>
                  <input
                    type="text"
                    value={newRuleName}
                    onChange={(e) => setNewRuleName(e.target.value)}
                    placeholder="Tên quy tắc (Ví dụ: Đọc sách 20 trang)"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newRuleTarget}
                    onChange={(e) => setNewRuleTarget(e.target.value)}
                    placeholder="Mục tiêu (Ví dụ: 20 trang)"
                    className="w-full bg-stone-50 border border-stone-200 rounded-lg p-2 text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-stone-400"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-stone-800 text-stone-100 rounded-lg py-2 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                >
                  <Plus size={14} />
                  Add Rule
                </button>
              </form>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
