import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, booting } = useAuth();
  const location = useLocation();

  // Đang kiểm tra phiên (token cũ) — chờ để tránh nhảy ra login sai
  if (booting && !user) {
    return (
      <div className="page">
        <div className="state-block"><div className="spinner" /><h4>Đang khôi phục phiên đăng nhập...</h4></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }
  if (adminOnly && user.role !== 'ROLE_ADMIN') {
    return (
      <div className="page">
        <div className="alert alert-error">
          <span>
            Khu vực này chỉ dành cho tài khoản vai trò <strong>ROLE_ADMIN</strong>.
            Vui lòng liên hệ quản trị viên để được cấp quyền.
          </span>
        </div>
      </div>
    );
  }
  return children;
}
