# FocusForge: Development Phases

This document outlines a practical, phase-by-phase development plan for building the FocusForge web app step by step. This structure is optimized for an AI coding agent to implement in an iterative, test-driven manner.

---

## Phase 1: Project Foundation and UI Skeleton

**Goal:** Establish the core application layout, routing structure, and brutalist/minimalist UI design system.

**Tasks:**
- Set up root layout (`layout.tsx`) with a global navigation sidebar/navbar.
- Configure Tailwind CSS variables for the "Brutalist Zen" theme (sand, slate, pastel highlights).
- Create a global UI component library for base elements (Cards, Buttons, Typography).
- Create empty placeholder pages for all major routes (`/dashboard`, `/setup`, `/tracker`, `/weeks`, `/daily`).

**Files likely to be created or modified:**
- `src/app/layout.tsx`, `src/app/page.tsx`
- `src/app/globals.css`, `tailwind.config.ts` (if applicable)
- `src/components/layout/Navbar.tsx`, `src/components/layout/Sidebar.tsx`
- `src/components/ui/Button.tsx`, `src/components/ui/Card.tsx`
- `src/app/dashboard/page.tsx`, `src/app/setup/page.tsx`, `src/app/tracker/page.tsx`, `src/app/weeks/page.tsx`, `src/app/daily/[date]/page.tsx`

**Acceptance Criteria:**
- The app compiles without errors.
- Navigation between the placeholder pages works.
- The global layout reflects the minimalist, warm-sand aesthetic.

**Manual Testing Checklist:**
- [ ] Run `npm run dev`.
- [ ] Click through all navigation links.
- [ ] Verify font loading and primary background colors.

**Git commit message suggestion:** `feat: set up foundational routing and UI design system`

---

## Phase 2: Prisma Database Setup and Seed Data

**Goal:** Ensure the database schema is correctly migrated and populated with mock data to facilitate UI development.

**Tasks:**
- Finalize `schema.prisma` with all mapped entities (User, Cycle, DailyLog, etc.).
- Create and run an initial MySQL migration.
- Write a seed script (`prisma/seed.ts`) to populate a dummy user, an active 60-day cycle, mock daily logs, and fake weekly goals.
- Configure Prisma Client instance in the `src/lib` directory.

**Files likely to be created or modified:**
- `prisma/schema.prisma`, `prisma/seed.ts`
- `package.json` (add seed script)
- `src/lib/prisma.ts`

**Acceptance Criteria:**
- Prisma Client is accessible anywhere in the Next.js backend.
- Running the seed script successfully creates an active cycle and mock data.

**Manual Testing Checklist:**
- [ ] Run `npx prisma migrate dev`.
- [ ] Run `npx prisma db seed`.
- [ ] Open `npx prisma studio` and verify mock records exist for `Cycle`, `DailyLog`, etc.

**Git commit message suggestion:** `chore: initialize Prisma migrations and generate seed data`

---

## Phase 3: Dashboard

**Goal:** Build the main daily execution overview screen (`/dashboard`).

**Tasks:**
- Fetch the active cycle and today's `DailyLog` via a server component.
- Build the "6 Non-Negotiables" habit checklist widget with toggle actions.
- Build a summarized 1-3-5 Priority Tasks widget.
- Build a weekly motivation/affirmation card.

**Files likely to be created or modified:**
- `src/app/dashboard/page.tsx`
- `src/components/dashboard/HabitChecklist.tsx`
- `src/components/dashboard/PriorityTasksWidget.tsx`
- `src/components/dashboard/QuoteCard.tsx`

**Acceptance Criteria:**
- Dashboard renders data from the MySQL database.
- Toggling a habit checkbox updates the database.

**Manual Testing Checklist:**
- [ ] Verify today's rules are displayed.
- [ ] Click a habit checkbox and refresh the page to ensure persistence.
- [ ] Check if the motivational quote is rendered.

**Git commit message suggestion:** `feat: implement main dashboard overview and habit checklist`

---

## Phase 4: Mission Setup

**Goal:** Create the onboarding wizard to configure a 60-day cycle (`/setup`).

**Tasks:**
- Build a multi-step form context (React State or URL params).
- Implement inputs for cycle dates and naming the 6 rules.
- Implement forms for past reflections and selecting the weakest life aspect.
- Build the "Goal Tree Diagram" component (3 Goals -> 3 Actions each).
- Create Server Actions to save the new `Cycle` and related entities.

**Files likely to be created or modified:**
- `src/app/setup/page.tsx`
- `src/components/setup/SetupWizard.tsx`
- `src/components/setup/GoalTreeMapper.tsx`
- `src/app/actions/cycleActions.ts`

**Acceptance Criteria:**
- Completing the wizard creates a new `Cycle` record in the database.
- Redirects to `/dashboard` upon successful setup.

**Manual Testing Checklist:**
- [ ] Fill out the multi-step form completely.
- [ ] Verify the goal tree inputs work.
- [ ] Submit and check Prisma Studio to ensure the new cycle is saved.

**Git commit message suggestion:** `feat: build cycle onboarding wizard and goal tree setup`

---

## Phase 5: Weekly Planner

**Goal:** Implement the weekly review and sprint planning views (`/weeks` and `/weeks/[id]`).

**Tasks:**
- Build the 9-week grid calendar view.
- Build the detailed weekly review layout with a dot-grid "Brain Dump" textarea.
- Implement inputs for the 4 Weekly Goals and Affirmation.
- Build a mini 7-day progress card grid for the specific week.

**Files likely to be created or modified:**
- `src/app/weeks/page.tsx`, `src/app/weeks/[id]/page.tsx`
- `src/components/weekly/WeekGrid.tsx`
- `src/components/weekly/BrainDumpEditor.tsx`
- `src/components/weekly/WeeklyGoals.tsx`
- `src/app/actions/weeklyActions.ts`

**Acceptance Criteria:**
- Users can view all weeks and click into a specific week.
- Text entered into the Brain Dump and Goals sections persists to the database.

**Manual Testing Checklist:**
- [ ] Navigate to `/weeks` and click "Week 1".
- [ ] Type notes into the Brain Dump and save.
- [ ] Refresh the page to confirm notes are loaded.

**Git commit message suggestion:** `feat: implement weekly planner, goals, and brain dump editor`

---

## Phase 6: Daily Planner

**Goal:** Create the detailed daily focus sheet and Kaizen Time Tracker (`/daily/[date]`).

**Tasks:**
- Build the 1-3-5 Priority List component with validation (limit exactly 1 MIT, 3 priorities, 5 minor).
- Develop the interactive circular SVG "Kaizen Time Tracker" clock.
- Implement interactions for clicking SVG wedges to assign time-block categories.
- Create Server Actions to sync tasks and time-blocks to the `DailyLog`.

**Files likely to be created or modified:**
- `src/app/daily/[date]/page.tsx`
- `src/components/daily/PriorityList.tsx`
- `src/components/daily/KaizenClock.tsx`
- `src/app/actions/dailyActions.ts`

**Acceptance Criteria:**
- Users can add tasks but are blocked from adding more than the 1-3-5 limit.
- The Kaizen clock allows segment selection and coloring.

**Manual Testing Checklist:**
- [ ] Add 1 MIT, 3 Priorities, and 5 minor tasks. Verify adding more is prevented.
- [ ] Click an hour wedge on the SVG clock and assign "Deep Work".
- [ ] Refresh the page to ensure the clock layout persists.

**Git commit message suggestion:** `feat: build 1-3-5 daily task manager and interactive Kaizen SVG clock`

---

## Phase 7: Habit Tracker

**Goal:** Implement the spreadsheet-like daily metrics logger (`/tracker`).

**Tasks:**
- Build a tabular grid displaying 30 days of the cycle.
- Add inline editable inputs for Screen Time, Weight, Sleep Hours, Wake Time, and Water.
- Implement server actions to batch update or auto-save cell inputs.

**Files likely to be created or modified:**
- `src/app/tracker/page.tsx`
- `src/components/tracker/SpreadsheetLog.tsx`
- `src/app/actions/trackerActions.ts`

**Acceptance Criteria:**
- Users can type numbers into the grid and they save automatically.
- Blank cells are gracefully handled.

**Manual Testing Checklist:**
- [ ] Navigate to the tracker.
- [ ] Enter a weight value for Day 1 and a sleep duration for Day 2.
- [ ] Refresh to ensure data remains intact.

**Git commit message suggestion:** `feat: implement tabular daily metrics spreadsheet tracker`

---

## Phase 8: Life Score and Ikigai

**Goal:** Implement the interactive self-reflection diagrams.

**Tasks:**
- Build the 10-axis Wheel of Life Radar Chart (using Recharts or custom SVG).
- Build the 4-circle Ikigai Venn Diagram layout.
- Integrate these components into the Setup Wizard (Phase 4) and a dedicated view area.

**Files likely to be created or modified:**
- `src/components/charts/WheelOfLife.tsx`
- `src/components/charts/IkigaiVenn.tsx`
- `src/app/dashboard/ikigai/page.tsx`

**Acceptance Criteria:**
- The radar chart visibly reshapes when scores are updated.
- The Ikigai Venn diagram handles text input for the 4 circles.

**Manual Testing Checklist:**
- [ ] Open the Wheel of Life component.
- [ ] Adjust the "Money" score to 8 and "Health" to 4; verify the polygon changes.
- [ ] Input text into the "What I love" circle intersection.

**Git commit message suggestion:** `feat: develop interactive Wheel of Life radar and Ikigai Venn diagrams`

---

## Phase 9: Analytics

**Goal:** Visualize the metrics logged in Phase 7.

**Tasks:**
- Add Recharts line charts for Weight progress over the cycle.
- Add bar charts for Sleep Duration and Water Intake.
- Display an overall "Habit Compliance" percentage chart.

**Files likely to be created or modified:**
- `src/app/tracker/page.tsx` (add analytics section)
- `src/components/tracker/WeightLineChart.tsx`
- `src/components/tracker/SleepBarChart.tsx`

**Acceptance Criteria:**
- Charts render accurately based on the `DailyLog` numeric data.
- Hovering over chart data points shows correct tooltips.

**Manual Testing Checklist:**
- [ ] Ensure mock data or entered data populates the graphs.
- [ ] Check if X-axis labels correctly align with cycle dates.

**Git commit message suggestion:** `feat: add Recharts analytics for sleep, water, and weight trends`

---

## Phase 10: UI Polish and GitHub Portfolio Cleanup

**Goal:** Finalize the aesthetic details and prepare the repository for showcase.

**Tasks:**
- Implement micro-animations (e.g., Framer Motion or CSS transitions on checkboxes and Kaizen wedges).
- Polish responsive design (ensure flex/grid behaves well on mobile dimensions).
- Add loading skeletons and error boundaries.
- Clean up unused code and ensure `README.md` clearly explains how to run the project.

**Files likely to be created or modified:**
- `src/app/loading.tsx`, `src/app/error.tsx`
- `tailwind.config.ts` (animation tokens)
- `README.md`
- Various component files for style polishing.

**Acceptance Criteria:**
- The app feels snappy, highly tactile, and visually cohesive.
- Repository has a clean history and descriptive README.

**Manual Testing Checklist:**
- [ ] Simulate network delay and test loading spinners.
- [ ] Resize the browser window to mobile width to verify responsive grids.
- [ ] Follow the `README.md` instructions from scratch to ensure local setup works seamlessly.

**Git commit message suggestion:** `style: polish UI animations, responsiveness, and update README`
