export interface Rule {
  id: number;
  name: string;
  target: string;
}

export interface GoalAction {
  id: string;
  text: string;
}

export interface Goal {
  id: string;
  title: string;
  actions: GoalAction[];
}

export interface WeekData {
  number: number;
  dateRange: string;
  brainDump: string;
  goals: string[];
  status: 'Completed' | 'In Progress' | 'Upcoming';
  progress: number;
}

export interface TaskItem {
  id: string;
  text: string;
  completed: boolean;
}

export interface DayData {
  number: number;
  weekNumber: number;
  date: string;
  status: 'Completed' | 'In Progress' | 'Upcoming';
  focusArea: string;
  mit: string;
  priorities: TaskItem[];
  secondaries: TaskItem[];
  mood: string;
  energy: 'High' | 'Medium' | 'Low';
  kaizenReflection: string;
  completed: boolean;
  habits: {
    screenTime: number; // hrs
    weight: number; // kg
    sleepTime: number; // hrs
    wakeUpTime: string;
    waterIntake: number; // L
    workout: boolean;
    reading: boolean;
    english: boolean;
    coding: boolean;
    noSocialMedia: boolean;
  };
}

export interface LifeArea {
  name: string;
  currentScore: number;
  targetScore: number;
  note: string;
}

export const MONK_RULES: Rule[] = [
  { id: 1, name: "Screen Time Control", target: "< 2 hours" },
  { id: 2, name: "Water Intake", target: "3 Liters" },
  { id: 3, name: "Sleep Hours", target: "7.5+ hours" },
  { id: 4, name: "Daily Exercise", target: "30+ mins" },
  { id: 5, name: "Coding Practice", target: "1+ hours" },
  { id: 6, name: "No Social Media", target: "Except for work" },
];

export const GOALS_DATA: Goal[] = [
  {
    id: "g1",
    title: "Launch FocusForge Portfolio Project",
    actions: [
      { id: "g1a1", text: "Hoàn thành giao diện frontend Next.js với Tailwind và Recharts" },
      { id: "g1a2", text: "Thiết lập cấu trúc schema cơ sở dữ liệu Prisma SQLite" },
      { id: "g1a3", text: "Đăng tải lên GitHub kèm tài liệu hướng dẫn README chi tiết" }
    ]
  },
  {
    id: "g2",
    title: "Improve Physical Stamina and Sleep Discipline",
    actions: [
      { id: "g2a1", text: "Duy trì thói quen tập thể dục 30 phút mỗi ngày" },
      { id: "g2a2", text: "Thức dậy đúng giờ vào lúc 6:00 sáng hàng ngày" },
      { id: "g2a3", text: "Tắt thiết bị màn hình điện tử lúc 10:30 tối" }
    ]
  },
  {
    id: "g3",
    title: "Advance Technical Skills in Modern Web Tech",
    actions: [
      { id: "g3a1", text: "Dành ít nhất 1 giờ mỗi ngày viết mã hoặc đọc tài liệu kỹ thuật" },
      { id: "g3a2", text: "Tìm hiểu các mô hình nâng cao trong Next.js Server Components" },
      { id: "g3a3", text: "Áp dụng nguyên tắc kiến trúc sạch vào dự án FocusForge" }
    ]
  }
];

export const WEEKS_DATA: WeekData[] = [
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

export const LIFE_AREAS: LifeArea[] = [
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

export const IKIGAI_DATA = {
  love: ["Thiết kế giao diện web đẹp, gọn gàng", "Giải các bài toán logic và viết code sạch", "Đọc sách về phát triển bản thân và triết học"],
  goodAt: ["TypeScript và các framework React hiện đại", "Chuyển đổi các bản vẽ thiết kế thành layout responsive", "Tư duy phân tích và giải quyết vấn đề cấu trúc"],
  worldNeeds: ["Công cụ đơn giản giúp mọi người lấy lại sự tập trung", "Sản phẩm phần mềm chất lượng cao, bảo mật và riêng tư", "Các tài liệu hướng dẫn kỹ thuật rõ ràng"],
  paidFor: ["Phát triển ứng dụng web full-stack", "Viết bài kỹ thuật và đánh giá giải pháp kỹ thuật", "Tư vấn thiết kế phần mềm"],
  summary: "Xây dựng các ứng dụng năng suất có tính ứng dụng cao, giao diện thư thái kết hợp giữa kỹ thuật và phát triển cá nhân, giúp mọi người có cuộc sống kỷ luật và cân bằng."
};

// Generate default day metrics/logs
export const getDayMockData = (dayNumber: number): DayData => {
  const weekNumber = Math.ceil(dayNumber / 7);
  const dateStr = new Date(2026, 5, 7 + dayNumber - 1).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Customize Day 1 to match expectations specifically
  if (dayNumber === 1) {
    return {
      number: 1,
      weekNumber: 1,
      date: dateStr,
      status: 'In Progress',
      focusArea: "Thiết lập cấu trúc khung nền tảng",
      mit: "Xây dựng các trang giao diện chính FocusForge và khung điều hướng",
      priorities: [
        { id: "d1p1", text: "Tạo cấu trúc tệp dữ liệu giả lập mock-data", completed: true },
        { id: "d1p2", text: "Thiết kế thanh điều hướng Sidebar và Header của AppShell", completed: true },
        { id: "d1p3", text: "Thiết lập các mẫu layout responsive cho tất cả các trang", completed: false }
      ],
      secondaries: [
        { id: "d1s1", text: "Cấu hình màu sắc và kiểu dáng Tailwind toàn cục", completed: true },
        { id: "d1s2", text: "Thiết kế kiểu nút checklist 1-3-5 với ô chọn tùy biến", completed: false },
        { id: "d1s3", text: "Cấu hình biểu đồ xu hướng Recharts cho màn hình phân tích", completed: false },
        { id: "d1s4", text: "Xác nhận môi trường build cục bộ hoàn thành trơn tru", completed: false },
        { id: "d1s5", text: "Thêm các biểu tượng lucide cho các tab menu", completed: true }
      ],
      mood: "Hào hứng & Tập trung",
      energy: "High",
      kaizenReflection: "Giao diện mang lại cảm giác rất thư thái và quy củ. Việc chuyển từ các thành phần bảng quản trị cồng kềnh sang các thẻ phẳng tạo cảm giác giống như một cuốn sổ tay thực tế.",
      completed: false,
      habits: {
        screenTime: 1.8,
        weight: 78.5,
        sleepTime: 8.0,
        wakeUpTime: "06:00",
        waterIntake: 3.1,
        workout: true,
        reading: true,
        english: true,
        coding: true,
        noSocialMedia: false
      }
    };
  }

  // Helper defaults for other days
  const isCompleted = dayNumber < 1; 
  return {
    number: dayNumber,
    weekNumber,
    date: dateStr,
    status: isCompleted ? 'Completed' : dayNumber === 1 ? 'In Progress' : 'Upcoming',
    focusArea: isCompleted ? "Đã hoàn thành các nhiệm vụ" : "Nội dung cần tập trung tiếp theo",
    mit: `Nhiệm vụ trọng tâm cho ngày thứ ${dayNumber}`,
    priorities: [
      { id: `d${dayNumber}p1`, text: `Nhiệm vụ ưu tiên thứ nhất ngày ${dayNumber}`, completed: isCompleted },
      { id: `d${dayNumber}p2`, text: `Nhiệm vụ ưu tiên thứ hai ngày ${dayNumber}`, completed: isCompleted },
      { id: `d${dayNumber}p3`, text: `Nhiệm vụ ưu tiên thứ ba ngày ${dayNumber}`, completed: isCompleted }
    ],
    secondaries: [
      { id: `d${dayNumber}s1`, text: `Nhiệm vụ phụ thứ nhất`, completed: isCompleted },
      { id: `d${dayNumber}s2`, text: `Nhiệm vụ phụ thứ hai`, completed: isCompleted },
      { id: `d${dayNumber}s3`, text: `Nhiệm vụ phụ thứ ba`, completed: isCompleted },
      { id: `d${dayNumber}s4`, text: `Nhiệm vụ phụ thứ tư`, completed: isCompleted },
      { id: `d${dayNumber}s5`, text: `Nhiệm vụ phụ thứ năm`, completed: isCompleted }
    ],
    mood: "Bình thường",
    energy: "Medium",
    kaizenReflection: isCompleted ? "Hoàn thành tất cả các khối thời gian đúng hạn với độ tập trung cao." : "Chưa ghi nhận đánh giá cho ngày hôm nay.",
    completed: isCompleted,
    habits: {
      screenTime: isCompleted ? 1.5 + (dayNumber % 3) * 0.5 : 0,
      weight: 79 - (dayNumber * 0.05),
      sleepTime: isCompleted ? 7.0 + (dayNumber % 2) * 0.5 : 0,
      wakeUpTime: isCompleted ? "06:15" : "",
      waterIntake: isCompleted ? 2.5 + (dayNumber % 4) * 0.2 : 0,
      workout: isCompleted && (dayNumber % 2 === 0),
      reading: isCompleted,
      english: isCompleted,
      coding: isCompleted,
      noSocialMedia: isCompleted && (dayNumber % 3 !== 0)
    }
  };
};

export const RECENT_REFLECTIONS = [
  { day: 1, note: "Bản dựng biên dịch thành công. Việc thiết lập kiểu dáng giao diện phù hợp với mục tiêu thiết kế ban đầu." },
  { day: 2, note: "Thức dậy đúng 6:00 sáng. Tập trung cao độ cho việc viết các component tĩnh tối giản." },
  { day: 3, note: "Cần tăng lượng nước uống hàng ngày. Cảm thấy hơi uể oải vào đầu giờ chiều." },
];

export const HABITS_CHART_DATA = [
  { name: "Day 1", completion: 80, sleep: 8.0, screenTime: 1.8, water: 3.1 },
  { name: "Day 2", completion: 90, sleep: 7.5, screenTime: 1.2, water: 3.0 },
  { name: "Day 3", completion: 70, sleep: 7.0, screenTime: 2.5, water: 2.8 },
  { name: "Day 4", completion: 85, sleep: 7.8, screenTime: 1.5, water: 3.2 },
  { name: "Day 5", completion: 100, sleep: 8.2, screenTime: 0.9, water: 3.5 },
  { name: "Day 6", completion: 60, sleep: 6.8, screenTime: 3.0, water: 2.2 },
  { name: "Day 7", completion: 90, sleep: 7.6, screenTime: 1.4, water: 3.0 }
];
