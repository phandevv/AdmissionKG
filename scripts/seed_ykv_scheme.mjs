// backend/seed_ykv_scheme.mjs
// Script to seed all admissions scheme data for Vinh Medical University (YKV) 2026 via REST API batches

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
  institutionId: 'YKV',
  institutionCode: 'YKV',
  institutionName: 'Trường Đại học Y khoa Vinh',
  institutionType: 'Đại học Công lập',
  contactInfo: {
    address: 'Số 161 Nguyễn Phong Sắc, P. Trường Vinh, Nghệ An (Cơ sở 1) & P. Vinh Lộc, Nghệ An (Cơ sở 2)',
    phone: '0383.524.062 - 0988.929.429',
    website: 'http://www.vmu.edu.vn',
    admissions_url: 'http://www.vmu.edu.vn/tuyen-sinh-dao-tao'
  }
};

// 2. ADMISSION METHODS
const methodsData = [
  {
    methodId: 'PT500',
    methodCode: '500',
    methodName: 'Dự bị đại học (TT 44/2021) và Lưu học sinh nước CHDCND Lào (UBND tỉnh Nghệ An)',
    targetGroup: 'Dự bị ĐH & Lưu học sinh'
  }
];

// 3. ADMISSION SCHEME
const schemeData = {
  schemeId: 'YKV_2026',
  institutionId: 'YKV',
  academicYear: 2026,
  totalQuota: 1360
};

// 4. 5 MAJORS
const majorsData = [
  { majorCode: '7720101', majorName: 'Y khoa', fieldId: 772 },
  { majorCode: '7720110', majorName: 'Y học dự phòng', fieldId: 772 },
  { majorCode: '7720201', majorName: 'Dược học', fieldId: 772 },
  { majorCode: '7720301', majorName: 'Điều dưỡng', fieldId: 772 },
  { majorCode: '7720601', majorName: 'Kỹ thuật xét nghiệm y học', fieldId: 772 },
];

// 5. 6 ADMISSION TRACKS
const tracksData = [
  {
    trackId: 'YKV_2026_7720101',
    code: '7720101',
    majorCode: '7720101',
    name: 'Y khoa',
    type: 'Bác sĩ Chính quy',
    quota: 450,
    tuition: { policy: 'Bác sĩ chính quy', fee_monthly: '3.900.000 đ/tháng', fee_total: '39.000.000 đ/năm (10 tháng)' },
    methods: ['PT100', 'PT301', 'PT500'],
    combinations: ['B00', 'A00']
  },
  {
    trackId: 'YKV_2026_7720110',
    code: '7720110',
    majorCode: '7720110',
    name: 'Y học dự phòng',
    type: 'Bác sĩ Chính quy',
    quota: 50,
    tuition: { policy: 'Bác sĩ chính quy', fee_monthly: '2.900.000 đ/tháng', fee_total: '29.000.000 đ/năm (10 tháng)' },
    methods: ['PT100', 'PT200', 'PT301', 'PT500'],
    combinations: ['B00', 'A00', 'D07']
  },
  {
    trackId: 'YKV_2026_7720201',
    code: '7720201',
    majorCode: '7720201',
    name: 'Dược học',
    type: 'Dược sĩ Chính quy',
    quota: 150,
    tuition: { policy: 'Dược sĩ chính quy', fee_monthly: '3.900.000 đ/tháng', fee_total: '39.000.000 đ/năm (10 tháng)' },
    methods: ['PT100', 'PT200', 'PT301', 'PT500'],
    combinations: ['B00', 'A00', 'D07']
  },
  {
    trackId: 'YKV_2026_7720301',
    code: '7720301',
    majorCode: '7720301',
    name: 'Điều dưỡng',
    type: 'Cử nhân Chính quy',
    quota: 350,
    tuition: { policy: 'Cử nhân chính quy', fee_monthly: '2.900.000 đ/tháng', fee_total: '29.000.000 đ/năm (10 tháng)' },
    methods: ['PT100', 'PT200', 'PT301', 'PT500'],
    combinations: ['B00', 'A00', 'D07']
  },
  {
    trackId: 'YKV_2026_7720601',
    code: '7720601',
    majorCode: '7720601',
    name: 'Kỹ thuật xét nghiệm y học',
    type: 'Cử nhân Chính quy',
    quota: 60,
    tuition: { policy: 'Cử nhân chính quy', fee_monthly: '2.900.000 đ/tháng', fee_total: '29.000.000 đ/năm (10 tháng)' },
    methods: ['PT100', 'PT200', 'PT301', 'PT500'],
    combinations: ['B00', 'A00', 'D07']
  },
  {
    trackId: 'YKV_2026_LT7720301',
    code: 'LT7720301',
    majorCode: '7720301',
    name: 'Điều dưỡng VLVH hệ liên thông CĐ-ĐH',
    type: 'Liên thông VLVH',
    quota: 300,
    tuition: { policy: 'Liên thông VLVH', fee_monthly: '4.350.000 đ/tháng', fee_total: '43.500.000 đ/năm (10 tháng)' },
    methods: ['PT200'],
    combinations: ['B00']
  }
];

// 6. BENCHMARKS & QUOTAS (2024 & 2025)
const benchmarksData = [
  { trackKey: 'YKV_2026_7720101', q24: 410, adm24: 423, score24: 24.85, q25: 450, adm25: 413, score25: 22.10 },
  { trackKey: 'YKV_2026_7720110', q24: 30, adm24: 9, score24: 19.00, q25: 30, adm25: 15, score25: 17.25 },
  { trackKey: 'YKV_2026_7720201', q24: 160, adm24: 150, score24: 23.00, q25: 160, adm25: 56, score25: 19.00 },
  { trackKey: 'YKV_2026_7720301', q24: 250, adm24: 200, score24: 19.00, q25: 250, adm25: 106, score25: 17.50 },
  { trackKey: 'YKV_2026_7720601', q24: 60, adm24: 63, score24: 19.00, q25: 60, adm25: 12, score25: 20.00 },
  { trackKey: 'YKV_2026_LT7720301', q24: 300, adm24: 282, score24: 20.00, q25: 350, adm25: 261, score25: 14.00 }
];

// 7. UNIVERSAL CONVERSIONS (ADD_BONUS_POINT for YKV)
const conversionRules = [
  { cert: 'IELTS', min: '5.0-6.0', action: 'ADD_BONUS_POINT', bonus: 0.5 },
  { cert: 'IELTS', min: '6.5-7.0', action: 'ADD_BONUS_POINT', bonus: 1.0 },
  { cert: 'IELTS', min: '>=7.5', action: 'ADD_BONUS_POINT', bonus: 1.5 },
  { cert: 'TOEFL_iBT', min: '35-78', action: 'ADD_BONUS_POINT', bonus: 0.5 },
  { cert: 'TOEFL_iBT', min: '79-101', action: 'ADD_BONUS_POINT', bonus: 1.0 },
  { cert: 'TOEFL_iBT', min: '>=102', action: 'ADD_BONUS_POINT', bonus: 1.5 },
  { cert: 'Cambridge', min: '154-175', action: 'ADD_BONUS_POINT', bonus: 0.5 },
  { cert: 'Cambridge', min: '176-190', action: 'ADD_BONUS_POINT', bonus: 1.0 },
  { cert: 'Cambridge', min: '>=191', action: 'ADD_BONUS_POINT', bonus: 1.5 },
  { cert: 'PTE', min: '36-58', action: 'ADD_BONUS_POINT', bonus: 0.5 },
  { cert: 'PTE', min: '59-75', action: 'ADD_BONUS_POINT', bonus: 1.0 },
  { cert: 'PTE', min: '>=76', action: 'ADD_BONUS_POINT', bonus: 1.5 },
  { cert: 'TOEIC_4_SKILLS', min: 'L&R:600+/S&W:240+', action: 'ADD_BONUS_POINT', bonus: 0.5 },
  { cert: 'TOEIC_4_SKILLS', min: 'L&R:850+/S&W:350+', action: 'ADD_BONUS_POINT', bonus: 1.0 },
  { cert: 'TOEIC_4_SKILLS', min: 'L&R:950+/S&W:80+', action: 'ADD_BONUS_POINT', bonus: 1.5 }
];

// 8. BONUS POLICIES
const bonusPolicies = [
  { cat: 'HSG_QUOC_GIA', level: 'GIAI_NHAT', points: 3.0, max: 3.0 },
  { cat: 'HSG_QUOC_GIA', level: 'GIAI_NHI', points: 2.0, max: 3.0 },
  { cat: 'HSG_QUOC_GIA', level: 'GIAI_BA', points: 1.5, max: 3.0 },
  { cat: 'HSG_QUOC_GIA', level: 'GIAI_KHUYEN_KHICH', points: 1.0, max: 3.0 },
  { cat: 'KHKT_QUOC_GIA', level: 'GIAI_TU', points: 1.0, max: 3.0 }
];

async function main() {
  console.log('🚀 Starting YKV 2026 (Vinh Medical University) Admissions Scheme Seeding...\n');
  const token = await login();

  // BATCH 1: Institution
  console.log('\n--- BATCH 1: Institution ---');
  const instCheck = await apiRequest(`/institutions/${institutionData.institutionId}`, 'GET', null, token);
  if (instCheck.ok) {
    console.log(`ℹ️ Institution ${institutionData.institutionId} already exists, skipping.`);
  } else {
    const res = await apiRequest('/institutions', 'POST', institutionData, token);
    console.log(`✅ Created Institution ${institutionData.institutionId}:`, res.ok ? 'SUCCESS' : res.data);
  }

  // BATCH 2: Admission Methods
  console.log('\n--- BATCH 2: Admission Methods ---');
  for (const m of methodsData) {
    const check = await apiRequest(`/admission-methods/${m.methodId}`, 'GET', null, token);
    if (check.ok) {
      console.log(`ℹ️ Method ${m.methodId} already exists, skipping.`);
    } else {
      const res = await apiRequest('/admission-methods', 'POST', m, token);
      console.log(`✅ Created Method ${m.methodId}:`, res.ok ? 'SUCCESS' : res.data);
    }
  }

  // BATCH 3: Admission Scheme
  console.log('\n--- BATCH 3: Admission Scheme ---');
  const schemeCheck = await apiRequest(`/admission-schemes/${schemeData.schemeId}`, 'GET', null, token);
  if (schemeCheck.ok) {
    console.log(`ℹ️ Scheme ${schemeData.schemeId} already exists, skipping.`);
  } else {
    const res = await apiRequest('/admission-schemes', 'POST', schemeData, token);
    console.log(`✅ Created Scheme ${schemeData.schemeId}:`, res.ok ? 'SUCCESS' : res.data);
  }

  // BATCH 4: Majors
  console.log('\n--- BATCH 4: Majors ---');
  let createdMajors = 0;
  for (const m of majorsData) {
    const majorCheck = await apiRequest(`/majors/${m.majorCode}`, 'GET', null, token);
    if (!majorCheck.ok) {
      const res = await apiRequest('/majors', 'POST', m, token);
      if (res.ok) createdMajors++;
    }
  }
  console.log(`✅ Processed ${majorsData.length} Majors (New created: ${createdMajors})`);

  // BATCH 5: Admission Tracks
  console.log('\n--- BATCH 5: Admission Tracks (6 records) ---');
  let createdTracks = 0;
  for (const t of tracksData) {
    const trackCheck = await apiRequest(`/admission-tracks/${t.trackId}`, 'GET', null, token);
    if (!trackCheck.ok) {
      const res = await apiRequest('/admission-tracks', 'POST', {
        trackId: t.trackId,
        schemeId: schemeData.schemeId,
        majorCode: t.majorCode,
        admissionCode: t.code,
        trackName: t.name,
        trackType: t.type,
        tuitionPolicy: t.tuition,
        allocatedQuota: t.quota
      }, token);
      if (res.ok) createdTracks++;
      else console.error(`❌ Failed to create track ${t.trackId}:`, res.data);
    }
  }
  console.log(`✅ Processed ${tracksData.length} Admission Tracks (New created: ${createdTracks})`);

  // BATCH 6: Track Method Combinations (TMCs)
  console.log('\n--- BATCH 6: Track-Method Combinations (TMCs) ---');
  let createdTMCs = 0;
  const trackPrimaryTmc = {}; // Map trackId -> primary tmcId for benchmarks

  for (const t of tracksData) {
    const existingRes = await apiRequest(`/track-method-combinations?trackId=${t.trackId}`, 'GET', null, token);
    const existingSet = new Set((existingRes.data?.data || []).map(x => `${x.methodId}_${x.combinationCode}`));
    const existingList = existingRes.data?.data || [];

    const primaryMethod = t.methods.includes('PT100') ? 'PT100' : t.methods[0];
    const primaryComb = t.combinations[0];

    for (const methodId of t.methods) {
      for (const combCode of t.combinations) {
        const key = `${methodId}_${combCode}`;
        if (existingSet.has(key)) {
          if (methodId === primaryMethod && combCode === primaryComb) {
            const found = existingList.find(x => x.methodId === methodId && x.combinationCode === combCode);
            if (found) trackPrimaryTmc[t.trackId] = found.id;
          }
        } else {
          const res = await apiRequest('/track-method-combinations', 'POST', {
            trackId: t.trackId,
            methodId,
            combinationCode: combCode,
            isSubjectWeighted: false
          }, token);
          if (res.ok) {
            createdTMCs++;
            if (methodId === primaryMethod && combCode === primaryComb && res.data?.data?.id) {
              trackPrimaryTmc[t.trackId] = res.data.data.id;
            }
          }
        }
      }
    }

    // Fallback primary TMC if not captured yet
    if (!trackPrimaryTmc[t.trackId]) {
      const refreshed = await apiRequest(`/track-method-combinations?trackId=${t.trackId}`, 'GET', null, token);
      const list = refreshed.data?.data || [];
      const best = list.find(x => x.methodId === primaryMethod && x.combinationCode === primaryComb) || list[0];
      if (best) trackPrimaryTmc[t.trackId] = best.id;
    }
  }
  console.log(`✅ Processed TMCs (New created: ${createdTMCs}, Primary mappings: ${Object.keys(trackPrimaryTmc).length})`);

  // BATCH 7: Benchmarks & Quotas (2024 & 2025)
  console.log('\n--- BATCH 7: Benchmarks & Quotas (2024 & 2025) ---');
  let createdBenchmarks = 0;
  for (const b of benchmarksData) {
    const tmcId = trackPrimaryTmc[b.trackKey];
    if (!tmcId) {
      console.warn(`⚠️ No TMC found for track ${b.trackKey}, skipping benchmark`);
      continue;
    }

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
  console.log('\n--- BATCH 8: Universal Conversions (English Certificates) ---');
  const existingConv = await apiRequest(`/universal-conversions?institutionId=YKV`, 'GET', null, token);
  const existingConvSet = new Set((existingConv.data?.data || []).map(x => `${x.certOrAchievementType}_${x.minInputValue}`));
  let createdConv = 0;
  for (const c of conversionRules) {
    const key = `${c.cert}_${c.min}`;
    if (!existingConvSet.has(key)) {
      const res = await apiRequest('/universal-conversions', 'POST', {
        institutionId: 'YKV',
        certOrAchievementType: c.cert,
        minInputValue: c.min,
        actionType: c.action,
        bonusPoint: c.bonus
      }, token);
      if (res.ok) createdConv++;
    }
  }
  console.log(`✅ Processed Universal Conversions (New created: ${createdConv})`);

  // BATCH 9: Bonus Policies
  console.log('\n--- BATCH 9: Bonus Policies (HSG & KHKT) ---');
  const existingPol = await apiRequest(`/bonus-policies?institutionId=YKV`, 'GET', null, token);
  const existingPolSet = new Set((existingPol.data?.data || []).map(x => `${x.achievementCategory}_${x.prizeLevel}`));
  let createdPolicies = 0;
  for (const p of bonusPolicies) {
    const key = `${p.cat}_${p.level}`;
    if (!existingPolSet.has(key)) {
      const res = await apiRequest('/bonus-policies', 'POST', {
        institutionId: 'YKV',
        achievementCategory: p.cat,
        prizeLevel: p.level,
        bonusPoints: p.points,
        maxAccumulatedBonus: p.max
      }, token);
      if (res.ok) createdPolicies++;
    }
  }
  console.log(`✅ Processed Bonus Policies (New created: ${createdPolicies})`);

  // BATCH 10: Eligibility Rules (Học bạ Dược học Giỏi, các ngành khác Khá)
  console.log('\n--- BATCH 10: Track Eligibility Rules ---');
  let createdRules = 0;
  const healthTracks = [
    { id: 'YKV_2026_7720201', grade: 'GIỎI', minScore: 20.0, desc: 'Dược học: Học lực lớp 12 xếp loại Giỏi hoặc điểm xét TN THPT >= 8.50' },
    { id: 'YKV_2026_7720110', grade: 'KHÁ', minScore: 16.5, desc: 'Y học dự phòng: Học lực lớp 12 xếp loại Khá hoặc điểm xét TN THPT >= 6.50' },
    { id: 'YKV_2026_7720301', grade: 'KHÁ', minScore: 16.5, desc: 'Điều dưỡng: Học lực lớp 12 xếp loại Khá hoặc điểm xét TN THPT >= 6.50' },
    { id: 'YKV_2026_7720601', grade: 'KHÁ', minScore: 16.5, desc: 'Kỹ thuật xét nghiệm y học: Học lực lớp 12 xếp loại Khá hoặc điểm xét TN THPT >= 6.50' },
  ];

  for (const ht of healthTracks) {
    const existingRules = await apiRequest(`/eligibility-rules?trackId=${ht.id}`, 'GET', null, token);
    if ((existingRules.data?.data || []).length === 0) {
      const res = await apiRequest('/eligibility-rules', 'POST', {
        trackId: ht.id,
        ruleType: 'HEALTH_ACADEMIC_QUALITY_GATE',
        ruleValue: {
          min_gpa_grade: ht.grade,
          min_combination_score: ht.minScore,
          method: 'PT200'
        },
        errorMessageVi: ht.desc
      }, token);
      if (res.ok) createdRules++;
    }
  }
  console.log(`✅ Processed Track Eligibility Rules (New created: ${createdRules})`);

  // BATCH 11: Tie Breakers
  console.log('\n--- BATCH 11: Track Tie Breakers ---');
  let createdTie = 0;
  for (const t of tracksData) {
    const existingTie = await apiRequest(`/tie-breakers?trackId=${t.trackId}`, 'GET', null, token);
    if ((existingTie.data?.data || []).length === 0) {
      if (t.trackId === 'YKV_2026_LT7720301') {
        // Priority 1: Practice certificate
        const r1 = await apiRequest('/tie-breakers', 'POST', {
          trackId: t.trackId,
          priorityOrder: 1,
          criterionType: 'PRACTICE_CERTIFICATE',
          sortDirection: 'DESC'
        }, token);
        if (r1.ok) createdTie++;

        // Priority 2: Work seniority
        const r2 = await apiRequest('/tie-breakers', 'POST', {
          trackId: t.trackId,
          priorityOrder: 2,
          criterionType: 'WORK_SENIORITY',
          sortDirection: 'DESC'
        }, token);
        if (r2.ok) createdTie++;
      } else {
        // Priority 1: Lower bonus points
        const r1 = await apiRequest('/tie-breakers', 'POST', {
          trackId: t.trackId,
          priorityOrder: 1,
          criterionType: 'LOWER_BONUS_POINTS',
          sortDirection: 'ASC'
        }, token);
        if (r1.ok) createdTie++;

        // Priority 2: Higher wish rank
        const r2 = await apiRequest('/tie-breakers', 'POST', {
          trackId: t.trackId,
          priorityOrder: 2,
          criterionType: 'HIGHER_WISH_ORDER',
          sortDirection: 'ASC'
        }, token);
        if (r2.ok) createdTie++;

        // Priority 3: Exam score PT100
        const r3 = await apiRequest('/tie-breakers', 'POST', {
          trackId: t.trackId,
          priorityOrder: 3,
          criterionType: 'PT100_EXAM_SCORE',
          sortDirection: 'DESC'
        }, token);
        if (r3.ok) createdTie++;
      }
    }
  }
  console.log(`✅ Processed Track Tie Breakers (New created: ${createdTie})`);

  console.log('\n🎉 ALL 11 BATCHES OF YKV (VINH MEDICAL UNIVERSITY) EXECUTED SUCCESSFULLY!');
}

main().catch(err => {
  console.error('💥 Fatal error during seeding:', err);
  process.exit(1);
});
