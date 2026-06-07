# 🌌 FocusForge — Monk Mode Digital Workbook (v1.0)

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.0.0-stone?style=for-the-badge&logo=semver" alt="Version" />
  <img src="https://img.shields.io/badge/Next.js-15-stone?style=for-the-badge&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-Supported-stone?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Database-MySQL-stone?style=for-the-badge&logo=mysql" alt="MySQL" />
  <img src="https://img.shields.io/badge/ORM-Prisma-stone?style=for-the-badge&logo=prisma" alt="Prisma" />
</p>

FocusForge is a premium, portfolio-ready digital productivity workbook inspired by the **60-day Monk Mode workbook** concept. Built with a minimalist **Brutalist Zen** design, it empowers users to eliminate distractions, enforce core discipline protocols, and reflect on their daily growth through structured journaling, interactive schedule clocks, and live database analytics.

---

## 📖 Table of Contents
1. [🌟 Key Highlights](#-key-highlights)
2. [🎨 Design & Aesthetics](#-design--aesthetics)
3. [⚙️ Tech Stack](#️-tech-stack)
4. [📁 Folder Structure](#-folder-structure)
5. [🛠️ Getting Started](#️-getting-started)
6. [📖 Hướng Dẫn Sử Dụng (User Guide)](#-hướng-dẫn-sử-dụng-user-guide)
7. [📜 Available Scripts](#-available-scripts)

---

## 🌟 Key Highlights

- **Daily 1-3-5 Planner**: Organize your day around **1 Most Important Task (MIT)**, **3 Secondary Priorities**, and **5 Minor Tasks** with dynamic auto-saving.
- **Kaizen Time Clock**: Visual 24-sector interactive SVG scheduler to divide your days into *Sleep*, *Work*, *Health*, and *Play* routines.
- **Metric Spreadsheet**: An spreadsheet-like tracker to input screen time, weight, sleep, water, and check off daily habit protocols (Workout, Reading, English, Coding, No Social Media).
- **Dynamic Analytics Dashboard**: Six real-time charts powered by Recharts (Habit compliance rate, sleep patterns, screen time lines, weight changes, cumulative completion rate, and weekly progress) pulling directly from your MySQL instance.
- **Bilingual Interface**: English structure for a clean professional look (titles, navigation, column headers) combined with Vietnamese guidance (reflection prompts, helper instructions, placeholders).

---

## 🎨 Design & Aesthetics

FocusForge implements a curated **Brutalist Zen** sand-and-stone color palette:
- **Calm, High-contrast Borders**: Flat cards and thick borders resembling Moleskine notebooks.
- **Focus-first Layout**: Elimination of noisy components, blinking animations, or vibrant banners to protect your workspace from digital fatigue.
- **Handwriting Accents**: Seamless integration of handwriting fonts for personal reflections and self-journal entries.

---

## ⚙️ Tech Stack

- **Framework:** Next.js 15 (App Router & Server Actions)
- **Language:** TypeScript
- **Styling:** Tailwind CSS & Custom CSS Variables
- **Database ORM:** Prisma
- **Database Engine:** MySQL 8.0 (Containerized via Docker Compose)
- **Database Driver Adapter:** `@prisma/adapter-mariadb` & `mariadb`
- **Charts:** Recharts

---

## 📁 Folder Structure

```text
focusforge/
├── docker-compose.yml     # Local MySQL 8.0 container setup
├── instructions.html      # Detail user guide on features & design philosophy
├── prisma/
│   ├── schema.prisma      # Prisma model schemas (Mission, Days, HabitLogs, Weeks)
│   └── seed.ts            # Seeder file for 60 days of default logs, rules, and life areas
├── src/
│   ├── app/
│   │   ├── actions.ts     # Next.js Server Actions (CRUD logic for database synchronization)
│   │   ├── analytics/     # Live analytics visual charts
│   │   ├── days/          # 1-3-5 checklist scheduler and SVG schedule clock
│   │   ├── habits/        # Daily tracker spreadsheet
│   │   ├── settings/      # General preferences page
│   │   └── page.tsx       # Main Monk Mode control panel
│   ├── components/        # UI components (AppShell, Sidebar, StatCards)
│   └── lib/
│       └── prisma.ts      # Global Prisma client config with MariaDB driver adapter
└── tsconfig.json          # TypeScript compilation parameters
```

---

## 🛠️ Getting Started

### 1. Run the Database
Launch the local MySQL instance using Docker:
```bash
docker compose up -d
```

### 2. Configure Environment Variables
Copy the example variables file:
```bash
cp .env.example .env
```
Ensure your `DATABASE_URL` matches your local MySQL docker configurations:
```env
DATABASE_URL="mysql://focusforge_user:focusforge_password@localhost:3306/focusforge_db"
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Setup Schema & Run Seed
Generate Prisma Client, push the schema to MySQL, and populate the database with 60 days of initial data:
```bash
npx prisma db push
npx prisma db seed
```

### 5. Start Dev Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to access FocusForge.

---

## 📖 Hướng Dẫn Sử Dụng (User Guide)

Để giúp người dùng hiểu rõ mục đích và kiến trúc thiết kế của ứng dụng, chúng tôi đã chuẩn bị sẵn một tệp tài liệu hướng dẫn chi tiết:
- **Tài liệu hướng dẫn:** Xem trực tiếp tại [instructions.html](file:///d:/FocusForge/focusforge/instructions.html).
- **Nội dung bao gồm:** Vấn đề ứng dụng giải quyết, cách hoạt động của đồng hồ Kaizen, cách điền kế hoạch 1-3-5 và phân tích số liệu trực quan trên biểu đồ.

---

## 📜 Available Scripts

- `npm run dev`: Chạy server thử nghiệm nội bộ.
- `npm run build`: Tối ưu hóa và đóng gói sản phẩm sản xuất (production build).
- `npx tsc --noEmit`: Kiểm tra biên dịch mã nguồn TypeScript.
