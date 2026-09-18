import React, { useMemo, useState } from 'react';
import CytoscapeViewer from '../../chat/components/CytoscapeViewer';
import { Compass, Filter, RefreshCw, Info } from 'lucide-react';
import useApiData from '../../shared/hooks/useApiData';
import {
  institutionsApi, admissionSchemesApi, admissionTracksApi, trackMethodCombinationsApi,
  majorsApi, admissionMethodsApi, subjectCombinationsApi, careersApi, trackCareerMappingsApi,
} from '../../shared/services/api';

// Xây dựng đồ thị từ dữ liệu thật của BE:

// Institution --[CÓ_DOT_TUYEN]--> Major --[XET_PHUONG_THUC]--> Method
//                                      --[XET_TO_HOP]--------> Combination
//                                      --[DINH_HUONG_VIEC]---> Career
export default function KnowledgeGraphExplorePage() {
  const { data, loading, error, reload } = useApiData({
    institutions: institutionsApi.list,
    schemes: admissionSchemesApi.list,
    tracks: admissionTracksApi.list,
    tmc: trackMethodCombinationsApi.list,
    majors: majorsApi.list,
    methods: admissionMethodsApi.list,
    combos: subjectCombinationsApi.list,
    careers: careersApi.list,
    mappings: () => trackCareerMappingsApi.list(),
  });

  const [institutionFilter, setInstitutionFilter] = useState('ALL');
  const [scope, setScope] = useState('careers'); // 'combos' | 'methods' | 'careers'

  const graph = useMemo(() => {
    if (loading || error) return null;
    const safe = (k) => (Array.isArray(data[k]) ? data[k] : []);
    const institutions = safe('institutions');
    const schemes = safe('schemes');
    const tracks = safe('tracks');
    const tmc = safe('tmc');
    const majors = safe('majors');
    const methods = safe('methods');
    const combos = safe('combos');
    const careers = safe('careers');
    const mappings = safe('mappings');

    const schemeById = Object.fromEntries(schemes.map((s) => [s.schemeId, s]));
    const majorByCode = Object.fromEntries(majors.map((m) => [m.majorCode, m]));
    const methodById = Object.fromEntries(methods.map((m) => [m.methodId, m]));
    const comboByCode = Object.fromEntries(combos.map((c) => [c.combinationCode, c]));
    const careerById = Object.fromEntries(careers.map((c) => [c.careerId, c]));

    // Lọc track theo trường được chọn
    const allowedSchemeIds = new Set(
      institutionFilter === 'ALL'
        ? schemes.map((s) => s.schemeId)
        : schemes.filter((s) => s.institutionId === institutionFilter).map((s) => s.schemeId)
    );
    const activeTracks = tracks.filter((t) => allowedSchemeIds.has(t.schemeId));
    const activeTrackIds = new Set(activeTracks.map((t) => t.trackId));
    const activeTmc = tmc.filter((t) => activeTrackIds.has(t.trackId));
    const activeMappings = mappings.filter((m) => activeTrackIds.has(m.trackId));

    const nodes = [];
    const edges = [];
    const nodeSeen = new Set();
    const addNode = (id, name, label, props) => {
      if (!id || nodeSeen.has(id)) return;
      nodeSeen.add(id);
      nodes.push({ id, name: name || id, label, properties: props || {} });
    };
    const addEdge = (source, target, label) => {
      if (!source || !target) return;
      edges.push({ id: `${source}_${label}_${target}`, source, target, label });
    };

    if (institutionFilter === 'ALL') {
      institutions.forEach((i) =>
        addNode(`inst_${i.institutionId}`, i.institutionName, 'Truong', {
          'Mã': i.institutionCode, 'Loại hình': i.institutionType || '—',
        })
      );
    }

    activeTracks.forEach((t) => {
      const scheme = schemeById[t.schemeId];
      const instId = scheme?.institutionId;
      const inst = institutions.find((i) => i.institutionId === instId);
      const major = majorByCode[t.majorCode];

      if (institutionFilter === 'ALL') {
        addNode(`inst_${instId}`, inst?.institutionName || instId, 'Truong', {
          'Mã': inst?.institutionCode || instId,
        });
        addEdge(`inst_${instId}`, `major_${t.majorCode}`, 'DAO_TAO');
      } else {
        addNode(`inst_${instId}`, inst?.institutionName || instId, 'Truong', {
          'Mã': inst?.institutionCode || instId, 'Năm': scheme?.academicYear || '—',
        });
      }

      addNode(`major_${t.majorCode}`, major?.majorName || t.majorCode, 'Nganh', {
        'Mã ngành': t.majorCode,
        'Bậc': major?.degreeType || '—',
        'Đợt TS': t.trackName || t.trackId,
      });
    });

    activeTmc.forEach((t) => {
      const track = activeTracks.find((x) => x.trackId === t.trackId);
      if (!track) return;
      const majorId = `major_${track.majorCode}`;

      if (scope === 'methods') {
        const m = methodById[t.methodId];
        addNode(`mth_${t.methodId}`, m?.methodName || t.methodId, 'PhuongThuc', {
          'Mã': m?.methodCode || t.methodId,
          'Đối tượng': m?.targetGroup || '—',
        });
        addEdge(majorId, `mth_${t.methodId}`, 'XET_PHUONG_THUC');
      } else if (scope === 'combos') {
        const c = comboByCode[t.combinationCode];
        addNode(`cmb_${t.combinationCode}`, c?.combinationName ? `${t.combinationCode} — ${c.combinationName}` : t.combinationCode, 'ToHop', {
          'Mã': t.combinationCode,
        });
        addEdge(majorId, `cmb_${t.combinationCode}`, 'XET_TO_HOP');
      }
    });

    if (scope === 'careers') {
      activeMappings.forEach((m) => {
        const track = activeTracks.find((x) => x.trackId === m.trackId);
        if (!track) return;
        const career = careerById[m.careerId];
        addNode(`car_${m.careerId}`, career?.careerTitle || m.careerId, 'NgheNghiep', {
          'Ngành nghề': career?.industry || '—',
          'Mức phù hợp': m.suitabilityScore != null ? `${Math.round(m.suitabilityScore * 100)}%` : '—',
        });
        addEdge(`major_${track.majorCode}`, `car_${m.careerId}`, 'DINH_HUONG_VIEC');
      });
    }

    return { nodes, edges };
  }, [data, loading, error, institutionFilter, scope]);

  if (loading) {
    return <div className="page"><div className="state-block"><div className="spinner" /><h4>Đang dựng đồ thị từ dữ liệu thật...</h4></div></div>;
  }
  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="page page-full">
      <div className="page-header">
        <div className="page-title">
          <span className="page-title-icon"><Compass size={22} /></span>
          <div>
            <h1>Khám phá Đồ thị Tri thức</h1>
            <p className="page-subtitle">
              Đồ thị được dựng trực tiếp từ các bảng thật: Institution, Admission Scheme, Track,
              Track-Method-Combination, Major, Method, Subject Combination, Career.
            </p>
          </div>
        </div>
        <div className="page-actions">
          <button className="btn btn-ghost" onClick={reload}><RefreshCw size={15} /> Tải lại dữ liệu</button>
        </div>
      </div>

      <div className="filter-bar">
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)' }}>
          <Filter size={15} /> Lọc:
        </span>
        <select value={institutionFilter} onChange={(e) => setInstitutionFilter(e.target.value)}>
          <option value="ALL">Toàn bộ mạng lưới</option>
          {(Array.isArray(data.institutions) ? data.institutions : []).map((i) => (
            <option key={i.institutionId} value={i.institutionId}>{i.institutionName}</option>
          ))}
        </select>
        <select value={scope} onChange={(e) => setScope(e.target.value)}>
          <option value="careers">Quan hệ: Nghề nghiệp đầu ra</option>
          <option value="combos">Quan hệ: Tổ hợp môn xét tuyển</option>
          <option value="methods">Quan hệ: Phương thức tuyển sinh</option>
        </select>
      </div>

      <div className="graph-legend-bar">
        <span className="legend-item"><span className="dot blue" /> Trường</span>
        <span className="legend-item"><span className="dot green" /> Ngành</span>
        <span className="legend-item"><span className="dot amber" /> Tổ hợp / Phương thức</span>
        <span className="legend-item"><span className="dot violet" /> Nghề nghiệp</span>
        <span className="legend-hint"><Info size={13} style={{ verticalAlign: -2 }} /> Nhấp vào node để xem chi tiết thuộc tính</span>
      </div>

      {graph && graph.nodes.length === 0 ? (
        <div className="card">
          <div className="state-block">
            <Compass size={40} />
            <h4>Chưa có dữ liệu đồ thị</h4>
            <p>Hãy thêm dữ liệu Trường / Ngành / Đợt tuyển sinh trong trang Quản trị Dữ liệu.</p>
          </div>
        </div>
      ) : (
        <div className="explore-graph-wrapper">
          <CytoscapeViewer subgraph={graph} />
        </div>
      )}
    </div>
  );
}
