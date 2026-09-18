// backend/seed_dqn_scheme.mjs
// Script to seed all admissions scheme data for Quy Nhon University (DQN) 2026 via REST API batches

const BASE_URL = 'http://localhost:8080/api/v1';

async function login() {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin@admissionkg.edu.vn', password: 'admin123' })
  });
  const data = await res.json();
  if (!data.success) {
    throw new Error('Login failed: ' + JSON.stringify(data));
  }
  console.log('✅ Logged in as:', data.data.user.email, '| Role:', data.data.user.role);
  return data.data.token;
}

async function apiRequest(endpoint, method, body, token) {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  const data = await res.json();
  return { status: res.status, ok: res.ok, data };
}

// 1. INSTITUTION
const institutionData = {
  institutionId: 'DQN',
  institutionCode: 'DQN',
  institutionName: 'Trường Đại học Quy Nhơn',
  institutionType: 'Đại học Công lập',
  contactInfo: {
    address: '170 An Dương Vương, P. Quy Nhơn Nam, tỉnh Gia Lai',
    phone: '1800.55.88.49',
    website: 'https://qnu.edu.vn',
    admissions_url: 'https://tuyensinh.qnu.edu.vn'
  }
};

// 2. ADMISSION METHODS
const methodsData = [
  {
    methodId: 'PT402A',
    methodCode: '402A',
    methodName: 'Xét kết quả kỳ thi ĐGNL của ĐHQG TP.HCM',
    targetGroup: 'ĐGNL ĐHQG-HCM'
  },
  {
    methodId: 'PT402B',
    methodCode: '402B',
    methodName: 'Xét kết quả kỳ thi ĐGNL của Trường Đại học Sư phạm Hà Nội',
    targetGroup: 'ĐGNL ĐHSP-HN'
  },
  {
    methodId: 'PT405',
    methodCode: '405',
    methodName: 'Xét kết quả thi tốt nghiệp THPT kết hợp thi Năng khiếu của Trường ĐH Quy Nhơn',
    targetGroup: 'Năng khiếu'
  }
];

// 3. ADMISSION SCHEME
const schemeData = {
  schemeId: 'DQN_2026',
  institutionId: 'DQN',
  academicYear: 2026,
  totalQuota: 5173
};

// 4. 53 TRACKS & MAJORS
const tracksData = [
  {
    code: '7140114',
    name: 'Quản lý giáo dục',
    type: 'Cử nhân Chuẩn',
    quota: 44,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['C00', 'C19', 'C20', 'C14', 'D01', 'C03']
  },
  {
    code: '7140201',
    name: 'Giáo dục Mầm non',
    type: 'Sư phạm',
    quota: 180,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT405'],
    combinations: ['M00']
  },
  {
    code: '7140202',
    name: 'Giáo dục Tiểu học',
    type: 'Sư phạm',
    quota: 250,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['D01', 'D11', 'D12', 'D13', 'D14', 'D15']
  },
  {
    code: '7140205',
    name: 'Giáo dục Chính trị',
    type: 'Sư phạm',
    quota: 20,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['C14', 'C19', 'C20', 'D66']
  },
  {
    code: '7140206',
    name: 'Giáo dục Thể chất',
    type: 'Sư phạm',
    quota: 100,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT405'],
    combinations: ['T00', 'T01', 'T02', 'T03', 'T04', 'T05']
  },
  {
    code: '7140209',
    name: 'Sư phạm Toán học',
    type: 'Sư phạm',
    quota: 100,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['A00', 'A01', 'D07', 'X06']
  },
  {
    code: '7140210',
    name: 'Sư phạm Tin học',
    type: 'Sư phạm',
    quota: 120,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['A00', 'A01', 'D01', 'D07', 'X01', 'X26', 'X02', 'X06']
  },
  {
    code: '7140211',
    name: 'Sư phạm Vật lý',
    type: 'Sư phạm',
    quota: 51,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['A00', 'A01', 'C01', 'X26']
  },
  {
    code: '7140212',
    name: 'Sư phạm Hóa học',
    type: 'Sư phạm',
    quota: 36,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['A00', 'B00', 'D07', 'C02']
  },
  {
    code: '7140213',
    name: 'Sư phạm Sinh học',
    type: 'Sư phạm',
    quota: 25,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['B00', 'A02', 'D08', 'B03']
  },
  {
    code: '7140217',
    name: 'Sư phạm Ngữ Văn',
    type: 'Sư phạm',
    quota: 120,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['C00', 'D14', 'D15', 'D01', 'D66']
  },
  {
    code: '7140218',
    name: 'Sư phạm Lịch sử',
    type: 'Sư phạm',
    quota: 54,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['C00', 'C19', 'D14', 'C03']
  },
  {
    code: '7140219',
    name: 'Sư phạm Địa lý',
    type: 'Sư phạm',
    quota: 80,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['C00', 'C20', 'D15', 'C04', 'D10', 'A09', 'B02', 'A07', 'A06']
  },
  {
    code: '7140231',
    name: 'Sư phạm Tiếng Anh',
    type: 'Sư phạm',
    quota: 200,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['D01']
  },
  {
    code: '7140247',
    name: 'Sư phạm Khoa học tự nhiên',
    type: 'Sư phạm',
    quota: 70,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['A00', 'A01', 'A02', 'B00', 'D08']
  },
  {
    code: '7140249',
    name: 'Sư phạm Lịch sử - Địa lý',
    type: 'Sư phạm',
    quota: 85,
    tuition: { policy: 'Sư phạm (NĐ 116)', fee_total: 'Miễn học phí + hỗ trợ sinh hoạt' },
    methods: ['PT100', 'PT402B'],
    combinations: ['C00', 'C19', 'C20', 'D14', 'D15', 'C03', 'C04']
  },
  {
    code: '7220201',
    name: 'Ngôn ngữ Anh',
    type: 'Cử nhân Chuẩn',
    quota: 261,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D01', 'D14', 'D15', 'A01']
  },
  {
    code: '7220204',
    name: 'Ngôn ngữ Trung Quốc',
    type: 'Cử nhân Chuẩn',
    quota: 58,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D01', 'D14', 'D15', 'A01']
  },
  {
    code: '7229030',
    name: 'Văn học',
    type: 'Cử nhân Chuẩn',
    quota: 57,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['C00', 'C19', 'D14', 'D15', 'D66', 'C20']
  },
  {
    code: '7310101',
    name: 'Kinh tế',
    type: 'Cử nhân Chuẩn',
    quota: 99,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D84', 'K01', 'D07', 'D01', 'A01', 'D10', 'D09']
  },
  {
    code: '7310109',
    name: 'Kinh tế số',
    type: 'Cử nhân Chuẩn',
    quota: 45,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D84', 'K01', 'D07', 'D01', 'A01', 'D10', 'D09']
  },
  {
    code: '7310205',
    name: 'Quản lý nhà nước',
    type: 'Cử nhân Chuẩn',
    quota: 61,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D01', 'D11', 'D14', 'C14', 'C19', 'C00']
  },
  {
    code: '7310403',
    name: 'Tâm lý học giáo dục',
    type: 'Cử nhân Chuẩn',
    quota: 64,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['C00', 'C19', 'C20', 'C14', 'D01', 'C03', 'D14']
  },
  {
    code: '7310608',
    name: 'Đông phương học',
    type: 'Cử nhân Chuẩn',
    quota: 102,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['C00', 'C19', 'D14', 'D15', 'D66', 'D01', 'C03', 'D65']
  },
  {
    code: '7310630',
    name: 'Việt Nam học',
    type: 'Cử nhân Chuẩn',
    quota: 63,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['C00', 'C19', 'C20', 'C03', 'C04', 'D66', 'C14']
  },
  {
    code: '7340101',
    name: 'Quản trị kinh doanh',
    type: 'Cử nhân Chuẩn',
    quota: 249,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D01', 'A01', 'D07', 'K01', 'D84', 'D09', 'D10']
  },
  {
    code: '7340201',
    name: 'Tài chính – Ngân hàng',
    type: 'Cử nhân Chuẩn',
    quota: 94,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D01', 'A01', 'D07', 'K01', 'D84', 'D09', 'D10']
  },
  {
    code: '7340301',
    name: 'Kế toán',
    type: 'Cử nhân Chuẩn',
    quota: 257,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D84', 'K01', 'D07', 'D01', 'A01', 'D10', 'D09']
  },
  {
    code: '7340301AC',
    name: 'Kế toán (Định hướng ACCA)',
    type: 'Chất lượng cao',
    quota: 30,
    tuition: { policy: 'Chất lượng cao (ACCA)', fee_total: '1.5 lần đại trà (~125-145 triệu/4 năm)' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D84', 'K01', 'D07', 'D01', 'A01', 'D10', 'D09']
  },
  {
    code: '7340302',
    name: 'Kiểm toán',
    type: 'Cử nhân Chuẩn',
    quota: 49,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D84', 'K01', 'D07', 'D01', 'A01', 'D10', 'D09']
  },
  {
    code: '7380101',
    name: 'Luật',
    type: 'Cử nhân Chuẩn',
    quota: 106,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D01', 'D11', 'D14', 'C14', 'C19', 'C00']
  },
  {
    code: '7440112',
    name: 'Hóa học (Hóa dược, Hóa mỹ phẩm)',
    type: 'Cử nhân Chuẩn',
    quota: 56,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'B00', 'D07', 'C02', 'X02', 'A05', 'A06', 'A11']
  },
  {
    code: '7460108',
    name: 'Khoa học dữ liệu',
    type: 'Cử nhân Chuẩn',
    quota: 45,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'A01', 'D07', 'X06', 'D01']
  },
  {
    code: '7460112',
    name: 'Toán ứng dụng',
    type: 'Cử nhân Chuẩn',
    quota: 58,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'A01', 'D07', 'X06', 'D01']
  },
  {
    code: '7480103',
    name: 'Kỹ thuật phần mềm',
    type: 'Kỹ sư',
    quota: 60,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A01', 'D01', 'D07', 'D84', 'K01']
  },
  {
    code: '7480107',
    name: 'Trí tuệ nhân tạo',
    type: 'Kỹ sư',
    quota: 53,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'A01', 'D01', 'D07', 'X06']
  },
  {
    code: '7480201',
    name: 'Công nghệ thông tin (An toàn, an ninh mạng)',
    type: 'Kỹ sư',
    quota: 182,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A01', 'D01', 'D07', 'D84', 'K01']
  },
  {
    code: '7510205',
    name: 'Công nghệ kỹ thuật ô tô',
    type: 'Kỹ sư',
    quota: 137,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'A01', 'X26', 'C01', 'A19']
  },
  {
    code: '7510401',
    name: 'Công nghệ kỹ thuật hoá học',
    type: 'Kỹ sư',
    quota: 56,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'D07', 'C02', 'A11', 'B00', 'X02', 'A05']
  },
  {
    code: '7510605',
    name: 'Logistics và Quản lý chuỗi cung ứng',
    type: 'Cử nhân Chuẩn',
    quota: 159,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['D01', 'A01', 'D07', 'K01', 'D84', 'D09', 'D10']
  },
  {
    code: '7520116',
    name: 'Kỹ thuật cơ khí động lực',
    type: 'Kỹ sư',
    quota: 40,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'A01', 'X26', 'C01', 'A19']
  },
  {
    code: '7520201',
    name: 'Kỹ thuật điện',
    type: 'Kỹ sư',
    quota: 144,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'A01', 'X26', 'C01', 'A19']
  },
  {
    code: '7520207',
    name: 'Kỹ thuật điện tử - viễn thông (Thiết kế vi mạch)',
    type: 'Kỹ sư',
    quota: 100,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'A01', 'X26', 'C01', 'A19']
  },
  {
    code: '7520216',
    name: 'Kỹ thuật điều khiển và tự động hóa',
    type: 'Kỹ sư',
    quota: 85,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'A01', 'X26', 'C01', 'A19']
  },
  {
    code: '7520401',
    name: 'Vật lý kỹ thuật (Đóng gói & kiểm thử vi mạch)',
    type: 'Kỹ sư',
    quota: 62,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'A01', 'A02', 'X26', 'A19', 'C01']
  },
  {
    code: '7540101',
    name: 'Công nghệ thực phẩm',
    type: 'Kỹ sư',
    quota: 143,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['B00', 'A06', 'A05', 'A00', 'D07', 'X02', 'C02', 'A11']
  },
  {
    code: '7580201',
    name: 'Kỹ thuật xây dựng',
    type: 'Kỹ sư',
    quota: 109,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A00', 'A01', 'X26', 'C01', 'A19']
  },
  {
    code: '7620109',
    name: 'Nông học',
    type: 'Kỹ sư',
    quota: 43,
    tuition: { policy: 'Kỹ sư đại trà', fee_total: '112.3 triệu/4.5 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['A02', 'B00', 'B01', 'B03', 'D08', 'B04', 'X03', 'B09', 'B02']
  },
  {
    code: '7760101',
    name: 'Công tác xã hội',
    type: 'Cử nhân Chuẩn',
    quota: 52,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['C00', 'C19', 'D14', 'D01', 'C04', 'C03', 'C14', 'D66', 'C20']
  },
  {
    code: '7810103',
    name: 'Quản trị dịch vụ du lịch và lữ hành',
    type: 'Cử nhân Chuẩn',
    quota: 125,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['C14', 'D01', 'C03', 'C04', 'C02', 'C01', 'X01']
  },
  {
    code: '7810201',
    name: 'Quản trị khách sạn',
    type: 'Cử nhân Chuẩn',
    quota: 99,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['C14', 'D01', 'C03', 'C04', 'C02', 'C01', 'X01']
  },
  {
    code: '7850101',
    name: 'Quản lý tài nguyên và môi trường',
    type: 'Cử nhân Chuẩn',
    quota: 112,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['C20', 'A09', 'C04', 'B02', 'D15', 'A04', 'D10', 'C13', 'A06']
  },
  {
    code: '7850103',
    name: 'Quản lý đất đai',
    type: 'Cử nhân Chuẩn',
    quota: 123,
    tuition: { policy: 'Cử nhân đại trà', fee_total: '83-97 triệu/4 năm' },
    methods: ['PT100', 'PT200', 'PT402A', 'PT402B'],
    combinations: ['C20', 'A09', 'C04', 'B02', 'D15', 'A04', 'D10', 'C13', 'A06']
  }
];

// 5. 52 BENCHMARK & QUOTA DATA (2024 & 2025)
const benchmarksData = [
  { code: '7140114', q24: 47, adm24: 50, score24: 22.50, q25: 50, adm25: 41, score25: 25.10 },
  { code: '7140201', q24: 126, adm24: 118, score24: 23.10, q25: 177, adm25: 177, score25: 21.75 },
  { code: '7140202', q24: 244, adm24: 234, score24: 26.95, q25: 240, adm25: 239, score25: 26.90 },
  { code: '7140205', q24: 20, adm24: 23, score24: 26.65, q25: 22, adm25: 21, score25: 26.65 },
  { code: '7140206', q24: 24, adm24: 23, score24: 26.50, q25: 99, adm25: 98, score25: 19.80 },
  { code: '7140209', q24: 20, adm24: 20, score24: 26.50, q25: 101, adm25: 101, score25: 25.85 },
  { code: '7140210', q24: 100, adm24: 106, score24: 22.85, q25: 112, adm25: 112, score25: 20.35 },
  { code: '7140211', q24: 20, adm24: 19, score24: 25.75, q25: 81, adm25: 80, score25: 24.40 },
  { code: '7140212', q24: 0, adm24: 0, score24: 0, q25: 25, adm25: 25, score25: 25.30 },
  { code: '7140213', q24: 20, adm24: 21, score24: 23.90, q25: 29, adm25: 29, score25: 21.20 },
  { code: '7140217', q24: 30, adm24: 32, score24: 27.35, q25: 119, adm25: 119, score25: 26.85 },
  { code: '7140218', q24: 20, adm24: 23, score24: 27.45, q25: 47, adm25: 47, score25: 27.21 },
  { code: '7140219', q24: 20, adm24: 19, score24: 27.30, q25: 70, adm25: 70, score25: 26.74 },
  { code: '7140231', q24: 84, adm24: 87, score24: 25.92, q25: 199, adm25: 199, score25: 23.59 },
  { code: '7140247', q24: 20, adm24: 17, score24: 25.65, q25: 99, adm25: 99, score25: 22.50 },
  { code: '7140249', q24: 27, adm24: 32, score24: 27.15, q25: 112, adm25: 112, score25: 26.40 },
  { code: '7220201', q24: 290, adm24: 288, score24: 22.00, q25: 287, adm25: 285, score25: 23.00 },
  { code: '7220204', q24: 64, adm24: 65, score24: 23.50, q25: 66, adm25: 63, score25: 24.20 },
  { code: '7229030', q24: 61, adm24: 62, score24: 23.50, q25: 56, adm25: 54, score25: 25.29 },
  { code: '7310101', q24: 114, adm24: 119, score24: 18.00, q25: 113, adm25: 111, score25: 21.40 },
  { code: '7310205', q24: 99, adm24: 101, score24: 23.15, q25: 77, adm25: 58, score25: 23.60 },
  { code: '7310403', q24: 73, adm24: 81, score24: 23.00, q25: 71, adm25: 69, score25: 24.60 },
  { code: '7310608', q24: 128, adm24: 107, score24: 15.00, q25: 107, adm25: 106, score25: 22.30 },
  { code: '7310630', q24: 64, adm24: 69, score24: 18.00, q25: 61, adm25: 57, score25: 23.50 },
  { code: '7340101', q24: 266, adm24: 264, score24: 17.00, q25: 250, adm25: 249, score25: 21.70 },
  { code: '7340201', q24: 86, adm24: 92, score24: 20.25, q25: 102, adm25: 87, score25: 22.50 },
  { code: '7340301', q24: 262, adm24: 258, score24: 17.75, q25: 238, adm25: 236, score25: 20.30 },
  { code: '7340301AC', q24: 30, adm24: 29, score24: 18.00, q25: 30, adm25: 33, score25: 19.20 },
  { code: '7340302', q24: 54, adm24: 56, score24: 18.75, q25: 50, adm25: 50, score25: 21.80 },
  { code: '7380101', q24: 200, adm24: 188, score24: 23.65, q25: 170, adm25: 158, score25: 23.58 },
  { code: '7440112', q24: 50, adm24: 32, score24: 15.00, q25: 49, adm25: 50, score25: 20.50 },
  { code: '7460108', q24: 45, adm24: 17, score24: 15.00, q25: 40, adm25: 41, score25: 17.10 },
  { code: '7460112', q24: 55, adm24: 47, score24: 15.00, q25: 60, adm25: 60, score25: 19.50 },
  { code: '7480103', q24: 61, adm24: 50, score24: 15.00, q25: 61, adm25: 58, score25: 19.50 },
  { code: '7480107', q24: 52, adm24: 18, score24: 15.00, q25: 55, adm25: 50, score25: 20.00 },
  { code: '7480201', q24: 304, adm24: 349, score24: 16.50, q25: 172, adm25: 171, score25: 21.50 },
  { code: '7510205', q24: 186, adm24: 169, score24: 16.00, q25: 122, adm25: 111, score25: 22.20 },
  { code: '7510401', q24: 50, adm24: 19, score24: 15.00, q25: 41, adm25: 47, score25: 20.50 },
  { code: '7510605', q24: 170, adm24: 218, score24: 21.00, q25: 184, adm25: 164, score25: 23.60 },
  { code: '7520116', q24: 0, adm24: 0, score24: 0, q25: 33, adm25: 38, score25: 20.14 },
  { code: '7520201', q24: 113, adm24: 143, score24: 16.00, q25: 144, adm25: 137, score25: 20.65 },
  { code: '7520207', q24: 89, adm24: 61, score24: 15.00, q25: 89, adm25: 90, score25: 20.77 },
  { code: '7520216', q24: 74, adm24: 67, score24: 15.00, q25: 85, adm25: 76, score25: 21.02 },
  { code: '7520401', q24: 0, adm24: 0, score24: 0, q25: 57, adm25: 56, score25: 18.25 },
  { code: '7540101', q24: 170, adm24: 142, score24: 15.00, q25: 148, adm25: 137, score25: 20.90 },
  { code: '7580201', q24: 100, adm24: 96, score24: 15.00, q25: 97, adm25: 99, score25: 20.15 },
  { code: '7620109', q24: 50, adm24: 29, score24: 15.00, q25: 44, adm25: 39, score25: 15.00 },
  { code: '7760101', q24: 96, adm24: 77, score24: 20.25, q25: 65, adm25: 48, score25: 23.70 },
  { code: '7810103', q24: 131, adm24: 154, score24: 19.85, q25: 146, adm25: 122, score25: 22.25 },
  { code: '7810201', q24: 167, adm24: 128, score24: 18.35, q25: 113, adm25: 90, score25: 22.65 },
  { code: '7850101', q24: 100, adm24: 84, score24: 15.00, q25: 102, adm25: 101, score25: 20.75 },
  { code: '7850103', q24: 100, adm24: 105, score24: 15.00, q25: 119, adm25: 115, score25: 17.90 }
];

// 6. UNIVERSAL CONVERSIONS (IELTS, VSTEP)
const conversionRules = [
  { cert: 'IELTS', min: '5.0', action: 'REPLACE_SUBJECT_SCORE', score: 8.0 },
  { cert: 'IELTS', min: '5.5', action: 'REPLACE_SUBJECT_SCORE', score: 8.5 },
  { cert: 'IELTS', min: '6.0', action: 'REPLACE_SUBJECT_SCORE', score: 9.0 },
  { cert: 'IELTS', min: '6.5', action: 'REPLACE_SUBJECT_SCORE', score: 9.5 },
  { cert: 'IELTS', min: '7.0', action: 'REPLACE_SUBJECT_SCORE', score: 10.0 },
  { cert: 'VSTEP', min: '4.0', action: 'REPLACE_SUBJECT_SCORE', score: 8.0 },
  { cert: 'VSTEP', min: '5.0', action: 'REPLACE_SUBJECT_SCORE', score: 8.5 },
  { cert: 'VSTEP', min: '6.0', action: 'REPLACE_SUBJECT_SCORE', score: 9.0 },
  { cert: 'VSTEP', min: '7.0', action: 'REPLACE_SUBJECT_SCORE', score: 9.5 },
  { cert: 'VSTEP', min: '8.0', action: 'REPLACE_SUBJECT_SCORE', score: 10.0 }
];

// 7. BONUS POLICIES
const bonusPolicies = [
  { cat: 'HSG_QUOC_GIA', level: 'Giai_Nhat', points: 3.0, max: 3.0 },
  { cat: 'HSG_QUOC_GIA', level: 'Giai_Nhi', points: 2.0, max: 3.0 },
  { cat: 'HSG_QUOC_GIA', level: 'Giai_Ba', points: 1.0, max: 3.0 },
  { cat: 'HSG_QUOC_GIA', level: 'Giai_KhuyenKhich', points: 0.5, max: 3.0 },
  { cat: 'KHKT_QUOC_GIA', level: 'Giai_Tu', points: 0.5, max: 3.0 },
  { cat: 'VDV_QUOC_TE', level: 'DoiTuyenQuocGia', points: 3.0, max: 3.0 },
  { cat: 'VDV_QUOC_GIA', level: 'HuyChuongVangBacDong', points: 1.0, max: 3.0 }
];

async function main() {
  console.log('🚀 Starting DQN 2026 Admissions Scheme Seeding...\n');
  const token = await login();

  // BATCH 1: Create Institution
  console.log('\n--- BATCH 1: Institution ---');
  const instCheck = await apiRequest('/institutions/DQN', 'GET', null, token);
  if (instCheck.ok) {
    console.log('ℹ️ Institution DQN already exists.');
  } else {
    const instRes = await apiRequest('/institutions', 'POST', institutionData, token);
    console.log('✅ Created Institution DQN:', instRes.ok ? 'SUCCESS' : instRes.data.message);
  }

  // BATCH 2: Create Admission Methods
  console.log('\n--- BATCH 2: Admission Methods ---');
  for (const m of methodsData) {
    const check = await apiRequest(`/admission-methods/${m.methodId}`, 'GET', null, token);
    if (check.ok) {
      console.log(`ℹ️ Method ${m.methodId} already exists.`);
    } else {
      const res = await apiRequest('/admission-methods', 'POST', m, token);
      console.log(`✅ Created Method ${m.methodId}:`, res.ok ? 'SUCCESS' : res.data.message);
    }
  }

  // BATCH 3: Create Admission Scheme
  console.log('\n--- BATCH 3: Admission Scheme ---');
  const schemeCheck = await apiRequest(`/admission-schemes/${schemeData.schemeId}`, 'GET', null, token);
  if (schemeCheck.ok) {
    console.log(`ℹ️ Scheme ${schemeData.schemeId} already exists.`);
  } else {
    const res = await apiRequest('/admission-schemes', 'POST', schemeData, token);
    console.log(`✅ Created Scheme ${schemeData.schemeId}:`, res.ok ? 'SUCCESS' : res.data.message);
  }

  // BATCH 4: Create Majors
  console.log('\n--- BATCH 4: Majors (53 records) ---');
  let createdMajors = 0;
  for (const t of tracksData) {
    const majorCheck = await apiRequest(`/majors/${t.code}`, 'GET', null, token);
    if (majorCheck.ok) {
      // exists
    } else {
      const res = await apiRequest('/majors', 'POST', {
        majorCode: t.code,
        majorName: t.name,
        degreeType: t.type
      }, token);
      if (res.ok) createdMajors++;
    }
  }
  console.log(`✅ Processed 53 Majors (New created: ${createdMajors})`);

  // BATCH 5: Create Admission Tracks
  console.log('\n--- BATCH 5: Admission Tracks (53 records) ---');
  let createdTracks = 0;
  for (const t of tracksData) {
    const trackId = `DQN_2026_${t.code}`;
    const trackCheck = await apiRequest(`/admission-tracks/${trackId}`, 'GET', null, token);
    if (trackCheck.ok) {
      // exists
    } else {
      const res = await apiRequest('/admission-tracks', 'POST', {
        trackId,
        schemeId: 'DQN_2026',
        majorCode: t.code,
        admissionCode: t.code,
        trackName: t.name,
        trackType: t.type,
        tuitionPolicy: t.tuition,
        allocatedQuota: t.quota
      }, token);
      if (res.ok) createdTracks++;
      else console.error(`❌ Failed to create track ${trackId}:`, res.data);
    }
  }
  console.log(`✅ Processed 53 Admission Tracks (New created: ${createdTracks})`);

  // BATCH 6: Create Track Method Combinations (TMCs)
  console.log('\n--- BATCH 6: Track-Method Combinations (TMCs) ---');
  let createdTMCs = 0;
  const trackPrimaryTmc = {}; // Map trackId -> primary tmcId for benchmarks

  for (const t of tracksData) {
    const trackId = `DQN_2026_${t.code}`;
    // Get existing TMCs for this track
    const existingRes = await apiRequest(`/track-method-combinations?trackId=${trackId}`, 'GET', null, token);
    const existingSet = new Set((existingRes.data?.data || []).map(x => `${x.methodId}_${x.combinationCode}`));
    const existingList = existingRes.data?.data || [];

    // Identify primary method: PT100 if present, else first method
    const primaryMethod = t.methods.includes('PT100') ? 'PT100' : t.methods[0];
    const primaryComb = t.combinations[0];

    for (const methodId of t.methods) {
      for (const combCode of t.combinations) {
        const key = `${methodId}_${combCode}`;
        if (existingSet.has(key)) {
          const found = existingList.find(x => x.methodId === methodId && x.combinationCode === combCode);
          if (methodId === primaryMethod && combCode === primaryComb && found) {
            trackPrimaryTmc[t.code] = found.id;
          }
          continue;
        }

        const res = await apiRequest('/track-method-combinations', 'POST', {
          trackId,
          methodId,
          combinationCode: combCode
        }, token);

        if (res.ok && res.data?.data?.id) {
          createdTMCs++;
          if (methodId === primaryMethod && combCode === primaryComb) {
            trackPrimaryTmc[t.code] = res.data.data.id;
          }
        }
      }
    }

    // fallback if not yet set
    if (!trackPrimaryTmc[t.code]) {
      const refreshed = await apiRequest(`/track-method-combinations?trackId=${trackId}`, 'GET', null, token);
      if (refreshed.data?.data?.length > 0) {
        trackPrimaryTmc[t.code] = refreshed.data.data[0].id;
      }
    }
  }
  console.log(`✅ Processed TMCs (New created: ${createdTMCs}, Primary mappings: ${Object.keys(trackPrimaryTmc).length})`);

  // BATCH 7: Benchmarks & Quotas (2024 & 2025)
  console.log('\n--- BATCH 7: Benchmarks & Quotas (2024 & 2025) ---');
  let createdBenchmarks = 0;
  for (const b of benchmarksData) {
    const tmcId = trackPrimaryTmc[b.code];
    if (!tmcId) {
      console.warn(`⚠️ No TMC found for track ${b.code}, skipping benchmark`);
      continue;
    }

    // Check existing benchmarks for this tmc
    const checkRes = await apiRequest(`/benchmarks-quotas?tmcId=${tmcId}`, 'GET', null, token);
    const existingYears = new Set((checkRes.data?.data || []).map(x => x.academicYear));

    // Year 2024
    if (!existingYears.has(2024)) {
      const res24 = await apiRequest('/benchmarks-quotas', 'POST', {
        tmcId,
        academicYear: 2024,
        quota: b.q24,
        admittedCount: b.adm24,
        benchmarkScore: b.score24,
        scoreScale: 30.0
      }, token);
      if (res24.ok) createdBenchmarks++;
    }

    // Year 2025
    if (!existingYears.has(2025)) {
      const res25 = await apiRequest('/benchmarks-quotas', 'POST', {
        tmcId,
        academicYear: 2025,
        quota: b.q25,
        admittedCount: b.adm25,
        benchmarkScore: b.score25,
        scoreScale: 30.0
      }, token);
      if (res25.ok) createdBenchmarks++;
    }
  }
  console.log(`✅ Processed Benchmarks & Quotas (New created: ${createdBenchmarks})`);

  // BATCH 8: Universal Conversions
  console.log('\n--- BATCH 8: Universal Conversions (IELTS & VSTEP) ---');
  const existingConv = await apiRequest(`/universal-conversions?institutionId=DQN`, 'GET', null, token);
  const existingConvSet = new Set((existingConv.data?.data || []).map(x => `${x.certOrAchievementType}_${x.minInputValue}`));
  let createdConv = 0;
  for (const c of conversionRules) {
    const key = `${c.cert}_${c.min}`;
    if (!existingConvSet.has(key)) {
      const res = await apiRequest('/universal-conversions', 'POST', {
        institutionId: 'DQN',
        certOrAchievementType: c.cert,
        minInputValue: c.min,
        actionType: c.action,
        convertedScore: c.score
      }, token);
      if (res.ok) createdConv++;
    }
  }
  console.log(`✅ Processed Universal Conversions (New created: ${createdConv})`);

  // BATCH 9: Bonus Policies
  console.log('\n--- BATCH 9: Bonus Policies ---');
  const existingPol = await apiRequest(`/bonus-policies?institutionId=DQN`, 'GET', null, token);
  const existingPolSet = new Set((existingPol.data?.data || []).map(x => `${x.achievementCategory}_${x.prizeLevel}`));
  let createdPolicies = 0;
  for (const p of bonusPolicies) {
    const key = `${p.cat}_${p.level}`;
    if (!existingPolSet.has(key)) {
      const res = await apiRequest('/bonus-policies', 'POST', {
        institutionId: 'DQN',
        achievementCategory: p.cat,
        prizeLevel: p.level,
        bonusPoints: p.points,
        maxAccumulatedBonus: p.max
      }, token);
      if (res.ok) createdPolicies++;
    }
  }
  console.log(`✅ Processed Bonus Policies (New created: ${createdPolicies})`);

  // BATCH 10: Eligibility Rules
  console.log('\n--- BATCH 10: Track Eligibility Rules ---');
  let createdRules = 0;
  // GD Thể chất rule
  const gdtcTrack = 'DQN_2026_7140206';
  const existingGdtcRules = await apiRequest(`/eligibility-rules?trackId=${gdtcTrack}`, 'GET', null, token);
  if ((existingGdtcRules.data?.data || []).length === 0) {
    const res = await apiRequest('/eligibility-rules', 'POST', {
      trackId: gdtcTrack,
      ruleType: 'PHYSICAL_FITNESS',
      ruleValue: {
        min_height_male: 1.65,
        min_weight_male: 45,
        min_height_female: 1.55,
        min_weight_female: 40,
        disability_check: 'NO_SPINAL_LIMB_EYE_OR_SPEECH_DEFECTS'
      },
      errorMessageVi: 'Thí sinh xét tuyển ngành GDTC phải không bị dị tật; chiều cao tối thiểu 1.65m (45kg) với nam, 1.55m (40kg) với nữ'
    }, token);
    if (res.ok) createdRules++;
  }
  console.log(`✅ Processed Track Eligibility Rules (New created: ${createdRules})`);

  // BATCH 11: Tie Breakers
  console.log('\n--- BATCH 11: Track Tie Breakers ---');
  let createdTie = 0;
  for (const t of tracksData) {
    const trackId = `DQN_2026_${t.code}`;
    const existingTie = await apiRequest(`/tie-breakers?trackId=${trackId}`, 'GET', null, token);
    if ((existingTie.data?.data || []).length === 0) {
      // Priority 1: Lower bonus points
      const r1 = await apiRequest('/tie-breakers', 'POST', {
        trackId,
        priorityOrder: 1,
        criterionType: 'LOWER_BONUS_POINTS',
        sortDirection: 'ASC'
      }, token);
      if (r1.ok) createdTie++;

      // Priority 2: Higher wish rank
      const r2 = await apiRequest('/tie-breakers', 'POST', {
        trackId,
        priorityOrder: 2,
        criterionType: 'HIGHER_WISH_ORDER',
        sortDirection: 'ASC'
      }, token);
      if (r2.ok) createdTie++;
    }
  }
  console.log(`✅ Processed Track Tie Breakers (New created: ${createdTie})`);

  console.log('\n🎉 ALL 11 BATCHES EXECUTED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('💥 Fatal error during seeding:', err);
  process.exit(1);
});
