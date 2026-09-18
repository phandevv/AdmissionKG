import { Building2, Calendar, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Coins, GraduationCap, History, Layers, MapPin, RefreshCw, Search, SearchX, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ALL_PROVINCES,
  getProvincesForRegion,
  getRegionOfProvince,
  VIETNAM_REGIONS,
} from '../../shared/constants/vietnamGeography';
import useApiData from '../../shared/hooks/useApiData';
import {
  admissionMethodsApi,
  admissionSchemesApi, admissionTracksApi,
  benchmarkQuotasApi,
  institutionsApi,
  majorsApi,
  subjectCombinationsApi,
  trackMethodCombinationsApi,
} from '../../shared/services/api';
import {
  computeSearchRelevance,
  removeVietnameseAccents,
} from '../../shared/utils/searchUtils';

const PAGE_SIZE_OPTIONS = [10, 15, 20, 50];

export default function AdmissionSearchPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryCombo = searchParams.get('combo') || '';

  const { data, loading: baseLoading, error } = useApiData({
    institutions: institutionsApi.list,
    schemes: admissionSchemesApi.list,
    tracks: admissionTracksApi.list,
    tmc: trackMethodCombinationsApi.list,
    benchmarks: benchmarkQuotasApi.list,
    majors: majorsApi.list,
    methods: admissionMethodsApi.list,
    combos: subjectCombinationsApi.list,
  });

  const currentYear = useMemo(() => new Date().getFullYear().toString(), []);
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [regionFilter, setRegionFilter] = useState('');
  const [provinceFilter, setProvinceFilter] = useState('');
  const [year, setYear] = useState(currentYear);
  const [comboCode, setComboCode] = useState(queryCombo);
  const [methodCodeFilter, setMethodCodeFilter] = useState('');
  const [minScore, setMinScore] = useState('');
  const [maxScore, setMaxScore] = useState('');
  const [institutionFilter, setInstitutionFilter] = useState('');
  const [pageSize, setPageSize] = useState(15);
  const [page, setPage] = useState(0);
  const [historyModal, setHistoryModal] = useState({ open: false, rows: [], title: '', tuitionPolicy: null });

  // Debounce user typing to maintain 60fps responsiveness during rapid search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 150);
    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    if (queryCombo) {
      setComboCode(queryCombo);
    }
  }, [queryCombo]);

  const renderTuition = (tp) => {
    if (!tp) return <span className="cell-muted">—</span>;
    let parsed = tp;
    if (typeof tp === 'string') {
      try { parsed = JSON.parse(tp); } catch { parsed = { policy: tp }; }
    }
    if (typeof parsed !== 'object' || !parsed) return <span className="cell-muted">—</span>;

    const isFree = parsed.policy?.includes('Sư phạm') || parsed.fee_total?.toLowerCase().includes('miễn');
    const isPremium = parsed.policy?.includes('Chất lượng cao') || parsed.policy?.includes('ACCA');
    const pillClass = isFree ? 'free' : (isPremium ? 'premium' : 'standard');

    return (
      <div className="tuition-cell" title={parsed.policy ? `${parsed.policy}: ${parsed.fee_total || ''}` : ''}>
        <span className={`tuition-pill ${pillClass}`}>
          <Coins size={11} style={{ marginRight: 2, display: 'inline' }} />
          {parsed.policy || 'Học phí'}
        </span>
        {parsed.fee_total && (
          <div className="tuition-fee-text">
            {parsed.fee_total}
          </div>
        )}
      </div>
    );
  };

  const rows = useMemo(() => {
    if (!data.tracks || !data.tmc) return [];
    const safe = (k) => (Array.isArray(data[k]) ? data[k] : []);
    const institutions = safe('institutions');
    const schemes = safe('schemes');
    const tracks = safe('tracks');
    const tmc = safe('tmc');
    const benchmarks = safe('benchmarks');
    const majors = safe('majors');
    const methods = safe('methods');
    const combos = safe('combos');

    const institutionById = Object.fromEntries(institutions.map((i) => [i.institutionId, i]));
    const schemeById = Object.fromEntries(schemes.map((s) => [s.schemeId, s]));
    const majorByCode = Object.fromEntries(majors.map((m) => [m.majorCode, m]));
    const methodById = Object.fromEntries(methods.map((m) => [m.methodId, m]));
    const comboByCode = Object.fromEntries(combos.map((c) => [c.combinationCode, c]));

    const tmcsByTrack = {};
    tmc.forEach((t) => {
      (tmcsByTrack[t.trackId] ||= []).push(t);
    });

    const tmcMap = new Map(tmc.map((t) => [t.id, t]));
    const benchmarksByTrack = {};
    benchmarks.forEach((b) => {
      const matchedTmc = tmcMap.get(b.tmcId);
      if (matchedTmc) {
        (benchmarksByTrack[matchedTmc.trackId] ||= []).push(b);
      }
    });

    const createRowWithIndex = (base) => {
      const methodsText = (base.methods || []).map((m) => `${m.methodCode || ''} ${m.methodName || ''}`).join(' ');
      const combosText = (base.combinations || []).map((c) => `${c.combinationCode || ''} ${c.combinationName || ''}`).join(' ');
      const tuitionText = base.tuitionPolicy ? (typeof base.tuitionPolicy === 'object' ? `${base.tuitionPolicy.policy || ''} ${base.tuitionPolicy.fee_total || ''}` : String(base.tuitionPolicy)) : '';
      
      const instHay = `${base.institutionName} ${base.institutionCode}`;
      const majorHay = `${base.majorName} ${base.majorCode} ${base.trackName}`;
      const fullSearchHay = `${instHay} ${majorHay} ${methodsText} ${combosText} ${tuitionText} ${base.instRegion || ''} ${base.instProvince || ''}`;
      
      const normText = removeVietnameseAccents(fullSearchHay);
      const normInst = removeVietnameseAccents(instHay);
      const normMajor = removeVietnameseAccents(majorHay);

      return {
        ...base,
        _normText: normText,
        _normWords: normText.split(/\s+/).filter(Boolean),
        _normInst: normInst,
        _normInstWords: normInst.split(/\s+/).filter(Boolean),
        _normMajor: normMajor,
        _normMajorWords: normMajor.split(/\s+/).filter(Boolean),
      };
    };

    const out = [];
    tracks.forEach((track) => {
      const scheme = schemeById[track.schemeId];
      const inst = scheme ? institutionById[scheme.institutionId] : null;
      const major = majorByCode[track.majorCode];
      const trackTmcs = tmcsByTrack[track.trackId] || [];

      // Collect all unique methods for this track
      const methodMap = new Map();
      trackTmcs.forEach((t) => {
        if (!methodMap.has(t.methodId)) {
          const m = methodById[t.methodId];
          methodMap.set(t.methodId, {
            methodId: t.methodId,
            methodCode: m?.methodCode || t.methodId,
            methodName: m?.methodName || t.methodId,
          });
        }
      });
      const methodsForTrack = Array.from(methodMap.values());

      // Collect all unique subject combinations for this track
      const comboMap = new Map();
      trackTmcs.forEach((t) => {
        if (!comboMap.has(t.combinationCode)) {
          const c = comboByCode[t.combinationCode];
          comboMap.set(t.combinationCode, {
            combinationCode: t.combinationCode,
            combinationName: c?.combinationName || '',
          });
        }
      });
      const combinationsForTrack = Array.from(comboMap.values());

      const trackBms = benchmarksByTrack[track.trackId] || [];
      const sortedBms = [...trackBms].sort((a, b) => (b.academicYear || 0) - (a.academicYear || 0));
      const latestBm = sortedBms[0] || null;

      // Historical benchmarks (e.g. 2025, 2024)
      trackBms.forEach((b) => {
        out.push(createRowWithIndex({
          rowKey: `bm_${b.id}`,
          benchmarkId: b.id,
          year: b.academicYear,
          score: b.benchmarkScore,
          prevScore: b.benchmarkScore,
          prevYear: b.academicYear,
          quota: b.quota,
          admitted: b.admittedCount,
          trackId: track.trackId,
          trackName: track.trackName,
          tuitionPolicy: track.tuitionPolicy,
          institutionId: inst?.institutionId || '',
          institutionName: inst?.institutionName || scheme?.institutionId || '—',
          institutionCode: inst?.institutionCode || '—',
          majorCode: track.majorCode || '',
          majorName: major?.majorName || track.trackName || '—',
          methods: methodsForTrack,
          combinations: combinationsForTrack,
          schemeYear: scheme?.academicYear,
          instRegion: inst?.region || '',
          instProvince: inst?.provinceCity || '',
        }));
      });

      // Active scheme year (2026) - Uses latest available historical benchmark for filtering & preview
      out.push(createRowWithIndex({
        rowKey: `track_2026_${track.trackId}`,
        benchmarkId: null,
        year: scheme?.academicYear || 2026,
        score: null, // Năm hiện tại đang mở xét tuyển, chưa có điểm chuẩn chính thức
        prevScore: latestBm ? latestBm.benchmarkScore : null, // Điểm chuẩn năm trước (2025/2024)
        prevYear: latestBm ? latestBm.academicYear : null,
        quota: track.allocatedQuota,
        admitted: null,
        trackId: track.trackId,
        trackName: track.trackName,
        tuitionPolicy: track.tuitionPolicy,
        institutionId: inst?.institutionId || '',
        institutionName: inst?.institutionName || scheme?.institutionId || '—',
        institutionCode: inst?.institutionCode || '—',
        majorCode: track.majorCode || '',
        majorName: major?.majorName || track.trackName || '—',
        methods: methodsForTrack,
        combinations: combinationsForTrack,
        schemeYear: scheme?.academicYear || 2026,
        instRegion: inst?.region || '',
        instProvince: inst?.provinceCity || '',
      }));
    });

    return out;
  }, [data, baseLoading, error]);

  const years = useMemo(() => [...new Set(rows.map((r) => r.year))].sort((a, b) => b - a), [rows]);

  const availableProvinces = useMemo(() => {
    return regionFilter ? getProvincesForRegion(regionFilter) : ALL_PROVINCES;
  }, [regionFilter]);

  const filtered = useMemo(() => {
    const min = minScore !== '' && !isNaN(Number(minScore)) ? parseFloat(minScore) : null;
    const max = maxScore !== '' && !isNaN(Number(maxScore)) ? parseFloat(maxScore) : null;

    const matched = [];

    for (let i = 0; i < rows.length; i++) {
      const r = rows[i];

      // 1. Full-Text Relevance & Multi-token match
      let scoreRelevance = 0;
      if (debouncedKeyword) {
        scoreRelevance = computeSearchRelevance(debouncedKeyword, r);
        if (scoreRelevance <= 0) continue;
      }

      if (regionFilter && r.instRegion !== regionFilter) continue;
      if (provinceFilter && r.instProvince !== provinceFilter) continue;
      if (year && String(r.year) !== year) continue;
      if (comboCode && !(r.combinations || []).some((c) => c.combinationCode === comboCode)) continue;
      if (methodCodeFilter && !(r.methods || []).some((m) => (m.methodCode || m.methodId) === methodCodeFilter)) continue;
      if (institutionFilter && r.institutionId !== institutionFilter) continue;

      // Score range logic:
      // Minimum standard threshold is 15.0 (Bộ GD&ĐT), Maximum is 30.0.
      // If row has explicit benchmark score (historical row), use r.score.
      // If row is active year (2026), use r.prevScore (điểm chuẩn năm trước) for filtering.
      if (min !== null || max !== null) {
        const targetScore = r.score != null ? r.score : r.prevScore;
        if (targetScore == null) continue; // Bỏ qua nếu hoàn toàn không có dữ liệu điểm chuẩn

        const s = Number(targetScore);
        const effectiveMin = min !== null ? Math.max(15, min) : 15;
        const effectiveMax = max !== null ? Math.min(30, max) : 30;

        if (s < effectiveMin || s > effectiveMax) continue;
      }

      matched.push({
        ...r,
        _searchRelevance: scoreRelevance,
      });
    }

    // Sort priority:
    // 1. If keyword search is active -> Sort by Search Relevance Score (DESC)
    // 2. Year (DESC)
    // 3. Score (DESC)
    // 4. Major Name (ASC)
    return matched.sort((a, b) => {
      if (debouncedKeyword) {
        const diffRel = (b._searchRelevance || 0) - (a._searchRelevance || 0);
        if (diffRel !== 0) return diffRel;
      }
      return (b.year - a.year) || ((b.score ?? -1) - (a.score ?? -1)) || a.majorName.localeCompare(b.majorName);
    });
  }, [rows, debouncedKeyword, regionFilter, provinceFilter, year, comboCode, methodCodeFilter, institutionFilter, minScore, maxScore]);

  const handleMinScoreChange = (val) => {
    setMinScore(val);
    setPage(0);
    if (val !== '' && !isNaN(Number(val))) {
      const numMin = parseFloat(val);
      if (maxScore !== '' && !isNaN(Number(maxScore))) {
        const numMax = parseFloat(maxScore);
        if (numMin > numMax) {
          setMaxScore(Math.min(30, numMin).toString());
        }
      }
    }
  };

  const handleMaxScoreChange = (val) => {
    setMaxScore(val);
    setPage(0);
    if (val !== '' && !isNaN(Number(val))) {
      const numMax = parseFloat(val);
      if (minScore !== '' && !isNaN(Number(minScore))) {
        const numMin = parseFloat(minScore);
        if (numMax < numMin) {
          setMinScore(Math.max(15, numMax).toString());
        }
      }
    }
  };

  const handleScoreBlur = (type) => {
    if (type === 'min' && minScore !== '') {
      let num = parseFloat(minScore);
      if (isNaN(num)) setMinScore('');
      else {
        if (num < 15) num = 15;
        if (num > 30) num = 30;
        setMinScore(num.toString());
      }
    } else if (type === 'max' && maxScore !== '') {
      let num = parseFloat(maxScore);
      if (isNaN(num)) setMaxScore('');
      else {
        if (num < 15) num = 15;
        if (num > 30) num = 30;
        setMaxScore(num.toString());
      }
    }
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, totalPages - 1);
  const pageRows = filtered.slice(currentPage * pageSize, currentPage * pageSize + pageSize);

  const handleClear = () => {
    setKeyword('');
    setDebouncedKeyword('');
    setRegionFilter('');
    setProvinceFilter('');
    setYear(currentYear);
    setComboCode('');
    setMethodCodeFilter('');
    setMinScore('');
    setMaxScore('');
    setInstitutionFilter('');
    setPage(0);
  };

  const openHistory = (row) => {
    const hist = rows.filter((r) => r.trackId === row.trackId)
      .sort((a, b) => b.year - a.year);
    setHistoryModal({
      open: true,
      rows: hist,
      title: `${row.institutionName} — ${row.majorName}`,
      tuitionPolicy: row.tuitionPolicy,
    });
  };

  if (baseLoading) {
    return (
      <div className="page">
        <div className="state-block"><div className="spinner" /><h4>Đang tải dữ liệu tuyển sinh...</h4></div>
      </div>
    );
  }
  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="page">
      <div className="search-mode-tabs">
        <button
          type="button"
          className="search-mode-tab"
          onClick={() => navigate('/combinations')}
        >
          <Layers size={18} />
          <span>Danh mục & Tra cứu Tổ hợp Môn (191 khối)</span>
        </button>
        <button
          type="button"
          className="search-mode-tab active"
          onClick={() => {}}
        >
          <GraduationCap size={18} />
          <span>Tra cứu Ngành & Điểm chuẩn Tuyển sinh</span>
        </button>
      </div>

      <div className="search-hero">
        <span className="search-hero-icon"><Search size={24} /></span>
        <div>
          <h2>Tra cứu Tuyển sinh & Điểm chuẩn</h2>
        </div>
      </div>

      <form
        className="filter-bar"
        onSubmit={(e) => { e.preventDefault(); setPage(0); }}
      >
        <div className="filter-search">
          <Search size={15} />
          <input
            placeholder="Tìm theo tên/mã trường, ngành, học phí, địa điểm..."
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
          />
        </div>
        <select
          value={regionFilter}
          onChange={(e) => {
            const val = e.target.value;
            setRegionFilter(val);
            if (provinceFilter && val && getRegionOfProvince(provinceFilter) !== val) {
              setProvinceFilter('');
            }
            setPage(0);
          }}
        >
          <option value=""> Tất cả Vùng miền</option>
          {VIETNAM_REGIONS.map((reg) => (
            <option key={reg} value={reg}>{reg}</option>
          ))}
        </select>
        <select
          value={provinceFilter}
          onChange={(e) => {
            const val = e.target.value;
            setProvinceFilter(val);
            if (val && !regionFilter) {
              const reg = getRegionOfProvince(val);
              if (reg) setRegionFilter(reg);
            }
            setPage(0);
          }}
        >
          <option value="">Tất cả Tỉnh / TP</option>
          {availableProvinces.map((prov) => (
            <option key={prov} value={prov}>{prov}</option>
          ))}
        </select>
        <select value={institutionFilter} onChange={(e) => { setInstitutionFilter(e.target.value); setPage(0); }}>
          <option value="">Tất cả trường</option>
          {(Array.isArray(data.institutions) ? data.institutions : []).map((i) => (
            <option key={i.institutionId} value={i.institutionId}>{i.institutionName}</option>
          ))}
        </select>
        <select value={year} onChange={(e) => { setYear(e.target.value); setPage(0); }}>
          <option value="">Tất cả năm</option>
          {years.map((y) => <option key={y} value={y}>Năm {y}</option>)}
        </select>
        <select value={comboCode} onChange={(e) => { setComboCode(e.target.value); setPage(0); }}>
          <option value="">Tất cả tổ hợp</option>
          {(Array.isArray(data.combos) ? data.combos : []).map((c) => (
            <option key={c.combinationCode} value={c.combinationCode}>{c.combinationCode}</option>
          ))}
        </select>
        <select value={methodCodeFilter} onChange={(e) => { setMethodCodeFilter(e.target.value); setPage(0); }}>
          <option value="">Tất cả phương thức</option>
          {(Array.isArray(data.methods) ? data.methods : []).map((m) => (
            <option key={m.methodId} value={m.methodCode || m.methodId}>
              Mã {m.methodCode || m.methodId} — {m.methodName.length > 25 ? m.methodName.slice(0, 25) + '...' : m.methodName}
            </option>
          ))}
        </select>
        <div
          className={`filter-score-range-wrap ${(minScore || maxScore) ? 'active' : ''}`}
          title="Lọc theo khoảng điểm chuẩn năm trước (15.0 - 30.0 điểm). Lưu ý: Năm 2026 đang trong kỳ tuyển sinh nên hệ thống đối chiếu theo điểm chuẩn năm gần nhất (2025/2024) để giúp bạn chọn ngành phù hợp."
        >
          <div className="filter-score-label">
            <GraduationCap size={15} />
            <span>Điểm chuẩn:</span>
          </div>
          <div className="filter-score-inputs">
            <input
              type="number"
              min="15"
              max="30"
              step="0.1"
              placeholder="Từ 15.0"
              value={minScore}
              onChange={(e) => handleMinScoreChange(e.target.value)}
              onBlur={() => handleScoreBlur('min')}
            />
            <span className="filter-score-sep">—</span>
            <input
              type="number"
              min="15"
              max="30"
              step="0.1"
              placeholder="Đến 30.0"
              value={maxScore}
              onChange={(e) => handleMaxScoreChange(e.target.value)}
              onBlur={() => handleScoreBlur('max')}
            />
          </div>
          <span className="filter-score-tag" title="Năm 2026 chưa có điểm chuẩn, lọc theo điểm chuẩn năm gần nhất">
            Năm trước (2025)
          </span>
        </div>
        <button type="button" className="btn btn-ghost btn-sm" onClick={handleClear}>
          <RefreshCw size={14} /> Đặt lại
        </button>
      </form>

      <div className="card">
        <div className="result-count-bar">
          <span>Tìm thấy <strong>{filtered.length}</strong> ngành / chương trình đào tạo khớp bộ lọc</span>
          <span>Trang {Math.min(page + 1, totalPages)}/{totalPages}</span>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th className="col-year">Năm</th>
                <th>Trường / Địa phương</th>
                <th>Ngành / Đợt tuyển sinh</th>
                <th className="col-methods">Phương thức</th>
                <th className="col-combos">Tổ hợp</th>
                <th>Học phí & Chính sách</th>
                <th className="col-score" title="Năm 2026 đang mở xét tuyển; hiển thị điểm chuẩn năm gần nhất để tham khảo">
                  Điểm chuẩn
                  <span className="th-sub-badge">Năm trước</span>
                </th>
                <th className="col-quota">Chỉ tiêu</th>
                <th className="col-history" style={{ textAlign: 'center' }}>Lịch sử</th>
              </tr>
            </thead>
            <tbody>
              {pageRows.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <div className="state-block">
                      <SearchX size={40} />
                      <h4>Không có dữ liệu khớp</h4>
                      <p>Thử nới lỏng bộ lọc điểm hoặc kiểm tra lại dữ liệu đã được quản trị viên nhập chưa.</p>
                    </div>
                  </td>
                </tr>
              ) : pageRows.map((r) => (
                <tr key={r.rowKey || r.benchmarkId || `${r.trackId}_${r.year}`}>
                  <td className="col-year"><span className="pill plain"><Calendar size={12} /> {r.year}</span></td>
                  <td>
                    <div className="cell-primary"><Building2 size={13} style={{ display: 'inline', marginRight: 5, color: 'var(--primary)' }} />{r.institutionName}</div>
                    <div className="cell-muted" style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6, marginTop: 3 }}>
                      <span>Mã: {r.institutionCode}</span>
                      {(r.instProvince || r.instRegion) && (
                        <span className="pill plain" style={{ fontSize: '0.72rem', padding: '1px 6px', display: 'inline-flex', alignItems: 'center', gap: 3, background: 'var(--surface-soft)' }}>
                          <MapPin size={10} style={{ color: 'var(--primary)' }} />
                          {r.instProvince ? `${r.instProvince}${r.instRegion ? ` (${r.instRegion})` : ''}` : r.instRegion}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="cell-primary"><GraduationCap size={13} style={{ display: 'inline', marginRight: 5, color: 'var(--primary)' }} />{r.majorName}</div>
                    <div className="cell-muted">Mã ngành: {r.majorCode} • {r.trackName}</div>
                  </td>
                  <td className="col-methods">
                    <div className="methods-pill-group">
                      {(r.methods || []).map((m) => (
                        <div key={m.methodId} className="method-pill-wrapper">
                          <span className="pill method-pill" title={m.methodName}>
                            {m.methodCode || m.methodId}
                          </span>
                          <div className="method-tooltip">
                            <strong>Mã {m.methodCode || m.methodId}</strong>: {m.methodName}
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="col-combos">
                    <div className="combos-pill-group">
                      {(r.combinations || []).map((c) => (
                        <span key={c.combinationCode} className="pill" title={c.combinationName ? `${c.combinationCode}: ${c.combinationName}` : c.combinationCode}>
                          {c.combinationCode}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    {renderTuition(r.tuitionPolicy)}
                  </td>
                  <td className="col-score">
                    {r.score != null ? (
                      <strong className="score-big">{Number(r.score).toFixed(2)}</strong>
                    ) : r.prevScore != null ? (
                      <div className="score-cell-wrap" title={`Điểm chuẩn năm ${r.prevYear} (Năm ${r.year} đang mở xét tuyển)`}>
                        <strong className="score-big">{Number(r.prevScore).toFixed(2)}</strong>
                        <span className="score-prev-badge">Năm {r.prevYear}</span>
                      </div>
                    ) : (
                      <span className="pill plain" style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>Chờ xét tuyển</span>
                    )}
                  </td>
                  <td className="col-quota">{r.quota ?? '—'}</td>
                  <td className="col-history" style={{ textAlign: 'center' }}>
                    <button className="btn btn-ghost btn-sm" onClick={() => openHistory(r)}>
                      <History size={14} /> Xem
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length > 0 && (
          <div className="pagination-bar" style={{ marginTop: 16 }}>
            <div className="pagination-info">
              Hiển thị <strong>{currentPage * pageSize + 1}</strong> – <strong>{Math.min((currentPage + 1) * pageSize, filtered.length)}</strong> trên tổng số <strong>{filtered.length}</strong> kết quả
            </div>
            <div className="pagination-actions">
              <div className="pagination-size-select">
                <label htmlFor="search-page-size" style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Mỗi trang:</label>
                <select
                  id="search-page-size"
                  className="pagination-select"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(0);
                  }}
                >
                  {PAGE_SIZE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>{opt} dòng</option>
                  ))}
                </select>
              </div>

              <div className="pagination-nav">
                <button
                  type="button"
                  className="pagination-btn"
                  disabled={currentPage === 0}
                  onClick={() => setPage(0)}
                  title="Trang đầu"
                >
                  <ChevronsLeft size={16} />
                </button>
                <button
                  type="button"
                  className="pagination-btn"
                  disabled={currentPage === 0}
                  onClick={() => setPage(currentPage - 1)}
                  title="Trang trước"
                >
                  <ChevronLeft size={16} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i)
                  .filter((p) => p === 0 || p === totalPages - 1 || Math.abs(p - currentPage) <= 1)
                  .map((p, idx, arr) => {
                    const prev = arr[idx - 1];
                    const showEllipsis = prev !== undefined && p - prev > 1;
                    return (
                      <span key={p} style={{ display: 'inline-flex', alignItems: 'center' }}>
                        {showEllipsis && <span className="pagination-ellipsis">…</span>}
                        <button
                          type="button"
                          className={`pagination-btn ${p === currentPage ? 'active' : ''}`}
                          onClick={() => setPage(p)}
                        >
                          {p + 1}
                        </button>
                      </span>
                    );
                  })}

                <button
                  type="button"
                  className="pagination-btn"
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => setPage(currentPage + 1)}
                  title="Trang sau"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  className="pagination-btn"
                  disabled={currentPage >= totalPages - 1}
                  onClick={() => setPage(totalPages - 1)}
                  title="Trang cuối"
                >
                  <ChevronsRight size={16} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {historyModal.open && (
        <div className="modal-backdrop" onClick={() => setHistoryModal({ open: false, rows: [], title: '' })}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Lịch sử điểm chuẩn</h3>
              <button className="btn-icon" onClick={() => setHistoryModal({ open: false, rows: [], title: '' })}><X size={16} /></button>
            </div>
            <div className="modal-body">
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 8 }}>{historyModal.title}</p>
              {historyModal.tuitionPolicy && (
                <div style={{ marginBottom: 14 }}>
                  {renderTuition(historyModal.tuitionPolicy)}
                </div>
              )}
              {historyModal.rows.length === 0 ? (
                <div className="state-block" style={{ padding: '20px' }}><h4>Chưa có dữ liệu lịch sử</h4></div>
              ) : historyModal.rows.map((h, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 14px', background: 'var(--surface-soft)', border: '1px solid var(--border)', borderRadius: 10, marginBottom: 8 }}>
                  <div>
                    <strong style={{ color: 'var(--primary-strong)', display: 'block' }}>Năm {h.year}</strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 2 }}>
                      {h.score != null ? `Chỉ tiêu: ${h.quota ?? '—'} • Nhập học: ${h.admitted ?? '—'}` : `Chỉ tiêu 2026: ${h.quota ?? '—'}`}
                    </div>
                  </div>
                  <div className="methods-pill-group" style={{ maxWidth: 140 }}>
                    {(h.methods || []).map((m) => (
                      <div key={m.methodId} className="method-pill-wrapper">
                        <span className="pill method-pill" title={m.methodName}>
                          {m.methodCode || m.methodId}
                        </span>
                        <div className="method-tooltip">
                          <strong>Mã {m.methodCode || m.methodId}</strong>: {m.methodName}
                        </div>
                      </div>
                    ))}
                  </div>
                  <strong style={{ fontSize: '1.02rem', color: 'var(--text-strong)' }}>
                    {h.score != null ? `${Number(h.score).toFixed(2)} điểm` : 'Đang tuyển sinh'}
                  </strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
