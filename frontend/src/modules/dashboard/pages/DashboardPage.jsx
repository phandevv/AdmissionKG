import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Award,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ArrowRight,
  BookOpen,
  GraduationCap,
  Compass,
  Search,
  MessageSquare,
  FileText,
  Zap,
  Target,
  ShieldCheck,
  Smile,
  Heart,
  MapPin,
} from 'lucide-react';
import { useAuth } from '../../shared/auth/AuthContext';
import useApiData from '../../shared/hooks/useApiData';
import { academicProfilesApi } from '../../shared/services/api';

export default function DashboardPage() {
  const { user } = useAuth();
  const studentName = user?.fullName || 'bạn';

  const { data } = useApiData({
    profiles: () => (user?.id ? academicProfilesApi.list({ userId: user.id }) : Promise.resolve([])),
  });

  const myProfile = useMemo(() => {
    return Array.isArray(data.profiles) ? data.profiles.find((p) => p.userId === user?.id) : null;
  }, [data.profiles, user?.id]);

  const locationLabel = myProfile?.provinceCity
    ? `${myProfile.provinceCity}${myProfile.region ? ` (${myProfile.region})` : ''}`
    : myProfile?.region || null;

  return (
    <div className="page student-friendly-landing">
      {/* 1. Hero Thân Thiện Chào Đón Học Sinh */}
      <section className="student-hero-box card-surface">
        <div className="student-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap', marginBottom: 12 }}>
            <div className="hero-friendly-badge" style={{ marginBottom: 0 }}>
              <Sparkles size={15} /> Dành Cho Học Sinh Lớp 12 & Thí Sinh Tuyển Sinh 2026
            </div>
            {locationLabel && (
              <span className="pill plain" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '4px 10px', fontSize: '0.8rem', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.25)', borderRadius: 20 }}>
                <MapPin size={13} />
                <strong>{locationLabel}</strong>
              </span>
            )}
          </div>

          <h1 className="student-hero-title">
            Chào {studentName}! Bạn Đang Chuẩn Bị <br />
            <span className="text-highlight">Xét Tuyển Đại Học?</span>
          </h1>

          <p className="student-hero-sub">
            <strong>AdmissionKG</strong> là người bạn đồng hành giúp bạn <strong>tính nhanh điểm hơn 40 khối thi</strong>, <strong>tìm trường & ngành phù hợp</strong> và <strong>xếp nguyện vọng thông minh</strong> để nắm chắc tấm vé vào Đại học mà không lo bị trượt oan!
          </p>

          <div className="student-hero-buttons">
            <Link to="/profile" className="btn btn-primary btn-lg">
              <FileText size={18} />
              <span>1. Nhập Điểm Của Bạn Ngay</span>
              <ArrowRight size={16} />
            </Link>
            <Link to="/search" className="btn btn-secondary btn-lg">
              <Search size={18} />
              <span>2. Tra Cứu Ngành & Điểm Chuẩn</span>
            </Link>
            <Link to="/wishes" className="btn btn-ghost btn-lg">
              <Award size={18} />
              <span>3. Xếp Nguyện Vọng An Toàn</span>
            </Link>
            <Link to="/chat" className="btn btn-ghost btn-lg">
              <MessageSquare size={18} />
              <span>Hỏi Trợ Lý AI</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Hệ Thống Giúp Được Gì Cho Bạn? (4 Lợi Ích Cực Thiết Thực) */}
      <section className="student-friendly-section">
        <div className="friendly-section-heading">
          <span className="friendly-sub-label">Trải Nghiệm Dễ Dàng</span>
          <h2 className="friendly-title">Hệ Thống Giúp Bạn Những Gì?</h2>
          <p className="friendly-desc">
            Không cần tính toán thủ công phức tạp, hệ thống tự động làm mọi việc giúp bạn.
          </p>
        </div>

        <div className="friendly-features-grid">
          {/* Lợi ích 1 */}
          <div className="friendly-feature-card card-surface">
            <div className="friendly-card-icon blue">
              <Zap size={26} />
            </div>
            <h3 className="card-title">Tự Tính Điểm 40+ Khối Thi</h3>
            <p className="card-desc">
              Chỉ cần nhập điểm một lần (Học bạ hoặc Điểm thi TN THPT), hệ thống tự động tính điểm tất cả các khối (A00, A01, B00, C00, D01, X01...) và tìm ra khối bạn đạt điểm cao nhất.
            </p>
            <Link to="/profile" className="card-action-link">
              Nhập điểm để xem các khối <ArrowRight size={14} />
            </Link>
          </div>

          {/* Lợi ích 2 */}
          <div className="friendly-feature-card card-surface">
            <div className="friendly-card-icon green">
              <ShieldCheck size={26} />
            </div>
            <h3 className="card-title">Chiến Lược Xếp Nguyện Vọng An Toàn</h3>
            <p className="card-desc">
              Hệ thống tự động so sánh điểm của bạn với điểm chuẩn các trường và chia nguyện vọng thành 3 nhóm (Thử sức – Vừa sức – Chắc đỗ) để bạn không bao giờ bị trượt Đại học.
            </p>
            <Link to="/wishes" className="card-action-link">
              Xem cách xếp nguyện vọng <ArrowRight size={14} />
            </Link>
          </div>

          {/* Lợi ích 3 */}
          <div className="friendly-feature-card card-surface">
            <div className="friendly-card-icon purple">
              <Search size={26} />
            </div>
            <h3 className="card-title">Tra Cứu Trường & Ngành Nhanh Gọn</h3>
            <p className="card-desc">
              Tìm kiếm thông tin các trường Đại học, điểm chuẩn năm trước, chỉ tiêu xét tuyển và tổ hợp môn chấp nhận theo ngành học bạn yêu thích.
            </p>
            <Link to="/search" className="card-action-link">
              Khám phá ngành học <ArrowRight size={14} />
            </Link>
          </div>

          {/* Lợi ích 4 */}
          <div className="friendly-feature-card card-surface">
            <div className="friendly-card-icon amber">
              <MessageSquare size={26} />
            </div>
            <h3 className="card-title">Hỏi Bất Cứ Điều Gì Với Trợ Lý AI</h3>
            <p className="card-desc">
              Bạn phân vân về học phí, cơ hội việc làm sau khi tốt nghiệp, hoặc cách tính điểm ưu tiên? Trợ lý AI sẵn sàng giải đáp ngay tức thì cho bạn 24/7.
            </p>
            <Link to="/chat" className="card-action-link">
              Trò chuyện cùng AI <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Mẹo Xếp Nguyện Vọng Đơn Giản Cho Học Sinh Cấp 3 */}
      <section className="student-friendly-section">
        <div className="strategy-simple-card card-surface">
          <div className="strategy-badge">
            <Target size={16} /> Bí Quyết Đặt Nguyện Vọng Chắc Đỗ
          </div>
          <h2 className="strategy-title">
            Công Thức Xếp Nguyện Vọng 3 Nhóm (Ai Cũng Áp Dụng Được)
          </h2>
          <p className="strategy-subtitle">
            Quy chế tuyển sinh hiện nay cho phép bạn đăng ký nhiều nguyện vọng và xét tuyển từ trên xuống dưới. Vì vậy, hãy chia danh sách nguyện vọng thành 3 nhóm sau:
          </p>

          <div className="strategy-groups-grid">
            {/* Nhóm 1 */}
            <div className="strategy-group-box neg">
              <div className="group-header">
                <div className="group-icon neg">
                  <Flame size={20} />
                </div>
                <div>
                  <h4 className="group-name">1. Nhóm Thử Sức (Ước Mơ)</h4>
                  <span className="group-tag neg">Đặt ở NV1, NV2</span>
                </div>
              </div>
              <p className="group-desc">
                Là những trường/ngành bạn cực kỳ yêu thích nhưng điểm chuẩn năm trước cao hơn điểm của bạn một chút.
              </p>
              <div className="group-advice">
                💡 <strong>Mẹo:</strong> Hãy cứ tự tin đặt ở nguyện vọng đầu, nếu không đỗ bạn vẫn được xét các nguyện vọng dưới bình đẳng như nhau!
              </div>
            </div>

            {/* Nhóm 2 */}
            <div className="strategy-group-box bnd">
              <div className="group-header">
                <div className="group-icon bnd">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h4 className="group-name">2. Nhóm Vừa Sức (Trọng Tâm)</h4>
                  <span className="group-tag bnd">Nên chọn nhiều nhất (~50%)</span>
                </div>
              </div>
              <p className="group-desc">
                Là những ngành có điểm chuẩn năm trước tương đương hoặc xấp xỉ điểm thi / điểm học bạ của bạn.
              </p>
              <div className="group-advice">
                💡 <strong>Mẹo:</strong> Đây là nhóm bạn có cơ hội đỗ cao nhất, hãy chọn những ngành bạn thực sự muốn học.
              </div>
            </div>

            {/* Nhóm 3 */}
            <div className="strategy-group-box pos">
              <div className="group-header">
                <div className="group-icon pos">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="group-name">3. Nhóm An Toàn (Chắc Đỗ)</h4>
                  <span className="group-tag pos">Đặt ở các NV cuối</span>
                </div>
              </div>
              <p className="group-desc">
                Là những ngành mà điểm của bạn cao hơn điểm chuẩn năm trước từ 1 đến 2 điểm trở lên.
              </p>
              <div className="group-advice">
                💡 <strong>Mẹo:</strong> Đóng vai trò là "phao cứu sinh" để đảm bảo 100% bạn có một tấm vé bước vào cánh cổng Đại học!
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Quy Trình 3 Bước Đơn Giản */}
      <section className="student-friendly-section">
        <div className="friendly-section-heading">
          <span className="friendly-sub-label">Hướng Dẫn Nhanh</span>
          <h2 className="friendly-title">3 Bước Để Bắt Đầu Ngay</h2>
        </div>

        <div className="simple-steps-grid">
          <div className="simple-step-card card-surface">
            <div className="step-circle blue">1</div>
            <h4 className="step-heading">Nhập Điểm Của Bạn</h4>
            <p className="step-paragraph">
              Nhập điểm Học bạ (Toán, Văn, Anh...) hoặc Điểm thi Tốt nghiệp THPT để hệ thống nắm được năng lực của bạn.
            </p>
            <Link to="/profile" className="btn btn-primary btn-sm">
              Nhập Điểm Ngay
            </Link>
          </div>

          <div className="simple-step-card card-surface">
            <div className="step-circle purple">2</div>
            <h4 className="step-heading">Tìm Ngành Yêu Thích</h4>
            <p className="step-paragraph">
              Tra cứu các ngành học theo trường, xem khối xét tuyển và đối chiếu xem điểm của mình so với điểm chuẩn năm ngoái.
            </p>
            <Link to="/search" className="btn btn-secondary btn-sm">
              Tìm Ngành Học
            </Link>
          </div>

          <div className="simple-step-card card-surface">
            <div className="step-circle green">3</div>
            <h4 className="step-heading">Xem Độ An Toàn</h4>
            <p className="step-paragraph">
              Thêm ngành vào danh sách nguyện vọng, hệ thống sẽ gắn nhãn xanh/vàng/đỏ giúp bạn dễ dàng sắp xếp thứ tự ưu tiên.
            </p>
            <Link to="/wishes" className="btn btn-ghost btn-sm">
              Xếp Nguyện Vọng
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Khám Phá Thêm */}
      <section className="student-friendly-section">
        <div className="friendly-section-heading">
          <span className="friendly-sub-label">Công Cụ Hỗ Trợ</span>
          <h2 className="friendly-title">Bạn Muốn Khám Phá Điều Gì Tiếp Theo?</h2>
        </div>

        <div className="explore-links-grid">
          <Link to="/profile" className="explore-item-card card-surface">
            <div className="explore-icon-circle blue">
              <BookOpen size={22} />
            </div>
            <div>
              <h4 className="explore-name">Hồ Sơ Năng Lực & 40+ Khối Thi</h4>
              <p className="explore-sub">Xem bảng điểm chi tiết và các khối xét tuyển điểm cao nhất của bạn.</p>
            </div>
            <ArrowRight size={18} className="explore-arrow" />
          </Link>

          <Link to="/search" className="explore-item-card card-surface">
            <div className="explore-icon-circle purple">
              <Search size={22} />
            </div>
            <div>
              <h4 className="explore-name">Tra Cứu Trường & Ngành Học</h4>
              <p className="explore-sub">Khám phá thông tin đề án tuyển sinh, điểm chuẩn các trường toàn quốc.</p>
            </div>
            <ArrowRight size={18} className="explore-arrow" />
          </Link>

          <Link to="/wishes" className="explore-item-card card-surface">
            <div className="explore-icon-circle green">
              <Award size={22} />
            </div>
            <div>
              <h4 className="explore-name">Danh Sách Nguyện Vọng</h4>
              <p className="explore-sub">Sắp xếp các nguyện vọng theo 3 nhóm An toàn – Vừa sức – Thử sức.</p>
            </div>
            <ArrowRight size={18} className="explore-arrow" />
          </Link>

          <Link to="/chat" className="explore-item-card card-surface">
            <div className="explore-icon-circle cyan">
              <MessageSquare size={22} />
            </div>
            <div>
              <h4 className="explore-name">Trợ Lý AI Tư Vấn Tuyển Sinh</h4>
              <p className="explore-sub">Giải đáp mọi câu hỏi về ngành học, học phí, học bổng và cơ hội nghề nghiệp.</p>
            </div>
            <ArrowRight size={18} className="explore-arrow" />
          </Link>

          <Link to="/explore" className="explore-item-card card-surface">
            <div className="explore-icon-circle amber">
              <Compass size={22} />
            </div>
            <div>
              <h4 className="explore-name">Bản Đồ Ngành & Nghề Nghiệp</h4>
              <p className="explore-sub">Khám phá sơ đồ trực quan kết nối giữa ngành học và các công việc sau này.</p>
            </div>
            <ArrowRight size={18} className="explore-arrow" />
          </Link>
        </div>
      </section>
    </div>
  );
}
