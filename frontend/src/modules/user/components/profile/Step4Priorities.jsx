import React from 'react';
import { ChevronDown, Award, MapPin, Globe, Save, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import CollapsedSummary from './CollapsedSummary';
import {
  VIETNAM_REGIONS,
  PROVINCES_BY_REGION,
  ALL_PROVINCES,
  PROVINCES_MERGED_INFO,
  getRegionOfProvince,
} from '../../../../shared/constants/vietnamGeography';

export default function Step4Priorities({
  isCollapsed,
  onToggleCollapse,
  provinceCity,
  setProvinceCity,
  region,
  setRegion,
  priorityArea,
  setPriorityArea,
  priorityGroup,
  setPriorityGroup,
  ielts,
  setIelts,
  priorityBonus,
  saving,
  onSave,
  syncStatus,
}) {
  // Handler khi thí sinh thay đổi Tỉnh / Thành phố -> Tự động nhận diện Vùng miền
  const handleProvinceChange = (e) => {
    const selectedProv = e.target.value;
    setProvinceCity(selectedProv);
    if (selectedProv) {
      const autoRegion = getRegionOfProvince(selectedProv);
      if (autoRegion) {
        setRegion(autoRegion);
      }
    }
  };

  // Handler khi thí sinh thay đổi Vùng miền
  const handleRegionChange = (e) => {
    const selectedReg = e.target.value;
    setRegion(selectedReg);
    // Nếu tỉnh hiện tại không thuộc vùng miền mới chọn, reset tỉnh
    if (selectedReg && provinceCity) {
      const currentProvRegion = getRegionOfProvince(provinceCity);
      if (currentProvRegion && currentProvRegion !== selectedReg) {
        setProvinceCity('');
      }
    }
  };

  // Danh sách các tỉnh theo vùng miền đang chọn (nếu có chọn vùng)
  const availableProvinces = region && PROVINCES_BY_REGION[region]
    ? PROVINCES_BY_REGION[region]
    : ALL_PROVINCES;

  return (
    <div className={`profile-section step-theme-amber card-surface ${isCollapsed ? 'is-collapsed' : ''}`}>
      {/* Header */}
      <div className="profile-section-header">
        <div className="profile-section-title-wrap">
          <div className="profile-section-badge">Bước 4</div>
          <div>
            <h2 className="profile-section-title">Khu Vực Địa Lý, Ưu Tiên & Chứng Chỉ</h2>
            <p className="profile-section-subtitle">
              Xác định vị trí thí sinh (Tỉnh & Vùng miền), khu vực ưu tiên cộng điểm và chứng chỉ quốc tế.
            </p>
          </div>
        </div>

        <div className="profile-section-header-actions">
          <div className="profile-counter-pill complete">
            <MapPin size={13} />
            <span>{provinceCity ? `${provinceCity} (${region || 'Vùng'})` : 'Chưa chọn vị trí'}</span>
          </div>

          <div className="profile-counter-pill complete">
            <Award size={13} />
            <span>Ưu tiên: <strong>{priorityArea}</strong>{priorityBonus > 0 ? ` (+${priorityBonus}đ)` : ''}</span>
          </div>

          {/* Nút mũ thu gọn / mở rộng */}
          <button
            type="button"
            className={`step-caret-btn ${isCollapsed ? 'is-collapsed' : 'is-expanded'}`}
            onClick={onToggleCollapse}
            aria-label={isCollapsed ? 'Mở rộng Bước 4' : 'Thu gọn Bước 4'}
            title={isCollapsed ? 'Mở rộng Bước 4' : 'Thu gọn Bước 4'}
          >
            <ChevronDown size={18} className="caret-svg" />
          </button>
        </div>
      </div>

      {/* Body */}
      {isCollapsed ? (
        <CollapsedSummary onExpand={onToggleCollapse} hint="Địa lý & Cài đặt ưu tiên">
          <div className="collapsed-pill-item pill-accent">
            <span className="pill-text">
              📍 Vị trí: <strong>{provinceCity || 'Chưa chọn'}</strong> {region ? `(${region})` : ''}
            </span>
          </div>
          <div className="collapsed-pill-item pill-info">
            <span className="pill-text">Khu vực UT: <strong>{priorityArea}</strong></span>
          </div>
          <div className="collapsed-pill-item pill-info">
            <span className="pill-text">Đối tượng: <strong>{priorityGroup === 'NONE' ? 'Không' : priorityGroup}</strong></span>
          </div>
          <div className="collapsed-pill-item pill-accent">
            <span className="pill-text">Điểm cộng: <strong>+{priorityBonus}đ</strong></span>
          </div>
          <div className={`collapsed-pill-item ${ielts ? 'pill-success' : 'pill-info'}`}>
            <span className="pill-text">IELTS: <strong>{ielts ? `${ielts}` : 'Chưa nhập'}</strong></span>
          </div>
        </CollapsedSummary>
      ) : (
        <>
          <div className="priorities-grid-modern">
            {/* Card 1: Vùng miền / Khu vực lớn */}
            <div className="priority-card">
              <label className="priority-label">
                <Globe size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} />
                Vùng miền / Khu vực lớn
              </label>
              <select
                className="form-select"
                value={region || ''}
                onChange={handleRegionChange}
              >
                <option value="">-- Toàn quốc (Chọn vùng miền) --</option>
                {VIETNAM_REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="priority-helper">Hỗ trợ gợi ý các trường ĐH gần nơi sinh sống/học tập</span>
            </div>

            {/* Card 2: Tỉnh / Thành phố */}
            <div className="priority-card">
              <label className="priority-label">
                <MapPin size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} />
                Tỉnh / Thành phố học THPT
              </label>
              <select
                className="form-select"
                value={provinceCity || ''}
                onChange={handleProvinceChange}
              >
                <option value="">-- Chọn Tỉnh / Thành phố (34 tỉnh thành) --</option>
                {availableProvinces.map((p) => (
                  <option key={p} value={p}>
                    {p} {PROVINCES_MERGED_INFO[p] ? `(${PROVINCES_MERGED_INFO[p]})` : ''}
                  </option>
                ))}
              </select>
              <span className="priority-helper">
                {provinceCity && region 
                  ? `Thuộc ${region} • Chuẩn hóa theo NQ 202/2025/QH15` 
                  : 'Cập nhật theo 34 đơn vị hành chính cấp tỉnh mới'}
              </span>
            </div>

            {/* Card 3: Khu vực ưu tiên điểm thi */}
            <div className="priority-card">
              <label className="priority-label">
                <Award size={14} style={{ display: 'inline', marginRight: 4, verticalAlign: 'text-bottom' }} />
                Khu vực ưu tiên (Bộ GD&ĐT)
              </label>
              <select
                className="form-select"
                value={priorityArea}
                onChange={(e) => setPriorityArea(e.target.value)}
              >
                <option value="KV3">Khu vực 3 (KV3) — (+0.00 đ)</option>
                <option value="KV2">Khu vực 2 (KV2) — (+0.25 đ)</option>
                <option value="KV2-NT">Khu vực 2 Nông thôn (KV2-NT) — (+0.50 đ)</option>
                <option value="KV1">Khu vực 1 (KV1) — (+0.75 đ)</option>
              </select>
              <span className="priority-helper">Chính sách cộng điểm tuyển sinh theo trường THPT</span>
            </div>

            {/* Card 4: Đối tượng ưu tiên */}
            <div className="priority-card">
              <label className="priority-label">Đối tượng chính sách</label>
              <select
                className="form-select"
                value={priorityGroup}
                onChange={(e) => setPriorityGroup(e.target.value)}
              >
                <option value="NONE">Không thuộc diện ưu tiên (+0.00 đ)</option>
                <option value="DT01">Đối tượng 01 (Dân tộc thiểu số...) — (+2.00 đ)</option>
                <option value="DT06">Đối tượng 06 (Con thương binh...) — (+1.00 đ)</option>
              </select>
              <span className="priority-helper">Cần nộp giấy tờ xác nhận khi nhập học</span>
            </div>

            {/* Card 5: Chứng chỉ IELTS */}
            <div className="priority-card">
              <label className="priority-label">Chứng chỉ Tiếng Anh (IELTS)</label>
              <select
                className="form-select"
                value={ielts}
                onChange={(e) => setIelts(e.target.value)}
              >
                <option value="">Chưa có chứng chỉ</option>
                <option value="5.5">IELTS 5.5</option>
                <option value="6.0">IELTS 6.0</option>
                <option value="6.5">IELTS 6.5</option>
                <option value="7.0">IELTS 7.0</option>
                <option value="7.5">IELTS 7.5</option>
                <option value="8.0">IELTS 8.0+</option>
              </select>
              <span className="priority-helper">Lưu hồ sơ xét tuyển kết hợp / điểm thưởng theo đề án từng trường</span>
            </div>
          </div>

          {/* Banner hành động & Lưu vị trí hồ sơ trực tiếp */}
          <div style={{
            marginTop: '1.25rem',
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            background: 'var(--color-surface-sunken, rgba(255,255,255,0.03))',
            border: '1px solid var(--color-border, rgba(255,255,255,0.1))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={16} style={{ color: 'var(--color-primary, #6366f1)' }} />
                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                  Vị trí thí sinh: {provinceCity ? <strong style={{ color: 'var(--color-primary-light, #818cf8)' }}>{provinceCity}</strong> : <span style={{ color: 'var(--color-text-muted)' }}>Chưa chọn</span>}
                  {region && <span> • Thuộc <strong>{region}</strong></span>}
                </span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary)', margin: 0 }}>
                Hệ thống Three-Way Decision sẽ tự động nhận diện và so khớp nguyện vọng với các trường đại học cùng tỉnh/thành hoặc cùng vùng miền.
              </p>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {syncStatus === 'saved' && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: '0.8rem', color: '#10b981' }}>
                  <CheckCircle2 size={14} /> Đã đồng bộ CSDL
                </span>
              )}
              {onSave && (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onSave}
                  disabled={saving}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  {saving ? <div className="spinner-small" /> : <Save size={15} />}
                  <span>{saving ? 'Đang lưu CSDL...' : 'Lưu Vị Trí & Cài Đặt Hồ Sơ'}</span>
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

