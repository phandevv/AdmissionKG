import React from 'react';
import ExploreFilterPanel from './ExploreFilterPanel';
import DistributionStatsGrid from './DistributionStatsGrid';
import ScoreChart from '../score-chart/ScoreChart';
import './ExploreFilters.css';

/**
 * Master Component Tab 2: Khám phá Phổ điểm Đa chiều
 */
export default function ExploreDistributionTab({
  selectedTarget,
  targetCategory,
  setTargetCategory,
  scopeType,
  setScopeType,
  scopeCode,
  setScopeCode,
  handleFilterChange,
  distributionData,
  currentCandidateScore,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Bảng Bộ lọc Đa chiều */}
      <ExploreFilterPanel
        selectedTarget={selectedTarget}
        targetCategory={targetCategory}
        setTargetCategory={setTargetCategory}
        scopeType={scopeType}
        setScopeType={setScopeType}
        scopeCode={scopeCode}
        setScopeCode={setScopeCode}
        handleFilterChange={handleFilterChange}
      />

      {/* 2. Thống kê Phổ điểm */}
      <DistributionStatsGrid distributionData={distributionData} />

      {/* 3. Biểu đồ Phổ điểm */}
      {distributionData && (
        <ScoreChart
          distributionData={distributionData}
          highlightScore={currentCandidateScore}
        />
      )}
    </div>
  );
}
