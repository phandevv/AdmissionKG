import { SUBJECT_CODE_TO_VIETNAMESE_MAP } from '../constants/scoreAnalytics.constants';

/**
 * Trả về class CSS tương ứng theo mức điểm môn thi (>= 8.0: High, >= 6.5: Mid, >= 5.0: Avg, < 5.0: Low)
 */
export function getScoreTierClass(score) {
  if (score === null || score === undefined) return 'score-tier-na';
  const num = Number(score);
  if (num >= 8.0) return 'score-tier-high';
  if (num >= 6.5) return 'score-tier-mid';
  if (num >= 5.0) return 'score-tier-avg';
  return 'score-tier-low';
}

/**
 * Lấy điểm số của thí sinh tương ứng với môn thi hoặc tổ hợp đang chọn
 */
export function getCandidateScoreForTarget(targetCode, candidateData) {
  if (!candidateData || !targetCode) return null;

  // 1. Kiểm tra trong danh sách tổ hợp xét tuyển
  const group = candidateData.groupScores?.find((g) => g.groupCode === targetCode);
  if (group && group.totalScore !== undefined && group.totalScore !== null) {
    return group.totalScore;
  }

  // 2. Kiểm tra trong danh sách điểm môn thi
  const viSubjectName = SUBJECT_CODE_TO_VIETNAMESE_MAP[targetCode] || targetCode;
  if (
    candidateData.subjectScores &&
    candidateData.subjectScores[viSubjectName] !== undefined &&
    candidateData.subjectScores[viSubjectName] !== null
  ) {
    return candidateData.subjectScores[viSubjectName];
  }

  return null;
}

/**
 * Format số nguyên có dấu phẩy ngăn cách
 */
export function formatCount(val) {
  if (val === null || val === undefined) return '0';
  return Number(val).toLocaleString('vi-VN');
}

/**
 * Format điểm số (1 hoặc 2 chữ số thập phân)
 */
export function formatScore(val, digits = 2) {
  if (val === null || val === undefined) return '0.00';
  return Number(val).toFixed(digits);
}
