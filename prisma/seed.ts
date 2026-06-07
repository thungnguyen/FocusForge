import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = `${process.env.DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting database seeding...");

  // Clean existing data
  console.log("Cleaning existing database records...");
  await prisma.mission.deleteMany({});
  await prisma.goal.deleteMany({});
  await prisma.dailyRule.deleteMany({});
  await prisma.week.deleteMany({});
  await prisma.day.deleteMany({});
  await prisma.habitLog.deleteMany({});
  await prisma.lifeScore.deleteMany({});
  await prisma.ikigai.deleteMany({});

  // 1. Seed default mission
  console.log("Seeding default mission...");
  await prisma.mission.create({
    data: {
      content: "Trở thành một kỹ sư phần mềm kỷ luật và có tay nghề cao bằng cách rèn luyện khả năng tập trung hàng ngày, giảm thiểu sự xao nhãng từ màn hình và tạo dựng thói quen làm việc kiên trì.",
      whyStarted: "Tôi muốn thoát khỏi thói quen lướt mạng xã hội quá nhiều, phục hồi khả năng tập trung cao độ, xây dựng các dự án lập trình thực tế chất lượng cao và có được sự tự tin vào thể chất.",
      weakestArea: "Kỷ luật & Sự nghiệp",
    },
  });

  // 2. Seed 3 default goals
  console.log("Seeding default goals...");
  const defaultGoals = [
    {
      title: "Launch FocusForge Portfolio Project",
      order: 1,
      actions: [
        { id: "g1a1", text: "Hoàn thành giao diện frontend Next.js với Tailwind và Recharts" },
        { id: "g1a2", text: "Thiết lập cấu trúc schema cơ sở dữ liệu Prisma SQLite" },
        { id: "g1a3", text: "Đăng tải lên GitHub kèm tài liệu hướng dẫn README chi tiết" }
      ]
    },
    {
      title: "Improve Physical Stamina and Sleep Discipline",
      order: 2,
      actions: [
        { id: "g2a1", text: "Duy trì thói quen tập thể dục 30 phút mỗi ngày" },
        { id: "g2a2", text: "Thức dậy đúng giờ vào lúc 6:00 sáng hàng ngày" },
        { id: "g2a3", text: "Tắt thiết bị màn hình điện tử lúc 10:30 tối" }
      ]
    },
    {
      title: "Advance Technical Skills in Modern Web Tech",
      order: 3,
      actions: [
        { id: "g3a1", text: "Dành ít nhất 1 giờ mỗi ngày viết mã hoặc đọc tài liệu kỹ thuật" },
        { id: "g3a2", text: "Tìm hiểu các mô hình nâng cao trong Next.js Server Components" },
        { id: "g3a3", text: "Áp dụng nguyên tắc kiến trúc sạch vào dự án FocusForge" }
      ]
    }
  ];

  for (const g of defaultGoals) {
    await prisma.goal.create({
      data: {
        title: g.title,
        order: g.order,
        actionsJson: JSON.stringify(g.actions),
      },
    });
  }

  // 3. Seed default daily rules (5 default rules)
  console.log("Seeding default daily rules...");
  const defaultRules = [
    { name: "Screen Time Control", target: "< 2 hours" },
    { name: "Water Intake", target: "3 Liters" },
    { name: "Sleep Hours", target: "7.5+ hours" },
    { name: "Daily Exercise", target: "30+ mins" },
    { name: "Coding Practice", target: "1+ hours" },
  ];

  for (const r of defaultRules) {
    await prisma.dailyRule.create({
      data: r,
    });
  }

  // 4. Seed 9 weeks
  console.log("Seeding 9 weeks...");
  const defaultWeeks = [
    {
      number: 1,
      dateRange: "June 07 - June 13, 2026",
      brainDump: "Tập trung xây dựng khung layout và các màn hình UI cơ bản. Cần duy trì phong cách thiết kế tối giản, tông màu cát/đá dịu nhẹ.",
      goals: ["Xây dựng 10 route cốt lõi Next.js", "Thiết kế layout bảng điều khiển responsive", "Cấu hình dữ liệu giả lập", "Kiểm tra kiểu chữ CSS"],
      status: "In Progress",
      progress: 42
    },
    {
      number: 2,
      dateRange: "June 14 - June 20, 2026",
      brainDump: "Thiết lập các cấu trúc schema cơ sở dữ liệu và phiên bản SQLite cục bộ. Tạo script seed dữ liệu để kiểm thử các truy vấn ORM hoạt động mượt mà.",
      goals: ["Viết hoàn chỉnh tệp schema Prisma", "Thực thi lần di chuyển (migration) DB đầu tiên", "Xây dựng các tác vụ server action biến đổi dữ liệu", "Phác thảo layout khung tải dữ liệu"],
      status: "Upcoming",
      progress: 0
    },
    {
      number: 3,
      dateRange: "June 21 - June 27, 2026",
      brainDump: "Chưa có ghi chú nào cho tuần này.",
      goals: ["Thêm các kịch bản tương tác thời gian thực", "Xác thực dữ liệu đầu vào 1-3-5 trước khi lưu", "Xây dựng đồng hồ Kaizen bằng SVG tương tác"],
      status: "Upcoming",
      progress: 0
    },
    { number: 4, dateRange: "June 28 - July 04, 2026", brainDump: "Chưa có ghi chú nào cho tuần này.", goals: ["Tối ưu cấu trúc state quản lý"], status: "Upcoming", progress: 0 },
    { number: 5, dateRange: "July 05 - July 11, 2026", brainDump: "Chưa có ghi chú nào cho tuần này.", goals: ["Dọn dẹp các cảnh báo code"], status: "Upcoming", progress: 0 },
    { number: 6, dateRange: "July 12 - July 18, 2026", brainDump: "Chưa có ghi chú nào cho tuần này.", goals: ["Tối ưu hóa hiệu ứng chuyển động"], status: "Upcoming", progress: 0 },
    { number: 7, dateRange: "July 19 - July 25, 2026", brainDump: "Chưa có ghi chú nào cho tuần này.", goals: ["Kiểm thử giao diện trên thiết bị di động"], status: "Upcoming", progress: 0 },
    { number: 8, dateRange: "July 26 - Aug 01, 2026", brainDump: "Chưa có ghi chú nào cho tuần này.", goals: ["Viết các bài kiểm thử đơn vị và E2E"], status: "Upcoming", progress: 0 },
    { number: 9, dateRange: "Aug 02 - Aug 06, 2026", brainDump: "Đánh giá và tổng kết toàn bộ chu kỳ 60 ngày. Biên soạn trang giới thiệu thành quả.", goals: ["Chạy thử bản build và kiểm tra dung lượng bundle", "Hoàn thiện tài liệu README giới thiệu dự án"], status: "Upcoming", progress: 0 },
  ];

  for (const w of defaultWeeks) {
    await prisma.week.create({
      data: {
        number: w.number,
        dateRange: w.dateRange,
        brainDump: w.brainDump,
        goalsJson: JSON.stringify(w.goals),
        status: w.status,
        progress: w.progress,
        affirmation: w.number === 1 ? "Hãy kỷ luật và kiên trì rèn luyện!" : "Tập trung cao độ cho tuần mới.",
        reflection: w.number === 1 ? "Tuần đầu khởi động khá tốt, đã thích nghi dần với guồng quay mới." : "Chưa có phản tư cho tuần này.",
      },
    });
  }

  // 5. Seed 60 days & 60 habit logs
  console.log("Seeding 60 days and habit logs...");
  for (let i = 1; i <= 60; i++) {
    const weekNumber = Math.ceil(i / 7);
    const date = new Date(2026, 5, 7 + i - 1);
    const dateStr = date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    let focusArea = "Nội dung cần tập trung tiếp theo";
    let mit = `Nhiệm vụ trọng tâm cho ngày thứ ${i}`;
    let status = "Upcoming";
    let completed = false;
    let priorities = [
      { id: `d${i}p1`, text: `Nhiệm vụ ưu tiên thứ nhất ngày ${i}`, completed: false },
      { id: `d${i}p2`, text: `Nhiệm vụ ưu tiên thứ hai ngày ${i}`, completed: false },
      { id: `d${i}p3`, text: `Nhiệm vụ ưu tiên thứ ba ngày ${i}`, completed: false },
    ];
    let secondaries = [
      { id: `d${i}s1`, text: `Nhiệm vụ phụ thứ nhất`, completed: false },
      { id: `d${i}s2`, text: `Nhiệm vụ phụ thứ hai`, completed: false },
      { id: `d${i}s3`, text: `Nhiệm vụ phụ thứ ba`, completed: false },
      { id: `d${i}s4`, text: `Nhiệm vụ phụ thứ tư`, completed: false },
      { id: `d${i}s5`, text: `Nhiệm vụ phụ thứ năm`, completed: false },
    ];
    let mood = "Bình thường";
    let energy = "Medium";
    let kaizenReflection = "Chưa ghi nhận đánh giá cho ngày hôm nay.";

    // Habit metrics template
    let screenTime = 0.0;
    let weight = 79.0 - i * 0.05;
    let sleepTime = 0.0;
    let wakeUpTime = "";
    let waterIntake = 0.0;
    let workout = false;
    let reading = false;
    let english = false;
    let coding = false;
    let noSocialMedia = false;

    // Special customization for Day 1
    if (i === 1) {
      focusArea = "Thiết lập cấu trúc khung nền tảng";
      mit = "Xây dựng các trang giao diện chính FocusForge và khung điều hướng";
      status = "In Progress";
      priorities = [
        { id: "d1p1", text: "Tạo cấu trúc tệp dữ liệu giả lập mock-data", completed: true },
        { id: "d1p2", text: "Thiết kế thanh điều hướng Sidebar và Header của AppShell", completed: true },
        { id: "d1p3", text: "Thiết lập các mẫu layout responsive cho tất cả các trang", completed: false },
      ];
      secondaries = [
        { id: "d1s1", text: "Cấu hình màu sắc và kiểu dáng Tailwind toàn cục", completed: true },
        { id: "d1s2", text: "Thiết kế kiểu nút checklist 1-3-5 với ô chọn tùy biến", completed: false },
        { id: "d1s3", text: "Cấu hình biểu đồ xu hướng Recharts cho màn hình phân tích", completed: false },
        { id: "d1s4", text: "Xác nhận môi trường build cục bộ hoàn thành trơn tru", completed: false },
        { id: "d1s5", text: "Thêm các biểu tượng lucide cho các tab menu", completed: true },
      ];
      mood = "Hào hứng & Tập trung";
      energy = "High";
      kaizenReflection = "Giao diện mang lại cảm giác rất thư thái và quy củ. Việc chuyển từ các thành phần bảng quản trị cồng kềnh sang các thẻ phẳng tạo cảm giác giống như một cuốn sổ tay thực tế.";
      screenTime = 1.8;
      weight = 78.5;
      sleepTime = 8.0;
      wakeUpTime = "06:00";
      waterIntake = 3.1;
      workout = true;
      reading = true;
      english = true;
      coding = true;
      noSocialMedia = false;
    } else if (i <= 7) {
      // Simulate historical completed logs for Days 2 to 7
      status = "Completed";
      completed = true;
      priorities = priorities.map(p => ({ ...p, completed: true }));
      secondaries = secondaries.map(s => ({ ...s, completed: true }));
      mood = "Bình thường";
      kaizenReflection = "Hoàn thành tất cả các khối thời gian đúng hạn với độ tập trung cao.";
      screenTime = 1.5 + (i % 3) * 0.5;
      sleepTime = 7.0 + (i % 2) * 0.5;
      wakeUpTime = "06:15";
      waterIntake = 2.5 + (i % 4) * 0.2;
      workout = i % 2 === 0;
      reading = true;
      english = true;
      coding = true;
      noSocialMedia = i % 3 !== 0;
    }

    // Save Day record
    await prisma.day.create({
      data: {
        number: i,
        weekNumber,
        date: dateStr,
        status,
        focusArea,
        mit,
        prioritiesJson: JSON.stringify(priorities),
        secondariesJson: JSON.stringify(secondaries),
        mood,
        energy,
        kaizenReflection,
        completed,
        timeBlocksJson: "[]",
      },
    });

    // Save HabitLog record
    await prisma.habitLog.create({
      data: {
        dayNumber: i,
        screenTime,
        weight,
        sleepTime,
        wakeUpTime,
        waterIntake,
        workout,
        reading,
        english,
        coding,
        noSocialMedia,
      },
    });
  }

  // 6. Seed 10 default life score areas
  console.log("Seeding 10 default life score areas...");
  const defaultLifeScores = [
    { name: "Money", currentScore: 5, targetScore: 8, note: "Tăng thu nhập tự do và tiết kiệm 25% tổng số tiền kiếm được." },
    { name: "Health", currentScore: 6, targetScore: 9, note: "Tăng cường các bài tập tim mạch và giảm tiêu thụ đường chế biến." },
    { name: "Family", currentScore: 7, targetScore: 9, note: "Gọi điện về nhà hai lần một tuần, thăm gia đình đều đặn vào cuối tuần." },
    { name: "Relationships", currentScore: 5, targetScore: 8, note: "Giao tiếp cởi mở hơn và chuẩn bị các buổi tối chất lượng bên nhau." },
    { name: "Career", currentScore: 6, targetScore: 9, note: "Chuyển hướng sang vai trò kỹ sư full-stack; khởi động 2 dự án portfolio lớn." },
    { name: "Work", currentScore: 7, targetScore: 8, note: "Cải thiện hiệu suất các khối thời gian tập trung, giới hạn cuộc gọi cá nhân." },
    { name: "Spirituality", currentScore: 4, targetScore: 7, note: "Dành 10 phút ngồi thiền vào mỗi buổi sáng trước khi mở máy tính." },
    { name: "Education", currentScore: 6, targetScore: 8, note: "Đọc 1 cuốn sách kỹ thuật và 1 cuốn sách phát triển bản thân mỗi tháng." },
    { name: "Joy", currentScore: 5, targetScore: 7, note: "Dành thời gian cho các sở thích thủ công như vẽ phác thảo hoặc chơi nhạc cụ." },
    { name: "Discipline", currentScore: 4, targetScore: 9, note: "Tránh các vòng lặp trì hoãn, tuân thủ nghiêm ngặt lịch trình hàng ngày." }
  ];

  for (const ls of defaultLifeScores) {
    await prisma.lifeScore.create({
      data: ls,
    });
  }

  // 7. Seed 1 default Ikigai record
  console.log("Seeding default Ikigai record...");
  await prisma.ikigai.create({
    data: {
      loveJson: JSON.stringify(["Thiết kế giao diện web đẹp, gọn gàng", "Giải các bài toán logic và viết code sạch", "Đọc sách về phát triển bản thân và triết học"]),
      goodAtJson: JSON.stringify(["TypeScript và các framework React hiện đại", "Chuyển đổi các bản vẽ thiết kế thành layout responsive", "Tư duy phân tích và giải quyết vấn đề cấu trúc"]),
      worldNeedsJson: JSON.stringify(["Công cụ đơn giản giúp mọi người lấy lại sự tập trung", "Sản phẩm phần mềm chất lượng cao, bảo mật và riêng tư", "Các tài liệu hướng dẫn kỹ thuật rõ ràng"]),
      paidForJson: JSON.stringify(["Phát triển ứng dụng web full-stack", "Viết bài kỹ thuật và đánh giá giải pháp kỹ thuật", "Tư vấn thiết kế phần mềm"]),
      summary: "Xây dựng các ứng dụng năng suất có tính ứng dụng cao, giao diện thư thái kết hợp giữa kỹ thuật và phát triển cá nhân, giúp mọi người có cuộc sống kỷ luật và cân bằng.",
    },
  });

  console.log("Database seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
