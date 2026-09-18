import React, { useState, useMemo, useEffect } from 'react';
import { BarChart3 } from 'lucide-react';
import ChartToolbar from './ChartToolbar';
import ChartSvgCanvas from './ChartSvgCanvas';
import ChartTooltip from './ChartTooltip';
import ChartLegend from './ChartLegend';
import StandingBreakdownCard from './StandingBreakdownCard';
import { formatCount } from '../../utils/scoreFormatters';
import './ScoreChart.css';

/**
 * Master Component Biểu đồ Phổ điểm THPT Tương tác Cao cấp (AdmissionKG)
 */
export default function ScoreChart({
  distributionData,
  highlightScore = null,
  height = 380,
}) {
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const rawHistogram = distributionData?.histogram || [];
  const totalCandidates = distributionData?.totalCandidates || 0;
  const isGroup = distributionData?.targetCategory === 'GROUP' || rawHistogram.length > 60;
  
  const maxRawScore = useMemo(() => {
    if (!rawHistogram.length) return 30;
    return Math.max(...rawHistogram.map((p) => Number(p.score) || 0));
  }, [rawHistogram]);

  const [binMode, setBinMode] = useState(isGroup ? '0.5' : 'RAW');
  const [rangeMode, setRangeMode] = useState('ALL');

  const effectiveScore = highlightScore !== null && highlightScore !== undefined ? Number(highlightScore) : null;

  useEffect(() => {
    setBinMode(isGroup ? '0.5' : 'RAW');
    setRangeMode('ALL');
  }, [distributionData?.targetCode, isGroup]);

  // 1. Tìm thông tin chi tiết chính xác của điểm thí sinh
  const exactHighlightInfo = useMemo(() => {
    if (effectiveScore === null || !rawHistogram.length) return null;
    const target = Number(effectiveScore);

    let closest = null;
    let minDiff = Infinity;
    for (const p of rawHistogram) {
      const diff = Math.abs(Number(p.score) - target);
      if (diff < minDiff) {
        minDiff = diff;
        closest = p;
      }
    }

    if (!closest || minDiff > 1.5) return null;

    const rank = closest.rankStart || 1;
    const higher = closest.higherCount !== undefined ? closest.higherCount : Math.max(rank - 1, 0);
    const candidateCount = closest.candidateCount || 0;
    const higherOrEqual = higher + candidateCount;
    const lower = closest.lowerCount !== undefined ? closest.lowerCount : Math.max(totalCandidates - rank - candidateCount, 0);
    const higherPct = totalCandidates > 0 ? ((higher / totalCandidates) * 100).toFixed(2) : 0;
    const higherOrEqualPct = totalCandidates > 0 ? ((higherOrEqual / totalCandidates) * 100).toFixed(2) : 0;
    const lowerPct = totalCandidates > 0 ? ((lower / totalCandidates) * 100).toFixed(2) : 0;
    const topPct = totalCandidates > 0 ? ((rank / totalCandidates) * 100).toFixed(2) : (100 - (closest.percentile || 0)).toFixed(2);

    return {
      score: target,
      candidateCount,
      higherCount: higher,
      higherPct,
      higherOrEqualCount: higherOrEqual,
      higherOrEqualPct,
      lowerCount: lower,
      lowerPct,
      rankStart: rank,
      topPct,
      percentile: closest.percentile,
    };
  }, [rawHistogram, effectiveScore, totalCandidates]);

  // 2. Lọc dữ liệu theo dải điểm
  const filteredRawData = useMemo(() => {
    if (!rawHistogram.length) return [];
    const is30Scale = maxRawScore > 12;
    let minThreshold = 0;
    let maxThreshold = is30Scale ? 30 : 10;

    if (rangeMode === 'COMPETITIVE') minThreshold = is30Scale ? 15 : 5;
    else if (rangeMode === 'HIGH') minThreshold = is30Scale ? 22 : 7.5;

    return rawHistogram.filter((p) => {
      const sc = Number(p.score) || 0;
      return sc >= minThreshold && sc <= maxThreshold;
    });
  }, [rawHistogram, rangeMode, maxRawScore]);

  // 3. Gom khoảng điểm (Binning)
  const displayData = useMemo(() => {
    if (!filteredRawData.length) return [];

    // Tìm index điểm gần nhất trong raw mode
    let closestRawIdx = -1;
    if (effectiveScore !== null && filteredRawData.length > 0) {
      let minDiff = Infinity;
      filteredRawData.forEach((p, idx) => {
        const diff = Math.abs(Number(p.score) - effectiveScore);
        if (diff < minDiff) {
          minDiff = diff;
          closestRawIdx = idx;
        }
      });
      if (minDiff > 1.5) closestRawIdx = -1;
    }

    if (binMode === 'RAW') {
      return filteredRawData.map((p, idx) => ({
        score: Number(p.score),
        scoreLabel: `${Number(p.score).toFixed(2)} đ`,
        candidateCount: p.candidateCount,
        higherCount: p.higherCount,
        lowerCount: p.lowerCount,
        rankStart: p.rankStart,
        percentile: p.percentile,
        hasHighlight: idx === closestRawIdx,
      }));
    }

    const step = parseFloat(binMode);
    const binsMap = new Map();

    filteredRawData.forEach((p) => {
      const sc = Number(p.score);
      const binIndex = Math.floor((sc + 0.0001) / step);
      const binStart = binIndex * step;
      const binEnd = binStart + step;
      const key = `${binStart.toFixed(2)}-${binEnd.toFixed(2)}`;

      if (!binsMap.has(key)) {
        binsMap.set(key, {
          binStart,
          binEnd,
          centerScore: binStart + step / 2,
          scoreLabel: `${binStart.toFixed(1)} - ${binEnd.toFixed(1)} đ`,
          candidateCount: 0,
          rawPoints: [],
          hasHighlight: false,
        });
      }

      const bin = binsMap.get(key);
      bin.candidateCount += p.candidateCount;
      bin.rawPoints.push(p);
    });

    const sortedBins = Array.from(binsMap.values()).sort((a, b) => a.binStart - b.binStart);

    // Chỉ ghim ĐÚNG 1 bin duy nhất chứa điểm của thí sinh
    if (effectiveScore !== null) {
      let matchedBin = sortedBins.find(
        (b) => effectiveScore >= b.binStart && effectiveScore < b.binEnd
      );
      if (!matchedBin && sortedBins.length > 0) {
        // Nếu rơi vào mép trên cùng (vd 10.0 hoặc 30.0)
        const lastBin = sortedBins[sortedBins.length - 1];
        if (Math.abs(effectiveScore - lastBin.binEnd) < 0.01) {
          matchedBin = lastBin;
        }
      }
      if (matchedBin) {
        matchedBin.hasHighlight = true;
      }
    }

    return sortedBins.map((bin) => {
      const firstPoint = bin.rawPoints[0] || {};
      const lastPoint = bin.rawPoints[bin.rawPoints.length - 1] || {};
      return {
        score: bin.centerScore,
        scoreLabel: bin.scoreLabel,
        candidateCount: bin.candidateCount,
        higherCount: firstPoint.higherCount,
        lowerCount: lastPoint.lowerCount,
        rankStart: firstPoint.rankStart,
        percentile: lastPoint.percentile,
        hasHighlight: Boolean(bin.hasHighlight),
      };
    });
  }, [filteredRawData, binMode, effectiveScore]);

  // 4. SVG Layout & Curves
  const maxCount = useMemo(() => {
    if (!displayData.length) return 100;
    return Math.max(...displayData.map((d) => d.candidateCount), 10);
  }, [displayData]);

  const svgWidth = 920;
  const svgHeight = height;
  const chartPadding = { top: 34, right: 28, bottom: 44, left: 62 };
  const innerWidth = svgWidth - chartPadding.left - chartPadding.right;
  const innerHeight = svgHeight - chartPadding.top - chartPadding.bottom;
  const slotWidth = displayData.length > 0 ? innerWidth / displayData.length : innerWidth;
  const barWidth = Math.max(Math.min(slotWidth * 0.78, 24), 2.5);

  const yTicks = useMemo(() => {
    const ticks = [];
    const step = maxCount / 4;
    for (let i = 0; i <= 4; i++) ticks.push(Math.round(step * i));
    return ticks;
  }, [maxCount]);

  const { curveLinePath, curveAreaPath } = useMemo(() => {
    if (displayData.length < 2) return { curveLinePath: '', curveAreaPath: '' };
    const pts = displayData.map((d, idx) => {
      const x = chartPadding.left + idx * slotWidth + slotWidth / 2;
      const y = chartPadding.top + innerHeight - (d.candidateCount / maxCount) * innerHeight;
      return { x, y };
    });

    let dStr = `M ${pts[0].x} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];
      const cpx1 = curr.x + (next.x - curr.x) / 2;
      const cpx2 = curr.x + (next.x - curr.x) / 2;
      dStr += ` C ${cpx1} ${curr.y}, ${cpx2} ${next.y}, ${next.x} ${next.y}`;
    }

    const baseY = chartPadding.top + innerHeight;
    const aStr = `${dStr} L ${pts[pts.length - 1].x},${baseY} L ${pts[0].x},${baseY} Z`;
    return { curveLinePath: dStr, curveAreaPath: aStr };
  }, [displayData, maxCount, chartPadding, innerHeight, slotWidth]);

  return (
    <div className="chart-card-wrapper">
      {/* HEADER BIỂU ĐỒ */}
      <div className="chart-card-header">
        <div className="chart-title-group">
          <h3 className="chart-title">
            <BarChart3 size={20} style={{ color: 'var(--primary)' }} />
            Phổ điểm: {distributionData?.targetName}
          </h3>
          <span className="chart-scope-badge">
            {distributionData?.scopeCode} ({formatCount(totalCandidates)} thí sinh)
          </span>
        </div>
      </div>

      {/* TOOLBAR */}
      <ChartToolbar
        binMode={binMode}
        setBinMode={setBinMode}
        rangeMode={rangeMode}
        setRangeMode={setRangeMode}
        rawCount={rawHistogram.length}
        isGroup={isGroup}
      />

      {/* SVG CANVAS & TOOLTIP */}
      <div className="chart-svg-container">
        <ChartSvgCanvas
          svgWidth={svgWidth}
          svgHeight={svgHeight}
          chartPadding={chartPadding}
          innerHeight={innerHeight}
          innerWidth={innerWidth}
          yTicks={yTicks}
          maxCount={maxCount}
          curveAreaPath={curveAreaPath}
          curveLinePath={curveLinePath}
          displayData={displayData}
          slotWidth={slotWidth}
          barWidth={barWidth}
          hoveredPoint={hoveredPoint}
          setHoveredPoint={setHoveredPoint}
          effectiveScore={effectiveScore}
          maxRawScore={maxRawScore}
        />

        <ChartTooltip
          hoveredPoint={hoveredPoint}
          totalCandidates={totalCandidates}
          svgWidth={svgWidth}
          svgHeight={svgHeight}
        />
      </div>

      {/* FOOTER LEGEND */}
      <ChartLegend columnCount={displayData.length} effectiveScore={effectiveScore} />

      {/* STANDING BREAKDOWN CARD */}
      <StandingBreakdownCard
        exactHighlightInfo={exactHighlightInfo}
        targetName={distributionData?.targetName}
        scopeCode={distributionData?.scopeCode}
        totalCandidates={totalCandidates}
      />
    </div>
  );
}
