import React from 'react';
import { Award, AlertTriangle, TrendingUp, Users, Sparkles } from 'lucide-react';
import { formatCount, formatScore } from '../../utils/scoreFormatters';

/**
 * Component Thẻ Phân tích Vị trí & Số người đạt điểm cao hơn hoặc bằng
 */
export default function StandingBreakdownCard({
  exactHighlightInfo,
  targetName,
  scopeCode,
  totalCandidates,
}) {
  if (!exactHighlightInfo) return null;

  const topPctNum = parseFloat(exactHighlightInfo.topPct);

  return (
    <div className="standing-breakdown-card">
      <div className="standing-header">
        <div className="standing-title">
          <Award size={22} style={{ color: '#d97706' }} />
          <span>Phân tích Vị trí của bạn trên Phổ điểm {targetName}</span>
        </div>
        <span className="standing-score-pill">
          🎯 {formatScore(exactHighlightInfo.score)} Điểm ({scopeCode})
        </span>
      </div>

      <div className="standing-stat-grid">
        {/* 1. Số người điểm cao hơn hoặc bằng */}
        <div className="standing-stat-item highlight-higher">
          <span className="standing-stat-label">
            <AlertTriangle size={14} style={{ color: '#d97706' }} /> Thí sinh cao hơn hoặc bằng
          </span>
          <span className="standing-stat-val" style={{ color: '#d97706' }}>
            {formatCount(exactHighlightInfo.higherOrEqualCount)}
          </span>
          <span className="standing-stat-sub">
            Chiếm <strong>{exactHighlightInfo.higherOrEqualPct}%</strong> tổng số thí sinh
          </span>
        </div>

        {/* 2. Thứ hạng trên phổ */}
        <div className="standing-stat-item">
          <span className="standing-stat-label">
            <Award size={14} style={{ color: '#2563eb' }} /> Vị trí thứ hạng
          </span>
          <span className="standing-stat-val" style={{ color: '#2563eb' }}>
            #{formatCount(exactHighlightInfo.rankStart)}
          </span>
          <span className="standing-stat-sub">
            Trên tổng số <strong>{formatCount(totalCandidates)}</strong> thí sinh
          </span>
        </div>

        {/* 3. Tỷ lệ dẫn đầu */}
        <div className="standing-stat-item">
          <span className="standing-stat-label">
            <TrendingUp size={14} style={{ color: '#059669' }} /> Vị thế dẫn đầu
          </span>
          <span className="standing-stat-val" style={{ color: '#059669' }}>
            Top {exactHighlightInfo.topPct}%
          </span>
          <span className="standing-stat-sub">
            Vượt qua <strong>{exactHighlightInfo.lowerPct}%</strong> thí sinh
          </span>
        </div>

        {/* 4. Số thí sinh cùng mức điểm */}
        <div className="standing-stat-item">
          <span className="standing-stat-label">
            <Users size={14} style={{ color: '#6366f1' }} /> Thí sinh cùng mức điểm
          </span>
          <span className="standing-stat-val" style={{ color: '#6366f1' }}>
            {formatCount(exactHighlightInfo.candidateCount)}
          </span>
          <span className="standing-stat-sub">Đồng hạng tại mốc điểm này</span>
        </div>
      </div>

      {/* Lời nhận định đánh giá năng lực cạnh tranh */}
      <div className="standing-insight-box">
        <Sparkles size={18} style={{ color: '#d97706', flexShrink: 0 }} />
        <div>
          <strong>Đánh giá cạnh tranh: </strong>
          {topPctNum <= 2 ? (
            <span>
              Vị thế <strong>Top 2% xuất sắc toàn diện</strong>! Bạn nằm trong nhóm hạt nhân có cơ hội đỗ rất cao vào các ngành điểm chuẩn cao nhất.
            </span>
          ) : topPctNum <= 10 ? (
            <span>
              Vị thế <strong>Top 10% dẫn đầu</strong>! Điểm số rất cạnh tranh, có <strong>{formatCount(exactHighlightInfo.higherOrEqualCount)}</strong> người đạt điểm cao hơn hoặc bằng bạn.
            </span>
          ) : topPctNum <= 30 ? (
            <span>
              Vị thế <strong>Khá giỏi (Top 30%)</strong>! Vượt qua <strong>{formatCount(exactHighlightInfo.lowerCount)}</strong> thí sinh khác.
            </span>
          ) : (
            <span>
              Điểm số ở vùng phổ thông. Hãy tham khảo kỹ phổ điểm các năm trước để chọn nguyện vọng an toàn.
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
