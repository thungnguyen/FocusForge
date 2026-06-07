# FocusForge — Monk Mode Digital Workbook (v1.0)

FocusForge is a premium, portfolio-ready digital productivity workbook inspired by the 60-day Monk Mode workbook concept. It enables individuals to plan, track, and analyze their daily discipline protocols, routines, and life areas within a beautifully styled Brutalist Zen sand-and-stone aesthetic.

---

## 🚀 Project Status
- **Version:** v1.0.0 (Release-Ready)
- **Status:** Completed core CRUD integrations, real database-backed analytics dashboard, custom settings display, and type safety validations.

---

## 🎨 Key Features

### 1. Daily Planner & 1-3-5 Checklist
- Plan each day with **1 Most Important Task (MIT)**, **3 Secondary Priorities**, and **5 Minor Tasks**.
- Mark tasks as completed, edit them inline, and automatically persist changes to the MySQL database on blur.

### 2. Kaizen Time Clock (24-Hour SVG Schedule)
- Interactive 24-sector wheel representing the 24 hours of the day.
- Highlight blocks for *Sleep*, *Work*, *Health*, and *Play* to build a visual representation of your daily schedule.

### 3. Habit Tracker (Spreadsheet Grid)
- Log metrics (Screen Time, Weight, Sleep duration, Wake-up time, Water intake) and core habits (Workout, Reading, English, Coding, No Social Media).
- Automatic compliance score calculations based on the 5 checklist items.

### 4. Interactive Analytics (Recharts Integration)
Six rich, real database-backed charts:
- **Habit Completion Trend** (AreaChart) over time.
- **Sleep Trend** (BarChart) compared against targets.
- **Screen Time Trend** (LineChart) tracking digital consumption.
- **Weight Trend** (LineChart) monitoring physical body weight.
- **Daily Completion Rate** (PieChart) showing completed vs. remaining days.
- **Weekly Progress** (BarChart) of goals met.

### 5. Bilingual System (English-Vietnamese)
- **English** for structural UI: page titles, sidebar, button actions, column headers.
- **Vietnamese** for guidance: helper text, reflections, placeholders, self-reflection prompts.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Vanilla CSS
- **Database ORM:** Prisma
- **Database Engine:** MySQL 8.0 (Docker containerized)
- **Database Driver Adapter:** `@prisma/adapter-mariadb` & `mariadb` (ensuring Prisma v7 runtime compatibility)
- **Charts:** Recharts

---

## 📁 Folder Structure

```text
focusforge/
├── docker-compose.yml     # Local MySQL 8.0 container setup
├── prisma/
│   ├── schema.prisma      # Prisma schemas for Mission, Days, HabitLogs, Weeks, etc.
│   └── seed.ts            # Database seeds for 60 days of logs, rules, and life-scores
├── src/
│   ├── app/
│   │   ├── actions.ts     # Next.js Server Actions (CRUD logic for all components)
│   │   ├── analytics/     # Analytics page with Recharts
│   │   ├── days/          # Days lists and Day details (1-3-5 checklist, SVG clock)
│   │   ├── habits/        # Habits spreadsheet tracker
│   │   ├── settings/      # Settings display
│   │   └── page.tsx       # Interactive Monk Mode Dashboard
│   ├── components/        # Reusable UI elements (AppShell, Sidebar, Cards)
│   └── lib/
│       └── prisma.ts      # Global Prisma client configuration with MariaDB driver adapter
└── tsconfig.json          # TypeScript configurations
```

---

## ⚙️ Getting Started & Setup

### 1. Prerequisites
Ensure you have the following installed:
- [Node.js (v18+)](https://nodejs.org/)
- [Docker & Docker Compose](https://www.docker.com/)

### 2. Run the MySQL Database Container
Start the local MySQL database instance using Docker:
```bash
docker compose up -d
```

### 3. Configure Environment Variables
Copy `.env.example` to create your local `.env` configuration:
```bash
cp .env.example .env
```
Ensure the connection string matches your Docker configuration:
```env
DATABASE_URL="mysql://focusforge_user:focusforge_password@localhost:3306/focusforge_db"
```

### 4. Install Dependencies
```bash
npm install
```

### 5. Push Schema & Seed Database
Initialize database tables and run the seed script to populate mock history for Day 1–7 and outline Day 8–60:
```bash
npx prisma db push
npx prisma db seed
```

### 6. Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts
- `npm run dev`: Runs the Next.js development server.
- `npm run build`: Builds the production bundle of the application.
- `npm run start`: Runs the built production server.
- `npx tsc --noEmit`: Performs a TypeScript compiler verification check.

---

## 🗺️ Roadmap
- [x] Visual MVP with Bilingual structure
- [x] Integrate MySQL database via Prisma ORM
- [x] Server Actions CRUD bindings (persist on blur/toggle)
- [x] Dynamic Analytics Dashboard with Recharts
- [ ] Authentication layer for multi-user support
- [ ] Export to PDF / printable workbook template format
