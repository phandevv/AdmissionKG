import { VIETNAM_REGIONS, PROVINCES_BY_REGION } from '../../../shared/constants/vietnamGeography';

/**
 * Danh sách các Tổ hợp xét tuyển đại học phổ biến
 */
export const POPULAR_GROUPS = [
  { code: 'A00', name: 'Khối A00 (Toán, Lý, Hóa)' },
  { code: 'A01', name: 'Khối A01 (Toán, Lý, Anh)' },
  { code: 'A02', name: 'Khối A02 (Toán, Lý, Sinh)' },
  { code: 'B00', name: 'Khối B00 (Toán, Hóa, Sinh)' },
  { code: 'B08', name: 'Khối B08 (Toán, Sinh, Anh)' },
  { code: 'C00', name: 'Khối C00 (Văn, Sử, Địa)' },
  { code: 'C01', name: 'Khối C01 (Văn, Toán, Lý)' },
  { code: 'D01', name: 'Khối D01 (Toán, Văn, Anh)' },
  { code: 'D07', name: 'Khối D07 (Toán, Hóa, Anh)' },
  { code: 'X01', name: 'Khối X01 (Toán, Tin, Anh)' },
  { code: 'X02', name: 'Khối X02 (Toán, Công nghệ, Lý)' },
];

/**
 * Danh sách 11 môn thi tốt nghiệp THPT 2026
 */
export const SINGLE_SUBJECTS = [
  { code: 'MATH', name: 'Toán học' },
  { code: 'LITERATURE', name: 'Ngữ văn' },
  { code: 'PHYSICS', name: 'Vật lí' },
  { code: 'CHEMISTRY', name: 'Hóa học' },
  { code: 'BIOLOGY', name: 'Sinh học' },
  { code: 'HISTORY', name: 'Lịch sử' },
  { code: 'GEOGRAPHY', name: 'Địa lí' },
  { code: 'ECONOMIC_LEGAL', name: 'GD Kinh tế & Pháp luật' },
  { code: 'INFORMATICS', name: 'Tin học' },
  { code: 'TECHNOLOGY', name: 'Công nghệ' },
  { code: 'FOREIGN_LANG', name: 'Ngoại ngữ' },
];

/**
 * Danh sách 34 Tỉnh/Thành phố sau chuẩn hóa
 */
export const ALL_PROVINCES = [
  ...PROVINCES_BY_REGION['Miền Bắc'],
  ...PROVINCES_BY_REGION['Miền Trung'],
  ...PROVINCES_BY_REGION['Miền Nam'],
];

export { VIETNAM_REGIONS };

/**
 * Ánh xạ mã môn tiếng Anh sang nhãn tiếng Việt trong Candidate DTO
 */
export const SUBJECT_CODE_TO_VIETNAMESE_MAP = {
  MATH: 'Toán',
  LITERATURE: 'Ngữ văn',
  PHYSICS: 'Vật lí',
  CHEMISTRY: 'Hóa học',
  BIOLOGY: 'Sinh học',
  HISTORY: 'Lịch sử',
  GEOGRAPHY: 'Địa lí',
  ECONOMIC_LEGAL: 'GD Kinh tế & Pháp luật',
  INFORMATICS: 'Tin học',
  TECHNOLOGY: 'Công nghệ',
  FOREIGN_LANG: 'Ngoại ngữ',
};

/**
 * Cấu hình mặc định khi khởi tạo trang
 */
export const DEFAULT_SCORE_CONFIG = {
  DEFAULT_YEAR: '2026',
  DEFAULT_SBD: '01000008',
  DEFAULT_TARGET: 'A00',
  DEFAULT_TARGET_CATEGORY: 'GROUP',
  DEFAULT_SCOPE_TYPE: 'NATIONAL',
  DEFAULT_SCOPE_CODE: 'ALL',
};
