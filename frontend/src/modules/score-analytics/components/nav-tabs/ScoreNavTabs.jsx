import React from 'react';
import { Target, BarChart3 } from 'lucide-react';
import './ScoreNavTabs.css';

/**
 * Component Điều hướng 2 Tab: Tra cứu Cá nhân & Khám phá Phổ điểm
 */
export default function ScoreNavTabs({ activeTab, onTabChange }) {
  return (
    <div className="score-nav-tabs">
      <button
        type="button"
        onClick={() => onTabChange('lookup')}
        className={`score-tab-btn ${activeTab === 'lookup' ? 'active' : ''}`}
      >
        <Target size={16} />
        <span>Tra cứu Cá nhân & Thứ hạng</span>
      </button>

      <button
        type="button"
        onClick={() => onTabChange('explore')}
        className={`score-tab-btn ${activeTab === 'explore' ? 'active' : ''}`}
      >
        <BarChart3 size={16} />
        <span>Khám phá Phổ điểm Đa chiều</span>
      </button>
    </div>
  );
}
