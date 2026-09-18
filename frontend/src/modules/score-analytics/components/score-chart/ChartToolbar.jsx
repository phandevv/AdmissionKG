import React from 'react';
import { SlidersHorizontal, ZoomIn } from 'lucide-react';

/**
 * Component Toolbar điều khiển Độ mịn khoảng chia cột & Thu phóng dải điểm
 */
export default function ChartToolbar({
  binMode,
  setBinMode,
  rangeMode,
  setRangeMode,
  rawCount,
  isGroup,
}) {
  return (
    <div className="chart-controls-toolbar">
      {/* Phân khoảng cột (Binning Mode) */}
      <div className="chart-control-group">
        <SlidersHorizontal size={14} />
        <span style={{ fontWeight: 600 }}>Khoảng chia cột:</span>
        <div className="chart-btn-toggle-group">
          <button
            type="button"
            className={`chart-btn-toggle ${binMode === '0.5' ? 'active' : ''}`}
            onClick={() => setBinMode('0.5')}
            title="Gom 0.5 điểm mỗi cột (Dễ nhìn, rõ ràng nhất cho tổ hợp môn)"
          >
            Chuẩn (0.50 đ)
          </button>
          <button
            type="button"
            className={`chart-btn-toggle ${binMode === '0.25' ? 'active' : ''}`}
            onClick={() => setBinMode('0.25')}
            title="Gom 0.25 điểm mỗi cột"
          >
            Mịn (0.25 đ)
          </button>
          <button
            type="button"
            className={`chart-btn-toggle ${binMode === 'RAW' ? 'active' : ''}`}
            onClick={() => setBinMode('RAW')}
            title="Từng mức điểm chi tiết (0.05 đ)"
          >
            Chi tiết ({rawCount} mức)
          </button>
        </div>
      </div>

      {/* Zoom Dải điểm (Range Mode) */}
      <div className="chart-control-group">
        <ZoomIn size={14} />
        <span style={{ fontWeight: 600 }}>Dải điểm:</span>
        <div className="chart-btn-toggle-group">
          <button
            type="button"
            className={`chart-btn-toggle ${rangeMode === 'ALL' ? 'active' : ''}`}
            onClick={() => setRangeMode('ALL')}
            title="Toàn bộ dải điểm từ 0 đến tối đa"
          >
            Toàn bộ
          </button>
          <button
            type="button"
            className={`chart-btn-toggle ${rangeMode === 'COMPETITIVE' ? 'active' : ''}`}
            onClick={() => setRangeMode('COMPETITIVE')}
            title={isGroup ? 'Dải điểm xét tuyển (≥ 15 điểm)' : 'Dải điểm xét tuyển (≥ 5 điểm)'}
          >
            {isGroup ? 'Xét tuyển (≥15đ)' : 'Xét tuyển (≥5đ)'}
          </button>
          <button
            type="button"
            className={`chart-btn-toggle ${rangeMode === 'HIGH' ? 'active' : ''}`}
            onClick={() => setRangeMode('HIGH')}
            title={isGroup ? 'Dải điểm cao (≥ 22 điểm)' : 'Dải điểm cao (≥ 7.5 điểm)'}
          >
            {isGroup ? 'Top cao (≥22đ)' : 'Top cao (≥7.5đ)'}
          </button>
        </div>
      </div>
    </div>
  );
}
