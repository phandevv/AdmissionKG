import React from 'react';
import { ChevronRight, Edit3 } from 'lucide-react';

export default function CollapsedSummary({ onExpand, children, hint = 'Mở rộng chỉnh sửa' }) {
  return (
    <div
      className="section-collapsed-summary"
      onClick={onExpand}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onExpand()}
      title="Bấm để mở rộng và chỉnh sửa"
    >
      <div className="summary-pill-group">
        {children}
      </div>
      <div className="click-to-expand-action">
        <Edit3 size={12} />
        <span>{hint}</span>
        <ChevronRight size={14} className="expand-arrow" />
      </div>
    </div>
  );
}
