import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Network, Search, Award, Compass, LogIn, Loader2, Lock, Mail } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';


export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(form);
      navigate(location.state?.from || '/dashboard', { replace: true });
    } catch (err) {
      setError(err.userMessage || 'Đăng nhập thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="auth-hero-content">
          <div className="auth-hero-logo"><Network size={28} /></div>
          <h1>Hệ thống Tri thức <em>Tuyển sinh Đại học</em> thông minh</h1>
          <p>
            Tra cứu điểm chuẩn, quản lý danh sách nguyện vọng và nhận đánh giá rủi ro
            theo mô hình Quyết định ba nhánh (Three-Way Decision) trên dữ liệu tuyển sinh chính thống.
          </p>
          <div className="auth-hero-points">
            <div className="auth-hero-point">
              <span className="auth-hero-point-icon"><Search size={17} /></span>
              <div>
                <strong>Tra cứu Tuyển sinh realtime</strong>
                <span>Điểm chuẩn, chỉ tiêu, tổ hợp môn từ PostgreSQL</span>
              </div>
            </div>
            <div className="auth-hero-point">
              <span className="auth-hero-point-icon"><Award size={17} /></span>
              <div>
                <strong>Đánh giá Nguyện vọng TWD</strong>
                <span>Phân loại 3 vùng: An toàn – Cân nhắc – Rủi ro</span>
              </div>
            </div>
            <div className="auth-hero-point">
              <span className="auth-hero-point-icon"><Compass size={17} /></span>
              <div>
                <strong>Khám phá Đồ thị Tri thức</strong>
                <span>Trường → Ngành → Tổ hợp → Nghề nghiệp</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <h2>Đăng nhập</h2>
          <p className="auth-sub">Xác thực bằng email và mật khẩu — bảo vệ bằng JWT Bearer token.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email <span className="req">*</span></label>
              <div className="input-icon-wrap">
                <Mail size={16} />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="VD: nguyen.van.a@example.com"
                  value={form.email}
                  onChange={set('email')}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Mật khẩu <span className="req">*</span></label>
              <div className="input-icon-wrap">
                <Lock size={16} />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu"
                  value={form.password}
                  onChange={set('password')}
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? <Loader2 size={17} className="animate-spin" /> : <LogIn size={17} />}
              {loading ? 'Đang xác thực...' : 'Đăng nhập'}
            </button>
          </form>

          <p className="auth-switch">
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
