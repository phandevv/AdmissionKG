import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Network,
  Search,
  Award,
  Compass,
  LayoutDashboard,
  Database,
  LogOut,
  UserCheck,
  ShieldCheck,
  Layers,
  BarChart3
} from 'lucide-react';
import { useAuth } from '../auth/AuthContext';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAdmin } = useAuth();
  const p = location.pathname;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const initials = (user?.fullName || user?.email || '?')
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/dashboard" className="nav-brand">
          <span className="brand-logo"><Network size={20} /></span>
          <span className="brand-text">
            <span>Admission<strong style={{ color: 'var(--primary-strong)' }}>KG</strong></span>
            <small>Tri thức Tuyển sinh Đại học</small>
          </span>
        </Link>

        <span className={`badge-portal ${isAdmin ? 'admin' : 'user'}`}>
          {isAdmin ? <ShieldCheck size={12} /> : <UserCheck size={12} />}
          {isAdmin ? 'Quản trị' : 'Thí sinh'}
        </span>
      </div>

      <div className="nav-links">
        <Link to="/dashboard" className={`nav-item ${p === '/dashboard' ? 'active' : ''}`}>
          <LayoutDashboard className="nav-icon" /><span>Tổng quan</span>
        </Link>
        <Link to="/combinations" className={`nav-item ${p === '/combinations' ? 'active' : ''}`}>
          <Layers className="nav-icon" /><span>Tổ hợp môn</span>
        </Link>
        <Link to="/scores" className={`nav-item ${p === '/scores' || p === '/score-analytics' ? 'active' : ''}`}>
          <BarChart3 className="nav-icon" /><span>Phổ điểm THPT</span>
        </Link>
        <Link to="/search" className={`nav-item ${p === '/search' ? 'active' : ''}`}>
          <Search className="nav-icon" /><span>Tra cứu Tuyển sinh</span>
        </Link>
        <Link to="/wishes" className={`nav-item ${p === '/wishes' ? 'active' : ''}`}>
          <Award className="nav-icon" /><span>Nguyện vọng & TWD</span>
        </Link>
        <Link to="/explore" className={`nav-item ${p === '/explore' ? 'active' : ''}`}>
          <Compass className="nav-icon" /><span>Khám phá Đồ thị</span>
        </Link>
        {isAdmin && (
          <Link to="/admin" className={`nav-item ${p.startsWith('/admin') ? 'active' : ''}`}>
            <Database className="nav-icon" /><span>Quản trị Dữ liệu</span>
          </Link>
        )}
      </div>

      <div className="nav-right">
        {user && (
          <Link
            to="/profile"
            className={`nav-user ${p === '/profile' ? 'active' : ''}`}
            title="Xem hồ sơ cá nhân & điểm học bạ"
          >
            <span className="nav-user-avatar">{initials}</span>
            <span className="nav-user-info">
              <span className="nav-user-name">{user.fullName}</span>
              <span className="nav-user-role">{user.role}</span>
            </span>
          </Link>
        )}
        <button className="btn-icon" title="Đăng xuất" onClick={handleLogout}>
          <LogOut size={16} />
        </button>
      </div>
    </nav>
  );
}
