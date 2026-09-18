import React from 'react';
import { Target, MapPin, CheckCircle2 } from 'lucide-react';
import { getScoreTierClass, formatScore } from '../../utils/scoreFormatters';

/**
 * Component Hiển thị Thẻ thông tin Thí sinh & Lưới 11 điểm môn thi
 */
export default function CandidateSummaryCard({ candidateData }) {
  if (!candidateData) return null;

  return (
    <div className="candidate-detail-card">
      {/* Thông tin thí sinh */}
      <div className="candidate-header-row">
        <div className="candidate-info-main">
          <div className="candidate-avatar-badge">
            <Target size={26} />
          </div>
          <div>
            <h3 className="candidate-sbd-title">Thí sinh: SBD {candidateData.sbd}</h3>
            <div className="candidate-location-chips">
              <span className="loc-chip">
                <MapPin size={12} style={{ color: '#2563eb' }} />
                Tỉnh/Thành: <strong>{candidateData.province}</strong>
              </span>
              <span className="loc-chip">
                Vùng: <strong>{candidateData.region}</strong>
              </span>
              <span className="loc-chip" style={{ color: '#059669', borderColor: '#a7f3d0' }}>
                <CheckCircle2 size={12} /> Đã chuẩn hóa dữ liệu
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Lưới điểm các môn thi */}
      <div>
        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-strong, #0f172a)', marginBottom: 10 }}>
          Kết quả thi tốt nghiệp các môn:
        </div>
        <div className="subject-scores-grid">
          {candidateData.subjectScores &&
            Object.entries(candidateData.subjectScores).map(([subName, score]) => (
              <div key={subName} className="subject-score-item">
                <span className="subject-name">{subName}</span>
                <span className={`subject-val ${getScoreTierClass(score)}`}>
                  {score !== null && score !== undefined ? formatScore(score) : '—'}
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
