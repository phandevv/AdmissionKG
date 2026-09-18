// frontend/src/modules/user/components/profile/Step5CombinationScores.jsx
import {
  Award,
  BookOpen,
  ChevronDown,
  Flame,
  GraduationCap,
  Info,
  School,
  Search,
  Sparkles
} from 'lucide-react';
import { useMemo, useState } from 'react';
import CollapsedSummary from './CollapsedSummary';

export default function Step5CombinationScores({
  isCollapsed,
  onToggleCollapse,
  calculatedCombinations,
  priorityArea,
  priorityGroup,
  ielts,
}) {
  const [activeTab, setActiveTab] = useState('thpt'); // 'thpt' | 'hocba'
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('ALL');

  const { hocbaResults = [], thptResults = [] } = calculatedCombinations || {};

  const currentList = activeTab === 'thpt' ? thptResults : hocbaResults;

  // Lọc theo từ khóa tìm kiếm và nhóm khối
  const filteredList = useMemo(() => {
    return currentList.filter((item) => {
      if (selectedGroup !== 'ALL' && item.group !== selectedGroup) return false;
      if (searchKeyword.trim()) {
        const kw = searchKeyword.toLowerCase();
        const text = `${item.code} ${item.name} ${item.subjects.join(' ')} ${item.group}`.toLowerCase();
        if (!text.includes(kw)) return false;
      }
      return true;
    });
  }, [currentList, selectedGroup, searchKeyword]);

  // Nhóm khối duy nhất
  const groups = useMemo(() => {
    const set = new Set(currentList.map((x) => x.group));
    return Array.from(set);
  }, [currentList]);

  // Khối có điểm cao nhất
  const topCombination = currentList.length > 0 ? currentList[0] : null;

  return (
    <div className={`profile-section step-theme-purple card-surface ${isCollapsed ? 'is-collapsed' : ''}`}>
      {/* Header */}
      <div className="profile-section-header">
        <div className="profile-section-title-wrap">
          <div className="profile-section-badge" style={{ background: 'linear-gradient(135deg, #8b5cf6, #6d28d9)', color: '#fff' }}>
            Bước 5
          </div>
          <div>
            <h2 className="profile-section-title" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              Bảng Điểm Xét Tuyển Theo Tổ Hợp Môn
              <span className="pill" style={{ background: 'rgba(139, 92, 246, 0.12)', color: '#7c3aed', fontSize: '0.75rem', fontWeight: 700 }}>
                <Sparkles size={12} style={{ display: 'inline', marginRight: 3 }} />
                Chuẩn hóa Bộ GD&ĐT
              </span>
            </h2>
            <p className="profile-section-subtitle">
              Tự động ghép điểm theo các tổ hợp môn chuẩn quốc gia, áp dụng công thức giảm trừ điểm ưu tiên (khi tổng lớn 22.5 điểm) theo quy chế Bộ GD&ĐT.
            </p>
          </div>
        </div>

        <div className="profile-section-header-actions">
          <div className="profile-grade-hint">
            <Award size={14} style={{ color: '#8b5cf6' }} />
            <span>
              {activeTab === 'thpt' ? `${thptResults.length} khối thi THPT` : `${hocbaResults.length} khối xét Học bạ`}
            </span>
          </div>

          <button
            type="button"
            className={`step-caret-btn ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`}
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Mở rộng Bước 5' : 'Thu gọn Bước 5'}
            title={isCollapsed ? 'Mở rộng Bước 5' : 'Thu gọn Bước 5'}
          >
            <ChevronDown size={18} className="caret-svg" />
          </button>
        </div>
      </div>

      {/* Body */}
      {isCollapsed ? (
        <CollapsedSummary onExpand={onToggleCollapse} hint="Xem tất cả tổ hợp">
          <div className="collapsed-pill-item pill-highlight">
            <Flame size={12} style={{ color: '#f59e0b', flexShrink: 0 }} />
            <span className="pill-text">Top 1 Thi TN: <strong>{thptResults[0] ? `${thptResults[0].code} (${thptResults[0].totalScore}đ)` : '—'}</strong></span>
          </div>
          <div className="collapsed-pill-item pill-success">
            <span className="pill-text">Top 1 Học bạ: <strong>{hocbaResults[0] ? `${hocbaResults[0].code} (${hocbaResults[0].totalScore}đ)` : '—'}</strong></span>
          </div>
          {ielts && (
            <div className="collapsed-pill-item pill-info">
              <span className="pill-text">IELTS: <strong>{ielts}</strong></span>
            </div>
          )}
        </CollapsedSummary>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Tabs chuyển đổi Phương thức xét tuyển */}
          <div className="combination-mode-tabs">
            <button
              type="button"
              className={`combination-mode-btn ${activeTab === 'thpt' ? 'active' : ''}`}
              onClick={() => { setActiveTab('thpt'); setSelectedGroup('ALL'); }}
            >
              <GraduationCap size={16} />
              <span>Điểm Thi Tốt Nghiệp THPT (PT100)</span>
              <span className="tab-count-pill">{thptResults.length}</span>
            </button>
            <button
              type="button"
              className={`combination-mode-btn ${activeTab === 'hocba' ? 'active' : ''}`}
              onClick={() => { setActiveTab('hocba'); setSelectedGroup('ALL'); }}
            >
              <School size={16} />
              <span>Điểm Học Bạ THPT (PT200)</span>
              <span className="tab-count-pill">{hocbaResults.length}</span>
            </button>
          </div>

          {/* Quick KPI Ribbon */}
          {topCombination && (
            <div className="combination-top-banner">
              <div className="top-banner-left">
                <div className="top-badge-icon">
                  <Flame size={20} />
                </div>
                <div>
                  <div className="top-banner-title">
                    Tổ hợp đạt điểm cao nhất ({activeTab === 'thpt' ? 'Thi THPT' : 'Học bạ'}):
                    <strong style={{ marginLeft: 6, color: '#6d28d9', fontSize: '1.05rem' }}>{topCombination.code}</strong>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginLeft: 6 }}>({topCombination.name})</span>
                  </div>
                  <div className="top-banner-details">
                    Điểm 3 môn: <strong>{topCombination.rawScore}</strong>
                    {topCombination.baseBonus > 0 && (
                      <span>
                        {' '}• Điểm ưu tiên: <strong>+{topCombination.effectiveBonus}</strong>
                        {topCombination.isReduced && <span style={{ color: '#d97706', fontSize: '0.75rem', marginLeft: 4 }}>(Đã giảm trừ do tổng $\ge 22.5$)</span>}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="top-banner-score">
                <div className="score-lbl">Tổng điểm chuẩn hóa</div>
                <div className="score-num">{topCombination.totalScore.toFixed(2)}</div>
              </div>
            </div>
          )}

          {/* Search & Filter Bar */}
          <div className="combination-filter-row">
            <div className="filter-search-box">
              <Search size={14} />
              <input
                placeholder="Tìm tổ hợp (A00, D01, Toán, Lý, Hóa...)"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
            <div className="group-chips-scroll">
              <button
                type="button"
                className={`group-chip ${selectedGroup === 'ALL' ? 'active' : ''}`}
                onClick={() => setSelectedGroup('ALL')}
              >
                Tất cả ({currentList.length})
              </button>
              {groups.map((grp) => (
                <button
                  key={grp}
                  type="button"
                  className={`group-chip ${selectedGroup === grp ? 'active' : ''}`}
                  onClick={() => setSelectedGroup(grp)}
                >
                  {grp}
                </button>
              ))}
            </div>
          </div>

          {/* Grid danh sách tổ hợp môn */}
          {filteredList.length === 0 ? (
            <div className="card-pad state-block" style={{ background: 'var(--surface-soft)', borderRadius: 12 }}>
              <BookOpen size={36} style={{ color: 'var(--text-muted)' }} />
              <h4>Chưa có tổ hợp nào khớp dữ liệu</h4>
              <p style={{ fontSize: '0.84rem' }}>
                {activeTab === 'thpt'
                  ? 'Hãy nhập đầy đủ điểm các môn thi tốt nghiệp THPT ở Bước 3 để hệ thống tự động ghép điểm các tổ hợp.'
                  : 'Hãy nhập điểm các môn học bạ ở Bước 2 để tính điểm tổ hợp học bạ.'}
              </p>
            </div>
          ) : (
            <div className="combinations-cards-grid">
              {filteredList.map((c, idx) => {
                const isTop = idx === 0;
                let badgeClass = 'badge-high';
                let rankText = 'Xuất sắc';
                if (c.totalScore < 18.0) {
                  badgeClass = 'badge-low';
                  rankText = 'Cần cố gắng';
                } else if (c.totalScore < 21.0) {
                  badgeClass = 'badge-mid';
                  rankText = 'Trung bình';
                } else if (c.totalScore < 24.0) {
                  badgeClass = 'badge-good';
                  rankText = 'Khá tốt';
                }

                return (
                  <div key={c.code} className={`combination-card ${isTop ? 'is-best' : ''}`}>
                    <div className="comb-card-header">
                      <div className="comb-code-wrap">
                        <span className="comb-code">{c.code}</span>
                        <span className={`comb-rank-pill ${badgeClass}`}>{rankText}</span>
                      </div>
                      <div className="comb-total-score">
                        <small>Điểm XT</small>
                        <strong>{c.totalScore.toFixed(2)}</strong>
                      </div>
                    </div>

                    <div className="comb-name-text">{c.name}</div>

                    {/* Breakdown điểm 3 môn */}
                    <div className="comb-subjects-breakdown">
                      {c.subjects.map((subName) => {
                        const scoreVal = c.subjectScores[subName];
                        return (
                          <div key={subName} className="sub-breakdown-item">
                            <span className="sub-name">{subName}:</span>
                            <span className="sub-score">
                              {scoreVal !== undefined ? scoreVal.toFixed(2) : '—'}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    {/* Footer điểm ưu tiên */}
                    <div className="comb-card-footer">
                      <div className="comb-formula-text">
                        Tổng 3 môn: <strong>{c.rawScore.toFixed(2)}</strong>
                        {c.baseBonus > 0 && (
                          <span> + ƯT: <strong style={{ color: '#059669' }}>+{c.effectiveBonus}</strong></span>
                        )}
                      </div>
                      <span className="comb-group-tag">{c.group}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quy định & Ghi chú Bộ GD&ĐT */}
          <div className="combination-rules-note">
            <Info size={16} style={{ color: '#8b5cf6', flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              <strong>Quy chuẩn tính điểm theo Bộ GD&ĐT:</strong> Điểm xét tuyển = Tổng điểm 3 môn tổ hợp + Điểm ưu tiên (Khu vực & Đối tượng).
              Khi tổng điểm lớn hơn 22.5 điểm, điểm ưu tiên được tính theo công thức giảm trừ tuyến tính:
              <code> Điểm ƯT = [(30 - Tổng điểm)/7.5] × Mức điểm ƯT gốc</code>.
              Chứng chỉ IELTS được lưu trong hồ sơ để phục vụ xét tuyển kết hợp / cộng điểm thưởng theo đề án riêng của từng trường đại học.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
