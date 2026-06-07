# FocusForge: Monk Mode Workbook PDF Analysis

This document provides a comprehensive analysis of the conceptual reference workbook `monk-mode-reference.pdf` for the FocusForge GitHub portfolio project. It breaks down the physical workbook's sections and design elements, and translates them into web application features, database entities, UI components, and visual styling.

---

## 1. Summary of the Workbook

The reference workbook is a **60-Day Monk Mode Journal**. "Monk Mode" is defined as a period of extreme focus and effort, where a person commits to a set of non-negotiable daily habits to achieve specific life goals. 

The workbook is structured as a physical journal that guides the user from high-level self-reflection (Wheel of Life, Ikigai, 60-Day Goal Setting) down to tactical planning (Weekly planning, Daily 1-3-5 task prioritization, and circular time-blocking).

---

## 2. Section-by-Section Breakdown

### Cover & Core Protocol (Pages 1–2)
* **Visual Elements:** gorilla mascot/logo with "TH - NO PAIN NO GAIN", minimalist grid tables.
* **Content:**
  * Define **6 Non-Negotiable Rules (Quy Tắc)** that must be completed every single day.
  * Start and End dates for the 30-day block (note: the tracker is 30 days, while the workbook mission is 60 days).
  * A 30-day habit checklist grid (Days 1–30 on rows, Rules 1–6 on columns) to check off rules daily.

### 60-Day Mission & Wheel of Life (Page 3)
* **Visual Elements:** A 10-axis radar chart ("Wheel of Life") rating scale 0–10.
* **Content:**
  * Reflection prompts on the last 60 days.
  * Selection of the most important goal for the next 60 days.
  * Wheel of Life scoring across 10 life domains: Money (Tiền bạc), Physical (Thể chất), Relationships (Mối quan hệ), Family (Gia đình), Friends (Bạn bè), Career (Sự nghiệp), Work (Công việc), Joy (Niềm vui), Spirit (Tinh thần), Education (Giáo dục).

### Action Planning & Timeline (Page 4)
* **Visual Elements:** Hierarchical branching tree diagram (1 weakness -> 3 main goals -> 3 action steps each).
* **Content:**
  * Identifying the weakest domain to improve.
  * Specifying 3 main goals (3 Mục tiêu chính).
  * Outlining 3 action items (3 Hành động cụ thể) for each goal.
  * Bottom timeline axis to sketch key milestones.

### Ikigai Alignment (Page 5)
* **Visual Elements:** A clean 4-circle Venn diagram.
* **Content:**
  * Identifying overlaps between: *What you love* (Thứ tôi thích), *What you are good at* (Thứ tôi giỏi), *What the world needs* (Việc thế giới cần), and *What you can be paid for* (Thứ tôi kiếm được tiền).
  * Guiding the user toward self-discovery and alignment.

### 60-Day Overview Calendar (Page 6)
* **Visual Elements:** 9-box grid (Weeks 1 to 9).
* **Content:**
  * High-level weekly notes and summaries of achievements.

### Metrics Tracker (Page 7)
* **Visual Elements:** 30-row numeric table.
* **Content:**
  * Daily logging of quantitative metrics:
    1. Screen Time
    2. Weight (Cân nặng)
    3. Sleep Duration/Bedtime (Giờ ngủ)
    4. Wake-up Time (Giờ dậy)
    5. Water Intake (Lượng nước)
    6. Two customizable tracker columns.

### Weekly Planning & Brain Dump (Pages 8–9)
* **Visual Elements:** Left column contains motivational quotes; right column contains a dot-grid "Brain Dump" notes area and 4 weekly goals; bottom section contains lines for weekly positive affirmations.
* **Weekly Layout Grid (Page 9):** A 7-day compact grid showing "Focus (Tập trung)" and notes fields for each day of the upcoming week.

### Daily Sheets (Pages 10–16, repeated weekly)
* **Visual Elements:** 1-3-5 checklist layout on top; analog circular "Kaizen Time Tracker" clock wheel at the bottom.
* **Content:**
  * **1-3-5 Task Rule:**
    * **1 MIT** (Most Important Task / Việc quan trọng nhất)
    * **3 Secondary Priorities** (3 Việc ưu tiên sau)
    * **5 Minor Tasks** (5 Việc sau cùng)
  * **Kaizen Time Tracker:** Circular clock diagram (typically divided into 12 or 24 hourly segments) to block out time and map daily energy/activities visually.

---

## 3. Suggested App Screens / Pages

To build a fully functional Next.js application, we will translate the static workbook pages into interactive routes:

1. **Dashboard (Home): `/dashboard`**
   * Overview of the current day's progress (1-3-5 list, Kaizen wheel status, habit checkbox status).
   * Weekly motivation card and habit quick-check list.

2. **Onboarding / Setup: `/setup`**
   * Guided multi-step form to initialize a 60-Day Monk Mode cycle:
     * Define the 6 non-negotiable rules.
     * Fill in past reflection & set start/end dates.
     * Interactive **Wheel of Life** (radar chart) input.
     * Interactive **Ikigai** input (filling text in overlapping circles).
     * Set the Weakest Area & detail the 3 Goals + 3 Action Actions tree.

3. **Metrics Tracker: `/tracker`**
   * Tabular spreadsheet-like grid to log screen time, weight, sleep, wake time, and water daily.
   * Visual charts (line/bar graphs) to display trend analytics for weight, sleep, and water over time (powered by `recharts`).

4. **Weekly Planner: `/weeks` and `/weeks/[id]`**
   * Review weekly performance and plan the upcoming week.
   * Brain Dump markdown editor or canvas board.
   * Define Weekly Goals and weekly positive affirmations.
   * 7-day overview card grid.

5. **Daily Focus & Kaizen Wheel: `/daily/[date]`**
   * Interactive 1-3-5 task checklist (toggle completed, edit task content).
   * Interactive **Kaizen Time Blocking Wheel**: An SVG/CSS wheel where users click segments to color-code and label time blocks (e.g., Deep Work, Exercise, Sleep, Leisure).

---

## 4. Suggested Database Entities (Prisma Model Map)

Based on the tracking tables and data entry points, here is a suggested schema for `schema.prisma`:

```prisma
model User {
  id        String    @id @default(uuid())
  email     String    @unique
  name      String?
  cycles    Cycle[]
  createdAt DateTime  @default(now())
}

model Cycle {
  id            String         @id @default(uuid())
  userId        String
  user          User           @relation(fields: [userId], references: [id])
  startDate     DateTime
  endDate       DateTime
  isActive      Boolean        @default(true)
  
  // Core Monk Mode Protocol
  rule1         String         @default("No Alcohol")
  rule2         String         @default("30m Reading")
  rule3         String         @default("Exercise")
  rule4         String         @default("Deep Work")
  rule5         String         @default("No Sugar")
  rule6         String         @default("Meditation")
  
  // 60-Day Mission Setup
  reflection60  String?        // Reflection on past 60 days
  mainMission   String?        // What is most important in next 60 days?
  wheelScoreId  String?        @unique
  wheelScore    WheelScore?    @relation(fields: [wheelScoreId], references: [id])
  
  // Planning Area
  weakestArea   String?
  goals         Goal[]
  ikigai        Ikigai?
  
  // Daily and Weekly logs
  weeklyReviews WeeklyReview[]
  dailyLogs     DailyLog[]
  
  createdAt     DateTime       @default(now())
}

model WheelScore {
  id           String   @id @default(uuid())
  money        Int      @default(0) // 0 - 10
  physical     Int      @default(0)
  relationship Int      @default(0)
  family       Int      @default(0)
  friends      Int      @default(0)
  career       Int      @default(0)
  work         Int      @default(0)
  joy          Int      @default(0)
  spirit       Int      @default(0)
  education    Int      @default(0)
  cycle        Cycle?
}

model Goal {
  id        String   @id @default(uuid())
  cycleId   String
  cycle     Cycle    @relation(fields: [cycleId], references: [id])
  title     String
  order     Int      // 1, 2, 3
  actions   Action[]
}

model Action {
  id        String   @id @default(uuid())
  goalId    String
  goal      Goal     @relation(fields: [goalId], references: [id])
  content   String
  order     Int      // 1, 2, 3
}

model Ikigai {
  id          String   @id @default(uuid())
  cycleId     String   @unique
  cycle       Cycle    @relation(fields: [cycleId], references: [id])
  whatILove   String?  // Rich text or JSON array
  whatImGoodAt String?
  whatWorldNeeds String?
  whatIPaidFor String?
}

model WeeklyReview {
  id          String   @id @default(uuid())
  cycleId     String
  cycle       Cycle    @relation(fields: [cycleId], references: [id])
  weekNumber  Int      // 1 to 9
  brainDump   String?  // Rich text notes
  goal1       String?
  goal2       String?
  goal3       String?
  goal4       String?
  affirmation String?  // Weekly affirmation
  createdAt   DateTime @default(now())
}

model DailyLog {
  id          String    @id @default(uuid())
  cycleId     String
  cycle       Cycle     @relation(fields: [cycleId], references: [id])
  date        DateTime
  
  // Habit Checklist
  qt1Completed Boolean   @default(false)
  qt2Completed Boolean   @default(false)
  qt3Completed Boolean   @default(false)
  qt4Completed Boolean   @default(false)
  qt5Completed Boolean   @default(false)
  qt6Completed Boolean   @default(false)

  // Metrics Tracker
  screenTime  Float?    // in hours
  weight      Float?    // in kg/lbs
  sleepHours  Float?    
  wakeTime    String?   // HH:MM format
  waterIntake Float?    // in liters
  custom1     String?
  custom2     String?
  
  // 1-3-5 Task list
  tasks       Task[]
  
  // Kaizen Time Blocking (serialized time slots JSON, e.g. [{"hour": 8, "activity": "Deep Work", "category": "WORK"}])
  timeBlocks  String?   @default("[]") 
}

model Task {
  id          String   @id @default(uuid())
  dailyLogId  String
  dailyLog    DailyLog @relation(fields: [dailyLogId], references: [id])
  type        String   // "MIT" (1), "PRIORITY" (3), "MINOR" (5)
  content     String
  isCompleted Boolean  @default(false)
  order       Int
}
```

---

## 5. Suggested UI Components

We should build modular, beautiful, and interactive React components that match the workbook's minimalist but digitalized nature:

1. **Interactive Wheel of Life (Radar Chart):**
   * Uses SVG or a responsive `recharts` `<RadarChart>` where users can drag nodes to adjust scores, or input values that dynamically redraw the shape.

2. **Ikigai Venn Diagram Board:**
   * A modern CSS grid-layered circle layout. Clicking each overlap circle slides open a card to edit items, with active hover highlighting.

3. **Kaizen Time Tracker Clock:**
   * A custom circular SVG clock face split into 24 clickable wedges representing hours. Users drag-select wedges to bulk-allocate activities, which highlights sectors with custom pastel theme colors.

4. **Tree Structure Goal Mapper:**
   * A clean visual layout showing the Weakness aspect connected by animated SVG path lines down to the 3 Goal nodes and 3 Action nodes.

5. **Motivate Cards:**
   * Retro-minimalist styled cards displaying discipline quotes in bold typography, matching the left-column visual theme of the weekly pages.

---

## 6. Design Notes

* **Palette:** Adapt the brutalist, natural, sand-textured style of the workbook.
  * **Primary Background:** Slate gray, warm sand/beige (`hsl(45, 15%, 95%)`), or sleek dark mode (`hsl(220, 15%, 10%)`).
  * **Borders/Lines:** Thin, clean, charcoal borders (`border-slate-800/10` or `border-slate-100/10`).
  * **Highlights/Time-blocks:** Clean, low-saturated earth-tone pastels (olive green, terracotta orange, muted indigo, ochre yellow).
* **Typography:** Modern serif/sans-serif combination (e.g., *Outfit* or *Inter* for headers/labels, and *Playfair Display* or *Merriweather* for motivational quotes and affirmations).
* **Vibe:** Clean, focused, analog-feeling. No distracting animations, but smooth micro-transitions when checking off habits or editing tables to give a premium, tactile response.

---

## 7. MVP Features Plan

To create a powerful MVP that immediately shows value as a portfolio project:

1. **Cycle Setup Wizard:** User enters rules, dates, and answers onboarding reflections.
2. **Interactive Radar Chart (Wheel of Life):** Set up baseline and view transformation.
3. **Daily Dashboard:** 
   * Habit checklist (6 rules) for today.
   * Daily 1-3-5 task manager.
   * Basic time tracker input.
4. **Habit Tracker Calendar:** A monthly layout dashboard showing checkboxes colored by compliance rates.
5. **SQLite Syncing via Prisma:** Instant persistence for single-user offline-first flow.
