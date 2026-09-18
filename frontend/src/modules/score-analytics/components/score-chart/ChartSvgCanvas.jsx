import React from 'react';
import { formatScore } from '../../utils/scoreFormatters';

/**
 * Component Canvas SVG render phổ điểm và các vạch dữ liệu
 */
export default function ChartSvgCanvas({
  svgWidth,
  svgHeight,
  chartPadding,
  innerHeight,
  innerWidth,
  yTicks,
  maxCount,
  curveAreaPath,
  curveLinePath,
  displayData,
  slotWidth,
  barWidth,
  hoveredPoint,
  setHoveredPoint,
  effectiveScore,
  maxRawScore,
}) {
  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      className="chart-svg-root"
      style={{ width: '100%', height: 'auto', display: 'block' }}
    >
      <defs>
        <linearGradient id="barGradNormal" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1d4ed8" />
        </linearGradient>

        <linearGradient id="barGradHover" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" />
          <stop offset="100%" stopColor="#2563eb" />
        </linearGradient>

        <linearGradient id="barGradHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        <linearGradient id="curveAreaGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0.0" />
        </linearGradient>
      </defs>

      {/* Grid lines ngang & Label trục Y */}
      {yTicks.map((val, idx) => {
        const y = chartPadding.top + innerHeight - (val / maxCount) * innerHeight;
        return (
          <g key={idx}>
            <line
              x1={chartPadding.left}
              y1={y}
              x2={svgWidth - chartPadding.right}
              y2={y}
              stroke="#e2e8f0"
              strokeDasharray="4 4"
              strokeWidth="1"
            />
            <text
              x={chartPadding.left - 10}
              y={y + 4}
              fill="#64748b"
              fontSize="11"
              textAnchor="end"
              fontFamily="'Inter', 'Segoe UI', sans-serif"
              fontWeight="600"
            >
              {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
            </text>
          </g>
        );
      })}

      {/* Đường cong phân phối mềm */}
      {curveAreaPath && <path d={curveAreaPath} fill="url(#curveAreaGrad)" pointerEvents="none" />}
      {curveLinePath && (
        <path
          d={curveLinePath}
          fill="none"
          stroke="#2563eb"
          strokeWidth="2"
          strokeOpacity="0.6"
          pointerEvents="none"
        />
      )}

      {/* Trục X và các Cột (Bars) */}
      {displayData.map((p, idx) => {
        const barHeight = (p.candidateCount / maxCount) * innerHeight;
        const x = chartPadding.left + idx * slotWidth + (slotWidth - barWidth) / 2;
        const y = chartPadding.top + innerHeight - barHeight;

        const isHovered = hoveredPoint && hoveredPoint.scoreLabel === p.scoreLabel;
        const isHighlighted = p.hasHighlight;

        let fill = 'url(#barGradNormal)';
        if (isHighlighted) fill = 'url(#barGradHighlight)';
        else if (isHovered) fill = 'url(#barGradHover)';

        return (
          <g key={idx}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={Math.max(barHeight, 2)}
              rx={barWidth > 6 ? 3 : 1.5}
              fill={fill}
              style={{
                cursor: 'pointer',
                transition: 'all 0.12s ease',
                filter: isHighlighted ? 'drop-shadow(0 2px 8px rgba(245, 158, 11, 0.5))' : 'none',
              }}
              onMouseEnter={() => setHoveredPoint({ ...p, x: x + barWidth / 2, y })}
              onMouseLeave={() => setHoveredPoint(null)}
            />

            {/* Vạch kẻ & Dot chỉ điểm của Thí sinh */}
            {isHighlighted && (
              <g pointerEvents="none">
                <line
                  x1={x + barWidth / 2}
                  y1={chartPadding.top}
                  x2={x + barWidth / 2}
                  y2={chartPadding.top + innerHeight}
                  stroke="#d97706"
                  strokeWidth="2.5"
                  strokeDasharray="4 3"
                />
                <circle
                  cx={x + barWidth / 2}
                  cy={y}
                  r="5.5"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="2.5"
                />
                {/* Badge ghim điểm trên cột */}
                <g transform={`translate(${x + barWidth / 2}, ${Math.max(y - 14, chartPadding.top + 4)})`}>
                  <rect
                    x="-26"
                    y="-17"
                    width="52"
                    height="17"
                    rx="4"
                    fill="#d97706"
                    filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
                  />
                  <text
                    x="0"
                    y="-5"
                    fill="#ffffff"
                    fontSize="9.5"
                    fontWeight="800"
                    textAnchor="middle"
                    fontFamily="'Inter', 'Segoe UI', sans-serif"
                  >
                    {formatScore(effectiveScore)}đ
                  </text>
                </g>
              </g>
            )}
          </g>
        );
      })}

      {/* Label trục X */}
      {displayData.map((p, idx) => {
        const sc = p.score;
        const isMajor =
          sc % (maxRawScore > 12 ? 5 : 2) === 0 ||
          idx === 0 ||
          idx === displayData.length - 1;

        if (!isMajor) return null;

        const x = chartPadding.left + idx * slotWidth + slotWidth / 2;
        const y = chartPadding.top + innerHeight + 18;

        return (
          <text
            key={idx}
            x={x}
            y={y}
            fill="#475569"
            fontSize="11"
            textAnchor="middle"
            fontFamily="'Inter', 'Segoe UI', sans-serif"
            fontWeight="700"
          >
            {sc.toFixed(0)}
          </text>
        );
      })}

      {/* Tiêu đề trục X */}
      <text
        x={chartPadding.left + innerWidth / 2}
        y={svgHeight - 8}
        fill="#64748b"
        fontSize="11.5"
        fontFamily="'Inter', 'Segoe UI', sans-serif"
        fontWeight="600"
        textAnchor="middle"
      >
        Dải Điểm số (Thang {maxRawScore > 12 ? '30 điểm' : '10 điểm'})
      </text>
    </svg>
  );
}
