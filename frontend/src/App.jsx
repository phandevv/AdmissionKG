import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './modules/shared/auth/AuthContext';
import Navbar from './modules/shared/components/Navbar';
import ProtectedRoute from './modules/shared/components/ProtectedRoute';

import LoginPage from './modules/shared/pages/LoginPage';
import RegisterPage from './modules/shared/pages/RegisterPage';

import DashboardPage from './modules/dashboard/pages/DashboardPage';
import AdmissionSearchPage from './modules/admission/pages/AdmissionSearchPage';
import SubjectCombinationSearchPage from './modules/admission/pages/SubjectCombinationSearchPage';
import UserWishesTwdPage from './modules/user/pages/UserWishesTwdPage';
import KnowledgeGraphExplorePage from './modules/explore/pages/KnowledgeGraphExplorePage';
import ProfilePage from './modules/user/pages/ProfilePage';
import ScoreAnalyticsPage from './modules/score-analytics/pages/ScoreAnalyticsPage';

import AdminOverviewPage from './modules/admin/pages/AdminOverviewPage';
import AdminCrudPage from './modules/admin/pages/AdminCrudPage';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth - không có Navbar */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Khu vực đã đăng nhập - có Navbar */}
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <div className="app-container">
                  <Navbar />
                  <main className="main-content page-scroll">
                    <Routes>
                      <Route path="/" element={<Navigate to="/dashboard" replace />} />
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/scores" element={<ScoreAnalyticsPage />} />
                      <Route path="/score-analytics" element={<ScoreAnalyticsPage />} />
                      <Route path="/combinations" element={<SubjectCombinationSearchPage />} />
                      <Route path="/search" element={<AdmissionSearchPage />} />
                      <Route path="/wishes" element={<UserWishesTwdPage />} />
                      <Route path="/explore" element={<KnowledgeGraphExplorePage />} />
                      <Route path="/profile" element={<ProfilePage />} />

                      {/* Quản trị dữ liệu - yêu cầu ROLE_ADMIN */}
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute adminOnly>
                            <AdminOverviewPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route
                        path="/admin/data/:entityKey"
                        element={
                          <ProtectedRoute adminOnly>
                            <AdminCrudPage />
                          </ProtectedRoute>
                        }
                      />
                      <Route path="/admin" element={<Navigate to="/admin" replace />} />

                      <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </Routes>
                  </main>
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
