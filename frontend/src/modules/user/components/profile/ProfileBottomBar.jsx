import React from 'react';
import { ShieldCheck, Save, CheckCircle2 } from 'lucide-react';
import { MAX_GRADUATION_ELECTIVES } from '../../data/curriculumData';

export default function ProfileBottomBar({
  isElectivesLocked,
  thptElectives,
  priorityBonus,
  saving,
  onSave,
}) {
  return (
    <div className="profile-bottom-save-bar card-surface">
      <div className="save-bar-info">
        <ShieldCheck size={20} className="text-primary" />
        <div className="save-bar-info-text">
          <strong>Trạng thái hồ sơ:</strong>
          <span>
            {isElectivesLocked
              ? `Đã cấu hình 12 môn học bạ, 4 môn thi tốt nghiệp (${thptElectives.length === MAX_GRADUATION_ELECTIVES ? 'Toán, Văn, ' + thptElectives.join(', ') : 'chưa đủ 2 môn tự chọn'}), ưu tiên +${priorityBonus}đ.`
              : 'Hãy lưu 4 môn tự chọn ở Bước 1 trước khi lưu hồ sơ.'}
          </span>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary profile-save-btn-large"
        onClick={onSave}
        disabled={saving || !isElectivesLocked}
        title={!isElectivesLocked ? 'Vui lòng lưu môn tự chọn ở Bước 1 trước' : 'Lưu toàn bộ hồ sơ'}
      >
        {saving ? <div className="spinner-small" /> : <Save size={18} />}
        <span>{saving ? 'Đang lưu...' : 'Lưu Toàn Bộ Hồ Sơ'}</span>
      </button>
    </div>
  );
}
