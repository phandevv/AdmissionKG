import React from 'react';
import { Layers, Maximize2, Minimize2 } from 'lucide-react';

export default function ProfileToolbar({ areAllCollapsed, onToggleAll }) {
  return (
    <div className="profile-sections-toolbar card-surface">
      <div className="toolbar-left">
        <Layers size={16} className="text-primary" />
        <span className="toolbar-title">Toàn bộ hồ sơ tuyển sinh</span>
        <span className="toolbar-sub-badge">
          {areAllCollapsed ? 'Đang thu gọn' : 'Bấm để thu nhỏ/mở rộng từng phần'}
        </span>
      </div>
      <div className="toolbar-right">
        <button
          type="button"
          className="btn btn-ghost btn-sm toolbar-toggle-all-btn"
          onClick={onToggleAll}
          title={areAllCollapsed ? 'Mở rộng tất cả các phần' : 'Thu nhỏ tất cả các phần'}
        >
          {areAllCollapsed ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          <span>{areAllCollapsed ? 'Mở rộng tất cả' : 'Thu nhỏ tất cả'}</span>
        </button>
      </div>
    </div>
  );
}
