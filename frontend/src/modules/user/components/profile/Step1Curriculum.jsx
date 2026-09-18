import React from 'react';
import {
  Lock,
  Check,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  Edit3,
  ChevronDown,
  ChevronUp,
  Save,
  X,
} from 'lucide-react';
import CollapsedSummary from './CollapsedSummary';
import {
  COMPULSORY_SUBJECTS,
  ELECTIVE_SUBJECTS,
  MAX_ELECTIVE_COUNT,
} from '../../data/curriculumData';

export default function Step1Curriculum({
  isCollapsed,
  onToggleCollapse,
  isElectivesLocked,
  isEditingElectives,
  selectedElectives,
  draftElectives,
  savingElectives,
  onToggleElective,
  onStartEditElectives,
  onCancelEditElectives,
  onSaveElectivesToDb,
}) {
  return (
    <div className={`profile-section step-theme-blue card-surface ${isCollapsed ? 'is-collapsed' : ''}`}>
      {/* Header */}
      <div className="profile-section-header">
        <div className="profile-section-title-wrap">
          <div className="profile-section-badge">Bước 1</div>
          <div>
            <h2 className="profile-section-title">
              {isElectivesLocked && !isEditingElectives
                ? 'Môn Học Xét Tuyển (Đã Khóa Cố Định)'
                : isEditingElectives
                ? 'Chỉnh Sửa 4 Môn Tự Chọn'
                : 'Chọn 4 Môn Tự Chọn (GDPT 2018)'}
            </h2>
            <p className="profile-section-subtitle">
              Gồm 8 môn bắt buộc cố định và 4 môn tự chọn bạn theo học ở trường THPT.
            </p>
          </div>
        </div>

        <div className="profile-section-header-actions">
          {isElectivesLocked && !isEditingElectives ? (
            <div className="profile-locked-status-group">
              <div className="profile-counter-pill complete">
                <ShieldCheck size={14} />
                <span>Đã khóa <strong>4/4</strong> môn</span>
              </div>
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={onStartEditElectives}
                title="Thay đổi 4 môn tự chọn"
              >
                <Edit3 size={13} />
                <span>Đổi môn</span>
              </button>
            </div>
          ) : (
            <div className={`profile-counter-pill ${draftElectives.length === MAX_ELECTIVE_COUNT ? 'complete' : 'incomplete'}`}>
              {draftElectives.length === MAX_ELECTIVE_COUNT ? <Check size={14} /> : <AlertCircle size={14} />}
              <span>Đã chọn: <strong>{draftElectives.length}/{MAX_ELECTIVE_COUNT}</strong> môn</span>
            </div>
          )}

          {/* Nút mũ thu gọn / mở rộng */}
          <button
            type="button"
            className={`step-caret-btn ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`}
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Mở rộng Bước 1' : 'Thu gọn Bước 1'}
            title={isCollapsed ? 'Mở rộng Bước 1' : 'Thu gọn Bước 1'}
          >
            <ChevronDown size={18} className="caret-svg" />
          </button>
        </div>
      </div>

      {/* Body */}
      {isCollapsed ? (
        <CollapsedSummary onExpand={onToggleCollapse} hint="Đổi môn tự chọn">
          <div className="collapsed-pill-item pill-info">
            <Lock size={12} />
            <span className="pill-text">8 Môn bắt buộc GDPT 2018</span>
          </div>
          {isElectivesLocked ? (
            <div className="collapsed-pill-item pill-success">
              <ShieldCheck size={12} />
              <span className="pill-text">4 Môn tự chọn: <strong>{selectedElectives.join(', ')}</strong></span>
            </div>
          ) : (
            <div className="collapsed-pill-item pill-warning">
              <AlertCircle size={12} />
              <span className="pill-text">Đang chọn: <strong>{draftElectives.length}/{MAX_ELECTIVE_COUNT}</strong> môn</span>
            </div>
          )}
        </CollapsedSummary>
      ) : (
        <div className="step-content-body">
          {/* 1A. 8 Môn Bắt Buộc: Dải chip ngang tinh gọn */}
          <div className="compact-compulsory-container">
            <div className="compulsory-header-label">
              <Lock size={13} className="text-primary" />
              <span>8 Môn học bắt buộc:</span>
            </div>
            <div className="compact-chips-row">
              {COMPULSORY_SUBJECTS.map((sub, idx) => (
                <span key={sub.id} className="compact-chip" title="Môn bắt buộc cố định">
                  <span className="chip-index">{idx + 1}</span>
                  <span className="chip-name">{sub.name}</span>
                </span>
              ))}
            </div>
          </div>

          {/* 1B. Môn Tự Chọn */}
          {isElectivesLocked && !isEditingElectives ? (
            /* Đã khóa: Lưới 4 môn gọn gàng */
            <div className="confirmed-electives-wrapper">
              <div className="confirmed-grid-modern">
                {selectedElectives.map((eName, idx) => {
                  const info = ELECTIVE_SUBJECTS.find((e) => e.name === eName);
                  return (
                    <div key={eName} className="confirmed-card-compact">
                      <div className="confirmed-card-top">
                        <span className="tag-group">{info?.group || 'Tự chọn'}</span>
                        <span className="tag-order">Môn #{idx + 1}</span>
                      </div>
                      <div className="confirmed-card-title">
                        <CheckCircle2 size={16} className="text-success" />
                        <h4>{eName}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Đang chọn hoặc chỉnh sửa: Lưới 10 thẻ môn tự chọn */
            <div className="electives-selector-wrapper">
              <div className="electives-grid-modern">
                {ELECTIVE_SUBJECTS.map((elective) => {
                  const isSelected = draftElectives.includes(elective.name);
                  const isDisabled = !isSelected && draftElectives.length >= MAX_ELECTIVE_COUNT;

                  return (
                    <div
                      key={elective.id}
                      className={`elective-card-clean ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                      onClick={() => onToggleElective(elective.name)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          onToggleElective(elective.name);
                        }
                      }}
                    >
                      <div className="card-top-row">
                        <span className="tag-group">{elective.group}</span>
                        <div className={`check-dot ${isSelected ? 'active' : ''}`}>
                          {isSelected && <Check size={12} />}
                        </div>
                      </div>
                      <h4 className="elective-title">{elective.name}</h4>
                      <span className={`elective-action-label ${isSelected ? 'selected-text' : ''}`}>
                        {isSelected ? '✓ Đã chọn' : isDisabled ? 'Đã đủ 4' : '+ Chọn môn'}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Action save bar */}
              <div className="electives-save-strip">
                <span className={draftElectives.length === MAX_ELECTIVE_COUNT ? 'text-success' : 'text-warning'}>
                  {draftElectives.length === MAX_ELECTIVE_COUNT ? (
                    <><CheckCircle2 size={15} /> Đã chọn đủ 4 môn. Hãy bấm "Lưu 4 Môn Tự Chọn" để khóa lại.</>
                  ) : (
                    <><AlertCircle size={15} /> Cần chọn thêm {MAX_ELECTIVE_COUNT - draftElectives.length} môn nữa.</>
                  )}
                </span>
                <div className="strip-buttons">
                  {isElectivesLocked && (
                    <button
                      type="button"
                      className="btn btn-ghost btn-sm"
                      onClick={onCancelEditElectives}
                      disabled={savingElectives}
                    >
                      <X size={14} /> Hủy
                    </button>
                  )}
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={onSaveElectivesToDb}
                    disabled={draftElectives.length !== MAX_ELECTIVE_COUNT || savingElectives}
                  >
                    {savingElectives ? <div className="spinner-small" /> : <Save size={14} />}
                    <span>{savingElectives ? 'Đang lưu...' : 'Lưu 4 Môn Tự Chọn'}</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
