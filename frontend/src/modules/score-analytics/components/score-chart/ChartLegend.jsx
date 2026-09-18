import React from 'react';
import { Info } from 'lucide-react';
import { formatScore } from '../../utils/scoreFormatters';

/**
 * Component Chú thích dưới biểu đồ (Legend & Tips)
 */
export default function ChartLegend({ columnCount, effectiveScore }) {
  return (
    <div className="chart-footer-legend">
      <div className="chart-legend-items">
        <div className="legend-chip">
          <span className="legend-swatch" style={{ background: '#3b82f6' }} />
          <span>Phổ điểm thí sinh ({columnCount} cột)</span>
        </div>
        <div className="legend-chip">
          <span
            className="legend-swatch"
            style={{ background: '#2563eb', height: 2, borderRadius: 0 }}
          />
          <span>Đường cong phân phối</span>
        </div>
        {effectiveScore !== null && effectiveScore !== undefined && (
          <div className="legend-chip">
            <span className="legend-swatch" style={{ background: '#f59e0b' }} />
            <span style={{ color: '#b45309', fontWeight: 700 }}>
              Điểm của bạn ({formatScore(effectiveScore)}đ)
            </span>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text-muted)' }}>
        <Info size={14} />
        <span>Rê chuột vào từng cột để xem chi tiết số lượng & thứ hạng tích lũy.</span>
      </div>
    </div>
  );
}
