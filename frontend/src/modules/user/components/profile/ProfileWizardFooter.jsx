import React from 'react';
import { ArrowLeft, ArrowRight, Save, CheckCircle2 } from 'lucide-react';

export default function ProfileWizardFooter({
  activeTab,
  setActiveTab,
  isElectivesLocked,
  saving,
  onSave,
}) {
  const tabSequence = ['hocba', 'thpt', 'priority', 'combos'];
  const currentIndex = tabSequence.indexOf(activeTab);
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === tabSequence.length - 1;

  const handlePrev = () => {
    if (currentIndex > 0) setActiveTab(tabSequence[currentIndex - 1]);
  };

  const handleNext = () => {
    if (currentIndex < tabSequence.length - 1) setActiveTab(tabSequence[currentIndex + 1]);
  };

  const tabLabels = {
    hocba: 'Học Bạ THPT',
    thpt: 'Thi Tốt Nghiệp THPT',
    priority: 'Ưu Tiên & Chứng Chỉ',
    combos: 'Bảng Điểm Tổ Hợp',
  };

  return (
    <div className="profile-wizard-nav-footer card-surface">
      <div className="wizard-footer-left">
        {!isFirst ? (
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={handlePrev}
          >
            <ArrowLeft size={14} />
            <span>Quay lại ({tabLabels[tabSequence[currentIndex - 1]]})</span>
          </button>
        ) : (
          <div className="wizard-step-indicator">
            Bước <strong>1/4</strong>: Thiết lập môn học & nhập điểm học bạ
          </div>
        )}
      </div>

      <div className="wizard-footer-right">
        {!isLast ? (
          <>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={onSave}
              disabled={saving || !isElectivesLocked}
              title="Lưu hồ sơ vào CSDL"
            >
              {saving ? <div className="spinner-small" /> : <Save size={14} />}
              <span>{saving ? 'Đang lưu...' : 'Lưu Hồ Sơ'}</span>
            </button>

            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={handleNext}
              disabled={saving}
            >
              <span>Tiếp theo: {tabLabels[tabSequence[currentIndex + 1]]}</span>
              <ArrowRight size={14} />
            </button>
          </>
        ) : (
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={onSave}
            disabled={saving || !isElectivesLocked}
          >
            {saving ? <div className="spinner-small" /> : <CheckCircle2 size={14} />}
            <span>{saving ? 'Đang lưu hồ sơ...' : 'Hoàn Tất & Lưu Hồ Sơ'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
