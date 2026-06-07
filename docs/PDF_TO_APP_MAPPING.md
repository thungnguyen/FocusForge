# FocusForge: PDF Workbook to Web App Mapping

This document details the exact mapping from the physical sheets of the Monk Mode workbook (`monk-mode-reference.pdf`) to the interactive web application components, Prisma database schemas, user actions, and UI design rules for **FocusForge**.

---

## 1. Cover & Core Protocol (Pages 1-2)

| Dimension | Specification |
| :--- | :--- |
| **PDF Section** | Cover & Daily Habit Checklist |
| **Workbook Meaning** | Defines a 30-day block (within the 60-day cycle) where the user commits to **6 Non-Negotiable Rules** (Quy Tắc) and tracks daily compliance. |
| **App Mapping** | **Dashboard (`/dashboard`)** (Today's Quick Check) & **Setup Wizard (`/setup`)** (Define rules). |
| **Database Fields** | `Cycle.startDate`, `Cycle.endDate`, `Cycle.rule1` to `rule6` (text strings); `DailyLog.qt1Completed` to `qt6Completed` (booleans). |
| **User Actions** | 1. Initialize cycle dates and custom rule names in onboarding wizard.<br>2. Toggle daily habit checkboxes completed/uncompleted from the main dashboard dashboard cards. |
| **UI Design Notes** | Checkboxes should feel organic and tactile. Hovering over a checkbox shows a smooth pastel hover halo. Checking off a habit plays a quick micro-animation and updates a circle progress bar for the day. |

---

## 2. 60-Day Mission & Wheel of Life (Page 3)

| Dimension | Specification |
| :--- | :--- |
| **PDF Section** | 60-Day Mission & Life Wheel Radar Chart |
| **Workbook Meaning** | Prompts self-reflection on the past 60 days, sets the core mission focus for the next 60 days, and scores current life balance (0-10) across 10 distinct domains. |
| **App Mapping** | **Setup Wizard Step 2** (Onboarding calibration) & **Dashboard (`/dashboard`)** (Display current wheel). |
| **Database Fields** | `Cycle.reflection60` (text), `Cycle.mainMission` (text), `WheelScore` model with 10 integer ratings (`money`, `physical`, `relationship`, `family`, `friends`, `career`, `work`, `joy`, `spirit`, `education`). |
| **User Actions** | 1. Input reflection and mission statement texts.<br>2. Adjust scores on an **Interactive SVG Radar Chart** (either dragging axis nodes or using a slider inputs pane). |
| **UI Design Notes** | The radar chart uses a sleek CSS/SVG container. Hovering over an axis node enlarges the score marker. The polygon fills with a semi-transparent pastel indigo overlay (`rgba(99, 102, 241, 0.15)`) with crisp black borders. |

---

## 3. Action Planning & Timeline (Page 4)

| Dimension | Specification |
| :--- | :--- |
| **PDF Section** | Planning Tree & Milestones |
| **Workbook Meaning** | Pinpoints the weakest area of life to improve, sets 3 main goals (Mục tiêu), divides each goal into 3 concrete action steps (Hành động), and maps a timeline. |
| **App Mapping** | **Setup Wizard Step 3** (Goal Planner tree component) & **Dashboard Page** (Goals visualization card). |
| **Database Fields** | `Cycle.weakestArea` (text); `Goal` model (relation to `Cycle`, fields: `title`, `order`); `Action` model (relation to `Goal`, fields: `content`, `order`). |
| **User Actions** | 1. Enter weakest area name.<br>2. Complete the visual Goal Tree (typing Goals 1-3, and corresponding Actions 1-3). |
| **UI Design Notes** | Organized as a dynamic node tree layout. SVG connecting paths anchor goals to actions. Hovering over any path lights up the connector stroke to highlight relationship mapping. |

---

## 4. Ikigai Venn Diagram (Page 5)

| Dimension | Specification |
| :--- | :--- |
| **PDF Section** | Ikigai Self-Discovery Board |
| **Workbook Meaning** | Guides self-alignment by mapping entries in four categories: *What I love*, *What I am good at*, *What the world needs*, and *What I can be paid for*. |
| **App Mapping** | **Setup Wizard Step 4** (Interactive Venn diagram interface) & **Info Hub (`/dashboard/ikigai`)**. |
| **Database Fields** | `Ikigai` model (relation to `Cycle`, fields: `whatILove`, `whatImGoodAt`, `whatWorldNeeds`, `whatIPaidFor` as serialized JSON/text arrays). |
| **User Actions** | 1. Click on a circle segment to zoom in.<br>2. Add or remove alignment text items in bullet-list popover panels. |
| **UI Design Notes** | Made of 4 overlapping SVG circles using transparent color overlays. Hovering over overlaps (e.g., Passion = Love + Skill) highlights the intersected path and pops up a micro-tooltip explaining the relationship. |

---

## 5. 60-Day Overview Calendar (Page 6)

| Dimension | Specification |
| :--- | :--- |
| **PDF Section** | 60-Day Overview / Weekly Logs |
| **Workbook Meaning** | A 9-box grid representing Weeks 1-9 to summarize macro weekly wins and plan ahead. |
| **App Mapping** | **Calendar Navigation `/weeks`** dashboard. |
| **Database Fields** | Query `WeeklyReview` models associated with the active cycle. |
| **User Actions** | 1. View all 9 weeks of the cycle in a card grid layout.<br>2. Click a weekly box to route to `/weeks/[id]` for sprint-planning and review. |
| **UI Design Notes** | Weeks are shown as brutalist card items. Active week highlights with a bold double border. Future weeks are slightly transparent. Displays mini-progress icons representing daily habit checkboxes completed during that week. |

---

## 6. Metrics Tracker (Page 7)

| Dimension | Specification |
| :--- | :--- |
| **PDF Section** | Daily Metrics Tracker Spreadsheet |
| **Workbook Meaning** | Numerical table logging daily metrics (Screen Time, Weight, Sleep hours, Wake time, Water, custom 1 & 2) over 30-day periods. |
| **App Mapping** | **Spreadsheet Logger (`/tracker`)** (Tabular log interface with analytics graphs). |
| **Database Fields** | `DailyLog.screenTime` (float), `DailyLog.weight` (float), `DailyLog.sleepHours` (float), `DailyLog.wakeTime` (string), `DailyLog.waterIntake` (float), `DailyLog.custom1` (string), `DailyLog.custom2` (string). |
| **User Actions** | 1. Enter numeric values in an inline-editable grid table.<br>2. Filter Recharts graphs by date range (e.g., Week, Month). |
| **UI Design Notes** | Clean, monospace tabular layout. Cells highlight in terracotta or sand when active. Incorporates Recharts components (LineChart and BarChart) displaying weight lines, wake time trends, and water bars. |

---

## 7. Weekly Planning & Brain Dump (Pages 8-9, 17-18)

| Dimension | Specification |
| :--- | :--- |
| **PDF Section** | Weekly Setup, Brain Dump & Affirmations |
| **Workbook Meaning** | Start of the week: write weekly positive affirmations, log 4 key weekly goals, sketch/note in a "Brain Dump" grid, and plan daily focuses in a compact 7-day calendar. |
| **App Mapping** | **Weekly Review & Planning Screen (`/weeks/[id]`)**. |
| **Database Fields** | `WeeklyReview.brainDump` (text), `WeeklyReview.goal1` to `goal4` (strings), `WeeklyReview.affirmation` (text). |
| **User Actions** | 1. Write affirmations and 4 goals for the week.<br>2. Edit notes in a digital markdown "Brain Dump" note editor. |
| **UI Design Notes** | The Brain Dump uses a custom styling that displays a subtle dot-grid background mimicking sketch paper. Quotes are styled using playfair italics, centered inside card widgets. |

---

## 8. Daily Sheets (Pages 10-16, repeated daily)

| Dimension | Specification |
| :--- | :--- |
| **PDF Section** | Daily 1-3-5 priorities & Kaizen time tracker wheel |
| **Workbook Meaning** | Tactical daily sheets: logging tasks using the 1-3-5 priority rule (1 MIT, 3 priorities, 5 minor tasks) and planning hourly activities using a circular scheduler. |
| **App Mapping** | **Daily Focus Board (`/daily/[date]`)** and `/dashboard`. |
| **Database Fields** | `Task` model records (relation to `DailyLog`, fields: `type` (Enum MIT/PRIORITY/MINOR), `content`, `isCompleted`, `order`); `DailyLog.timeBlocks` (serialized JSON array). |
| **User Actions** | 1. Enter task content (inputs validate max limits: 1 MIT, 3 secondary, 5 minor).<br>2. Toggle task complete/incomplete checkboxes.<br>3. Drag-select hour segments on the SVG clock wheel to allocate time slots. |
| **UI Design Notes** | **The Kaizen Clock:** Custom SVG circular dial divided into 24 clickable segments. Clicking a slice opens an inline popover to name the activity and select its category. Slices are colored using earth-toned pastel colors depending on the chosen type (e.g., olive green for Deep Work, indigo for Sleep). |
