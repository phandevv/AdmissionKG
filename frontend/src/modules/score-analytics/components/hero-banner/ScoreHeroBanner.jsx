import React from 'react';
import { Sparkles } from 'lucide-react';
import './ScoreHeroBanner.css';

/**
 * Component Banner mở đầu trang Tra cứu Điểm & Phổ điểm
 */
export default function ScoreHeroBanner() {
  return (
    <div className="score-hero-banner">
      <div className="score-hero-badge">
        <Sparkles size={14} /> Dữ liệu chuẩn hóa 1.13M thí sinh THPTQG 2026
      </div>
      <h1 className="score-hero-title">
        Tra cứu Điểm thi, Phổ điểm & Định vị Thứ hạng Toàn quốc
      </h1>
      <p className="score-hero-desc">
        Khám phá phổ điểm chuẩn xác của 11 môn thi và các tổ hợp xét tuyển theo{' '}
        <strong>Cả nước</strong>, <strong>3 Miền</strong> và{' '}
        <strong>34 Tỉnh/Thành phố</strong>. Định vị chính xác thứ hạng bản thân
        và số lượng thí sinh đạt điểm cao hơn hoặc bằng với độ trễ{' '}
        <strong>dưới 2ms</strong>.
      </p>
    </div>
  );
}
