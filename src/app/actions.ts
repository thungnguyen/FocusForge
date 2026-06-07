"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// --- MISSION, GOALS & PROTOCOLS ACTIONS ---

export async function getMission() {
  const mission = await prisma.mission.findFirst();
  return mission;
}

export async function updateMission(content: string, whyStarted: string, weakestArea: string) {
  const mission = await prisma.mission.findFirst();
  if (mission) {
    const updated = await prisma.mission.update({
      where: { id: mission.id },
      data: { content, whyStarted, weakestArea },
    });
    return updated;
  } else {
    const created = await prisma.mission.create({
      data: { content, whyStarted, weakestArea },
    });
    return created;
  }
}

export async function getGoals() {
  return await prisma.goal.findMany({
    orderBy: { order: "asc" },
  });
}

export async function updateGoal(id: string, title: string, actions: { id: string; text: string }[]) {
  return await prisma.goal.update({
    where: { id },
    data: {
      title,
      actionsJson: JSON.stringify(actions),
    },
  });
}

export async function getDailyRules() {
  return await prisma.dailyRule.findMany({
    orderBy: { id: "asc" },
  });
}

export async function addDailyRule(name: string, target: string) {
  const created = await prisma.dailyRule.create({
    data: { name, target },
  });
  return created;
}

export async function deleteDailyRule(id: number) {
  return await prisma.dailyRule.delete({
    where: { id },
  });
}

// --- WEEKS ACTIONS ---

export async function getWeeks() {
  // Fetch weeks
  const weeks = await prisma.week.findMany({
    orderBy: { number: "asc" },
  });

  // Calculate dynamic weekly completion based on days
  const completedDays = await prisma.day.findMany({
    where: { completed: true },
    select: { number: true, weekNumber: true },
  });

  return weeks.map((week) => {
    // Week 1 has days 1-7, Week 2 has days 8-14, etc.
    const weekDaysCompletedCount = completedDays.filter(
      (d) => d.weekNumber === week.number
    ).length;

    // Progress percentage (max 7 days completed)
    const progress = Math.round((weekDaysCompletedCount / 7) * 100);

    return {
      ...week,
      progress: Math.min(progress, 100),
      goals: JSON.parse(week.goalsJson) as string[],
    };
  });
}

export async function updateWeek(
  number: number,
  data: {
    brainDump: string;
    goals: string[];
    status: string;
    affirmation?: string;
    reflection?: string;
  }
) {
  return await prisma.week.update({
    where: { number },
    data: {
      brainDump: data.brainDump,
      goalsJson: JSON.stringify(data.goals),
      status: data.status,
      affirmation: data.affirmation,
      reflection: data.reflection,
    },
  });
}

// --- DAYS ACTIONS ---

export async function getDays() {
  const days = await prisma.day.findMany({
    orderBy: { number: "asc" },
  });

  return days.map((d) => ({
    ...d,
    priorities: JSON.parse(d.prioritiesJson),
    secondaries: JSON.parse(d.secondariesJson),
  }));
}

export async function getDayDetail(number: number) {
  const day = await prisma.day.findUnique({
    where: { number },
  });
  if (!day) return null;

  // Fetch habits associated with this day
  const habitLog = await prisma.habitLog.findUnique({
    where: { dayNumber: number },
  });

  return {
    ...day,
    priorities: JSON.parse(day.prioritiesJson),
    secondaries: JSON.parse(day.secondariesJson),
    timeBlocks: day.timeBlocksJson ? JSON.parse(day.timeBlocksJson) : [],
    habits: habitLog,
  };
}

export async function updateDayDetail(
  number: number,
  data: {
    mit: string;
    priorities: any[];
    secondaries: any[];
    focusArea: string;
    mood: string;
    energy: string;
    kaizenReflection: string;
    completed: boolean;
    timeBlocks?: any[];
  }
) {
  const updatedDay = await prisma.day.update({
    where: { number },
    data: {
      mit: data.mit,
      prioritiesJson: JSON.stringify(data.priorities),
      secondariesJson: JSON.stringify(data.secondaries),
      focusArea: data.focusArea,
      mood: data.mood,
      energy: data.energy,
      kaizenReflection: data.kaizenReflection,
      completed: data.completed,
      status: data.completed ? "Completed" : "In Progress",
      timeBlocksJson: data.timeBlocks ? JSON.stringify(data.timeBlocks) : undefined,
    },
  });

  return updatedDay;
}

// --- HABIT LOGS ACTIONS ---

export async function getHabitLogs() {
  return await prisma.habitLog.findMany({
    orderBy: { dayNumber: "asc" },
  });
}

export async function updateHabitLog(dayNumber: number, data: any) {
  return await prisma.habitLog.update({
    where: { dayNumber },
    data: {
      screenTime: parseFloat(data.screenTime) || 0,
      weight: parseFloat(data.weight) || 0,
      sleepTime: parseFloat(data.sleepTime) || 0,
      wakeUpTime: data.wakeUpTime || "",
      waterIntake: parseFloat(data.waterIntake) || 0,
      workout: !!data.workout,
      reading: !!data.reading,
      english: !!data.english,
      coding: !!data.coding,
      noSocialMedia: !!data.noSocialMedia,
    },
  });
}

// --- LIFE SCORE ACTIONS ---

export async function getLifeScores() {
  return await prisma.lifeScore.findMany({
    orderBy: { name: "asc" },
  });
}

export async function updateLifeScore(name: string, currentScore: number, targetScore: number, note: string) {
  return await prisma.lifeScore.update({
    where: { name },
    data: { currentScore, targetScore, note },
  });
}

// --- IKIGAI ACTIONS ---

export async function getIkigai() {
  const record = await prisma.ikigai.findFirst();
  if (!record) return null;
  return {
    ...record,
    love: JSON.parse(record.loveJson) as string[],
    goodAt: JSON.parse(record.goodAtJson) as string[],
    worldNeeds: JSON.parse(record.worldNeedsJson) as string[],
    paidFor: JSON.parse(record.paidForJson) as string[],
  };
}

export async function updateIkigai(
  id: string,
  data: {
    love: string[];
    goodAt: string[];
    worldNeeds: string[];
    paidFor: string[];
    summary: string;
  }
) {
  return await prisma.ikigai.update({
    where: { id },
    data: {
      loveJson: JSON.stringify(data.love),
      goodAtJson: JSON.stringify(data.goodAt),
      worldNeedsJson: JSON.stringify(data.worldNeeds),
      paidForJson: JSON.stringify(data.paidFor),
      summary: data.summary,
    },
  });
}

// --- ANALYTICS ACTIONS ---

export async function getAnalyticsData() {
  const days = await prisma.day.findMany({
    orderBy: { number: "asc" },
  });
  const habitLogs = await prisma.habitLog.findMany({
    orderBy: { dayNumber: "asc" },
  });

  // Filter out upcoming days/logs
  const activeDays = days.filter((d) => d.status !== "Upcoming");
  const loggedLogs = habitLogs.filter((h) => {
    const day = days.find((d) => d.number === h.dayNumber);
    return day && day.status !== "Upcoming";
  });

  // 1. Habit Completion Trend & Sleep & Screen Time & Weight Trend
  const habitTrendData = loggedLogs.map((h) => {
    let score = 0;
    if (h.workout) score++;
    if (h.reading) score++;
    if (h.english) score++;
    if (h.coding) score++;
    if (h.noSocialMedia) score++;
    const completion = Math.round((score / 5) * 100);

    return {
      name: `Day ${h.dayNumber}`,
      completion,
      sleep: h.sleepTime,
      screenTime: h.screenTime,
      weight: h.weight,
      waterIntake: h.waterIntake,
    };
  });

  // 2. Weekly Progress
  const weeklyProgressData = Array.from({ length: 9 }, (_, i) => {
    const weekNumber = i + 1;
    const weekDays = days.filter((d) => d.weekNumber === weekNumber);
    const completedDaysCount = weekDays.filter((d) => d.completed).length;
    const totalDaysCount = weekDays.length || 7;
    const progress = Math.round((completedDaysCount / totalDaysCount) * 100);

    return {
      name: `W${weekNumber}`,
      Progress: progress,
    };
  });

  // 3. Stats & Summaries
  const completedDaysCount = days.filter((d) => d.completed).length;

  // Streak calculation
  const completedDayNumbers = new Set(days.filter((d) => d.completed).map((d) => d.number));
  const activeDay = days.find((d) => d.status === "In Progress")?.number || 1;
  let currentStreak = 0;
  let checkDay = completedDayNumbers.has(activeDay) ? activeDay : activeDay - 1;
  while (checkDay > 0 && completedDayNumbers.has(checkDay)) {
    currentStreak++;
    checkDay--;
  }

  // Average Habit Completion
  let totalCompletion = 0;
  loggedLogs.forEach((h) => {
    let score = 0;
    if (h.workout) score++;
    if (h.reading) score++;
    if (h.english) score++;
    if (h.coding) score++;
    if (h.noSocialMedia) score++;
    totalCompletion += (score / 5) * 100;
  });
  const avgHabitCompletion = loggedLogs.length > 0 ? Math.round(totalCompletion / loggedLogs.length) : 0;

  // Best Week calculation
  let bestWeek = 1;
  let maxCompleted = -1;
  for (let w = 1; w <= 9; w++) {
    const weekDays = days.filter((d) => d.weekNumber === w);
    const compCount = weekDays.filter((d) => d.completed).length;
    const totalCount = weekDays.length || 7;
    const rate = compCount / totalCount;
    if (rate > maxCompleted) {
      maxCompleted = rate;
      bestWeek = w;
    }
  }

  // Averages for cards
  let totalSleep = 0, totalScreen = 0, totalWater = 0;
  loggedLogs.forEach((h) => {
    totalSleep += h.sleepTime;
    totalScreen += h.screenTime;
    totalWater += h.waterIntake;
  });
  const avgSleep = loggedLogs.length > 0 ? parseFloat((totalSleep / loggedLogs.length).toFixed(2)) : 0;
  const avgScreen = loggedLogs.length > 0 ? parseFloat((totalScreen / loggedLogs.length).toFixed(2)) : 0;
  const avgWater = loggedLogs.length > 0 ? parseFloat((totalWater / loggedLogs.length).toFixed(2)) : 0;

  // Daily Completion Rate Pie Chart Data
  const dailyCompletionRateData = [
    { name: "Completed", value: completedDaysCount },
    { name: "Remaining", value: 60 - completedDaysCount },
  ];

  return {
    habitTrendData,
    weeklyProgressData,
    completedDaysCount,
    currentStreak,
    avgHabitCompletion,
    bestWeek: `Week ${bestWeek}`,
    avgSleep,
    avgScreen,
    avgWater,
    dailyCompletionRateData,
  };
}

export async function getSettingsData() {
  const day1 = await prisma.day.findUnique({
    where: { number: 1 },
  });
  const day60 = await prisma.day.findUnique({
    where: { number: 60 },
  });

  return {
    startDate: day1?.date || "June 07, 2026",
    endDate: day60?.date || "Aug 06, 2026",
    dbType: "MySQL 8.0 (Docker)",
  };
}

export async function getDashboardData() {
  const days = await prisma.day.findMany({
    orderBy: { number: "asc" },
  });
  const habitLogs = await prisma.habitLog.findMany({
    orderBy: { dayNumber: "asc" },
  });
  const dailyRules = await prisma.dailyRule.findMany({
    orderBy: { id: "asc" },
  });
  const goals = await prisma.goal.findMany({
    orderBy: { order: "asc" },
  });

  const activeDay = days.find((d) => d.status === "In Progress") || days.find((d) => d.status === "Upcoming") || days[0];
  const activeDayLog = habitLogs.find((h) => h.dayNumber === activeDay.number);

  const completedDayNumbers = new Set(days.filter((d) => d.completed).map((d) => d.number));
  let currentStreak = 0;
  let checkDay = completedDayNumbers.has(activeDay.number) ? activeDay.number : activeDay.number - 1;
  while (checkDay > 0 && completedDayNumbers.has(checkDay)) {
    currentStreak++;
    checkDay--;
  }

  const completedDaysCount = days.filter((d) => d.completed).length;

  const week = await prisma.week.findUnique({
    where: { number: activeDay.weekNumber },
  });

  return {
    activeDayNumber: activeDay.number,
    activeWeekNumber: activeDay.weekNumber,
    activeDay: {
      ...activeDay,
      priorities: JSON.parse(activeDay.prioritiesJson),
      secondaries: JSON.parse(activeDay.secondariesJson),
    },
    activeDayLog,
    completedDaysCount,
    currentStreak,
    week: week ? {
      ...week,
      goals: JSON.parse(week.goalsJson) as string[],
    } : null,
    goals,
    dailyRules,
  };
}
