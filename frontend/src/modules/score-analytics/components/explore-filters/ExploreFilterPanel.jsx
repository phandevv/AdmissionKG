import React from 'react';
import { Filter } from 'lucide-react';
import {
  POPULAR_GROUPS,
  SINGLE_SUBJECTS,
  VIETNAM_REGIONS,
  ALL_PROVINCES,
} from '../../constants/scoreAnalytics.constants';

/**
 * Component Bảng Bộ lọc Phổ điểm Đa chiều
 */
export default function ExploreFilterPanel({
  selectedTarget,
  targetCategory,
  setTargetCategory,
  scopeType,
  setScopeType,
  scopeCode,
  setScopeCode,
  handleFilterChange,
}) {
  return (
    <div className="explore-filter-panel">
      <div className="explore-filter-header">
        <h3 className="explore-filter-title">
          <Filter size={18} style={{ color: 'var(--primary, #2563eb)' }} />
          Bộ lọc Khám phá Phổ điểm
        </h3>

        {/* Toggle Loại mục tiêu: Tổ hợp vs Môn đơn */}
        <div className="type-switch-group">
          <button
            type="button"
            onClick={() => {
              setTargetCategory('GROUP');
              handleFilterChange('A00', scopeType, scopeCode);
            }}
            className={`type-switch-btn ${targetCategory === 'GROUP' ? 'active' : ''}`}
          >
            Tổ hợp xét tuyển (A00, D01...)
          </button>
          <button
            type="button"
            onClick={() => {
              setTargetCategory('SUBJECT');
              handleFilterChange('MATH', scopeType, scopeCode);
            }}
            className={`type-switch-btn ${targetCategory === 'SUBJECT' ? 'active' : ''}`}
          >
            Môn thi đơn lẻ (Toán, Văn, Anh...)
          </button>
        </div>
      </div>

      <div className="filter-inputs-grid">
        {/* 1. Chọn Môn / Tổ hợp */}
        <div className="filter-field">
          <label>
            {targetCategory === 'GROUP' ? 'Chọn Tổ hợp xét tuyển:' : 'Chọn Môn thi:'}
          </label>
          <select
            value={selectedTarget}
            onChange={(e) => handleFilterChange(e.target.value, scopeType, scopeCode)}
          >
            {(targetCategory === 'GROUP' ? POPULAR_GROUPS : SINGLE_SUBJECTS).map((item) => (
              <option key={item.code} value={item.code}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        {/* 2. Chọn Phạm vi không gian */}
        <div className="filter-field">
          <label>Chọn Cấp độ Phạm vi:</label>
          <select
            value={scopeType}
            onChange={(e) => {
              const newType = e.target.value;
              let newCode = 'ALL';
              if (newType === 'REGION') newCode = 'Miền Bắc';
              if (newType === 'PROVINCE') newCode = 'Hà Nội';
              handleFilterChange(selectedTarget, newType, newCode);
            }}
          >
            <option value="NATIONAL">🌐 Cả nước (Toàn quốc)</option>
            <option value="REGION">🗺️ Theo Vùng miền (Bắc / Trung / Nam)</option>
            <option value="PROVINCE">📍 Theo Tỉnh / Thành phố (34 tỉnh)</option>
          </select>
        </div>

        {/* 3. Chọn Chi tiết Vùng hoặc Tỉnh */}
        <div className="filter-field">
          <label>
            {scopeType === 'NATIONAL'
              ? 'Chi tiết phạm vi:'
              : scopeType === 'REGION'
              ? 'Chọn Vùng miền:'
              : 'Chọn Tỉnh / Thành phố:'}
          </label>
          {scopeType === 'NATIONAL' ? (
            <input
              type="text"
              disabled
              value="Toàn bộ 1.13 Triệu thí sinh cả nước"
              style={{
                background: 'var(--surface-soft, #f8fafc)',
                color: 'var(--text-muted, #64748b)',
                cursor: 'not-allowed',
              }}
            />
          ) : scopeType === 'REGION' ? (
            <select
              value={scopeCode}
              onChange={(e) => handleFilterChange(selectedTarget, 'REGION', e.target.value)}
            >
              {VIETNAM_REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          ) : (
            <select
              value={scopeCode}
              onChange={(e) => handleFilterChange(selectedTarget, 'PROVINCE', e.target.value)}
            >
              {ALL_PROVINCES.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>
    </div>
  );
}
