# FocusForge: Product Requirement Document (PRD)

This document specifies the product requirements for **FocusForge**, a portfolio-ready productivity web application designed to digitize, gamify, and enhance the physical 60-day Monk Mode journal/workbook concept.

---

## 1. Project Overview
FocusForge is a digital self-discipline workbook that allows users to embark on structured productivity sprint cycles (typically 60 days). "Monk Mode" is a commitment to a period of heightened focus, requiring daily checkboxes for 6 non-negotiable rules, alongside a goal-setting and execution framework.

Rather than a simple checklist, FocusForge merges high-level self-reflection (Venn-diagram Ikigai alignment, 10-spoke Wheel of Life mapping) with weekly sprint reviews and day-to-day tactical execution (1-3-5 priority lists, circular Kaizen time-blocking). The application is built to be a standalone, self-contained portfolio project with a premium local-first experience.

---

## 2. Target User
* **High-Performance Seekers:** Professionals, students, and developers looking to break bad habits and optimize focus.
* **Minimalist Aesthetics Lovers:** Users who find standard dashboard tools cluttered or overwhelming and prefer a distraction-free, analog-style visual environment.
* **Self-Discipline Devotees:** People who appreciate the rigor of "Monk Mode" protocols and want a structured, data-driven approach to track their compliance.

---

## 3. Problem Statement
Existing productivity apps fall into two camps:
1. **Generic Checklist Tools:** (e.g., Todoist, Streaks) which track individual tasks or habits but lack long-term conceptual framing (Why are we doing this? Which area of life is weak?).
2. **Heavyweight Project Management Tools:** (e.g., Notion, Jira) which require significant manual configuration, lack native charting analytics, and feel impersonal and administrative.

Physical workbooks (like the Monk Mode journal) solve this by providing a conceptual framework, but they lack long-term data tracking, weight/sleep progression charts, flexible time-blocking interfaces, and portability.

---

## 4. Product Goals
* **Bridge Long-Term & Daily Focus:** Seamlessly connect the user's core Ikigai values and Wheel of Life scores to their weekly goals and daily task lists.
* **Premium Visual Design:** Wow users with a warm, minimalist, brutalist design system (sand/slate colors, premium serif fonts) that evokes the physical feel of a high-end Moleskine notebook.
* **Tactile Interactions:** Implement unique, interactive SVG elements (like a clickable circular time-wheel and a draggable radar chart) to replace standard text boxes.
* **Offline-First Reliability:** Deliver instant performance and private data storage using a local SQLite database, allowing users to run the app entirely on their own machines.

---

## 5. Tech Stack
* **Framework:** Next.js 16 (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS 4 with Tailwind PostCSS
* **Icons:** Lucide React
* **Database & ORM:** SQLite database managed via Prisma ORM
* **Data Visualization:** Recharts (for radar charts and metric analytics)

---

## 6. Core Pages

### 6.1 Onboarding / Setup Wizard (`/setup`)
A multi-step setup flow to configure a Monk Mode cycle:
* **Step 1: Protocol Configuration:** Set Start/End dates, and name the 6 Non-Negotiable Rules (prepopulated with defaults like "No Sugar", "30m Exercise", "1h Deep Work").
* **Step 2: Wheel of Life Calibration:** Fill in current life scores (0-10) across 10 areas, displaying a dynamic radar chart preview.
* **Step 3: Weakness & Goals Tree:** Input the weakest area to improve, define 3 main goals for the sprint, and map 3 specific action steps to each goal.
* **Step 4: Ikigai Mapping:** Fill text into the four overlapping sectors of the Ikigai Venn Diagram.

### 6.2 Home / Daily Execution Dashboard (`/dashboard`)
The primary landing board for daily use:
* **Today's Status Overview:** A checklist of the 6 non-negotiable rules.
* **Today's 1-3-5 Priority Panel:** Quick look at today's MIT and secondary priorities, with checkout checkboxes.
* **Kaizen Time blocking summary:** Compact clock SVG showing current hour category.
* **Weekly Focus Quote Card:** Displays the weekly quote and current day count (e.g., "Day 12 / 60").

### 6.3 Daily Focus Planner (`/daily/[date]`)
A detail view for scheduling and executing a specific calendar date:
* **1-3-5 Task Board:** Text inputs validating tasks according to the 1-3-5 rule:
  * Exactly 1 Most Important Task (MIT).
  * Up to 3 Secondary Priorities.
  * Up to 5 Minor Tasks.
* **Kaizen Time Tracker (Circular SVG Clock):** An interactive 24-wedge SVG wheel. Users click and drag over segments to color-code them by category (e.g., Deep Work, Sleep, Gym, Leisure) and assign brief activity descriptions.

### 6.4 Metrics Tracker Spreadsheet (`/tracker`)
A logging board for daily analytics:
* **Logging Grid:** A spreadsheet-style table with columns for Date, Screen Time, Weight, Sleep Hours, Wake Time, Water Intake, and two custom metrics.
* **Trend Analytics Charts:** Line charts plotting Weight progress, bar charts for Sleep/Water intake over the cycle.

### 6.5 Weekly Reviews and Overview (`/weeks` & `/weeks/[id]`)
* **Weekly list:** Grid of the 9 weeks of the cycle.
* **Review Screen (`/weeks/[id]`):**
  * **Brain Dump:** A markdown notes field with a dot-grid canvas feel.
  * **Weekly Goal List:** Set 4 core milestones for the week.
  * **Weekly Affirmation:** Text area to write down a positive affirmation statement.
  * **7-Day Grid Summary:** A mini 7-card layout showcasing daily completion checkboxes and notes.

---

## 7. Core Features Specification

### 7.1 Kaizen Time blocking clock
* **Input Interface:** Custom circular SVG consisting of 24 pie slices representing hours.
* **Interaction:** Drag-to-select slices, opening a dropdown to select a category (Work, Sleep, Health, Play). Selected wedges update their background colors instantly.
* **Export:** Saves time blocks in the database as a JSON array (`TimeBlock[]`).

### 7.2 Draggable Wheel of Life Radar Chart
* **Visuals:** 10-axis radar layout representing money, health, career, etc.
* **Input:** Clicking points on the chart scales the values between 0 and 10, updating the visual shape of the polygon dynamically in real-time.

### 7.3 Goal Tree Diagram
* **Visuals:** SVG tree linking one core weakness node to 3 Goal nodes, branching out into 3 Action Step nodes each.
* **Interaction:** Clicking nodes highlights them and reveals an editor panel to edit texts.

---

## 8. MVP Scope
* **Single-User Cycle Lifecycle:** Start, run, and complete a 60-day cycle.
* **Interactive Setup Wizard:** Onboarding forms for Wheel of Life, Ikigai, and Goal mapping.
* **Daily Dashboard & Execution Page:** 1-3-5 checklist, circular Kaizen schedule SVG widget, 6-rule habit checklist.
* **Weekly Sprint Review:** Setup weekly goals, Brain Dump notes, and affirmation lists.
* **Spreadsheet Logger:** Simple quantitative metrics logging (Sleep, Water, Screen Time, Weight) with recharts trends.
* **Local SQLite DB Persistence:** Using Prisma Client locally.

---

## 9. Out-of-Scope (Post-MVP Roadmap)
* Multi-user cloud accounts / Team workbooks.
* Social feeds, sharing habit scores, or group Monk Mode challenges.
* Stripe billing / Subscriptions.
* Mobile Native iOS/Android apps (kept strictly as a web application).

---

## 10. UI Design Direction

### 10.1 Theme & Aesthetics
* **Theme Name:** *Brutalist Zen*
* **Core Styling Rules:** High-contrast borders, solid monochrome lines, absolute simplicity combined with warm organic colors.
* **Colors:**
  * **Background:** Warm sand/beige (`hsl(45, 15%, 95%)`) or dark charcoal (`hsl(220, 15%, 10%)`).
  * **Card Board:** Off-white (`hsl(0, 0%, 100%)`) or dark slate (`hsl(215, 20%, 15%)`).
  * **Borders:** Crisp black lines (`hsl(0, 0%, 0%)`) or clean borders (`hsl(0, 0%, 20%)`).
  * **Highlights (Time blocks):** Desaturated earthy colors (terracotta orange, olive green, muted indigo, ochre yellow).
* **Typography:**
  * **Headings:** Google Fonts *Outfit* or *Syne* (modern geometric sans-serif).
  * **Quotes/Affirmations:** Google Fonts *Playfair Display* or *Merriweather* (premium serif).
  * **Tables/Logs:** Monospace font (e.g., *JetBrains Mono*) for numerical readouts.

---

## 11. Data Requirements & Prisma Schema Mapping

The database must persist the state of all components:
1. **Cycle Table:** Stores active status, start/end dates, and rule names.
2. **WheelScore Table:** Persists rating scores (0-10) for the 10 domains.
3. **Goal & Action Tables:** Branching relationship mapping weakness -> goals -> action subtasks.
4. **DailyLog Table:** Checklist completions, metrics (weight, sleep time), and serialized Kaizen clock JSON blocks.
5. **Task Table:** Tracks task texts, priority types (MIT, Secondary, Minor), and checkboxes.
6. **WeeklyReview Table:** Holds brain dump notes, weekly goals, and weekly affirmations.

---

## 12. Future Roadmap
* **Offline PWA Support:** Adding service workers to cache layouts for offline access on mobile browsers.
* **Export to PDF:** Generate a printable PDF of your completed 60-day journal.
* **Integrations:** Direct API integrations to fetch screen time (via Apple Screen Time API / Google Digital Wellbeing) and sleep metric logs from smartwatch data.
