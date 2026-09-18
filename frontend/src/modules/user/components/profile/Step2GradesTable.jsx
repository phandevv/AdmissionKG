import React from 'react';
import {
  TrendingUp,
  Lock,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import CollapsedSummary from './CollapsedSummary';

export default function Step2GradesTable({
  isCollapsed,
  onToggleCollapse,
  isElectivesLocked,
  allActiveSubjects,
  grades,
  onGradeChange,
  getSubjectAverage,
  summaryGpa,
  scoredSubjectsCount,
}) {
  return (
    <div className={`profile-section step-theme-emerald card-surface ${isCollapsed ? 'is-collapsed' : ''}`}>
      {/* Header */}
      <div className="profile-section-header">
        <div className="profile-section-title-wrap">
          <div className="profile-section-badge">Bước 2</div>
          <div>
            <h2 className="profile-section-title">Điểm Học Bạ 3 Năm (Lớp 10 - 11 - 12)</h2>
            <p className="profile-section-subtitle">
              Nhập điểm trung bình cả năm của 12 môn học để hệ thống tính GPA xét tuyển.
            </p>
          </div>
        </div>

        <div className="profile-section-header-actions">
          <div className="profile-grade-hint">
            <TrendingUp size={13} />
            <span>Thang 10.0 • {scoredSubjectsCount}/{allActiveSubjects.length} môn</span>
          </div>

          {/* Nút mũ thu gọn / mở rộng */}
          <button
            type="button"
            className={`step-caret-btn ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`}
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Mở rộng Bước 2' : 'Thu gọn Bước 2'}
            title={isCollapsed ? 'Mở rộng Bước 2' : 'Thu gọn Bước 2'}
          >
            <ChevronDown size={18} className="caret-svg" />
          </button>
        </div>
      </div>

      {/* Body */}
      {isCollapsed ? (
        <CollapsedSummary onExpand={onToggleCollapse} hint="Nhập điểm học bạ">
          <div className={`collapsed-pill-item ${scoredSubjectsCount === allActiveSubjects.length ? 'pill-success' : 'pill-info'}`}>
            {scoredSubjectsCount === allActiveSubjects.length ? <CheckCircle2 size={12} /> : <TrendingUp size={12} />}
            <span className="pill-text">Tiến độ: <strong>{scoredSubjectsCount}/{allActiveSubjects.length} môn</strong></span>
          </div>
          <div className="collapsed-pill-item pill-highlight">
            <span className="pill-text">Lớp 10: <strong>{summaryGpa.gpa10 || '—'}</strong></span>
          </div>
          <div className="collapsed-pill-item pill-highlight">
            <span className="pill-text">Lớp 11: <strong>{summaryGpa.gpa11 || '—'}</strong></span>
          </div>
          <div className="collapsed-pill-item pill-highlight">
            <span className="pill-text">Lớp 12: <strong>{summaryGpa.gpa12 || '—'}</strong></span>
          </div>
          <div className="collapsed-pill-item pill-accent">
            <span className="pill-text">GPA 3 Năm: <strong>{summaryGpa.overall || '—'}</strong></span>
          </div>
        </CollapsedSummary>
      ) : !isElectivesLocked ? (
        <div className="profile-step-locked-box">
          <div className="locked-icon-badge">
            <Lock size={24} />
          </div>
          <h3 className="locked-box-title">Đang Chờ Khóa Môn Học Bạ</h3>
          <p className="locked-box-desc">
            Vui lòng chọn và lưu 4 môn tự chọn ở <strong>Bước 1</strong> để mở khóa bảng điểm 12 môn.
          </p>
        </div>
      ) : (
        <div className="grade-table-container">
          <table className="grade-table">
            <thead>
              <tr>
                <th style={{ width: '48px' }} className="th-center">#</th>
                <th style={{ minWidth: '220px' }}>Môn học</th>
                <th style={{ width: '110px' }} className="th-center">Lớp 10</th>
                <th style={{ width: '110px' }} className="th-center">Lớp 11</th>
                <th style={{ width: '110px' }} className="th-center">Lớp 12</th>
                <th style={{ width: '120px' }} className="th-center">ĐTB 3 Năm</th>
              </tr>
            </thead>
            <tbody>
              {allActiveSubjects.map((sub, idx) => {
                const subGrade = grades[sub.name] || { grade10: '', grade11: '', grade12: '' };
                const avg = getSubjectAverage(sub.name);

                return (
                  <tr key={sub.name} className="grade-row">
                    <td className="cell-center cell-stt">{idx + 1}</td>
                    <td className="cell-subject-name">
                      <div className="subject-title-wrap">
                        <span className="subject-name-text">{sub.name}</span>
                        <span className={`subject-kind-tag ${sub.isCompulsory ? 'compulsory' : 'elective'}`}>
                          {sub.isCompulsory ? 'Bắt buộc' : 'Tự chọn'}
                        </span>
                      </div>
                    </td>
                    <td className="cell-center">
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        max="10"
                        placeholder="0.0"
                        className="grade-input"
                        value={subGrade.grade10}
                        onChange={(e) => onGradeChange(sub.name, 'grade10', e.target.value)}
                      />
                    </td>
                    <td className="cell-center">
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        max="10"
                        placeholder="0.0"
                        className="grade-input"
                        value={subGrade.grade11}
                        onChange={(e) => onGradeChange(sub.name, 'grade11', e.target.value)}
                      />
                    </td>
                    <td className="cell-center">
                      <input
                        type="number"
                        step="0.05"
                        min="0"
                        max="10"
                        placeholder="0.0"
                        className="grade-input"
                        value={subGrade.grade12}
                        onChange={(e) => onGradeChange(sub.name, 'grade12', e.target.value)}
                      />
                    </td>
                    <td className="cell-center">
                      {avg !== null ? (
                        <span
                          className={`grade-avg-badge ${
                            parseFloat(avg) >= 8.0
                              ? 'avg-high'
                              : parseFloat(avg) >= 6.5
                              ? 'avg-mid'
                              : parseFloat(avg) >= 5.0
                              ? 'avg-pass'
                              : 'avg-low'
                          }`}
                        >
                          {avg}
                        </span>
                      ) : (
                        <span className="grade-empty-dash">—</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>

            <tfoot>
              <tr className="grade-summary-row">
                <td colSpan={2} className="summary-label-cell">
                  <div className="summary-label-wrap">
                    <TrendingUp size={15} />
                    <span>ĐIỂM TRUNG BÌNH (GPA)</span>
                  </div>
                </td>
                <td className="cell-center summary-gpa-cell">
                  <span className="summary-gpa-val">{summaryGpa.gpa10 || '—'}</span>
                  <span className="summary-gpa-sub">L10</span>
                </td>
                <td className="cell-center summary-gpa-cell">
                  <span className="summary-gpa-val">{summaryGpa.gpa11 || '—'}</span>
                  <span className="summary-gpa-sub">L11</span>
                </td>
                <td className="cell-center summary-gpa-cell">
                  <span className="summary-gpa-val">{summaryGpa.gpa12 || '—'}</span>
                  <span className="summary-gpa-sub">L12</span>
                </td>
                <td className="cell-center summary-gpa-cell summary-gpa-total-cell">
                  <span className="summary-gpa-total-val">{summaryGpa.overall || '—'}</span>
                  <span className="summary-gpa-sub">GPA 3 Năm</span>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
}
