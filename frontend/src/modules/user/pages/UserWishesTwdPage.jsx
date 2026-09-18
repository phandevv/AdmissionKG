import {
  AlertTriangle,
  Award,
  BookOpen,
  Building2,
  CheckCircle2,
  Coins,
  GraduationCap,
  Info,
  ListChecks,
  Loader2,
  MapPin,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../shared/auth/AuthContext';
import { VIETNAM_REGIONS } from '../../shared/constants/vietnamGeography';
import useApiData from '../../shared/hooks/useApiData';
import {
  academicProfilesApi,

  admissionMethodsApi,
  admissionSchemesApi,
  admissionTracksApi,
  benchmarkQuotasApi,
  institutionsApi,
  majorsApi,
  subjectCombinationsApi,
  trackMethodCombinationsApi,
  twdEvaluationLogsApi,
  wishesApi,
} from '../../shared/services/api';

// Tham số TWD (mặc định theo đề cương; BE chưa có endpoint cấu hình)
const TWD_ALPHA = 0.75; // ΔS >= +0.75 → POS
const TWD_BETA = -1.0;  // ΔS < -1.0 → NEG

export default function UserWishesTwdPage() {
  const { user } = useAuth();
  const userId = user?.id;

  const { data, loading, error, reload } = useApiData({
    wishes: () => wishesApi.list({ userId: userId ?? '' }),
    profiles: () => academicProfilesApi.list({ userId: userId ?? '' }),
    tmc: trackMethodCombinationsApi.list,
    tracks: admissionTracksApi.list,
    schemes: admissionSchemesApi.list,
    institutions: institutionsApi.list,
    majors: majorsApi.list,
    methods: admissionMethodsApi.list,
    combos: subjectCombinationsApi.list,
    benchmarks: () => benchmarkQuotasApi.list(),
  });

  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState(null);

  // ── Hồ sơ năng lực (academic profile) ──
  const myProfile = useMemo(
    () => (Array.isArray(data.profiles) ? data.profiles.find((p) => p.userId === userId) : null),
    [data.profiles, userId]
  );

  const [profileForm, setProfileForm] = useState({
    thptToan: '', thptLi: '', thptAnh: '',
    ielts: '', priorityArea: 'KV3', priorityGroup: 'NONE',
  });

  // Khôi phục từ myProfile hoặc bản nháp LocalStorage
  useEffect(() => {
    if (!userId) return;
    const draftKey = `admission_wishes_profile_draft_${userId}`;
    let localDraft = null;
    try {
      const localDraftStr = localStorage.getItem(draftKey);
      if (localDraftStr) localDraft = JSON.parse(localDraftStr);
    } catch (e) {
      console.warn('Cannot parse wishes profile draft:', e);
    }

    if (myProfile) {
      const thpt = myProfile.thptScores || {};
      const certs = myProfile.internationalCertificates || {};
      setProfileForm({
        thptToan: localDraft?.thptToan !== undefined && localDraft.thptToan !== '' ? localDraft.thptToan : (thpt['Toán'] ?? thpt['Toan'] ?? ''),
        thptLi: localDraft?.thptLi !== undefined && localDraft.thptLi !== '' ? localDraft.thptLi : (thpt['Vật lí'] ?? thpt['Li'] ?? ''),
        thptAnh: localDraft?.thptAnh !== undefined && localDraft.thptAnh !== '' ? localDraft.thptAnh : (thpt['Tiếng Anh'] ?? thpt['Anh'] ?? ''),
        ielts: localDraft?.ielts !== undefined && localDraft.ielts !== '' ? localDraft.ielts : (certs['IELTS'] ?? certs['Ielts'] ?? ''),
        priorityArea: localDraft?.priorityArea || myProfile.priorityArea || 'KV3',
        priorityGroup: localDraft?.priorityGroup || myProfile.priorityGroup || 'NONE',
      });
    } else if (localDraft) {
      setProfileForm(localDraft);
    }
  }, [myProfile?.id, userId]);

  const setProfileField = (k) => (e) => {
    const next = { ...profileForm, [k]: e.target.value };
    setProfileForm(next);
    if (userId) {
      try {
        localStorage.setItem(`admission_wishes_profile_draft_${userId}`, JSON.stringify(next));
      } catch (err) {
        console.warn('Error saving wishes profile draft:', err);
      }
    }
  };

  const rawScore = useMemo(() => {
    return (parseFloat(profileForm.thptToan) || 0) + (parseFloat(profileForm.thptLi) || 0) + (parseFloat(profileForm.thptAnh) || 0);
  }, [profileForm]);

  const rawBonus = useMemo(() => {
    let b = 0;
    if (profileForm.priorityArea === 'KV1') b += 0.75;
    else if (profileForm.priorityArea === 'KV2-NT') b += 0.5;
    else if (profileForm.priorityArea === 'KV2') b += 0.25;
    if (profileForm.priorityGroup === 'DT01') b += 2.0;
    else if (profileForm.priorityGroup === 'DT06') b += 1.0;
    return b;
  }, [profileForm]);

  // Công thức giảm trừ điểm ưu tiên của Bộ GD&ĐT khi tổng điểm >= 22.5
  const effectiveBonus = rawScore >= 22.5 ? (rawBonus * (30 - rawScore)) / 7.5 : rawBonus;
  const totalScore = Math.min(30, rawScore + Math.max(0, effectiveBonus));

  const handleSaveProfile = async () => {
    setSavingProfile(true);
    setProfileMsg(null);
    const payload = {
      userId,
      thptScores: {
        'Toán': parseFloat(profileForm.thptToan) || 0,
        'Vật lí': parseFloat(profileForm.thptLi) || 0,
        'Tiếng Anh': parseFloat(profileForm.thptAnh) || 0,
      },
      internationalCertificates: profileForm.ielts ? { 'IELTS': profileForm.ielts } : {},
      priorityArea: profileForm.priorityArea,
      priorityGroup: profileForm.priorityGroup,
    };
    try {
      if (myProfile) await academicProfilesApi.update(myProfile.id, payload);
      else await academicProfilesApi.create(payload);
      setProfileMsg({ type: 'success', text: 'Đã lưu hồ sơ năng lực thành công.' });
      reload();
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.userMessage || 'Lưu hồ sơ thất bại.' });
    } finally {
      setSavingProfile(false);
    }
  };

  // ── Danh sách nguyện vọng kèm chi tiết TMC, Track, Benchmark ──
  const wishRows = useMemo(() => {
    const tmcById = Object.fromEntries((Array.isArray(data.tmc) ? data.tmc : []).map((t) => [t.id, t]));
    const trackById = Object.fromEntries((Array.isArray(data.tracks) ? data.tracks : []).map((t) => [t.trackId, t]));
    const schemeById = Object.fromEntries((Array.isArray(data.schemes) ? data.schemes : []).map((s) => [s.schemeId, s]));
    const instById = Object.fromEntries((Array.isArray(data.institutions) ? data.institutions : []).map((i) => [i.institutionId, i]));
    const majorByCode = Object.fromEntries((Array.isArray(data.majors) ? data.majors : []).map((m) => [m.majorCode, m]));
    const methodById = Object.fromEntries((Array.isArray(data.methods) ? data.methods : []).map((m) => [m.methodId, m]));
    const comboByCode = Object.fromEntries((Array.isArray(data.combos) ? data.combos : []).map((c) => [c.combinationCode, c]));

    const benchmarks = Array.isArray(data.benchmarks) ? data.benchmarks : [];
    const benchByTmc = {};
    benchmarks.forEach((b) => { (benchByTmc[b.tmcId] ||= []).push(b); });

    const studentProvince = myProfile?.provinceCity || '';
    const studentRegion = myProfile?.region || '';

    return (Array.isArray(data.wishes) ? data.wishes : [])
      .slice()
      .sort((a, b) => a.wishOrder - b.wishOrder)
      .map((w) => {
        const t = tmcById[w.tmcId];
        const track = t ? trackById[t.trackId] : null;
        const scheme = track ? schemeById[track.schemeId] : null;
        const inst = scheme ? instById[scheme.institutionId] : null;
        const major = track ? majorByCode[track.majorCode] : null;
        const method = t ? methodById[t.methodId] : null;
        const combo = t ? comboByCode[t.combinationCode] : null;
        const bench = (benchByTmc[w.tmcId] || []).sort((a, b) => b.academicYear - a.academicYear)[0];

        const instRegion = inst?.region || '';
        const instProvince = inst?.provinceCity || '';

        let locationMatch = null;
        if (studentProvince && instProvince && studentProvince.trim().toLowerCase() === instProvince.trim().toLowerCase()) {
          locationMatch = { type: 'same-province', label: '🎯 Cùng Tỉnh/TP' };
        } else if (studentRegion && instRegion && studentRegion === instRegion) {
          locationMatch = { type: 'same-region', label: `✨ Cùng ${instRegion}` };
        } else if (studentRegion && instRegion) {
          locationMatch = { type: 'diff-region', label: `✈️ ${instRegion}` };
        }

        return {
          ...w,
          tmcDetail: t,
          trackName: track?.trackName || track?.trackId || '—',
          majorCode: track?.majorCode || '',
          majorName: major?.majorName || track?.majorCode || '—',
          tuitionPolicy: track?.tuitionPolicy,
          institutionName: inst?.institutionName || scheme?.institutionId || '—',
          institutionRegion: instRegion,
          institutionProvince: instProvince,
          locationMatch,
          methodName: method?.methodName || t?.methodId || '—',
          combinationCode: t?.combinationCode || '—',
          comboName: combo?.combinationName || '',
          benchmark: bench || null,
        };
      });
  }, [data, myProfile]);

  // ── Thêm nguyện vọng ──
  const [showAdd, setShowAdd] = useState(false);
  const [adding, setAdding] = useState(false);
  const [addError, setAddError] = useState(null);
  const [addModalRegion, setAddModalRegion] = useState('');
  const [newWish, setNewWish] = useState({ institutionId: '', trackId: '', tmcId: '' });

  const institutionOptions = Array.isArray(data.institutions) ? data.institutions : [];
  const filteredInstitutionOptions = useMemo(() => {
    if (!addModalRegion) return institutionOptions;
    return institutionOptions.filter((i) => i.region === addModalRegion);
  }, [institutionOptions, addModalRegion]);
  const schemesByInst = useMemo(() => {
    const map = {};
    (Array.isArray(data.schemes) ? data.schemes : []).forEach((s) => {
      (map[s.institutionId] ||= []).push(s);
    });
    return map;
  }, [data.schemes]);

  const trackOptions = useMemo(() => {
    if (!newWish.institutionId) return [];
    const schemeIds = new Set((schemesByInst[newWish.institutionId] || []).map((s) => s.schemeId));
    return (Array.isArray(data.tracks) ? data.tracks : []).filter((t) => schemeIds.has(t.schemeId));
  }, [newWish.institutionId, schemesByInst, data.tracks]);

  const tmcOptions = useMemo(() => {
    if (!newWish.trackId) return [];
    return (Array.isArray(data.tmc) ? data.tmc : []).filter((t) => t.trackId === newWish.trackId);
  }, [newWish.trackId, data.tmc]);

  const handleAddWish = async (e) => {
    e.preventDefault();
    setAddError(null);
    if (!newWish.tmcId) { setAddError('Hãy chọn đợt xét tuyển (phương thức + tổ hợp).'); return; }
    const maxOrder = (Array.isArray(data.wishes) ? data.wishes : []).reduce((mx, w) => Math.max(mx, w.wishOrder || 0), 0);
    setAdding(true);
    try {
      await wishesApi.create({
        userId,
        profileId: myProfile?.id ?? null,
        wishOrder: maxOrder + 1,
        tmcId: Number(newWish.tmcId),
      });
      setShowAdd(false);
      setNewWish({ institutionId: '', trackId: '', tmcId: '' });
      reload();
    } catch (err) {
      setAddError(err.userMessage || 'Thêm nguyện vọng thất bại.');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteWish = async (wishId) => {
    if (!window.confirm('Xóa nguyện vọng này? Thứ tự các nguyện vọng sau sẽ được cập nhật.')) return;
    try {
      await wishesApi.remove(wishId);
      // Chuẩn hóa lại thứ tự
      const remaining = wishRows.filter((w) => w.id !== wishId).sort((a, b) => a.wishOrder - b.wishOrder);
      await Promise.all(remaining.map((w, idx) => {
        if (w.wishOrder !== idx + 1) return wishesApi.update(w.id, { ...w, wishOrder: idx + 1 });
        return Promise.resolve();
      }));
      reload();
    } catch (err) {
      alert(err.userMessage || 'Xóa thất bại.');
    }
  };

  // ── Phân tích TWD (tính phía client, lưu log thật lên BE) ──
  const [evaluating, setEvaluating] = useState(false);
  const [results, setResults] = useState(null);
  const [evalError, setEvalError] = useState(null);

  const handleEvaluate = async () => {
    setEvalError(null);
    const missing = wishRows.some((w) => !w.benchmark);
    if (wishRows.length === 0) { setEvalError('Hãy thêm ít nhất một nguyện vọng.'); return; }
    if (missing) {
      setEvalError('Một số nguyện vọng chưa có điểm chuẩn tham chiếu (chưa nhập Benchmark Quota). Vùng rủi ro sẽ chỉ tính cho các nguyện vọng có dữ liệu.');
    }
    setEvaluating(true);
    try {
      const evaluated = [];
      for (const w of wishRows) {
        const cutoff = w.benchmark ? Number(w.benchmark.benchmarkScore) : null;
        const delta = cutoff != null ? totalScore - cutoff : null;
        let zone, zoneName, badgeClass, advice;
        if (delta == null) {
          zone = null; zoneName = 'Chưa có dữ liệu'; badgeClass = '';
          advice = 'Chưa có điểm chuẩn tham chiếu cho đợt xét tuyển này.';
        } else if (delta >= TWD_ALPHA) {
          zone = 'POS'; zoneName = 'Vùng An toàn (POS)'; badgeClass = 'badge-pos';
          advice = 'Điểm của bạn cao hơn điểm chuẩn tham chiếu ≥ +0.75 điểm. Xác suất trúng tuyển cao.';
        } else if (delta < TWD_BETA) {
          zone = 'NEG'; zoneName = 'Vùng Rủi ro cao (NEG)'; badgeClass = 'badge-neg';
          advice = 'Điểm của bạn thấp hơn điểm chuẩn tham chiếu quá 1.0 điểm. Cân nhắc đổi nguyện vọng hoặc hạ độ ưu tiên.';
        } else {
          zone = 'BND'; zoneName = 'Vùng Cân nhắc (BND)'; badgeClass = 'badge-bnd';
          advice = 'Điểm của bạn sát với điểm chuẩn tham chiếu. Nên xếp ở vị trí giữa danh sách.';
        }
        evaluated.push({ ...w, delta, zone, zoneName, badgeClass, advice });
      }

      // Lưu log TWD thật (POST là upsert theo wishId)
      const withData = evaluated.filter((e) => e.delta != null);
      await Promise.all(withData.map((e) => twdEvaluationLogsApi.upsert({
        wishId: e.id,
        finalAdmissionScore: Number(totalScore.toFixed(2)),
        twdRiskZone: e.zone,
        safetyMargin: Number(e.delta.toFixed(2)),
        eligibilityStatus: e.delta >= 0 ? 'QUALIFIED' : 'DISQUALIFIED',
        recommendationStrategy: e.advice,
      })));

      const posCount = evaluated.filter((e) => e.zone === 'POS').length;
      const bndCount = evaluated.filter((e) => e.zone === 'BND').length;
      const negCount = evaluated.filter((e) => e.zone === 'NEG').length;

      let strategicAdvice;
      if (posCount === 0) {
        strategicAdvice = 'Cảnh báo: danh sách chưa có nguyện vọng vùng An toàn (POS). Bổ sung 1–2 nguyện vọng có điểm chuẩn thấp hơn để chốt chặn.';
      } else if (negCount > posCount) {
        strategicAdvice = 'Bạn đang thử sức nhiều nguyện vọng vùng NEG. Đảm bảo các nguyện vọng vùng POS được xếp sau để làm chốt chặn an toàn.';
      } else {
        strategicAdvice = 'Phân bố hợp lý theo mô hình Kim tự tháp: Thử sức (NV1) – Vừa sức (NV2) – Chốt chặn an toàn (NV cuối).';
      }

      setResults({ evaluated, posCount, bndCount, negCount, strategicAdvice });
    } catch (err) {
      setEvalError(err.userMessage || 'Phân tích TWD thất bại khi lưu kết quả.');
    } finally {
      setEvaluating(false);
    }
  };

  if (loading) {
    return <div className="page"><div className="state-block"><div className="spinner" /><h4>Đang tải nguyện vọng...</h4></div></div>;
  }
  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>;

  const displayWishes = results ? results.evaluated : wishRows;

  return (
    <div className="page">
      <div className="page-header">
        <div className="page-title">
          <span className="page-title-icon"><Award size={22} /></span>
          <div>
            <h1>Nguyện vọng & Đánh giá TWD</h1>
            <p className="page-subtitle">
              Quyết định ba nhánh: ΔS = Điểm của bạn − Điểm chuẩn tham chiếu.
              ΔS ≥ +{TWD_ALPHA} → <strong>An toàn (POS)</strong>; ΔS &lt; {TWD_BETA} → <strong>Rủi ro (NEG)</strong>; còn lại → <strong>Cân nhắc (BND)</strong>.
            </p>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost" onClick={reload}><RefreshCw size={15} /> Làm mới</button>
          <button className="btn btn-primary" onClick={() => setShowAdd(true)}><Plus size={16} /> Thêm nguyện vọng</button>
        </div>
      </div>

      <div className="wishes-layout">
        {/* ── Cột trái: Hồ sơ năng lực ── */}
        <div className="profile-card">
          <div className="card-header-with-icon">
            <GraduationCap size={20} />
            <h2>Hồ sơ Năng lực</h2>
          </div>

          {profileMsg && (
            <div className={`alert ${profileMsg.type === 'success' ? 'alert-success' : 'alert-error'}`} style={{ marginBottom: 0 }}>
              {profileMsg.text}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <label className="section-label" style={{ marginBottom: 8 }}>Điểm thi THPT (thang 10)</label>
              <div className="form-row-3">
                <div className="form-group">
                  <label>Toán</label>
                  <input type="number" step="0.05" min="0" max="10" value={profileForm.thptToan} onChange={setProfileField('thptToan')} />
                </div>
                <div className="form-group">
                  <label>Vật lí</label>
                  <input type="number" step="0.05" min="0" max="10" value={profileForm.thptLi} onChange={setProfileField('thptLi')} />
                </div>
                <div className="form-group">
                  <label>Tiếng Anh</label>
                  <input type="number" step="0.05" min="0" max="10" value={profileForm.thptAnh} onChange={setProfileField('thptAnh')} />
                </div>
              </div>
              <div className="raw-sum">Tổng 3 môn (thang 30): <strong>{rawScore.toFixed(2)}</strong></div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>IELTS (quy đổi)</label>
                <select value={profileForm.ielts} onChange={setProfileField('ielts')}>
                  <option value="">Chưa có</option>
                  <option value="6.0">6.0 → môn Anh 9.0</option>
                  <option value="6.5">6.5 → môn Anh 9.5</option>
                  <option value="7.0">7.0+ → môn Anh 10.0</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Khu vực ưu tiên</label>
                <select value={profileForm.priorityArea} onChange={setProfileField('priorityArea')}>
                  <option value="KV3">KV3 (0 điểm)</option>
                  <option value="KV2">KV2 (+0.25)</option>
                  <option value="KV2-NT">KV2-NT (+0.5)</option>
                  <option value="KV1">KV1 (+0.75)</option>
                </select>
              </div>
              <div className="form-group">
                <label>Đối tượng ưu tiên</label>
                <select value={profileForm.priorityGroup} onChange={setProfileField('priorityGroup')}>
                  <option value="NONE">Không (0 điểm)</option>
                  <option value="DT01">ĐT 01 (+2.0)</option>
                  <option value="DT06">ĐT 06 (+1.0)</option>
                </select>
              </div>
            </div>

            <div className="priority-calc-note">
              <Info size={14} style={{ flexShrink: 0, marginTop: 2 }} />
              <span>Điểm ưu tiên thực nhận (giảm trừ theo Bộ GD&ĐT khi tổng ≥ 22.5): <strong>+{effectiveBonus.toFixed(2)}</strong></span>
            </div>

            <div className="total-score-card">
              <div>
                <div className="total-score-label">Điểm xét tuyển chuẩn hóa</div>
                <div className="total-score-number">{totalScore.toFixed(2)}</div>
              </div>
              <button className="btn btn-primary" onClick={handleSaveProfile} disabled={savingProfile}>
                {savingProfile ? <Loader2 size={15} className="animate-spin" /> : <CheckCircle2 size={15} />}
                Lưu hồ sơ
              </button>
            </div>

            <button className="btn btn-primary" style={{ width: '100%' }} onClick={handleEvaluate} disabled={evaluating || wishRows.length === 0}>
              {evaluating ? <Loader2 size={17} className="animate-spin" /> : <Sparkles size={17} />}
              {evaluating ? 'Đang phân tích & lưu kết quả...' : 'Phân tích Rủi ro (TWD)'}
            </button>
          </div>
        </div>

        {/* ── Cột phải: Danh sách nguyện vọng ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {evalError && <div className="alert alert-warn" style={{ marginBottom: 0 }}>{evalError}</div>}

          {results && (
            <div className="card card-pad">
              <div className="twd-stats-row" style={{ marginBottom: 14 }}>
                <div className="twd-stat-box pos">
                  <span className="zone-name">🟢 An toàn (POS)</span>
                  <strong className="zone-count">{results.posCount}</strong>
                  <small>ΔS ≥ +{TWD_ALPHA}</small>
                </div>
                <div className="twd-stat-box bnd">
                  <span className="zone-name">🟡 Cân nhắc (BND)</span>
                  <strong className="zone-count">{results.bndCount}</strong>
                  <small>{TWD_BETA} ≤ ΔS &lt; +{TWD_ALPHA}</small>
                </div>
                <div className="twd-stat-box neg">
                  <span className="zone-name">🔴 Rủi ro (NEG)</span>
                  <strong className="zone-count">{results.negCount}</strong>
                  <small>ΔS &lt; {TWD_BETA}</small>
                </div>
              </div>
              <div className="twd-advice-box">
                <TrendingUp size={18} style={{ color: 'var(--warn)', flexShrink: 0 }} />
                <div>
                  <strong>Khuyến nghị chiến lược</strong>
                  {results.strategicAdvice}
                </div>
              </div>
            </div>
          )}

          <div className="wishes-header-actions">
            <div>
              <h2>Danh sách Nguyện vọng ({wishRows.length})</h2>
              <p className="page-subtitle">Xét theo thứ tự ưu tiên từ trên xuống.</p>
            </div>
          </div>

          {displayWishes.length === 0 ? (
            <div className="card">
              <div className="state-block">
                <ListChecks size={40} />
                <h4>Chưa có nguyện vọng nào</h4>
                <p>Nhấn "Thêm nguyện vọng", chọn trường → đợt tuyển sinh → phương thức & tổ hợp xét tuyển.</p>
              </div>
            </div>
          ) : (
            <div className="wishes-list">
              {displayWishes.map((w) => (
                <div key={w.id} className={`wish-card ${w.zone ? `zone-${w.zone.toLowerCase()}` : ''}`}>
                  <div className="wish-priority-badge">
                    <span>NV</span><span>{w.wishOrder}</span>
                  </div>
                  <div className="wish-main-info">
                    <div className="wish-title-row">
                      <h3 className="wish-major-name">{w.majorName}</h3>
                      {w.zone && (
                        <span className={`zone-badge ${w.badgeClass}`}>
                          {w.zone === 'POS' && <CheckCircle2 size={13} />}
                          {w.zone === 'BND' && <AlertTriangle size={13} />}
                          {w.zone === 'NEG' && <XCircle size={13} />}
                          {w.zoneName}
                        </span>
                      )}
                    </div>
                    <div className="wish-uni-row">
                      <Building2 size={14} /> <span>{w.institutionName}</span>
                      {(w.institutionProvince || w.institutionRegion) && (
                        <>
                          <span className="bullet-sep">•</span>
                          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                            <MapPin size={11} style={{ color: 'var(--primary)' }} />
                            <span>{w.institutionProvince ? `${w.institutionProvince}${w.institutionRegion ? ` (${w.institutionRegion})` : ''}` : w.institutionRegion}</span>
                            {w.locationMatch && (
                              <span className="pill plain" style={{ fontSize: '0.68rem', padding: '1px 5px', marginLeft: 2, background: 'var(--surface-soft)' }}>
                                {w.locationMatch.label}
                              </span>
                            )}
                          </span>
                        </>
                      )}
                      <span className="bullet-sep">•</span>
                      <BookOpen size={14} /> <span><strong>{w.combinationCode}</strong>{w.comboName ? ` (${w.comboName})` : ''}</span>
                      <span className="bullet-sep">•</span>
                      <span>{w.methodName}</span>
                      {w.tuitionPolicy && (
                        <>
                          <span className="bullet-sep">•</span>
                          <span className={`wish-tuition-tag ${w.tuitionPolicy?.policy?.includes('Sư phạm') || w.tuitionPolicy?.fee_total?.toLowerCase().includes('miễn') ? 'free' : ''}`}>
                            <Coins size={12} />
                            {typeof w.tuitionPolicy === 'object' ? (w.tuitionPolicy.fee_total || w.tuitionPolicy.policy) : w.tuitionPolicy}
                          </span>
                        </>
                      )}
                    </div>
                    {w.delta != null && (
                      <div className="wish-advice-line" style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 3 }}>
                        <span className="delta-tag">
                          ΔS: <strong>{w.delta >= 0 ? `+${w.delta.toFixed(2)}` : w.delta.toFixed(2)}</strong>
                        </span>
                        <span className="advice-text">{w.advice}</span>
                      </div>
                    )}
                  </div>
                  <div className="wish-side-score">
                    <span className="cutoff-label">Điểm chuẩn</span>
                    <span className="cutoff-value">{w.benchmark ? Number(w.benchmark.benchmarkScore).toFixed(2) : '—'}</span>
                    <button className="btn-icon danger" title="Xóa nguyện vọng" onClick={() => handleDeleteWish(w.id)}>
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Modal thêm nguyện vọng ── */}
      {showAdd && (
        <div className="modal-backdrop" onClick={() => setShowAdd(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleAddWish}>
              <div className="modal-header">
                <h3>Thêm Nguyện vọng</h3>
                <button type="button" className="btn-icon" onClick={() => setShowAdd(false)}>✕</button>
              </div>
              <div className="modal-body">
                {addError && <div className="alert alert-error">{addError}</div>}

                <div className="form-group">
                  <label>Lọc trường theo Vùng miền</label>
                  <select
                    value={addModalRegion}
                    onChange={(e) => {
                      setAddModalRegion(e.target.value);
                      setNewWish({ institutionId: '', trackId: '', tmcId: '' });
                    }}
                  >
                    <option value="">🌐 Tất cả Vùng miền</option>
                    {VIETNAM_REGIONS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Trường / Đơn vị <span className="req">*</span></label>
                  <select
                    value={newWish.institutionId}
                    onChange={(e) => setNewWish({ institutionId: e.target.value, trackId: '', tmcId: '' })}
                    required
                  >
                    <option value="">— Chọn trường —</option>
                    {filteredInstitutionOptions.map((i) => (
                      <option key={i.institutionId} value={i.institutionId}>
                        {i.institutionName}{i.provinceCity ? ` (${i.provinceCity})` : (i.region ? ` (${i.region})` : '')}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Đợt tuyển sinh (Track) <span className="req">*</span></label>
                  <select
                    value={newWish.trackId}
                    onChange={(e) => setNewWish({ ...newWish, trackId: e.target.value, tmcId: '' })}
                    required
                    disabled={!newWish.institutionId}
                  >
                    <option value="">— Chọn đợt tuyển sinh —</option>
                    {trackOptions.map((t) => {
                      let tpText = '';
                      if (t.tuitionPolicy) {
                        const tp = typeof t.tuitionPolicy === 'string' ? JSON.parse(t.tuitionPolicy) : t.tuitionPolicy;
                        tpText = tp.fee_total ? ` [Học phí: ${tp.fee_total}]` : (tp.policy ? ` [${tp.policy}]` : '');
                      }
                      return (
                        <option key={t.trackId} value={t.trackId}>
                          {t.trackName || t.trackId} {t.majorCode ? `— Ngành ${t.majorCode}` : ''}{tpText}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label>Phương thức & Tổ hợp xét tuyển <span className="req">*</span></label>
                  <select
                    value={newWish.tmcId}
                    onChange={(e) => setNewWish({ ...newWish, tmcId: e.target.value })}
                    required
                    disabled={!newWish.trackId}
                  >
                    <option value="">— Chọn phương thức + tổ hợp —</option>
                    {tmcOptions.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.methodId} • Tổ hợp {t.combinationCode}
                      </option>
                    ))}
                  </select>
                  <small className="hint">Danh sách lấy trực tiếp từ bảng Track-Method-Combination của hệ thống.</small>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setShowAdd(false)}>Hủy</button>
                <button type="submit" className="btn btn-primary" disabled={adding}>
                  {adding ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />}
                  Thêm vào danh sách
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
