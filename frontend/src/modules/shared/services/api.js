import axios from 'axios';

// In Docker: Nginx proxy routes /api → backend:8080
// In dev: Vite proxy (vite.config.js) routes /api → localhost:8080
const API_BASE_URL = '/api/v1';

const TOKEN_KEY = 'admissionkg_token';

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => {
  if (token) localStorage.setItem(TOKEN_KEY, token);
  else localStorage.removeItem(TOKEN_KEY);
};

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 30000,
});

// Gắn JWT vào mọi request
apiClient.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// 401 → phiên hết hạn: xóa token và đưa về trang đăng nhập
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const path = error.config?.url || '';
    const isAuthCall = path.includes('/auth/login') || path.includes('/auth/register') || path.includes('/auth/me');
    if (status === 401 && !isAuthCall) {
      setToken(null);
      localStorage.removeItem('admissionkg_session');
      if (window.location.pathname !== '/login') window.location.replace('/login');
    }
    const apiMsg = error.response?.data?.message;
    const validation = error.response?.data?.validationErrors;
    if (!error.customHandled) {
      error.userMessage = apiMsg || (validation ? Object.values(validation).join('. ') : null) || error.message;
    }
    return Promise.reject(error);
  }
);

// Envelope chuẩn của BE: { success, message, data, timestamp }
const unwrap = (res) => {
  if (res && res.data && res.data.success !== undefined) return res.data.data;
  return res?.data;
};

const wrapErr = (fn) => async (...args) => {
  try {
    return await fn(...args);
  } catch (err) {
    err.userMessage = err.userMessage || 'Không thể kết nối máy chủ. Vui lòng thử lại.';
    throw err;
  }
};

const crud = (basePath) => ({
  list: wrapErr(async (params = {}) => unwrap(await apiClient.get(basePath, { params }))),
  get: wrapErr(async (id) => unwrap(await apiClient.get(`${basePath}/${id}`))),
  create: wrapErr(async (data) => unwrap(await apiClient.post(basePath, data))),
  update: wrapErr(async (id, data) => unwrap(await apiClient.put(`${basePath}/${id}`, data))),
  remove: wrapErr(async (id) => unwrap(await apiClient.delete(`${basePath}/${id}`))),
});

// ─────────────────────────────────────────────
// 1. INSTITUTION MODULE
// ─────────────────────────────────────────────
export const institutionsApi = crud('/institutions');
export const campusesApi = crud('/campuses');
export const admissionSchemesApi = crud('/admission-schemes');
export const bonusPoliciesApi = crud('/bonus-policies');
export const universalConversionsApi = crud('/universal-conversions');

// ─────────────────────────────────────────────
// 2. MAJOR MODULE
// ─────────────────────────────────────────────
export const academicFieldsApi = crud('/academic-fields');
export const majorsApi = crud('/majors');

// ─────────────────────────────────────────────
// 3. SUBJECT MODULE
// ─────────────────────────────────────────────
export const subjectsApi = crud('/subjects');
export const subjectCombinationsApi = {
  ...crud('/subject-combinations'),
  page: wrapErr(async (params = {}) => unwrap(await apiClient.get('/subject-combinations/page', { params }))),
  categoryCounts: wrapErr(async () => unwrap(await apiClient.get('/subject-combinations/category-counts'))),
};

// ─────────────────────────────────────────────
// 4. ADMISSION MODULE
// ─────────────────────────────────────────────
export const admissionMethodsApi = crud('/admission-methods');
export const scoreFormulasApi = crud('/score-formulas');
export const admissionTracksApi = crud('/admission-tracks');
export const trackMethodCombinationsApi = crud('/track-method-combinations');
export const benchmarkQuotasApi = crud('/benchmarks-quotas');
export const eligibilityRulesApi = crud('/eligibility-rules');
export const tieBreakersApi = crud('/tie-breakers');

// ─────────────────────────────────────────────
// 5. CAREER MODULE
// ─────────────────────────────────────────────
export const careersApi = crud('/careers');

// TrackCareerMapping: khóa composite (trackId, careerId), POST là upsert, DELETE bằng query params
export const trackCareerMappingsApi = {
  list: wrapErr(async (params = {}) => unwrap(await apiClient.get('/track-career-mappings', { params }))),
  upsert: wrapErr(async (data) => unwrap(await apiClient.post('/track-career-mappings', data))),
  remove: wrapErr(async (trackId, careerId) =>
    unwrap(await apiClient.delete('/track-career-mappings', { params: { trackId, careerId } })),
  ),
};

// ─────────────────────────────────────────────
// 6. USER MODULE
// ─────────────────────────────────────────────
export const authApi = {
  register: wrapErr(async (data) => unwrap(await apiClient.post('/auth/register', data))),
  login: wrapErr(async (data) => unwrap(await apiClient.post('/auth/login', data))),
  me: wrapErr(async () => unwrap(await apiClient.get('/auth/me'))),
};

export const usersApi = crud('/users');
export const academicProfilesApi = crud('/academic-profiles');
export const userCombinationScoresApi = {
  ...crud('/user-combination-scores'),
  getByProfile: wrapErr(async (profileId, params = {}) =>
    unwrap(await apiClient.get(`/user-combination-scores/profile/${profileId}`, { params })),
  ),
};
export const wishesApi = crud('/wishes');

// TwdEvaluationLog: POST là upsert theo wishId
export const twdEvaluationLogsApi = {
  ...crud('/twd-evaluation-logs'),
  getByWish: wrapErr(async (wishId) => unwrap(await apiClient.get(`/twd-evaluation-logs/wish/${wishId}`))),
  upsert: wrapErr(async (data) => unwrap(await apiClient.post('/twd-evaluation-logs', data))),
};

// ─────────────────────────────────────────────
// 7. SYSTEM
// ─────────────────────────────────────────────
export const healthCheckApi = wrapErr(async () => {
  const response = await axios.get('/actuator/health', { timeout: 5000 });
  return response.data;
});

// Health check có gắn token (dùng trong khu vực đã đăng nhập)
export const authedHealthCheckApi = wrapErr(async () => {
  const response = await apiClient.get('/actuator/health', { timeout: 5000 });
  return response.data;
});
