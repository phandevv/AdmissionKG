import React from 'react';
import {
  BookOpen,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';

export default function ProfileTabNav({
  activeTab,
  setActiveTab,
  isElectivesLocked,
  scoredSubjectsCount,
  allActiveSubjectsCount,
  thptExamSummary,
  priorityArea,
  priorityBonus,
  bestCombo,
}) {
  const tabs = [
    {
      id: 'hocba',
      label: '1. Học Bạ THPT',
      countBadge: `${scoredSubjectsCount}/${allActiveSubjectsCount}`,
      icon: BookOpen,
      isComplete: isElectivesLocked && scoredSubjectsCount === allActiveSubjectsCount,
      color: 'blue',
    },
    {
      id: 'thpt',
      label: '2. Thi Tốt Nghiệp',
      countBadge: `${thptExamSummary.scoredCount || 0}/4`,
      icon: GraduationCap,
      isComplete: thptExamSummary.scoredCount === 4,
      color: 'purple',
    },
    {
      id: 'priority',
      label: '3. Điểm Ưu Tiên',
      countBadge: priorityBonus > 0 ? `+${priorityBonus}đ` : priorityArea,
      icon: Sparkles,
      isComplete: true,
      color: 'amber',
    },
    {
      id: 'combos',
      label: '4. Điểm Tổ Hợp',
      countBadge: bestCombo ? `${bestCombo.code}` : null,
      icon: Award,
      isComplete: Boolean(bestCombo),
      color: 'emerald',
    },
  ];

  return (
    <div className="profile-tab-header-wrap">
      {/* 4 Compact Stepper Tabs */}
      <div className="compact-stepper-tabs" role="tablist">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`compact-tab-btn tab-theme-${tab.color} ${isActive ? 'is-active' : ''} ${tab.isComplete ? 'is-complete' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <Icon size={15} className="compact-tab-icon" />
              <span className="compact-tab-label">{tab.label}</span>
              {tab.countBadge && (
                <span className={`compact-tab-pill ${tab.isComplete ? 'pill-done' : ''}`}>
                  {tab.isComplete && <CheckCircle2 size={10} />}
                  {tab.countBadge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
