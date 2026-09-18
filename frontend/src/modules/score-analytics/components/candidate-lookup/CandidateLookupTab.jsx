import React from 'react';
import { AlertCircle } from 'lucide-react';
import CandidateSearchBar from './CandidateSearchBar';
import CandidateSummaryCard from './CandidateSummaryCard';
import CandidateCombosList from './CandidateCombosList';
import ScoreChart from '../score-chart/ScoreChart';
import './CandidateLookup.css';

/**
 * Master Component Tab 1: Tra cứu Cá nhân & Thứ hạng
 */
export default function CandidateLookupTab({
  sbdInput,
  setSbdInput,
  yearInput,
  setYearInput,
  candidateData,
  lookupLoading,
  lookupError,
  handleLookup,
  selectedTarget,
  scopeType,
  handleViewCandidateGroupDistribution,
  distributionData,
  highlightScore,
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* 1. Form Tra cứu SBD */}
      <CandidateSearchBar
        sbdInput={sbdInput}
        setSbdInput={setSbdInput}
        yearInput={yearInput}
        setYearInput={setYearInput}
        lookupLoading={lookupLoading}
        handleLookup={handleLookup}
      />

      {/* 2. Thông báo Lỗi nếu có */}
      {lookupError && (
        <div
          style={{
            background: '#fef2f2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px 16px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '0.88rem',
          }}
        >
          <AlertCircle size={18} />
          <span>{lookupError}</span>
        </div>
      )}

      {/* 3. Dữ liệu Kết quả Tra cứu của Thí sinh */}
      {candidateData && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Card Thông tin Thí sinh & Điểm các môn */}
          <CandidateSummaryCard candidateData={candidateData} />

          {/* Lưới Tổ hợp & Thứ hạng 3 Cấp */}
          <CandidateCombosList
            candidateData={candidateData}
            selectedTarget={selectedTarget}
            scopeType={scopeType}
            handleViewCandidateGroupDistribution={handleViewCandidateGroupDistribution}
          />

          {/* Biểu đồ Phổ điểm */}
          {distributionData && (
            <ScoreChart
              distributionData={distributionData}
              highlightScore={highlightScore}
            />
          )}
        </div>
      )}
    </div>
  );
}
