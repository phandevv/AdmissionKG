import React from 'react';
import { Link } from 'react-router-dom';
import {
  Building2, MapPin, CalendarDays, Route, ListOrdered, Link2, Star, Award as AwardIcon, Scale, Gavel,
  GraduationCap, Layers, BookOpen, Grid3X3, Percent, Gift, Briefcase, GitBranch,
  Users, ClipboardList, Heart, FileBarChart, Database, ArrowRight, Activity, Loader2,
} from 'lucide-react';
import useApiData from '../../shared/hooks/useApiData';
import {
  institutionsApi, campusesApi, admissionSchemesApi, admissionTracksApi, admissionMethodsApi,
  trackMethodCombinationsApi, benchmarkQuotasApi, eligibilityRulesApi, tieBreakersApi,
  scoreFormulasApi, majorsApi, academicFieldsApi, subjectsApi, subjectCombinationsApi,
  universalConversionsApi, bonusPoliciesApi, careersApi, trackCareerMappingsApi,
  usersApi, academicProfilesApi, wishesApi, twdEvaluationLogsApi, healthCheckApi,
} from '../../shared/services/api';

const GROUPS = [

  {
    title: 'Tổ chức Tuyển sinh',
    entities: [
      { key: 'institutions', label: 'Trường / Đơn vị', icon: Building2, api: institutionsApi },
      { key: 'campuses', label: 'Cơ sở đào tạo', icon: MapPin, api: campusesApi },
      { key: 'admission-schemes', label: 'Kế hoạch tuyển sinh', icon: CalendarDays, api: admissionSchemesApi },
      { key: 'admission-tracks', label: 'Đợt / Phương án TS', icon: Route, api: admissionTracksApi },
      { key: 'admission-methods', label: 'Phương thức xét tuyển', icon: ListOrdered, api: admissionMethodsApi },
      { key: 'track-method-combinations', label: 'Đợt × PT × Tổ hợp', icon: Link2, api: trackMethodCombinationsApi },
    ],
  },
  {
    title: 'Ngành học & Môn học',
    entities: [
      { key: 'academic-fields', label: 'Khối ngành', icon: Layers, api: academicFieldsApi },
      { key: 'majors', label: 'Ngành đào tạo', icon: GraduationCap, api: majorsApi },
      { key: 'subjects', label: 'Môn học', icon: BookOpen, api: subjectsApi },
      { key: 'subject-combinations', label: 'Tổ hợp môn', icon: Grid3X3, api: subjectCombinationsApi },
      { key: 'score-formulas', label: 'Công thức tính điểm', icon: Scale, api: scoreFormulasApi },
    ],
  },
  {
    title: 'Điểm chuẩn & Quy tắc',
    entities: [
      { key: 'benchmarks-quotas', label: 'Điểm chuẩn & Chỉ tiêu', icon: Star, api: benchmarkQuotasApi },
      { key: 'eligibility-rules', label: 'Điều kiện xét tuyển', icon: Gavel, api: eligibilityRulesApi },
      { key: 'tie-breakers', label: 'Tiêu chí phụ', icon: Percent, api: tieBreakersApi },
      { key: 'universal-conversions', label: 'Quy đổi điểm', icon: Gift, api: universalConversionsApi },
      { key: 'bonus-policies', label: 'Chính sách cộng điểm', icon: AwardIcon, api: bonusPoliciesApi },
    ],
  },
  {
    title: 'Nghề nghiệp & Người dùng',
    entities: [
      { key: 'careers', label: 'Nghề nghiệp', icon: Briefcase, api: careersApi },
      { key: 'track-career-mappings', label: 'Ngành ↔ Nghề nghiệp', icon: GitBranch, api: () => trackCareerMappingsApi.list() },
      { key: 'users', label: 'Người dùng', icon: Users, api: usersApi },
      { key: 'academic-profiles', label: 'Hồ sơ năng lực', icon: ClipboardList, api: academicProfilesApi },
      { key: 'wishes', label: 'Nguyện vọng', icon: Heart, api: wishesApi },
      { key: 'twd-evaluation-logs', label: 'Log đánh giá TWD', icon: FileBarChart, api: () => twdEvaluationLogsApi.list() },
    ],
  },
];

export default function AdminOverviewPage() {
  const loaders = {};
  GROUPS.forEach((g) => g.entities.forEach((e) => { loaders[e.key] = e.api; }));
  loaders.health = healthCheckApi;

  const { data, loading, error } = useApiData(loaders);

  const count = (k) => (Array.isArray(data[k]) ? data[k].length : '—');
  const health = data.health;
  const healthOk = health?.status === 'UP';

  if (loading) {
    return <div className="page"><div className="state-block"><div className="spinner" /><h4>Đang tải thống kê toàn hệ thống...</h4></div></div>;
  }
  if (error) return <div className="page"><div className="alert alert-error">{error}</div></div>;

  return (
    <div className="page page-full">
      <div className="page-header">
        <div className="page-title">
          <span className="page-title-icon"><Database size={22} /></span>
          <div>
            <h1>Quản trị Dữ liệu hệ thống</h1>
            <p className="page-subtitle">
              Toàn bộ 22 khối dữ liệu của Backend (PostgreSQL). Chọn một khối để xem, thêm, sửa, xóa dữ liệu thật.
            </p>
          </div>
        </div>
        <div className={`alert ${healthOk ? 'alert-success' : 'alert-error'}`} style={{ marginBottom: 0 }}>
          <Activity size={16} />
          Backend Spring Boot: {healthOk ? 'Đang hoạt động (UP)' : 'Không phản hồi'}
        </div>
      </div>

      {/* Widget Quản trị Điểm thi THPTQG 1.13M thí sinh */}
      <div className="card" style={{ marginBottom: 24, background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.9))', borderColor: 'rgba(56, 189, 248, 0.3)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <FileBarChart size={20} color="#38bdf8" />
              <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Quản lý Điểm thi THPT & Phổ điểm (1.13M bản ghi)
              </h3>
              <span className="badge badge-portal admin" style={{ fontSize: '0.7rem' }}>O(1) Pre-Aggregation</span>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
              Dữ liệu file gốc: <code>data/diem_thi_THPTQG_2026.csv</code> (1.131.976 thí sinh). Nạp trực tiếp qua Virtual Thread JDBC Batch Streaming.
            </p>
          </div>

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <Link
              to="/scores"
              className="btn btn-secondary"
              style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}
            >
              <FileBarChart size={15} />
              Xem Trang Phổ điểm
            </Link>
          </div>
        </div>
      </div>

      {GROUPS.map((group) => (
        <div key={group.title} style={{ marginBottom: 26 }}>
          <h2 style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--text-strong)', margin: '18px 0 12px', display: 'flex', alignItems: 'center', gap: 8 }}>
            {group.title}
            <span style={{ height: 1, flex: 1, background: 'var(--border)' }} />
          </h2>
          <div className="stats-grid" style={{ marginBottom: 0 }}>
            {group.entities.map((e) => (
              <Link key={e.key} to={`/admin/data/${e.key}`} className="stat-card" style={{ textDecoration: 'none' }}>
                <span className="stat-icon"><e.icon size={21} /></span>
                <div>
                  <div className="stat-value">{count(e.key)}</div>
                  <div className="stat-label">{e.label}</div>
                </div>
                <ArrowRight size={15} style={{ marginLeft: 'auto', color: 'var(--text-muted)' }} />
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
