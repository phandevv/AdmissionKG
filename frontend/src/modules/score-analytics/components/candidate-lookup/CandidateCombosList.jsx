import React from 'react';
import { TrendingUp, BarChart3, MapPin } from 'lucide-react';
import { formatCount, formatScore } from '../../utils/scoreFormatters';

/**
 * Component Hiển thị Danh sách các Thẻ Tổ hợp xét tuyển với Thứ hạng 3 Cấp
 */
export default function CandidateCombosList({
  candidateData,
  selectedTarget,
  scopeType,
  handleViewCandidateGroupDistribution,
}) {
  if (!candidateData || !candidateData.groupScores?.length) return null;

  return (
    <div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
          flexWrap: 'wrap',
          gap: 8,
        }}
      >
        <h3
          style={{
            fontSize: '1rem',
            fontWeight: 800,
            color: 'var(--text-strong, #0f172a)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            margin: 0,
          }}
        >
          <TrendingUp size={18} style={{ color: '#059669' }} />
          Điểm & Phân tích Thứ hạng các Tổ hợp xét tuyển
        </h3>
        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted, #64748b)' }}>
          (Tự động tính thứ hạng 3 cấp & số người có điểm cao hơn hoặc bằng)
        </span>
      </div>

      <div className="combos-rank-grid">
        {candidateData.groupScores.map((group) => {
          const isSelected = selectedTarget === group.groupCode;
          return (
            <div
              key={group.groupCode}
              className={`combo-rank-card ${isSelected ? 'active-group' : ''}`}
            >
              <div className="combo-card-top">
                <div className="combo-title-area">
                  <span className="combo-code-badge">{group.groupCode}</span>
                  <h4 className="combo-name">{group.groupName}</h4>
                  <span className="combo-sub-text">{group.subjects}</span>
                </div>
                <div className="combo-score-display">
                  <div className="combo-total-score">{formatScore(group.totalScore)}</div>
                  <div className="combo-score-label">Tổng điểm</div>
                </div>
              </div>

              {/* Thứ hạng ở 3 cấp độ */}
              <div className="combo-rank-table">
                {/* Toàn quốc */}
                <div className="rank-row">
                  <span className="rank-row-label">🌐 Toàn quốc:</span>
                  <span className="rank-row-val">
                    Hạng <span className="rank-val-strong">#{formatCount(group.nationalRank)}</span>
                    {group.nationalTotal && (
                      <span className="rank-row-total">
                        {' '}
                        / {formatCount(group.nationalTotal)} (Top {group.nationalPercentile}%)
                      </span>
                    )}
                  </span>
                </div>

                {/* Khu vực */}
                <div className="rank-row">
                  <span className="rank-row-label">🗺️ {candidateData.region}:</span>
                  <span className="rank-row-val">
                    Hạng <span className="rank-val-strong">#{formatCount(group.regionRank)}</span>
                    {group.regionTotal && (
                      <span className="rank-row-total"> / {formatCount(group.regionTotal)}</span>
                    )}
                  </span>
                </div>

                {/* Tỉnh thành */}
                <div className="rank-row">
                  <span className="rank-row-label">📍 {candidateData.province}:</span>
                  <span className="rank-row-val">
                    Hạng{' '}
                    <span className="rank-val-strong" style={{ color: '#059669' }}>
                      #{formatCount(group.provinceRank)}
                    </span>
                    {group.provinceTotal && (
                      <span className="rank-row-total"> / {formatCount(group.provinceTotal)}</span>
                    )}
                  </span>
                </div>

                {/* Số người điểm cao hơn hoặc bằng */}
                {group.nationalHigherCount !== undefined && (
                  <div className="rank-higher-notice">
                    • Có <strong>{formatCount(group.nationalHigherCount)}</strong> thí sinh cả nước điểm cao hơn hoặc bằng bạn.
                  </div>
                )}
              </div>

              {/* Nút xem phổ điểm tổ hợp này */}
              <div className="combo-card-actions">
                <button
                  type="button"
                  onClick={() => handleViewCandidateGroupDistribution(group, 'NATIONAL')}
                  className={`btn-chart-jump ${isSelected && scopeType === 'NATIONAL' ? 'primary' : ''}`}
                >
                  <BarChart3 size={13} />
                  Phổ Toàn quốc
                </button>
                <button
                  type="button"
                  onClick={() => handleViewCandidateGroupDistribution(group, 'PROVINCE')}
                  className={`btn-chart-jump ${isSelected && scopeType === 'PROVINCE' ? 'primary' : ''}`}
                >
                  <MapPin size={13} />
                  Phổ {candidateData.province}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
