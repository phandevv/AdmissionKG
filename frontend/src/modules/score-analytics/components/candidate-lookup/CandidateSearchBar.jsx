import React from 'react';
import { Search, RefreshCw } from 'lucide-react';

/**
 * Component Thanh tìm kiếm SBD & Năm thi
 */
export default function CandidateSearchBar({
  sbdInput,
  setSbdInput,
  yearInput,
  setYearInput,
  lookupLoading,
  handleLookup,
}) {
  return (
    <div className="lookup-form-card">
      <form onSubmit={handleLookup} className="lookup-inputs-row">
        <div className="input-with-icon">
          <Search size={18} className="input-icon" />
          <input
            type="text"
            placeholder="Nhập Số Báo Danh (Ví dụ: 01000008)"
            value={sbdInput}
            onChange={(e) => setSbdInput(e.target.value)}
            disabled={lookupLoading}
            maxLength={12}
          />
        </div>

        <div style={{ width: '130px' }}>
          <select
            value={yearInput}
            onChange={(e) => setYearInput(e.target.value)}
            disabled={lookupLoading}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1.5px solid var(--border-strong, #cbd5e1)',
              background: '#ffffff',
              fontWeight: '700',
              fontFamily: 'inherit',
              fontVariantNumeric: 'tabular-nums',
              outline: 'none',
            }}
          >
            <option value="2026">Năm 2026</option>
            <option value="2025">Năm 2025</option>
            <option value="2024">Năm 2024</option>
          </select>
        </div>

        <button
          type="submit"
          className="btn-lookup-submit"
          disabled={lookupLoading || !sbdInput.trim()}
        >
          {lookupLoading ? (
            <>
              <RefreshCw size={16} className="spin-icon" /> Đang tra cứu...
            </>
          ) : (
            <>
              <Search size={16} /> Tra cứu & Định vị
            </>
          )}
        </button>
      </form>
    </div>
  );
}
