import {
  Building2, MapPin, CalendarDays, Route, ListOrdered, Link2, Star, Scale, Gavel, Percent,
  Layers, GraduationCap, BookOpen, Grid3X3, Gift, Award, Briefcase, GitBranch,
  Users, ClipboardList, Heart, FileBarChart,
} from 'lucide-react';
import {
  institutionsApi, campusesApi, admissionSchemesApi, admissionTracksApi, admissionMethodsApi,
  trackMethodCombinationsApi, benchmarkQuotasApi, eligibilityRulesApi, tieBreakersApi,
  scoreFormulasApi, majorsApi, academicFieldsApi, subjectsApi, subjectCombinationsApi,
  universalConversionsApi, bonusPoliciesApi, careersApi, trackCareerMappingsApi,
  usersApi, academicProfilesApi, wishesApi, twdEvaluationLogsApi,
} from '../shared/services/api';

const json = (key, label) => ({ key, label, type: 'json', fullWidth: true });

export const ADMIN_ENTITIES = {
  // ─────────── TỔ CHỨC TUYỂN SINH ───────────
  institutions: {
    label: 'Trường / Đơn vị tuyển sinh',
    description: 'Bảng institutions — các trường đại học, học viện, đơn vị tham gia tuyển sinh.',
    icon: Building2,
    api: institutionsApi,
    idKey: 'institutionId',
    refLabel: 'institutionName',
    refSecondary: 'institutionCode',
    columns: [
      { key: 'institutionId', label: 'ID' },
      { key: 'institutionCode', label: 'Mã' },
      { key: 'institutionName', label: 'Tên trường' },
      { key: 'institutionType', label: 'Loại hình' },
      { key: 'provinceCity', label: 'Tỉnh / TP' },
      { key: 'region', label: 'Vùng miền' },
      { key: 'parentInstitutionId', label: 'Trường cha' },
    ],
    fields: [
      { key: 'institutionId', label: 'ID (khóa chính)', required: true, immutable: true, placeholder: 'VD: DQN' },
      { key: 'institutionCode', label: 'Mã trường', required: true, placeholder: 'VD: QNU' },
      { key: 'institutionName', label: 'Tên trường', required: true },
      {
        key: 'institutionType', label: 'Loại hình', type: 'select', options: [
          { value: 'Đại học công lập', label: 'Đại học công lập' },
          { value: 'Học viện công lập', label: 'Học viện công lập' },
          { value: 'Đại học tư thục', label: 'Đại học tư thục' },
          { value: 'Đại học Quốc gia', label: 'Đại học Quốc gia' },
          { value: 'Phân hiệu', label: 'Phân hiệu' },
        ],
      },
      { key: 'provinceCity', label: 'Tỉnh / Thành phố', placeholder: 'VD: Bình Định, Hà Nội, TP. Hồ Chí Minh' },
      {
        key: 'region', label: 'Vùng miền / Khu vực lớn', type: 'select', options: [
          { value: 'Miền Bắc', label: 'Miền Bắc' },
          { value: 'Miền Trung', label: 'Miền Trung' },
          { value: 'Miền Nam', label: 'Miền Nam' },
        ],
      },
      { key: 'parentInstitutionId', label: 'Trường cha (nếu là phân hiệu)', ref: 'institutions' },
      json('contactInfo', 'Thông tin liên hệ (JSON)'),
    ],
  },

  campuses: {
    label: 'Cơ sở đào tạo',
    description: 'Bảng campuses — các cơ sở, phân hiệu của từng trường.',
    icon: MapPin,
    api: campusesApi,
    idKey: 'campusId',
    refLabel: 'campusName',
    columns: [
      { key: 'campusId', label: 'ID' },
      { key: 'campusCode', label: 'Mã cơ sở' },
      { key: 'campusName', label: 'Tên cơ sở' },
      { key: 'institutionId', label: 'Trường', type: 'ref', ref: 'institutions' },
      { key: 'provinceCity', label: 'Tỉnh / TP' },
      { key: 'region', label: 'Vùng miền' },
    ],
    fields: [
      { key: 'campusId', label: 'ID (khóa chính)', required: true, immutable: true },
      { key: 'institutionId', label: 'Trường', required: true, ref: 'institutions' },
      { key: 'campusCode', label: 'Mã cơ sở' },
      { key: 'campusName', label: 'Tên cơ sở', required: true },
      { key: 'provinceCity', label: 'Tỉnh / Thành phố' },
      {
        key: 'region', label: 'Vùng miền / Khu vực lớn', type: 'select', options: [
          { value: 'Miền Bắc', label: 'Miền Bắc' },
          { value: 'Miền Trung', label: 'Miền Trung' },
          { value: 'Miền Nam', label: 'Miền Nam' },
        ],
      },
    ],
  },

  'admission-schemes': {
    label: 'Kế hoạch tuyển sinh',
    description: 'Bảng admission_schemes — kế hoạch tuyển sinh theo trường và năm học.',
    icon: CalendarDays,
    api: admissionSchemesApi,
    idKey: 'schemeId',
    refLabel: 'schemeId',
    refSecondary: 'academicYear',
    columns: [
      { key: 'schemeId', label: 'ID kế hoạch' },
      { key: 'institutionId', label: 'Trường', type: 'ref', ref: 'institutions' },
      { key: 'academicYear', label: 'Năm học', align: 'center' },
      { key: 'totalQuota', label: 'Tổng chỉ tiêu', align: 'center' },
    ],
    fields: [
      { key: 'schemeId', label: 'ID kế hoạch (khóa chính)', required: true, immutable: true, placeholder: 'VD: DQN-2026' },
      { key: 'institutionId', label: 'Trường', required: true, ref: 'institutions' },
      { key: 'academicYear', label: 'Năm học', required: true, type: 'number', placeholder: '2026' },
      { key: 'totalQuota', label: 'Tổng chỉ tiêu', type: 'number' },
    ],
  },

  'admission-tracks': {
    label: 'Đợt / Phương án tuyển sinh',
    description: 'Bảng admission_tracks — phương án tuyển sinh của từng ngành trong một kế hoạch.',
    icon: Route,
    api: admissionTracksApi,
    idKey: 'trackId',
    refLabel: 'trackName',
    refSecondary: 'trackId',
    columns: [
      { key: 'trackId', label: 'ID đợt' },
      { key: 'trackName', label: 'Tên đợt' },
      { key: 'schemeId', label: 'Kế hoạch', type: 'ref', ref: 'admission-schemes' },
      { key: 'majorCode', label: 'Ngành', type: 'ref', ref: 'majors' },
      { key: 'admissionCode', label: 'Mã xét tuyển' },
      { key: 'allocatedQuota', label: 'Chỉ tiêu', align: 'center' },
    ],
    fields: [
      { key: 'trackId', label: 'ID đợt (khóa chính)', required: true, immutable: true, placeholder: 'VD: TR-DQN-CNTT-2026' },
      { key: 'schemeId', label: 'Kế hoạch tuyển sinh', required: true, ref: 'admission-schemes' },
      { key: 'trackName', label: 'Tên đợt', required: true },
      { key: 'majorCode', label: 'Ngành đào tạo', ref: 'majors' },
      { key: 'campusId', label: 'Cơ sở đào tạo', ref: 'campuses' },
      { key: 'admissionCode', label: 'Mã xét tuyển' },
      {
        key: 'trackType', label: 'Loại đợt', type: 'select', options: [
          { value: 'CHINH_QUY', label: 'Chính quy' },
          { value: 'LIEN_THONG', label: 'Liên thông' },
          { value: 'VUA_VA_BAN', label: 'Vừa làm vừa học' },
        ],
      },
      { key: 'orientationCert', label: 'Chứng chỉ định hướng (nếu có)' },
      { key: 'allocatedQuota', label: 'Chỉ tiêu', type: 'number' },
      json('tuitionPolicy', 'Chính sách học phí (JSON)'),
    ],
  },

  'admission-methods': {
    label: 'Phương thức xét tuyển',
    description: 'Bảng admission_methods — danh mục phương thức (điểm thi THPT, học bạ, đánh giá năng lực...).',
    icon: ListOrdered,
    api: admissionMethodsApi,
    idKey: 'methodId',
    refLabel: 'methodName',
    refSecondary: 'methodId',
    columns: [
      { key: 'methodId', label: 'ID' },
      { key: 'methodCode', label: 'Mã PT' },
      { key: 'methodName', label: 'Tên phương thức' },
      { key: 'targetGroup', label: 'Đối tượng áp dụng' },
    ],
    fields: [
      { key: 'methodId', label: 'ID (khóa chính)', required: true, immutable: true, placeholder: 'VD: PT100' },
      { key: 'methodCode', label: 'Mã phương thức', required: true },
      { key: 'methodName', label: 'Tên phương thức', required: true },
      { key: 'targetGroup', label: 'Đối tượng áp dụng' },
    ],
  },

  'track-method-combinations': {
    label: 'Đợt × Phương thức × Tổ hợp',
    description: 'Bảng track_method_combinations — chi tiết cách xét tuyển của từng đợt (tmcId dùng cho nguyện vọng).',
    icon: Link2,
    api: trackMethodCombinationsApi,
    idKey: 'id',
    refLabel: 'id',
    refSecondary: 'combinationCode',
    columns: [
      { key: 'id', label: 'TMC ID', align: 'center' },
      { key: 'trackId', label: 'Đợt TS', type: 'ref', ref: 'admission-tracks' },
      { key: 'methodId', label: 'Phương thức', type: 'ref', ref: 'admission-methods' },
      { key: 'combinationCode', label: 'Tổ hợp', type: 'ref', ref: 'subject-combinations' },
      { key: 'formulaId', label: 'Công thức điểm', type: 'ref', ref: 'score-formulas' },
      { key: 'specificQuota', label: 'Chỉ tiêu riêng', align: 'center' },
    ],
    fields: [
      { key: 'trackId', label: 'Đợt tuyển sinh', required: true, ref: 'admission-tracks' },
      { key: 'methodId', label: 'Phương thức', required: true, ref: 'admission-methods' },
      { key: 'combinationCode', label: 'Tổ hợp môn', required: true, ref: 'subject-combinations' },
      { key: 'formulaId', label: 'Công thức tính điểm', ref: 'score-formulas' },
      { key: 'specificQuota', label: 'Chỉ tiêu riêng', type: 'number' },
    ],
  },

  // ─────────── NGÀNH & MÔN HỌC ───────────
  'academic-fields': {
    label: 'Khối ngành',
    description: 'Bảng academic_fields — phân nhóm ngành đào tạo (ngành 748, 734, 772...).',
    icon: Layers,
    api: academicFieldsApi,
    idKey: 'fieldCode',
    refLabel: 'fieldName',
    refSecondary: 'fieldCode',
    columns: [
      { key: 'fieldCode', label: 'Mã khối' },
      { key: 'fieldName', label: 'Tên khối ngành' },
    ],
    fields: [
      { key: 'fieldCode', label: 'Mã khối ngành (khóa chính)', required: true, immutable: true, placeholder: 'VD: 748' },
      { key: 'fieldName', label: 'Tên khối ngành', required: true, placeholder: 'VD: Khoa học máy tính' },
    ],
  },

  majors: {
    label: 'Ngành đào tạo',
    description: 'Bảng majors — danh mục ngành đào tạo theo mã ngành Bộ GD&ĐT.',
    icon: GraduationCap,
    api: majorsApi,
    idKey: 'majorCode',
    refLabel: 'majorName',
    refSecondary: 'majorCode',
    columns: [
      { key: 'majorCode', label: 'Mã ngành' },
      { key: 'majorName', label: 'Tên ngành' },
      { key: 'fieldCode', label: 'Khối ngành', type: 'ref', ref: 'academic-fields' },
      { key: 'degreeType', label: 'Bậc / Văn bằng' },
    ],
    fields: [
      { key: 'majorCode', label: 'Mã ngành (khóa chính)', required: true, immutable: true, placeholder: 'VD: 7480201' },
      { key: 'majorName', label: 'Tên ngành', required: true },
      { key: 'fieldCode', label: 'Khối ngành', ref: 'academic-fields' },
      {
        key: 'degreeType', label: 'Bậc / Văn bằng', type: 'select', options: [
          { value: 'Cử nhân', label: 'Cử nhân' },
          { value: 'Kỹ sư', label: 'Kỹ sư' },
          { value: 'Bác sĩ', label: 'Bác sĩ' },
          { value: 'Dược sĩ', label: 'Dược sĩ' },
          { value: 'Thạc sĩ', label: 'Thạc sĩ' },
        ],
      },
    ],
  },

  subjects: {
    label: 'Môn học',
    description: 'Bảng subjects — các môn thi / môn học dùng để xây tổ hợp.',
    icon: BookOpen,
    api: subjectsApi,
    idKey: 'subjectCode',
    refLabel: 'subjectName',
    refSecondary: 'subjectCode',
    columns: [
      { key: 'subjectCode', label: 'Mã môn' },
      { key: 'subjectName', label: 'Tên môn' },
      { key: 'subjectCategory', label: 'Nhóm môn' },
    ],
    fields: [
      { key: 'subjectCode', label: 'Mã môn (khóa chính)', required: true, immutable: true, placeholder: 'VD: TOAN' },
      { key: 'subjectName', label: 'Tên môn', required: true },
      {
        key: 'subjectCategory', label: 'Nhóm môn', type: 'select', options: [
          { value: 'BẮT BUỘC', label: 'Bắt buộc' },
          { value: 'TỰ CHỌN', label: 'Tự chọn' },
          { value: 'NGOẠI NGỮ', label: 'Ngoại ngữ' },
        ],
      },
    ],
  },

  'subject-combinations': {
    label: 'Tổ hợp môn',
    description: 'Bảng subject_combinations — các tổ hợp xét tuyển (A00, A01, D01, X06...).',
    icon: Grid3X3,
    api: subjectCombinationsApi,
    idKey: 'combinationCode',
    refLabel: 'combinationName',
    refSecondary: 'combinationCode',
    columns: [
      { key: 'combinationCode', label: 'Mã tổ hợp' },
      { key: 'combinationName', label: 'Tên tổ hợp' },
      { key: 'subjectCodes', label: 'Các môn trong tổ hợp', render: (v) => (Array.isArray(v) ? v.map((s) => <span key={s} className="pill plain" style={{ margin: 2 }}>{s}</span>) : '—') },
    ],
    fields: [
      { key: 'combinationCode', label: 'Mã tổ hợp (khóa chính)', required: true, immutable: true, placeholder: 'VD: A00' },
      { key: 'combinationName', label: 'Tên tổ hợp', required: true, placeholder: 'VD: Toán, Vật lí, Hóa học' },
      { key: 'subjectCodes', label: 'Danh sách mã môn (cách nhau bởi dấu phẩy)', type: 'list', fullWidth: true, placeholder: 'TOAN, VATLI, HOAHOC' },
    ],
  },

  'score-formulas': {
    label: 'Công thức tính điểm',
    description: 'Bảng score_formulas — công thức quy đổi / tính điểm xét tuyển.',
    icon: Scale,
    api: scoreFormulasApi,
    idKey: 'id',
    refLabel: 'formulaCode',
    refSecondary: 'id',
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'formulaCode', label: 'Mã công thức' },
      { key: 'targetScale', label: 'Thang điểm', align: 'center' },
      { key: 'formulaExpression', label: 'Biểu thức' },
    ],
    fields: [
      { key: 'formulaCode', label: 'Mã công thức', required: true, placeholder: 'VD: F-THPT-3MON' },
      { key: 'targetScale', label: 'Thang điểm mục tiêu', required: true, type: 'number', step: '0.01' },
      { key: 'formulaExpression', label: 'Biểu thức tính điểm', type: 'textarea', fullWidth: true, placeholder: 'VD: (Toán + Lí + Anh) * 3' },
      json('subjectWeights', 'Trọng số các môn (JSON)'),
    ],
  },

  // ─────────── ĐIỂM CHUẨN & QUY TẮC ───────────
  'benchmarks-quotas': {
    label: 'Điểm chuẩn & Chỉ tiêu',
    description: 'Bảng benchmarks_quotas — điểm chuẩn, chỉ tiêu theo từng đợt × phương thức × tổ hợp (tmcId) và năm.',
    icon: Star,
    api: benchmarkQuotasApi,
    idKey: 'id',
    refLabel: 'id',
    refSecondary: 'academicYear',
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'tmcId', label: 'Đợt × PT × Tổ hợp', type: 'ref', ref: 'track-method-combinations' },
      { key: 'academicYear', label: 'Năm', align: 'center' },
      { key: 'benchmarkScore', label: 'Điểm chuẩn', align: 'center', render: (v) => (v != null ? <strong className="score-big">{Number(v).toFixed(2)}</strong> : '—') },
      { key: 'quota', label: 'Chỉ tiêu', align: 'center' },
      { key: 'admittedCount', label: 'Trúng tuyển', align: 'center' },
      { key: 'scoreScale', label: 'Thang', align: 'center' },
    ],
    fields: [
      { key: 'tmcId', label: 'Đợt × Phương thức × Tổ hợp (TMC)', required: true, ref: 'track-method-combinations' },
      { key: 'academicYear', label: 'Năm học', required: true, type: 'number', placeholder: '2026' },
      { key: 'benchmarkScore', label: 'Điểm chuẩn', required: true, type: 'number', step: '0.01' },
      { key: 'scoreScale', label: 'Thang điểm', type: 'number', step: '0.01' },
      { key: 'quota', label: 'Chỉ tiêu', type: 'number' },
      { key: 'admittedCount', label: 'Số trúng tuyển', type: 'number' },
    ],
  },

  'eligibility-rules': {
    label: 'Điều kiện xét tuyển',
    description: 'Bảng track_eligibility_rules — điều kiện “gác cổng” (điểm sàn, môn chặn...).',
    icon: Gavel,
    api: eligibilityRulesApi,
    idKey: 'id',
    refLabel: 'ruleType',
    refSecondary: 'id',
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'trackId', label: 'Đợt TS', type: 'ref', ref: 'admission-tracks' },
      { key: 'methodId', label: 'Phương thức', type: 'ref', ref: 'admission-methods' },
      { key: 'ruleType', label: 'Loại luật' },
      { key: 'ruleValue', label: 'Tham số', render: (v) => (v ? <span className="cell-muted">{JSON.stringify(v)}</span> : '—') },
      { key: 'errorMessageVi', label: 'Thông báo từ chối' },
    ],
    fields: [
      { key: 'trackId', label: 'Đợt tuyển sinh', required: true, ref: 'admission-tracks' },
      { key: 'methodId', label: 'Phương thức', ref: 'admission-methods' },
      {
        key: 'ruleType', label: 'Loại luật', required: true, type: 'select', options: [
          { value: 'MIN_SUBJECT_SCORE', label: 'Điểm sàn môn thi' },
          { value: 'MIN_TOTAL_SCORE', label: 'Điểm sàn tổng' },
          { value: 'CERTIFICATE_REQUIRED', label: 'Yêu cầu chứng chỉ' },
          { value: 'GATEKEEPER_FLOOR', label: 'Điểm sàn khối ngành' },
        ],
      },
      json('ruleValue', 'Tham số luật (JSON)'),
      { key: 'errorMessageVi', label: 'Thông báo khi không đạt', type: 'textarea', fullWidth: true },
    ],
  },

  'tie-breakers': {
    label: 'Tiêu chí phụ (Tie-breaker)',
    description: 'Bảng track_tie_breakers — thứ tự ưu tiên xử lý trường hợp bằng điểm.',
    icon: Percent,
    api: tieBreakersApi,
    idKey: 'id',
    refLabel: 'criterionType',
    refSecondary: 'id',
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'trackId', label: 'Đợt TS', type: 'ref', ref: 'admission-tracks' },
      { key: 'priorityOrder', label: 'Thứ tự', align: 'center' },
      { key: 'criterionType', label: 'Tiêu chí' },
      { key: 'sortDirection', label: 'Sắp xếp', align: 'center', render: (v) => <span className="pill plain">{v}</span> },
    ],
    fields: [
      { key: 'trackId', label: 'Đợt tuyển sinh', required: true, ref: 'admission-tracks' },
      { key: 'priorityOrder', label: 'Thứ tự ưu tiên', required: true, type: 'number' },
      {
        key: 'criterionType', label: 'Loại tiêu chí', required: true, type: 'select', options: [
          { value: 'SUBJECT_SCORE', label: 'Điểm môn cụ thể' },
          { value: 'TOTAL_SCORE', label: 'Tổng điểm' },
          { value: 'CERTIFICATE', label: 'Chứng chỉ' },
          { value: 'AGE', label: 'Tuổi' },
        ],
      },
      {
        key: 'sortDirection', label: 'Hướng sắp xếp', type: 'select', options: [
          { value: 'DESC', label: 'Giảm dần (DESC)' },
          { value: 'ASC', label: 'Tăng dần (ASC)' },
        ],
      },
    ],
  },

  'universal-conversions': {
    label: 'Quy đổi điểm',
    description: 'Bảng universal_conversions — quy đổi chứng chỉ / giải thưởng sang điểm xét tuyển.',
    icon: Gift,
    api: universalConversionsApi,
    idKey: 'id',
    refLabel: 'certOrAchievementType',
    refSecondary: 'minInputValue',
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'certOrAchievementType', label: 'Loại chứng chỉ' },
      { key: 'minInputValue', label: 'Giá trị từ' },
      { key: 'actionType', label: 'Hành động' },
      { key: 'convertedScore', label: 'Điểm quy đổi', align: 'center' },
      { key: 'bonusPoint', label: 'Điểm cộng', align: 'center' },
    ],
    fields: [
      { key: 'institutionId', label: 'Trường (để trống = dùng chung)', ref: 'institutions' },
      { key: 'certOrAchievementType', label: 'Loại chứng chỉ / giải thưởng', required: true, placeholder: 'VD: IELTS' },
      { key: 'minInputValue', label: 'Giá trị tối thiểu', required: true, placeholder: 'VD: 6.5' },
      {
        key: 'actionType', label: 'Hành động', required: true, type: 'select', options: [
          { value: 'CONVERT_SUBJECT_SCORE', label: 'Quy đổi điểm môn' },
          { value: 'ADD_BONUS', label: 'Cộng điểm ưu tiên' },
          { value: 'CONVERT_TOTAL', label: 'Quy đổi tổng điểm' },
        ],
      },
      { key: 'convertedScore', label: 'Điểm quy đổi', type: 'number', step: '0.01' },
      { key: 'bonusPoint', label: 'Điểm cộng', type: 'number', step: '0.01' },
    ],
  },

  'bonus-policies': {
    label: 'Chính sách cộng điểm',
    description: 'Bảng bonus_policies — cộng điểm theo giải thưởng / thành tích của từng trường.',
    icon: Award,
    api: bonusPoliciesApi,
    idKey: 'id',
    refLabel: 'achievementCategory',
    refSecondary: 'prizeLevel',
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'institutionId', label: 'Trường', type: 'ref', ref: 'institutions' },
      { key: 'achievementCategory', label: 'Nhóm thành tích' },
      { key: 'prizeLevel', label: 'Cấp giải' },
      { key: 'bonusPoints', label: 'Điểm cộng', align: 'center' },
      { key: 'maxAccumulatedBonus', label: 'Tối đa cộng dồn', align: 'center' },
    ],
    fields: [
      { key: 'institutionId', label: 'Trường', required: true, ref: 'institutions' },
      { key: 'achievementCategory', label: 'Nhóm thành tích', required: true, placeholder: 'VD: HSG_QUOC_GIA' },
      {
        key: 'prizeLevel', label: 'Cấp giải', required: true, type: 'select', options: [
          { value: 'NHAT', label: 'Giải Nhất' },
          { value: 'NHI', label: 'Giải Nhì' },
          { value: 'BA', label: 'Giải Ba' },
          { value: 'KHUYEN_KHICH', label: 'Giải Khuyến khích' },
        ],
      },
      { key: 'bonusPoints', label: 'Điểm cộng', required: true, type: 'number', step: '0.01' },
      { key: 'maxAccumulatedBonus', label: 'Mức cộng dồn tối đa', type: 'number', step: '0.01' },
    ],
  },

  // ─────────── NGHỀ NGHIỆP & NGƯỜI DÙNG ───────────
  careers: {
    label: 'Nghề nghiệp',
    description: 'Bảng careers — định hướng nghề nghiệp gắn với ngành đào tạo.',
    icon: Briefcase,
    api: careersApi,
    idKey: 'careerId',
    refLabel: 'careerTitle',
    refSecondary: 'careerId',
    columns: [
      { key: 'careerId', label: 'ID' },
      { key: 'careerTitle', label: 'Nghề nghiệp' },
      { key: 'industry', label: 'Lĩnh vực' },
      { key: 'requiredSkills', label: 'Kỹ năng yêu cầu', render: (v) => (v ? <span className="cell-muted">{Object.values(v).join(', ')}</span> : '—') },
    ],
    fields: [
      { key: 'careerId', label: 'ID nghề nghiệp (khóa chính)', required: true, immutable: true, placeholder: 'VD: DEV-FS' },
      { key: 'careerTitle', label: 'Tên nghề nghiệp', required: true },
      { key: 'industry', label: 'Lĩnh vực' },
      json('requiredSkills', 'Kỹ năng yêu cầu (JSON)'),
    ],
  },

  'track-career-mappings': {
    label: 'Liên kết Ngành ↔ Nghề nghiệp',
    description: 'Bảng track_career_mapping — mức độ phù hợp giữa đợt tuyển sinh và nghề nghiệp đầu ra.',
    icon: GitBranch,
    api: trackCareerMappingsApi,
    idKey: 'trackId',
    specialDelete: true,
    columns: [
      { key: 'trackId', label: 'Đợt TS', type: 'ref', ref: 'admission-tracks' },
      { key: 'careerId', label: 'Nghề nghiệp', type: 'ref', ref: 'careers' },
      {
        key: 'suitabilityScore', label: 'Mức phù hợp', align: 'center',
        render: (v) => {
          if (v == null) return '—';
          const pct = Math.round(Number(v) * 100);
          return (
            <span style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span className="suitability-bar"><span style={{ width: `${pct}%` }} /></span>
              {pct}%
            </span>
          );
        },
      },
    ],
    fields: [
      { key: 'trackId', label: 'Đợt tuyển sinh', required: true, ref: 'admission-tracks' },
      { key: 'careerId', label: 'Nghề nghiệp', required: true, ref: 'careers' },
      { key: 'suitabilityScore', label: 'Mức phù hợp (0.0 – 1.0)', required: true, type: 'number', step: '0.01', hint: 'Lưu mới sẽ cập nhật nếu cặp (đợt, nghề) đã tồn tại.' },
    ],
  },

  users: {
    label: 'Người dùng',
    description: 'Bảng users — tài khoản thí sinh / quản trị. Có thể đổi vai trò (ROLE) tại đây.',
    icon: Users,
    api: usersApi,
    idKey: 'id',
    refLabel: 'fullName',
    refSecondary: 'email',
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'fullName', label: 'Họ và tên' },
      { key: 'email', label: 'Email' },
      {
        key: 'role', label: 'Vai trò',
        render: (v) => <span className={`pill ${String(v).includes('ADMIN') ? 'amber' : ''}`}>{v || 'ROLE_STUDENT'}</span>,
      },
    ],
    fields: [
      { key: 'email', label: 'Email', required: true, immutable: true },
      { key: 'fullName', label: 'Họ và tên', required: true },
      { key: 'password', label: 'Mật khẩu', fullWidth: true, hint: 'Để trống khi sửa = giữ nguyên mật khẩu hiện tại. Đặt giá trị để đặt / đổi mật khẩu (tối thiểu 6 ký tự).' },
      {
        key: 'role', label: 'Vai trò', type: 'select', options: [
          { value: 'ROLE_STUDENT', label: 'ROLE_STUDENT (Thí sinh)' },
          { value: 'ROLE_ADMIN', label: 'ROLE_ADMIN (Quản trị)' },
        ],
      },
    ],
  },

  'academic-profiles': {
    label: 'Hồ sơ năng lực',
    description: 'Bảng user_academic_profiles — điểm thi, chứng chỉ, ưu tiên của từng người dùng.',
    icon: ClipboardList,
    api: academicProfilesApi,
    idKey: 'id',
    refLabel: 'id',
    refSecondary: 'userId',
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'userId', label: 'Người dùng', type: 'ref', ref: 'users' },
      { key: 'thptScores', label: 'Điểm THPT', render: (v) => (v ? <span className="cell-muted">{JSON.stringify(v)}</span> : '—') },
      { key: 'priorityArea', label: 'Khu vực UT', align: 'center' },
      { key: 'priorityGroup', label: 'Đối tượng UT', align: 'center' },
    ],
    fields: [
      { key: 'userId', label: 'Người dùng', required: true, ref: 'users' },
      json('thptScores', 'Điểm THPT (JSON, VD: {"Toán": 8.5})'),
      json('hocbaScores', 'Điểm học bạ (JSON)'),
      json('aptitudeTestScores', 'Điểm đánh giá năng lực (JSON)'),
      json('internationalCertificates', 'Chứng chỉ quốc tế (JSON, VD: {"IELTS": "6.5"})'),
      json('achievements', 'Thành tích (JSON)'),
      {
        key: 'priorityArea', label: 'Khu vực ưu tiên', type: 'select', options: [
          { value: 'KV1', label: 'KV1' }, { value: 'KV2', label: 'KV2' },
          { value: 'KV2-NT', label: 'KV2-NT' }, { value: 'KV3', label: 'KV3' },
        ],
      },
      {
        key: 'priorityGroup', label: 'Đối tượng ưu tiên', type: 'select', options: [
          { value: 'NONE', label: 'Không' }, { value: 'DT01', label: 'DT 01' }, { value: 'DT06', label: 'DT 06' },
        ],
      },
    ],
  },

  wishes: {
    label: 'Nguyện vọng',
    description: 'Bảng user_wishes — danh sách nguyện vọng của người dùng, trỏ tới TMC cụ thể.',
    icon: Heart,
    api: wishesApi,
    idKey: 'id',
    refLabel: 'id',
    refSecondary: 'tmcId',
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'userId', label: 'Người dùng', type: 'ref', ref: 'users' },
      { key: 'wishOrder', label: 'Thứ tự NV', align: 'center' },
      { key: 'tmcId', label: 'Đợt × PT × Tổ hợp', type: 'ref', ref: 'track-method-combinations' },
      { key: 'profileId', label: 'Hồ sơ', align: 'center' },
    ],
    fields: [
      { key: 'userId', label: 'Người dùng', required: true, ref: 'users' },
      { key: 'profileId', label: 'Hồ sơ năng lực', ref: 'academic-profiles' },
      { key: 'wishOrder', label: 'Thứ tự nguyện vọng', required: true, type: 'number' },
      { key: 'tmcId', label: 'Đợt × Phương thức × Tổ hợp (TMC ID)', required: true, ref: 'track-method-combinations' },
    ],
  },

  'twd-evaluation-logs': {
    label: 'Log đánh giá TWD',
    description: 'Bảng twd_evaluation_logs — kết quả phân loại 3 vùng (POS/BND/NEG) cho từng nguyện vọng. Lưu mới = cập nhật theo nguyện vọng.',
    icon: FileBarChart,
    api: twdEvaluationLogsApi,
    idKey: 'id',
    refLabel: 'id',
    refSecondary: 'wishId',
    columns: [
      { key: 'id', label: 'ID', align: 'center' },
      { key: 'wishId', label: 'Nguyện vọng', align: 'center' },
      { key: 'finalAdmissionScore', label: 'Điểm xét tuyển', align: 'center', render: (v) => (v != null ? <strong className="score-big">{Number(v).toFixed(2)}</strong> : '—') },
      {
        key: 'twdRiskZone', label: 'Vùng TWD', align: 'center',
        render: (v) => {
          if (!v) return '—';
          const cls = v === 'POS' ? 'green' : v === 'BND' ? 'amber' : 'red';
          return <span className={`pill ${cls}`}>{v}</span>;
        },
      },
      { key: 'safetyMargin', label: 'ΔS (biên an toàn)', align: 'center' },
      { key: 'eligibilityStatus', label: 'Đủ điều kiện', align: 'center', render: (v) => (v ? <span className={`pill ${v === 'QUALIFIED' ? 'green' : 'red'}`}>{v}</span> : '—') },
      { key: 'recommendationStrategy', label: 'Khuyến nghị' },
    ],
    fields: [
      { key: 'wishId', label: 'Nguyện vọng', required: true, ref: 'wishes' },
      { key: 'finalAdmissionScore', label: 'Điểm xét tuyển chuẩn hóa', required: true, type: 'number', step: '0.01' },
      {
        key: 'twdRiskZone', label: 'Vùng TWD', required: true, type: 'select', options: [
          { value: 'POS', label: 'POS — An toàn' },
          { value: 'BND', label: 'BND — Cân nhắc' },
          { value: 'NEG', label: 'NEG — Rủi ro' },
        ],
      },
      { key: 'safetyMargin', label: 'Biên an toàn ΔS', type: 'number', step: '0.01' },
      {
        key: 'eligibilityStatus', label: 'Trạng thái điều kiện', required: true, type: 'select', options: [
          { value: 'QUALIFIED', label: 'QUALIFIED' },
          { value: 'DISQUALIFIED', label: 'DISQUALIFIED' },
        ],
      },
      { key: 'recommendationStrategy', label: 'Khuyến nghị chiến lược', type: 'textarea', fullWidth: true },
    ],
  },
};
