import React, { useState, useEffect, useCallback } from 'react';
import ScoreHeroBanner from '../components/hero-banner/ScoreHeroBanner';
import ScoreNavTabs from '../components/nav-tabs/ScoreNavTabs';
import CandidateLookupTab from '../components/candidate-lookup/CandidateLookupTab';
import ExploreDistributionTab from '../components/explore-filters/ExploreDistributionTab';
import { DEFAULT_SCORE_CONFIG } from '../constants/scoreAnalytics.constants';
import { getCandidateScoreForTarget } from '../utils/scoreFormatters';
import { scoreAnalyticsService } from '../services/scoreAnalyticsService';
import './ScoreAnalyticsPage.css';

/**
 * Master Page: Tra cứu Điểm thi & Khám phá Phổ điểm Đa chiều THPT 2026
 */
export default function ScoreAnalyticsPage() {
  const [activeTab, setActiveTab] = useState('lookup');

  // State Tra cứu cá nhân
  const [sbdInput, setSbdInput] = useState(DEFAULT_SCORE_CONFIG.DEFAULT_SBD);
  const [yearInput, setYearInput] = useState(DEFAULT_SCORE_CONFIG.DEFAULT_YEAR);
  const [candidateData, setCandidateData] = useState(null);
  const [lookupLoading, setLookupLoading] = useState(false);
  const [lookupError, setLookupError] = useState('');

  // State Phổ điểm
  const [selectedTarget, setSelectedTarget] = useState(DEFAULT_SCORE_CONFIG.DEFAULT_TARGET);
  const [targetCategory, setTargetCategory] = useState(DEFAULT_SCORE_CONFIG.DEFAULT_TARGET_CATEGORY);
  const [scopeType, setScopeType] = useState(DEFAULT_SCORE_CONFIG.DEFAULT_SCOPE_TYPE);
  const [scopeCode, setScopeCode] = useState(DEFAULT_SCORE_CONFIG.DEFAULT_SCOPE_CODE);
  const [distributionData, setDistributionData] = useState(null);
  const [highlightScore, setHighlightScore] = useState(null);

  // Tải phổ điểm
  const fetchDistribution = useCallback(async (yr, target, scType, scCode) => {
    try {
      const data = await scoreAnalyticsService.getDistribution(yr, target, scType, scCode);
      setDistributionData(data);
    } catch (err) {
      console.error('Lỗi khi tải phổ điểm:', err);
    }
  }, []);

  // Tra cứu điểm thi theo SBD
  const handleLookup = useCallback(async (e) => {
    if (e) e.preventDefault();
    if (!sbdInput.trim()) return;

    setLookupLoading(true);
    setLookupError('');
    try {
      const data = await scoreAnalyticsService.lookupCandidate(sbdInput.trim(), Number(yearInput));
      setCandidateData(data);

      if (data?.groupScores?.length > 0) {
        const firstGroup = data.groupScores[0];
        setSelectedTarget(firstGroup.groupCode);
        setTargetCategory('GROUP');
        setScopeType('NATIONAL');
        setScopeCode('ALL');
        setHighlightScore(firstGroup.totalScore);
        fetchDistribution(Number(yearInput), firstGroup.groupCode, 'NATIONAL', 'ALL');
      }
    } catch (err) {
      console.error('Lỗi tra cứu:', err);
      setLookupError(err.response?.data?.message || 'Không tìm thấy kết quả điểm thi cho Số báo danh này.');
      setCandidateData(null);
    } finally {
      setLookupLoading(false);
    }
  }, [sbdInput, yearInput, fetchDistribution]);

  // Tải dữ liệu mặc định khi khởi tạo
  useEffect(() => {
    handleLookup();
  }, [handleLookup]);

  // Chuyển đổi bộ lọc trong Tab Khám phá
  const handleFilterChange = (newTarget, newScopeType, newScopeCode) => {
    setSelectedTarget(newTarget);
    setScopeType(newScopeType);
    setScopeCode(newScopeCode);
    fetchDistribution(Number(yearInput), newTarget, newScopeType, newScopeCode);
  };

  // Xem phổ điểm của một tổ hợp từ thẻ thí sinh
  const handleViewCandidateGroupDistribution = (group, targetScope = 'NATIONAL') => {
    setSelectedTarget(group.groupCode);
    setTargetCategory('GROUP');
    setHighlightScore(group.totalScore);

    let scType = 'NATIONAL';
    let scCode = 'ALL';
    if (targetScope === 'REGION' && candidateData?.region) {
      scType = 'REGION';
      scCode = candidateData.region;
    } else if (targetScope === 'PROVINCE' && candidateData?.province) {
      scType = 'PROVINCE';
      scCode = candidateData.province;
    }

    setScopeType(scType);
    setScopeCode(scCode);
    fetchDistribution(Number(yearInput), group.groupCode, scType, scCode);
  };

  const currentCandidateScore = getCandidateScoreForTarget(selectedTarget, candidateData);

  return (
    <div className="score-page">
      {/* 1. HERO BANNER */}
      <ScoreHeroBanner />

      {/* 2. TABS BAR */}
      <ScoreNavTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* 3. TAB 1: TRA CỨU CÁ NHÂN */}
      {activeTab === 'lookup' && (
        <CandidateLookupTab
          sbdInput={sbdInput}
          setSbdInput={setSbdInput}
          yearInput={yearInput}
          setYearInput={setYearInput}
          candidateData={candidateData}
          lookupLoading={lookupLoading}
          lookupError={lookupError}
          handleLookup={handleLookup}
          selectedTarget={selectedTarget}
          scopeType={scopeType}
          handleViewCandidateGroupDistribution={handleViewCandidateGroupDistribution}
          distributionData={distributionData}
          highlightScore={highlightScore}
        />
      )}

      {/* 4. TAB 2: KHÁM PHÁ PHỔ ĐIỂM ĐA CHIỀU */}
      {activeTab === 'explore' && (
        <ExploreDistributionTab
          selectedTarget={selectedTarget}
          targetCategory={targetCategory}
          setTargetCategory={setTargetCategory}
          scopeType={scopeType}
          setScopeType={setScopeType}
          scopeCode={scopeCode}
          setScopeCode={setScopeCode}
          handleFilterChange={handleFilterChange}
          distributionData={distributionData}
          currentCandidateScore={currentCandidateScore}
        />
      )}
    </div>
  );
}
