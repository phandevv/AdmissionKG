import React from 'react';
import { formatCount } from '../../utils/scoreFormatters';

/**
 * Component Tooltip khi rê chuột vào các cột phổ điểm
 */
export default function ChartTooltip({
  hoveredPoint,
  totalCandidates,
  svgWidth,
  svgHeight,
}) {
  if (!hoveredPoint) return null;

  const xPercent = (hoveredPoint.x / svgWidth) * 100;
  const translateX = xPercent > 75 ? '-100%' : xPercent < 25 ? '0%' : '-50%';
  const translateY = hoveredPoint.y < 80 ? '10px' : '-115%';

  const higherOrEqualCount = (hoveredPoint.higherCount || 0) + (hoveredPoint.candidateCount || 0);

  return (
    <div
      className="chart-tooltip-bubble"
      style={{
        left: `${xPercent}%`,
        top: `${(hoveredPoint.y / svgHeight) * 100}%`,
        transform: `translate(${translateX}, ${translateY})`,
      }}
    >
      <div className="chart-tooltip-score">🎯 {hoveredPoint.scoreLabel}</div>
      <div style={{ lineHeight: 1.5, fontSize: '0.78rem' }}>
        <div>
          • Thí sinh trong khoảng: <strong>{formatCount(hoveredPoint.candidateCount)}</strong>
          {totalCandidates > 0 && (
            <span style={{ color: '#93c5fd', marginLeft: 4 }}>
              ({((hoveredPoint.candidateCount / totalCandidates) * 100).toFixed(2)}%)
            </span>
          )}
        </div>
        <div>
          • Thí sinh đạt điểm cao hơn hoặc bằng:{' '}
          <strong style={{ color: '#fbbf24' }}>{formatCount(higherOrEqualCount)}</strong>
        </div>
        <div>
          • Thí sinh đạt điểm thấp hơn:{' '}
          <strong style={{ color: '#34d399' }}>{formatCount(hoveredPoint.lowerCount)}</strong>
        </div>
        {hoveredPoint.rankStart > 0 && (
          <div>
            • Vị trí thứ hạng:{' '}
            <strong style={{ color: '#c084fc' }}>#{formatCount(hoveredPoint.rankStart)}</strong>{' '}
            (Top {hoveredPoint.percentile}%)
          </div>
        )}
      </div>
    </div>
  );
}
