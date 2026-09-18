import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Network, UserPlus, Loader2, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';



export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirmPassword) {
      setError('Mật khẩu nhập lại không khớp.');
      return;
    }
    if (form.password.length < 6) {
      setError('Mật khẩu tối thiểu 6 ký tự.');
      return;
    }
    setLoading(true);
    try {
      await register(form);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      setError(err.userMessage || 'Đăng ký thất bại.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-hero">
        <div className="auth-hero-content">
          <div className="auth-hero-logo"><Network size={28} /></div>
          <h1>Tạo tài khoản <em>thí sinh</em> của bạn</h1>
          <p>
            Sau khi đăng ký, bạn có thể nhập hồ sơ năng lực, lưu danh sách nguyện vọng
            và chạy phân tích rủi ro TWD trên dữ liệu tuyển sinh thật.
          </p>
        </div>
      </div>

      <div className="auth-panel">
        <div className="auth-card">
          <h2>Đăng ký</h2>
          <p className="auth-sub">Thông tin tài khoản được lưu trữ chính thức trong hệ thống.</p>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Họ và tên <span className="req">*</span></label>
              <div className="input-icon-wrap">
                <User size={16} />
                <input type="text" required placeholder="VD: Nguyễn Văn A" value={form.fullName} onChange={set('fullName')} />
              </div>
            </div>

            <div className="form-group">
              <label>Email <span className="req">*</span></label>
              <div className="input-icon-wrap">
                <Mail size={16} />
                <input type="email" required autoComplete="email" placeholder="VD: nguyen.van.a@example.com" value={form.email} onChange={set('email')} />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Mật khẩu <span className="req">*</span></label>
                <div className="input-icon-wrap">
                  <Lock size={16} />
                  <input type="password" required autoComplete="new-password" placeholder="Tối thiểu 6 ký tự" value={form.password} onChange={set('password')} />
                </div>
              </div>
              <div className="form-group">
                <label>Nhập lại mật khẩu <span className="req">*</span></label>
                <div className="input-icon-wrap">
                  <Lock size={16} />
                  <input type="password" required autoComplete="new-password" placeholder="Nhập lại mật khẩu" value={form.confirmPassword} onChange={set('confirmPassword')} />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
              {loading ? <Loader2 size={17} className="animate-spin" /> : <UserPlus size={17} />}
              {loading ? 'Đang tạo tài khoản...' : 'Tạo tài khoản'}
            </button>
          </form>

          <p className="auth-switch">
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
