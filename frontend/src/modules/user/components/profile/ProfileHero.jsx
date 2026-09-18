
import React from 'react';
import { Save, MapPin } from 'lucide-react';

export default function ProfileHero({
  user,
  summaryGpa,
  thptExamSummary,
  allActiveSubjectsCount,
  isElectivesLocked,
  priorityBonus,
  provinceCity,
  region,
  saving,
  onSave,
}) {
  const locationLabel = provinceCity 
    ? `${provinceCity}${region ? ` (${region})` : ''}`
    : 'Chưa chọn vị trí THPT';

  return (
    <div className="profile-hero-card card-surface">
      <div className="profile-hero-left">
        <div className="profile-hero-avatar">
          {(user?.fullName || user?.email || 'U').charAt(0).toUpperCase()}
        </div>
        <div className="profile-hero-details">
          <div className="profile-hero-name-row">
            <h1 className="profile-hero-name">{user?.fullName || 'Thí sinh'}</h1>
            <span className={`pill ${user?.role === 'ROLE_ADMIN' ? 'pill-danger' : 'pill-primary'}`}>
              {user?.role === 'ROLE_ADMIN' ? 'Quản trị viên' : 'Thí sinh THPT'}
            </span>
            <span className={`pill ${provinceCity ? 'pill-accent' : 'pill-warning'}`} title="Tỉnh/Thành phố & Vùng miền">
              <MapPin size={11} style={{ marginRight: 3, verticalAlign: 'middle' }} />
              {locationLabel}
            </span>
          </div>
          <p className="profile-hero-email">{user?.email}</p>
        </div>
      </div>

      {/* KPI Ribbon: High-level metrics */}
      <div className="profile-hero-kpis">
        <div className="hero-kpi-item">
          <span className="hero-kpi-label">GPA 3 Năm</span>
          <span className="hero-kpi-val highlight-primary">{summaryGpa.overall || '—'}</span>
        </div>
        <div className="hero-kpi-item">
          <span className="hero-kpi-label">ĐTB Thi TN</span>
          <span className="hero-kpi-val highlight-accent">{thptExamSummary.average || '—'}</span>
        </div>
        <div className="hero-kpi-item">
          <span className="hero-kpi-label">Môn Học Bạ</span>
          <span className="hero-kpi-val">
            {allActiveSubjectsCount}
            <small className="hero-kpi-sub">/12</small>
          </span>
        </div>
        {priorityBonus > 0 && (
          <div className="hero-kpi-item">
            <span className="hero-kpi-label">Điểm Ưu Tiên</span>
            <span className="hero-kpi-val highlight-success">+{priorityBonus}đ</span>
          </div>
        )}
      </div>

      {/* Hero Action */}
      <div className="profile-hero-actions">
        <button
          type="button"
          className="btn btn-primary profile-save-btn"
          onClick={onSave}
          disabled={saving || !isElectivesLocked}
          title={!isElectivesLocked ? 'Vui lòng lưu 4 môn tự chọn ở Bước 1 trước' : 'Lưu toàn bộ hồ sơ vào CSDL'}
        >
          {saving ? <div className="spinner-small" /> : <Save size={16} />}
          <span>{saving ? 'Đang lưu...' : 'Lưu Hồ Sơ'}</span>
        </button>
      </div>
    </div>
  );
}

