// Danh mục môn học Chương trình Giáo dục Phổ thông 2018 (GDPT 2018)

// 8 Môn học & Hoạt động giáo dục BẮT BUỘC (Mặc định cố định)
export const COMPULSORY_SUBJECTS = [
  { id: 'toan', name: 'Toán', category: 'Toán học', icon: 'Calculator', required: true, examWeight: 'Toán' },
  { id: 'van', name: 'Ngữ văn', category: 'Ngữ văn', icon: 'BookOpen', required: true, examWeight: 'Văn' },
  { id: 'anh', name: 'Tiếng Anh', category: 'Ngoại ngữ', icon: 'Languages', required: true, examWeight: 'Anh' },
  { id: 'su', name: 'Lịch sử', category: 'Khoa học Xã hội', icon: 'Clock', required: true, examWeight: 'Sử' },
  { id: 'gdtc', name: 'Giáo dục thể chất', category: 'Thể chất', icon: 'Activity', required: true },
  { id: 'gdqp', name: 'Giáo dục quốc phòng và an ninh', category: 'Quốc phòng', icon: 'Shield', required: true },
  { id: 'hdtn', name: 'Hoạt động trải nghiệm, hướng nghiệp', category: 'Hoạt động GD', icon: 'Compass', required: true },
  { id: 'gddp', name: 'Nội dung giáo dục địa phương', category: 'Địa phương', icon: 'MapPin', required: true },
];

// 10 Môn học TỰ CHỌN (Học sinh chọn đúng 4 môn trong số 10 môn này theo định hướng GDPT 2018)
export const ELECTIVE_SUBJECTS = [
  // Nhóm Khoa học Tự nhiên
  {
    id: 'li',
    name: 'Vật lí',
    group: 'Khoa học Tự nhiên',
    code: 'PHY',
    desc: 'Cơ sở ngành Kỹ thuật, Công nghệ, Y sinh',
  },
  {
    id: 'hoa',
    name: 'Hóa học',
    group: 'Khoa học Tự nhiên',
    code: 'CHE',
    desc: 'Cơ sở ngành Y Dược, Hóa học, Môi trường',
  },
  {
    id: 'sinh',
    name: 'Sinh học',
    group: 'Khoa học Tự nhiên',
    code: 'BIO',
    desc: 'Cơ sở ngành Y Đa khoa, Sinh học, Nông nghiệp',
  },

  // Nhóm Khoa học Xã hội
  {
    id: 'dia',
    name: 'Địa lí',
    group: 'Khoa học Xã hội',
    code: 'GEO',
    desc: 'Cơ sở ngành Kinh tế, Du lịch, Quản lý đất đai',
  },
  {
    id: 'gdktpl',
    name: 'Giáo dục kinh tế và pháp luật',
    group: 'Khoa học Xã hội',
    code: 'LAW',
    desc: 'Cơ sở ngành Luật, Kinh tế, Quản trị kinh doanh',
  },

  // Nhóm Công nghệ & Nghệ thuật
  {
    id: 'tin',
    name: 'Tin học',
    group: 'Công nghệ & Nghệ thuật',
    code: 'INF',
    desc: 'Cơ sở ngành CNTT, Khoa học Máy tính, AI',
  },
  {
    id: 'cn_congnghiep',
    name: 'Công nghệ Công nghiệp',
    group: 'Công nghệ & Nghệ thuật',
    code: 'CN_CONGNGHIEP',
    desc: 'Cơ sở ngành Kỹ thuật Cơ khí, Điện - Điện tử, Tự động hóa',
  },
  {
    id: 'cn_nongnghiep',
    name: 'Công nghệ Nông nghiệp',
    group: 'Công nghệ & Nghệ thuật',
    code: 'CN_NONGNGHIEP',
    desc: 'Cơ sở ngành Nông - Lâm - Thủy sản, CNSH, Môi trường',
  },
  {
    id: 'amnhac',
    name: 'Âm nhạc',
    group: 'Công nghệ & Nghệ thuật',
    code: 'MUS',
    desc: 'Khối ngành Nghệ thuật biểu diễn, Sư phạm âm nhạc',
  },
  {
    id: 'mythuat',
    name: 'Mỹ thuật',
    group: 'Công nghệ & Nghệ thuật',
    code: 'ART',
    desc: 'Khối ngành Kiến trúc, Thiết kế đồ họa, Mỹ thuật',
  },
];

export const MAX_ELECTIVE_COUNT = 4;

// 4 môn tự chọn mặc định phổ biến nếu người dùng chưa chọn
export const DEFAULT_ELECTIVES = ['Vật lí', 'Hóa học', 'Sinh học', 'Tin học'];

// Danh mục tất cả các môn có đề thi Tốt nghiệp THPT Quốc gia (Chương trình GDPT 2018 - từ 2025)
export const NATIONAL_GRADUATION_EXAM_SUBJECTS = [
  'Toán',
  'Ngữ văn',
  'Tiếng Anh',
  'Lịch sử',
  'Vật lí',
  'Hóa học',
  'Sinh học',
  'Địa lí',
  'Giáo dục kinh tế và pháp luật',
  'Tin học',
  'Công nghệ Công nghiệp',
  'Công nghệ Nông nghiệp',
];

// 2 môn thi tốt nghiệp bắt buộc theo quy chế của Bộ GD&ĐT
export const GRADUATION_COMPULSORY_SUBJECTS = ['Toán', 'Ngữ văn'];

// Số lượng môn thi tốt nghiệp tự chọn thí sinh được đăng ký (chính xác 2 môn theo quy chế 2+2)
export const MAX_GRADUATION_ELECTIVES = 2;
