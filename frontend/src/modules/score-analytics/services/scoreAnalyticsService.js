import { apiClient } from '../../shared/services/api';

export const scoreAnalyticsService = {
  /**
   * Tra cứu điểm thi theo SBD & Năm
   */
  lookupCandidate: async (sbd, year = 2026) => {
    const response = await apiClient.get('/exam-scores/lookup', {
      params: { sbd, year },
    });
    return response.data?.data;
  },

  /**
   * Lấy phổ điểm (Histogram)
   */
  getDistribution: async (year = 2026, targetCode = 'A00', scopeType = 'NATIONAL', scopeCode = 'ALL') => {
    const response = await apiClient.get('/exam-scores/distribution', {
      params: { year, targetCode, scopeType, scopeCode },
    });
    return response.data?.data;
  },

  /**
   * Tra cứu vị trí thứ hạng cho một mức điểm bất kỳ
   */
  getRankPosition: async (score, targetCode = 'A00', year = 2026, province = '', region = '') => {
    const response = await apiClient.get('/exam-scores/rank-position', {
      params: { score, targetCode, year, province, region },
    });
    return response.data?.data;
  },

  /**
   * [Admin] Thống kê dữ liệu đã nạp
   */
  getAdminStats: async (year = 2026) => {
    const response = await apiClient.get('/admin/exam-scores/stats', {
      params: { year },
    });
    return response.data?.data;
  },

  /**
   * [Admin] Nạp file CSV từ đường dẫn server
   */
  importServerFile: async (filePath = 'data/diem_thi_THPTQG_2026.csv', year = 2026, recalculate = true) => {
    const response = await apiClient.post('/admin/exam-scores/import-file', null, {
      params: { filePath, year, recalculateDistribution: recalculate },
    });
    return response.data?.data;
  },

  /**
   * [Admin] Tính toán lại phổ điểm
   */
  recalculateDistribution: async (year = 2026) => {
    const response = await apiClient.post('/admin/exam-scores/recalculate-distribution', null, {
      params: { year },
    });
    return response.data?.data;
  },
};

export default scoreAnalyticsService;
