// Danh mục Chuẩn 3 Vùng Miền & 34 Đơn vị Hành chính Cấp Tỉnh của Việt Nam
// Cập nhật mới nhất theo Nghị quyết số 202/2025/QH15 của Quốc hội (Hiệu lực từ 01/07/2025)
// Bao gồm 28 Tỉnh và 6 Thành phố trực thuộc Trung ương

export const VIETNAM_REGIONS = [
  'Miền Bắc',
  'Miền Trung',
  'Miền Nam',
];

// Danh mục 34 Tỉnh / Thành phố mới nhất sau sắp xếp, phân theo 3 Vùng Miền
export const PROVINCES_BY_REGION = {
  'Miền Bắc': [
    'Hà Nội',
    'Hải Phòng',
    'Cao Bằng',
    'Lạng Sơn',
    'Lai Châu',
    'Điện Biên',
    'Sơn La',
    'Quảng Ninh',
    'Tuyên Quang',
    'Lào Cai',
    'Thái Nguyên',
    'Phú Thọ',
    'Bắc Ninh',
    'Hưng Yên',
    'Ninh Bình',
  ],
  'Miền Trung': [
    'Huế',
    'Đà Nẵng',
    'Thanh Hóa',
    'Nghệ An',
    'Hà Tĩnh',
    'Quảng Trị',
    'Quảng Ngãi',
    'Gia Lai',
    'Đắk Lắk',
    'Khánh Hòa',
    'Lâm Đồng',
  ],
  'Miền Nam': [
    'TP. Hồ Chí Minh',
    'Cần Thơ',
    'Đồng Nai',
    'Tây Ninh',
    'Vĩnh Long',
    'Đồng Tháp',
    'Cà Mau',
    'An Giang',
  ],
};

// Thông tin chi tiết lịch sử sáp nhập của 34 tỉnh/thành mới
export const PROVINCES_MERGED_INFO = {
  'Hà Nội': 'Thủ đô Hà Nội (Giữ nguyên)',
  'Huế': 'TP. Huế (Thành phố trực thuộc TW, trước là Thừa Thiên Huế)',
  'Hải Phòng': 'TP. Hải Phòng (Hợp nhất TP. Hải Phòng + Hải Dương)',
  'Đà Nẵng': 'TP. Đà Nẵng (Hợp nhất TP. Đà Nẵng + Quảng Nam)',
  'TP. Hồ Chí Minh': 'TP. Hồ Chí Minh (Mở rộng hợp nhất TP.HCM + Bình Dương + Bà Rịa - Vũng Tàu)',
  'Cần Thơ': 'TP. Cần Thơ (Hợp nhất TP. Cần Thơ + Hậu Giang + Sóc Trăng)',
  'Cao Bằng': 'Tỉnh Cao Bằng (Giữ nguyên)',
  'Lạng Sơn': 'Tỉnh Lạng Sơn (Giữ nguyên)',
  'Lai Châu': 'Tỉnh Lai Châu (Giữ nguyên)',
  'Điện Biên': 'Tỉnh Điện Biên (Giữ nguyên)',
  'Sơn La': 'Tỉnh Sơn La (Giữ nguyên)',
  'Quảng Ninh': 'Tỉnh Quảng Ninh (Giữ nguyên)',
  'Thanh Hóa': 'Tỉnh Thanh Hóa (Giữ nguyên)',
  'Nghệ An': 'Tỉnh Nghệ An (Giữ nguyên)',
  'Hà Tĩnh': 'Tỉnh Hà Tĩnh (Giữ nguyên)',
  'Tuyên Quang': 'Tỉnh Tuyên Quang (Hợp nhất Tuyên Quang + Hà Giang)',
  'Lào Cai': 'Tỉnh Lào Cai (Hợp nhất Lào Cai + Yên Bái)',
  'Thái Nguyên': 'Tỉnh Thái Nguyên (Hợp nhất Thái Nguyên + Bắc Kạn)',
  'Phú Thọ': 'Tỉnh Phú Thọ (Hợp nhất Phú Thọ + Vĩnh Phúc + Hòa Bình)',
  'Bắc Ninh': 'Tỉnh Bắc Ninh (Hợp nhất Bắc Ninh + Bắc Giang)',
  'Hưng Yên': 'Tỉnh Hưng Yên (Hợp nhất Hưng Yên + Thái Bình)',
  'Ninh Bình': 'Tỉnh Ninh Bình (Hợp nhất Ninh Bình + Nam Định + Hà Nam)',
  'Quảng Trị': 'Tỉnh Quảng Trị (Hợp nhất Quảng Trị + Quảng Bình)',
  'Quảng Ngãi': 'Tỉnh Quảng Ngãi (Hợp nhất Quảng Ngãi + Kon Tum)',
  'Gia Lai': 'Tỉnh Gia Lai (Hợp nhất Gia Lai + Bình Định)',
  'Đắk Lắk': 'Tỉnh Đắk Lắk (Hợp nhất Đắk Lắk + Phú Yên)',
  'Khánh Hòa': 'Tỉnh Khánh Hòa (Hợp nhất Khánh Hòa + Ninh Thuận)',
  'Lâm Đồng': 'Tỉnh Lâm Đồng (Hợp nhất Lâm Đồng + Bình Thuận + Đắk Nông)',
  'Đồng Nai': 'Tỉnh Đồng Nai (Hợp nhất Đồng Nai + Bình Phước)',
  'Tây Ninh': 'Tỉnh Tây Ninh (Hợp nhất Tây Ninh + Long An)',
  'Vĩnh Long': 'Tỉnh Vĩnh Long (Hợp nhất Vĩnh Long + Bến Tre + Trà Vinh)',
  'Đồng Tháp': 'Tỉnh Đồng Tháp (Hợp nhất Đồng Tháp + Tiền Giang)',
  'Cà Mau': 'Tỉnh Cà Mau (Hợp nhất Cà Mau + Bạc Liêu)',
  'An Giang': 'Tỉnh An Giang (Hợp nhất An Giang + Kiên Giang)',
};

// Bản đồ ánh xạ toàn diện từ tên tỉnh thành cũ (63 tỉnh) sang tên đơn vị mới (34 tỉnh thành)
export const LEGACY_PROVINCE_TO_NEW = {
  // Miền Bắc
  'Hà Nội': 'Hà Nội',
  'Hải Phòng': 'Hải Phòng',
  'Hải Dương': 'Hải Phòng',
  'Quảng Ninh': 'Quảng Ninh',
  'Bắc Ninh': 'Bắc Ninh',
  'Bắc Giang': 'Bắc Ninh',
  'Hưng Yên': 'Hưng Yên',
  'Thái Bình': 'Hưng Yên',
  'Ninh Bình': 'Ninh Bình',
  'Nam Định': 'Ninh Bình',
  'Hà Nam': 'Ninh Bình',
  'Phú Thọ': 'Phú Thọ',
  'Vĩnh Phúc': 'Phú Thọ',
  'Hòa Bình': 'Phú Thọ',
  'Thái Nguyên': 'Thái Nguyên',
  'Bắc Kạn': 'Thái Nguyên',
  'Tuyên Quang': 'Tuyên Quang',
  'Hà Giang': 'Tuyên Quang',
  'Cao Bằng': 'Cao Bằng',
  'Lạng Sơn': 'Lạng Sơn',
  'Lào Cai': 'Lào Cai',
  'Yên Bái': 'Lào Cai',
  'Điện Biên': 'Điện Biên',
  'Lai Châu': 'Lai Châu',
  'Sơn La': 'Sơn La',

  // Miền Trung
  'Thừa Thiên Huế': 'Huế',
  'Huế': 'Huế',
  'Đà Nẵng': 'Đà Nẵng',
  'Quảng Nam': 'Đà Nẵng',
  'Thanh Hóa': 'Thanh Hóa',
  'Nghệ An': 'Nghệ An',
  'Hà Tĩnh': 'Hà Tĩnh',
  'Quảng Bình': 'Quảng Trị',
  'Quảng Trị': 'Quảng Trị',
  'Quảng Ngãi': 'Quảng Ngãi',
  'Kon Tum': 'Quảng Ngãi',
  'Bình Định': 'Gia Lai',
  'Gia Lai': 'Gia Lai',
  'Phú Yên': 'Đắk Lắk',
  'Đắk Lắk': 'Đắk Lắk',
  'Khánh Hòa': 'Khánh Hòa',
  'Ninh Thuận': 'Khánh Hòa',
  'Lâm Đồng': 'Lâm Đồng',
  'Bình Thuận': 'Lâm Đồng',
  'Đắk Nông': 'Lâm Đồng',

  // Miền Nam
  'TP. Hồ Chí Minh': 'TP. Hồ Chí Minh',
  'Hồ Chí Minh': 'TP. Hồ Chí Minh',
  'Bình Dương': 'TP. Hồ Chí Minh',
  'Bà Rịa - Vũng Tàu': 'TP. Hồ Chí Minh',
  'Vũng Tàu': 'TP. Hồ Chí Minh',
  'Đồng Nai': 'Đồng Nai',
  'Bình Phước': 'Đồng Nai',
  'Tây Ninh': 'Tây Ninh',
  'Long An': 'Tây Ninh',
  'Cần Thơ': 'Cần Thơ',
  'Hậu Giang': 'Cần Thơ',
  'Sóc Trăng': 'Cần Thơ',
  'Vĩnh Long': 'Vĩnh Long',
  'Bến Tre': 'Vĩnh Long',
  'Trà Vinh': 'Vĩnh Long',
  'Đồng Tháp': 'Đồng Tháp',
  'Tiền Giang': 'Đồng Tháp',
  'Cà Mau': 'Cà Mau',
  'Bạc Liêu': 'Cà Mau',
  'An Giang': 'An Giang',
  'Kiên Giang': 'An Giang',
};

// Danh sách phẳng 34 tỉnh/thành phố mới
export const ALL_PROVINCES = [
  ...PROVINCES_BY_REGION['Miền Bắc'],
  ...PROVINCES_BY_REGION['Miền Trung'],
  ...PROVINCES_BY_REGION['Miền Nam'],
];

/**
 * Chuẩn hóa tên Tỉnh/Thành phố sang đơn vị hành chính 34 tỉnh mới nhất
 * @param {string} provinceName 
 * @returns {string} Tên chuẩn sau sắp xếp
 */
export function normalizeProvince(provinceName) {
  if (!provinceName) return '';
  const clean = provinceName.trim();
  
  if (LEGACY_PROVINCE_TO_NEW[clean]) {
    return LEGACY_PROVINCE_TO_NEW[clean];
  }

  const lower = clean.toLowerCase();
  for (const [legacy, standard] of Object.entries(LEGACY_PROVINCE_TO_NEW)) {
    if (lower.includes(legacy.toLowerCase()) || legacy.toLowerCase().includes(lower)) {
      return standard;
    }
  }

  return clean;
}

/**
 * Tra cứu Vùng miền tương ứng từ Tỉnh/Thành phố (hỗ trợ cả tên mới 34 tỉnh và tên cũ 63 tỉnh)
 * @param {string} provinceName 
 * @returns {string} 'Miền Bắc' | 'Miền Trung' | 'Miền Nam' | ''
 */
export function getRegionOfProvince(provinceName) {
  if (!provinceName) return '';
  const normalized = normalizeProvince(provinceName);
  const cleanName = (normalized || provinceName).trim().toLowerCase();
  
  for (const [region, provinces] of Object.entries(PROVINCES_BY_REGION)) {
    if (provinces.some((p) => cleanName.includes(p.toLowerCase()) || p.toLowerCase().includes(cleanName))) {
      return region;
    }
  }
  return '';
}

/**
 * Lấy danh sách tỉnh thành theo Vùng miền (nếu region rỗng trả về tất cả 34 tỉnh mới)
 * @param {string} regionName 
 * @returns {string[]}
 */
export function getProvincesForRegion(regionName) {
  if (!regionName || regionName === 'ALL') return ALL_PROVINCES;
  return PROVINCES_BY_REGION[regionName] || ALL_PROVINCES;
}
