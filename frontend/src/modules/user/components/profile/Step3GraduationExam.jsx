import React from 'react';
import {
  BookOpen,
  Lock,
  Check,
  CheckCircle2,
  AlertCircle,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from 'lucide-react';
import CollapsedSummary from './CollapsedSummary';
import {
  GRADUATION_COMPULSORY_SUBJECTS,
  MAX_GRADUATION_ELECTIVES,
} from '../../data/curriculumData';

export default function Step3GraduationExam({
  isCollapsed,
  onToggleCollapse,
  isElectivesLocked,
  thptElectives,
  availableGraduationElectives,
  onToggleThptElective,
  thptGrades,
  onThptGradeChange,
  thptExamSummary,
}) {
  return (
    <div className={`profile-section step-theme-purple card-surface ${isCollapsed ? 'is-collapsed' : ''}`}>
      {/* Header */}
      <div className="profile-section-header">
        <div className="profile-section-title-wrap">
          <div className="profile-section-badge">Bước 3</div>
          <div>
            <h2 className="profile-section-title">Thi Tốt Nghiệp THPT (Quy Chế 2+2)</h2>
            <p className="profile-section-subtitle">
              Gồm 2 môn bắt buộc (Toán, Ngữ văn) và 2 môn tự chọn trong các môn bạn đang học.
            </p>
          </div>
        </div>

        <div className="profile-section-header-actions">
          <div className={`profile-counter-pill ${thptElectives.length === MAX_GRADUATION_ELECTIVES ? 'complete' : 'incomplete'}`}>
            {thptElectives.length === MAX_GRADUATION_ELECTIVES ? <Check size={13} /> : <AlertCircle size={13} />}
            <span>Đã chọn: <strong>{thptElectives.length}/{MAX_GRADUATION_ELECTIVES}</strong> môn tự chọn</span>
          </div>

          {/* Nút mũ thu gọn / mở rộng */}
          <button
            type="button"
            className={`step-caret-btn ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`}
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Mở rộng Bước 3' : 'Thu gọn Bước 3'}
            title={isCollapsed ? 'Mở rộng Bước 3' : 'Thu gọn Bước 3'}
          >
            <ChevronDown size={18} className="caret-svg" />
          </button>
        </div>
      </div>

      {/* Body */}
      {isCollapsed ? (
        <CollapsedSummary onExpand={onToggleCollapse} hint="Nhập điểm thi TN">
          <div className="collapsed-pill-item pill-info">
            <BookOpen size={12} />
            <span className="pill-text">Môn thi: <strong>Toán, Văn{thptElectives.length > 0 ? `, ${thptElectives.join(', ')}` : ''}</strong></span>
          </div>
          <div className="collapsed-pill-item pill-highlight">
            <span className="pill-text">Tổng 4 môn: <strong>{thptExamSummary.total ? `${thptExamSummary.total}/40đ` : '—'}</strong></span>
          </div>
          <div className="collapsed-pill-item pill-accent">
            <span className="pill-text">ĐTB: <strong>{thptExamSummary.average || '—'}</strong></span>
          </div>
          {thptExamSummary.hasParalyzed ? (
            <div className="collapsed-pill-item pill-danger">
              <AlertCircle size={12} />
              <span className="pill-text">Điểm liệt: <strong>{thptExamSummary.paralyzedSubjects.join(', ')}</strong></span>
            </div>
          ) : thptExamSummary.scoredCount === 4 ? (
            <div className="collapsed-pill-item pill-success">
              <CheckCircle2 size={12} />
              <span className="pill-text">Đủ ĐK Tốt Nghiệp</span>
            </div>
          ) : (
            <div className="collapsed-pill-item pill-warning">
              <span className="pill-text">Đã nhập: <strong>{thptExamSummary.scoredCount}/4 môn</strong></span>
            </div>
          )}
        </CollapsedSummary>
      ) : !isElectivesLocked ? (
        <div className="profile-step-locked-box">
          <div className="locked-icon-badge">
            <Lock size={24} />
          </div>
          <h3 className="locked-box-title">Đang Chờ Khóa Môn Học Bạ</h3>
          <p className="locked-box-desc">
            Vui lòng hoàn thành <strong>Bước 1</strong> để hệ thống xác định các môn THPT của bạn trước khi chọn môn thi tốt nghiệp.
          </p>
        </div>
      ) : (
        <div className="step-content-body thpt-compact-body">
          {/* 3A & 3B. Gọn gàng phần chọn môn thi */}
          <div className="thpt-selector-container">
            <div className="thpt-fixed-row">
              <span className="thpt-subheading-compact">1. Bắt buộc:</span>
              <div className="thpt-fixed-chips">
                <span className="thpt-mini-chip fixed">
                  <Lock size={11} className="text-primary" /> Toán
                </span>
                <span className="thpt-mini-chip fixed">
                  <Lock size={11} className="text-primary" /> Ngữ văn
                </span>
              </div>
            </div>

            <div className="thpt-electives-row">
              <div className="thpt-electives-label-wrap">
                <span className="thpt-subheading-compact">2. Chọn 2 môn tự chọn:</span>
                <span className="thpt-count-hint">({thptElectives.length}/{MAX_GRADUATION_ELECTIVES})</span>
              </div>
              <div className="thpt-mini-picker-wrap">
                {availableGraduationElectives.map((item) => {
                  const isSelected = thptElectives.includes(item.name);
                  const isDisabled = !isSelected && thptElectives.length >= MAX_GRADUATION_ELECTIVES;

                  return (
                    <button
                      key={item.name}
                      type="button"
                      className={`thpt-mini-chip-btn ${isSelected ? 'is-selected' : ''} ${isDisabled ? 'is-disabled' : ''}`}
                      onClick={() => onToggleThptElective(item.name)}
                      disabled={isDisabled}
                    >
                      {isSelected && <Check size={11} className="chip-check-icon" />}
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* 3C. 4 Ô Nhập Điểm Thi Tốt Nghiệp Siêu Gọn */}
          <div className="thpt-scores-compact-section">
            <div className="scores-compact-header">
              <span className="thpt-subheading-compact">3. Nhập điểm thi 4 môn (Thang điểm 10):</span>
            </div>

            <div className="thpt-compact-grid">
              {['Toán', 'Ngữ văn', ...thptElectives].map((subName) => {
                const val = thptGrades[subName] || '';
                const numVal = parseFloat(val);
                const isParalyzed = !isNaN(numVal) && numVal <= 1.0;
                const isCompulsory = GRADUATION_COMPULSORY_SUBJECTS.includes(subName);

                return (
                  <div key={subName} className={`thpt-compact-card ${isParalyzed ? 'is-paralyzed' : val !== '' ? 'has-score' : ''}`}>
                    <div className="compact-card-header">
                      <strong className="compact-sub-name">{subName}</strong>
                      <span className={`compact-sub-badge ${isCompulsory ? 'compulsory' : 'elective'}`}>
                        {isCompulsory ? 'Bắt buộc' : 'Tự chọn'}
                      </span>
                    </div>

                    <div className="compact-input-row">
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        max="10"
                        placeholder="0.0"
                        className={`compact-grade-input ${isParalyzed ? 'input-paralyzed' : ''}`}
                        value={val}
                        onChange={(e) => onThptGradeChange(subName, e.target.value)}
                      />
                      <span className="compact-input-unit">/10</span>
                    </div>

                    <div className="compact-card-status">
                      {isParalyzed ? (
                        <span className="status-badge-paralyzed">⚠️ Liệt (≤1.0)</span>
                      ) : val !== '' ? (
                        <span className="status-badge-ok">
                          {numVal >= 8.0 ? 'Giỏi' : numVal >= 6.5 ? 'Khá' : numVal >= 5.0 ? 'Đạt' : 'Trung bình'}
                        </span>
                      ) : (
                        <span className="status-badge-empty">—</span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Ô chờ nếu chưa chọn đủ 2 môn tự chọn */}
              {Array.from({ length: Math.max(0, MAX_GRADUATION_ELECTIVES - thptElectives.length) }).map((_, pIdx) => (
                <div key={`ph-${pIdx}`} className="thpt-compact-card placeholder-card">
                  <div className="compact-card-header">
                    <span className="placeholder-sub-name">Môn tự chọn #{thptElectives.length + pIdx + 1}</span>
                  </div>
                  <div className="placeholder-body">
                    <HelpCircle size={15} className="text-muted" />
                    <span>Chưa chọn môn</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Dải thống kê kết quả thi thu gọn */}
            <div className="thpt-compact-summary-bar">
              <div className="compact-sum-item">
                <span className="sum-label">Đã nhập:</span>
                <strong className="sum-val">{thptExamSummary.scoredCount}/4</strong>
              </div>
              <div className="compact-sum-divider" />
              <div className="compact-sum-item">
                <span className="sum-label">Tổng 4 môn:</span>
                <strong className="sum-val highlight-primary">{thptExamSummary.total ? `${thptExamSummary.total}đ` : '—'}</strong>
              </div>
              <div className="compact-sum-divider" />
              <div className="compact-sum-item">
                <span className="sum-label">ĐTB Thi:</span>
                <strong className="sum-val highlight-accent">{thptExamSummary.average || '—'}</strong>
              </div>
              <div className="compact-sum-divider" />
              <div className="compact-sum-item sum-status-wrap">
                {thptExamSummary.hasParalyzed ? (
                  <span className="compact-status-danger">⚠️ Bị điểm liệt (≤1.0)</span>
                ) : thptExamSummary.scoredCount === 4 ? (
                  <span className="compact-status-success">
                    <CheckCircle2 size={12} /> Đủ ĐK Tốt Nghiệp
                  </span>
                ) : (
                  <span className="compact-status-pending">Chưa đủ 4 môn</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
