// frontend/src/modules/user/utils/combinationScoreCalculator.js
// Bộ máy tính toán điểm xét tuyển theo các tổ hợp môn & quy tắc điểm ưu tiên Bộ GD&ĐT

// Danh mục các tổ hợp môn xét tuyển chuẩn quốc gia
export const POPULAR_COMBINATIONS = [
  // Khối A (Toán chủ đạo)
  { code: 'A00', name: 'Toán, Vật lí, Hóa học', subjects: ['Toán', 'Vật lí', 'Hóa học'], group: 'Khối A (Tự nhiên)' },
  { code: 'A01', name: 'Toán, Vật lí, Tiếng Anh', subjects: ['Toán', 'Vật lí', 'Tiếng Anh'], group: 'Khối A (Tự nhiên)' },
  { code: 'A02', name: 'Toán, Vật lí, Sinh học', subjects: ['Toán', 'Vật lí', 'Sinh học'], group: 'Khối A (Tự nhiên)' },
  { code: 'A03', name: 'Toán, Vật lí, Lịch sử', subjects: ['Toán', 'Vật lí', 'Lịch sử'], group: 'Khối A (Tự nhiên)' },
  { code: 'A04', name: 'Toán, Vật lí, Địa lí', subjects: ['Toán', 'Vật lí', 'Địa lí'], group: 'Khối A (Tự nhiên)' },
  { code: 'A05', name: 'Toán, Hóa học, Lịch sử', subjects: ['Toán', 'Hóa học', 'Lịch sử'], group: 'Khối A (Tự nhiên)' },
  { code: 'A06', name: 'Toán, Hóa học, Địa lí', subjects: ['Toán', 'Hóa học', 'Địa lí'], group: 'Khối A (Tự nhiên)' },
  { code: 'A07', name: 'Toán, Lịch sử, Địa lí', subjects: ['Toán', 'Lịch sử', 'Địa lí'], group: 'Khối A (Tự nhiên)' },
  { code: 'A08', name: 'Toán, Lịch sử, GD kinh tế & pháp luật', subjects: ['Toán', 'Lịch sử', 'Giáo dục kinh tế và pháp luật'], group: 'Khối A (Tự nhiên)' },
  { code: 'A09', name: 'Toán, Địa lí, GD kinh tế & pháp luật', subjects: ['Toán', 'Địa lí', 'Giáo dục kinh tế và pháp luật'], group: 'Khối A (Tự nhiên)' },
  { code: 'A10', name: 'Toán, Vật lí, GD kinh tế & pháp luật', subjects: ['Toán', 'Vật lí', 'Giáo dục kinh tế và pháp luật'], group: 'Khối A (Tự nhiên)' },
  { code: 'A11', name: 'Toán, Hóa học, GD kinh tế & pháp luật', subjects: ['Toán', 'Hóa học', 'Giáo dục kinh tế và pháp luật'], group: 'Khối A (Tự nhiên)' },

  // Khối B (Sinh - Hóa chủ đạo)
  { code: 'B00', name: 'Toán, Hóa học, Sinh học', subjects: ['Toán', 'Hóa học', 'Sinh học'], group: 'Khối B (Y Dược & Sinh)' },
  { code: 'B01', name: 'Toán, Sinh học, Lịch sử', subjects: ['Toán', 'Sinh học', 'Lịch sử'], group: 'Khối B (Y Dược & Sinh)' },
  { code: 'B02', name: 'Toán, Sinh học, Địa lí', subjects: ['Toán', 'Sinh học', 'Địa lí'], group: 'Khối B (Y Dược & Sinh)' },
  { code: 'B03', name: 'Toán, Sinh học, Ngữ văn', subjects: ['Toán', 'Sinh học', 'Ngữ văn'], group: 'Khối B (Y Dược & Sinh)' },
  { code: 'B04', name: 'Toán, Sinh học, GD kinh tế & pháp luật', subjects: ['Toán', 'Sinh học', 'Giáo dục kinh tế và pháp luật'], group: 'Khối B (Y Dược & Sinh)' },
  { code: 'B08', name: 'Toán, Sinh học, Tiếng Anh', subjects: ['Toán', 'Sinh học', 'Tiếng Anh'], group: 'Khối B (Y Dược & Sinh)' },

  // Khối C (Ngữ văn & Xã hội chủ đạo)
  { code: 'C00', name: 'Ngữ văn, Lịch sử, Địa lí', subjects: ['Ngữ văn', 'Lịch sử', 'Địa lí'], group: 'Khối C (Xã hội & Luật)' },
  { code: 'C01', name: 'Ngữ văn, Toán, Vật lí', subjects: ['Ngữ văn', 'Toán', 'Vật lí'], group: 'Khối C (Xã hội & Luật)' },
  { code: 'C02', name: 'Ngữ văn, Toán, Hóa học', subjects: ['Ngữ văn', 'Toán', 'Hóa học'], group: 'Khối C (Xã hội & Luật)' },
  { code: 'C03', name: 'Ngữ văn, Toán, Lịch sử', subjects: ['Ngữ văn', 'Toán', 'Lịch sử'], group: 'Khối C (Xã hội & Luật)' },
  { code: 'C04', name: 'Ngữ văn, Toán, Địa lí', subjects: ['Ngữ văn', 'Toán', 'Địa lí'], group: 'Khối C (Xã hội & Luật)' },
  { code: 'C14', name: 'Ngữ văn, Toán, GD kinh tế & pháp luật', subjects: ['Ngữ văn', 'Toán', 'Giáo dục kinh tế và pháp luật'], group: 'Khối C (Xã hội & Luật)' },
  { code: 'C19', name: 'Ngữ văn, Lịch sử, GD kinh tế & pháp luật', subjects: ['Ngữ văn', 'Lịch sử', 'Giáo dục kinh tế và pháp luật'], group: 'Khối C (Xã hội & Luật)' },
  { code: 'C20', name: 'Ngữ văn, Địa lí, GD kinh tế & pháp luật', subjects: ['Ngữ văn', 'Địa lí', 'Giáo dục kinh tế và pháp luật'], group: 'Khối C (Xã hội & Luật)' },

  // Khối D (Ngoại ngữ & Toán - Văn)
  { code: 'D01', name: 'Toán, Ngữ văn, Tiếng Anh', subjects: ['Toán', 'Ngữ văn', 'Tiếng Anh'], group: 'Khối D (Ngoại ngữ & Kinh tế)' },
  { code: 'D07', name: 'Toán, Hóa học, Tiếng Anh', subjects: ['Toán', 'Hóa học', 'Tiếng Anh'], group: 'Khối D (Ngoại ngữ & Kinh tế)' },
  { code: 'D08', name: 'Toán, Sinh học, Tiếng Anh', subjects: ['Toán', 'Sinh học', 'Tiếng Anh'], group: 'Khối D (Ngoại ngữ & Kinh tế)' },
  { code: 'D09', name: 'Toán, Lịch sử, Tiếng Anh', subjects: ['Toán', 'Lịch sử', 'Tiếng Anh'], group: 'Khối D (Ngoại ngữ & Kinh tế)' },
  { code: 'D10', name: 'Toán, Địa lí, Tiếng Anh', subjects: ['Toán', 'Địa lí', 'Tiếng Anh'], group: 'Khối D (Ngoại ngữ & Kinh tế)' },
  { code: 'D14', name: 'Ngữ văn, Lịch sử, Tiếng Anh', subjects: ['Ngữ văn', 'Lịch sử', 'Tiếng Anh'], group: 'Khối D (Ngoại ngữ & Kinh tế)' },
  { code: 'D15', name: 'Ngữ văn, Địa lí, Tiếng Anh', subjects: ['Ngữ văn', 'Địa lí', 'Tiếng Anh'], group: 'Khối D (Ngoại ngữ & Kinh tế)' },
  { code: 'D66', name: 'Ngữ văn, GD kinh tế & pháp luật, Tiếng Anh', subjects: ['Ngữ văn', 'Giáo dục kinh tế và pháp luật', 'Tiếng Anh'], group: 'Khối D (Ngoại ngữ & Kinh tế)' },
  { code: 'D84', name: 'Toán, GD kinh tế & pháp luật, Tiếng Anh', subjects: ['Toán', 'Giáo dục kinh tế và pháp luật', 'Tiếng Anh'], group: 'Khối D (Ngoại ngữ & Kinh tế)' },

  // Khối X & K (Tin học & Công nghệ GDPT 2018)
  { code: 'X01', name: 'Toán, Ngữ văn, Tin học', subjects: ['Toán', 'Ngữ văn', 'Tin học'], group: 'Khối Tin học & Công nghệ' },
  { code: 'X02', name: 'Toán, Hóa học, Tin học', subjects: ['Toán', 'Hóa học', 'Tin học'], group: 'Khối Tin học & Công nghệ' },
  { code: 'X06', name: 'Toán, Tiếng Anh, Tin học', subjects: ['Toán', 'Tiếng Anh', 'Tin học'], group: 'Khối Tin học & Công nghệ' },
  { code: 'X26', name: 'Toán, Vật lí, Tin học', subjects: ['Toán', 'Vật lí', 'Tin học'], group: 'Khối Tin học & Công nghệ' },
  { code: 'K01', name: 'Toán, Tiếng Anh, Tin học', subjects: ['Toán', 'Tiếng Anh', 'Tin học'], group: 'Khối Tin học & Công nghệ' },
  { code: 'A19', name: 'Toán, Vật lí, Công nghệ Công nghiệp', subjects: ['Toán', 'Vật lí', 'Công nghệ Công nghiệp'], group: 'Khối Tin học & Công nghệ' },
  { code: 'X03', name: 'Toán, Sinh học, Công nghệ Nông nghiệp', subjects: ['Toán', 'Sinh học', 'Công nghệ Nông nghiệp'], group: 'Khối Tin học & Công nghệ' },
];

/**
 * Quy đổi chứng chỉ IELTS sang điểm môn Tiếng Anh (thang điểm 10)
 */
export function convertIeltsToScore(ieltsValue) {
  if (!ieltsValue) return null;
  const num = parseFloat(ieltsValue);
  if (isNaN(num)) return null;
  if (num >= 7.0) return 10.0;
  if (num >= 6.5) return 9.5;
  if (num >= 6.0) return 9.0;
  if (num >= 5.5) return 8.5;
  if (num >= 5.0) return 8.0;
  return null;
}

/**
 * Tính điểm ưu tiên khu vực + đối tượng và công thức giảm trừ của Bộ GD&ĐT khi tổng điểm >= 22.5
 */
export function calculatePriorityBonus(rawScore, priorityArea = 'KV3', priorityGroup = 'NONE') {
  let baseBonus = 0;

  // Khu vực
  if (priorityArea === 'KV1') baseBonus += 0.75;
  else if (priorityArea === 'KV2-NT') baseBonus += 0.5;
  else if (priorityArea === 'KV2') baseBonus += 0.25;

  // Đối tượng
  if (priorityGroup === 'DT01') baseBonus += 2.0;
  else if (priorityGroup === 'DT06') baseBonus += 1.0;

  if (baseBonus <= 0) {
    return { baseBonus: 0, effectiveBonus: 0, isReduced: false };
  }

  // Quy chế Bộ GD&ĐT: Khi tổng điểm 3 môn >= 22.5, điểm ưu tiên giảm dần theo tuyến tính về 0 tại 30 điểm
  let effectiveBonus = baseBonus;
  let isReduced = false;

  if (rawScore >= 22.5) {
    effectiveBonus = (baseBonus * (30 - rawScore)) / 7.5;
    effectiveBonus = Math.max(0, effectiveBonus);
    isReduced = true;
  }

  return {
    baseBonus: parseFloat(baseBonus.toFixed(2)),
    effectiveBonus: parseFloat(effectiveBonus.toFixed(2)),
    isReduced,
  };
}

/**
 * Tính điểm cho tất cả các tổ hợp môn khả dụng từ dữ liệu Học bạ và Điểm thi THPT
 */
export function calculateAllCombinationScores({
  grades = {},
  thptGrades = {},
  ielts = '',
  priorityArea = 'KV3',
  priorityGroup = 'NONE',
}) {
  // 1. Lấy điểm từng môn theo Học bạ (ĐTB 3 năm)
  const hocbaSubjectScores = {};
  Object.entries(grades).forEach(([subName, g]) => {
    if (!g) return;
    const scores = [parseFloat(g.grade10), parseFloat(g.grade11), parseFloat(g.grade12)].filter(
      (s) => !isNaN(s) && s >= 0 && s <= 10
    );
    if (scores.length > 0) {
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      hocbaSubjectScores[subName] = parseFloat(avg.toFixed(2));
    }
  });

  // 2. Lấy điểm từng môn theo Thi tốt nghiệp THPT
  const thptSubjectScores = {};
  Object.entries(thptGrades).forEach(([subName, val]) => {
    const num = parseFloat(val);
    if (!isNaN(num) && num >= 0 && num <= 10) {
      thptSubjectScores[subName] = num;
    }
  });

  const hocbaResults = [];
  const thptResults = [];

  POPULAR_COMBINATIONS.forEach((comb) => {
    // --- Tính điểm Học Bạ ---
    const hocbaSubDetails = {};
    let hocbaHasAll = true;
    let hocbaRaw = 0;

    comb.subjects.forEach((sName) => {
      const sScore = hocbaSubjectScores[sName];
      if (sScore !== undefined && sScore !== null) {
        hocbaSubDetails[sName] = sScore;
        hocbaRaw += sScore;
      } else {
        hocbaHasAll = false;
      }
    });

    if (hocbaHasAll) {
      const raw = parseFloat(hocbaRaw.toFixed(2));
      const priority = calculatePriorityBonus(raw, priorityArea, priorityGroup);
      const total = parseFloat(Math.min(30, raw + priority.effectiveBonus).toFixed(2));

      hocbaResults.push({
        code: comb.code,
        name: comb.name,
        group: comb.group,
        subjects: comb.subjects,
        subjectScores: hocbaSubDetails,
        rawScore: raw,
        baseBonus: priority.baseBonus,
        effectiveBonus: priority.effectiveBonus,
        isReduced: priority.isReduced,
        totalScore: total,
      });
    }

    // --- Tính điểm Thi Tốt Nghiệp THPT ---
    const thptSubDetails = {};
    let thptHasAll = true;
    let thptRaw = 0;

    comb.subjects.forEach((sName) => {
      const sScore = thptSubjectScores[sName];
      if (sScore !== undefined && sScore !== null) {
        thptSubDetails[sName] = sScore;
        thptRaw += sScore;
      } else {
        thptHasAll = false;
      }
    });

    if (thptHasAll) {
      const raw = parseFloat(thptRaw.toFixed(2));
      const priority = calculatePriorityBonus(raw, priorityArea, priorityGroup);
      const total = parseFloat(Math.min(30, raw + priority.effectiveBonus).toFixed(2));

      thptResults.push({
        code: comb.code,
        name: comb.name,
        group: comb.group,
        subjects: comb.subjects,
        subjectScores: thptSubDetails,
        rawScore: raw,
        baseBonus: priority.baseBonus,
        effectiveBonus: priority.effectiveBonus,
        isReduced: priority.isReduced,
        totalScore: total,
      });
    }
  });

  // Sắp xếp theo tổng điểm từ cao xuống thấp
  hocbaResults.sort((a, b) => b.totalScore - a.totalScore);
  thptResults.sort((a, b) => b.totalScore - a.totalScore);

  return {
    hocbaResults,
    thptResults,
    ielts,
  };
}
