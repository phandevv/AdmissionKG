import React from 'react';
import { Users, Target, Compass, Sparkles, Award, TrendingUp } from 'lucide-react';
import { formatCount, formatScore } from '../../utils/scoreFormatters';

/**
 * Component Hiển thị 6 Thẻ Thống kê Tổng quan Phổ điểm
 */
export default function DistributionStatsGrid({ distributionData }) {
  if (!distributionData) return null;

  return (
    <div className="score-stats-grid">
      <div className="score-stat-box">
        <span className="score-stat-label">
          <Users size={14} style={{ color: 'var(--primary, #2563eb)' }} /> Tổng thí sinh
        </span>
        <span className="score-stat-number">
          {formatCount(distributionData.totalCandidates)}
        </span>
      </div>

      <div className="score-stat-box">
        <span className="score-stat-label">
          <Target size={14} style={{ color: '#2563eb' }} /> Điểm trung bình (μ)
        </span>
        <span className="score-stat-number blue">
          {formatScore(distributionData.averageScore)} đ
        </span>
      </div>

      <div className="score-stat-box">
        <span className="score-stat-label">
          <Compass size={14} style={{ color: '#4f46e5' }} /> Điểm trung vị
        </span>
        <span className="score-stat-number indigo">
          {formatScore(distributionData.medianScore)} đ
        </span>
      </div>

      <div className="score-stat-box">
        <span className="score-stat-label">
          <Sparkles size={14} style={{ color: '#d97706' }} /> Mốt điểm (Mode)
        </span>
        <span className="score-stat-number amber">
          {formatScore(distributionData.modeScore)} đ
        </span>
      </div>

      <div className="score-stat-box">
        <span className="score-stat-label">
          <Award size={14} style={{ color: '#059669' }} /> Điểm cao nhất
        </span>
        <span className="score-stat-number emerald">
          {formatScore(distributionData.maxScore)} đ
        </span>
      </div>

      <div className="score-stat-box">
        <span className="score-stat-label">
          <TrendingUp size={14} style={{ color: '#dc2626' }} /> Điểm thấp nhất
        </span>
        <span className="score-stat-number rose">
          {formatScore(distributionData.minScore)} đ
        </span>
      </div>
    </div>
  );
}
