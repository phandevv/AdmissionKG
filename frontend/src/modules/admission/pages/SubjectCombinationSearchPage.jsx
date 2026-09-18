import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Search,
  Filter,
  X,
  Sparkles,
  BookOpen,
  GraduationCap,
  Atom,
  HeartPulse,
  Languages,
  Cpu,
  Palette,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import { subjectCombinationsApi } from '../../shared/services/api';
import { CATEGORIES, POPULAR_SUBJECTS } from '../data/combinationsData';

const ICONS = {

  Sparkles,
  Atom,
  HeartPulse,
  BookOpen,
  Languages,
  Cpu,
  Palette,
};

// Helper to determine category styling & label from code
const getCategoryInfo = (code = '') => {
  if (code.startsWith('A')) return { cat: 'A', label: 'Khối A (Tự nhiên)', badgeClass: 'badge-block-a' };
  if (code.startsWith('B')) return { cat: 'B', label: 'Khối B (Y sinh)', badgeClass: 'badge-block-b' };
  if (code.startsWith('C')) return { cat: 'C', label: 'Khối C (Xã hội)', badgeClass: 'badge-block-c' };
  if (code.startsWith('D')) return { cat: 'D', label: 'Khối D (Ngoại ngữ)', badgeClass: 'badge-block-d' };
  if (code.startsWith('X')) return { cat: 'X', label: 'Khối X (GDPT 2018)', badgeClass: 'badge-block-x' };
  if (code.startsWith('H')) return { cat: 'NangKhieu', label: 'Khối H (Mỹ thuật)', badgeClass: 'badge-block-nk' };
  if (code.startsWith('M')) return { cat: 'NangKhieu', label: 'Khối M (Mầm non)', badgeClass: 'badge-block-nk' };
  if (code.startsWith('N')) return { cat: 'NangKhieu', label: 'Khối N (Âm nhạc)', badgeClass: 'badge-block-nk' };
  if (code.startsWith('R') || code.startsWith('S')) return { cat: 'NangKhieu', label: 'Khối R/S (Báo chí - Nghệ thuật)', badgeClass: 'badge-block-nk' };
  if (code.startsWith('T')) return { cat: 'NangKhieu', label: 'Khối T (Thể dục thể thao)', badgeClass: 'badge-block-nk' };
  if (code.startsWith('V')) return { cat: 'NangKhieu', label: 'Khối V (Kiến trúc)', badgeClass: 'badge-block-nk' };
  return { cat: 'NangKhieu', label: 'Khối Năng khiếu', badgeClass: 'badge-block-nk' };
};

export default function SubjectCombinationSearchPage() {
  const navigate = useNavigate();

  // Filter & Pagination States
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(15);

  // In-memory cache & race condition tracking for butter-smooth transitions
  const cacheRef = useRef(new Map());
  const requestIdRef = useRef(0);

  // Data states
  const [pageData, setPageData] = useState({
    content: [],
    page: 0,
    size: 15,
    totalElements: 0,
    totalPages: 0,
    first: true,
    last: true,
  });
  const [categoryCounts, setCategoryCounts] = useState({
    all: 0,
    a: 0,
    b: 0,
    c: 0,
    d: 0,
    x: 0,
    nangKhieu: 0,
  });

  // Loading flags: initial vs background fetching
  const [initialLoading, setInitialLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  // Debounce keyword input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedKeyword(keyword.trim());
      setPage(0);
    }, 300);
    return () => clearTimeout(handler);
  }, [keyword]);

  // Load category counts once on mount
  useEffect(() => {
    let isMounted = true;
    subjectCombinationsApi
      .categoryCounts()
      .then((counts) => {
        if (isMounted && counts) {
          setCategoryCounts(counts);
        }
      })
      .catch((err) => {
        console.warn('Could not load category counts:', err);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Fetch paginated data with instant SWR cache lookup
  const fetchPage = useCallback(async () => {
    const cacheKey = `${activeCategory}_${page}_${pageSize}_${debouncedKeyword}_${selectedSubject}`;

    // 1. Instant Cache hit: Swap instantly without layout shift or wait
    if (cacheRef.current.has(cacheKey)) {
      setPageData(cacheRef.current.get(cacheKey));
      setInitialLoading(false);
      setIsFetching(false);
      return;
    }

    // 2. Cache miss: Show sleek top progress bar without unmounting table
    setIsFetching(true);
    setError(null);
    const currentReqId = ++requestIdRef.current;

    try {
      const res = await subjectCombinationsApi.page({
        page,
        size: pageSize,
        keyword: debouncedKeyword || undefined,
        category: activeCategory !== 'ALL' ? activeCategory : undefined,
        subject: selectedSubject || undefined,
      });

      // Avoid out-of-order race conditions from rapid tab clicks
      if (currentReqId !== requestIdRef.current) return;

      if (res) {
        cacheRef.current.set(cacheKey, res);
        setPageData(res);
      }
    } catch (err) {
      if (currentReqId !== requestIdRef.current) return;
      setError(err.userMessage || 'Không thể tải danh sách tổ hợp môn. Vui lòng thử lại.');
    } finally {
      if (currentReqId === requestIdRef.current) {
        setIsFetching(false);
        setInitialLoading(false);
      }
    }
  }, [page, pageSize, debouncedKeyword, activeCategory, selectedSubject]);

  useEffect(() => {
    fetchPage();
  }, [fetchPage]);

  // Handle Tab Switch (ignore if already active)
  const handleCategoryChange = (catId) => {
    if (catId === activeCategory) return;
    setActiveCategory(catId);
    setPage(0);
  };

  // Handle Subject Chip
  const handleSubjectToggle = (subName) => {
    setSelectedSubject((prev) => (prev === subName ? '' : subName));
    setPage(0);
  };

  // Reset Filters
  const handleClearFilters = () => {
    setKeyword('');
    setDebouncedKeyword('');
    setActiveCategory('ALL');
    setSelectedSubject('');
    setPage(0);
  };

  // Count helper for category badges
  const getCategoryCount = (catId) => {
    switch (catId) {
      case 'ALL':
        return categoryCounts.all || 0;
      case 'A':
        return categoryCounts.a || 0;
      case 'B':
        return categoryCounts.b || 0;
      case 'C':
        return categoryCounts.c || 0;
      case 'D':
        return categoryCounts.d || 0;
      case 'X':
        return categoryCounts.x || 0;
      case 'NangKhieu':
        return categoryCounts.nangKhieu || 0;
      default:
        return 0;
    }
  };

  // Pagination calculation
  const totalElements = pageData.totalElements || 0;
  const totalPages = pageData.totalPages || 0;
  const fromRecord = totalElements === 0 ? 0 : page * pageSize + 1;
  const toRecord = Math.min((page + 1) * pageSize, totalElements);

  // Generate pagination buttons with ellipsis
  const renderPaginationButtons = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisible = 5;

    let start = Math.max(0, page - 2);
    let end = Math.min(totalPages - 1, page + 2);

    if (page < 2) {
      end = Math.min(totalPages - 1, maxVisible - 1);
    } else if (page > totalPages - 3) {
      start = Math.max(0, totalPages - maxVisible);
    }

    if (start > 0) {
      pages.push(
        <button
          key={0}
          type="button"
          className={`pagination-btn ${page === 0 ? 'active' : ''}`}
          onClick={() => setPage(0)}
        >
          1
        </button>
      );
      if (start > 1) {
        pages.push(<span key="ell-1" className="pagination-ellipsis">...</span>);
      }
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          type="button"
          className={`pagination-btn ${page === i ? 'active' : ''}`}
          onClick={() => setPage(i)}
        >
          {i + 1}
        </button>
      );
    }

    if (end < totalPages - 1) {
      if (end < totalPages - 2) {
        pages.push(<span key="ell-2" className="pagination-ellipsis">...</span>);
      }
      pages.push(
        <button
          key={totalPages - 1}
          type="button"
          className={`pagination-btn ${page === totalPages - 1 ? 'active' : ''}`}
          onClick={() => setPage(totalPages - 1)}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className="page combo-search-page">
      {/* Top Navigation Switcher */}
      <div className="search-mode-tabs">
        <button
          type="button"
          className="search-mode-tab active"
          onClick={() => {}}
        >
          <Layers size={18} />
          <span>Danh mục & Tra cứu Tổ hợp Môn (191 khối)</span>
        </button>
        <button
          type="button"
          className="search-mode-tab"
          onClick={() => navigate('/search')}
        >
          <GraduationCap size={18} />
          <span>Tra cứu Ngành & Điểm chuẩn Tuyển sinh</span>
        </button>
      </div>

      {/* Hero Header */}
      <div className="combo-hero">
        <div className="combo-hero-badge">
          <Sparkles size={14} />
          <span>Hệ thống Khám phá Tri thức Tuyển sinh THPT 2026</span>
        </div>
        <h1 className="combo-hero-title">
          Danh Sách Tất Cả Các Tổ Hợp Môn Thi & Xét Tuyển Đại Học
        </h1>
        <p className="combo-hero-subtitle">
          Tra cứu nhanh chóng 191 tổ hợp môn theo từng khối thi (A, B, C, D, X, Năng khiếu) và môn xét tuyển chi tiết theo quy chế tuyển sinh.
        </p>

        {/* Live Search Bar */}
        <div className="combo-search-box-wrapper">
          <div className="combo-search-box">
            <Search className="combo-search-icon" size={20} />
            <input
              type="text"
              className="combo-search-input"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Nhập mã tổ hợp (A00, D01, X06...) hoặc tên môn xét tuyển (Tin học, Tiếng Anh, Vẽ...)"
            />
            {keyword && (
              <button
                type="button"
                className="combo-clear-btn"
                onClick={() => setKeyword('')}
                title="Xóa tìm kiếm"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="combo-category-bar">
        <div className="combo-categories-scroll">
          {CATEGORIES.map((cat) => {
            const IconComponent = ICONS[cat.icon] || Sparkles;
            const isActive = activeCategory === cat.id;
            const count = getCategoryCount(cat.id);
            return (
              <button
                key={cat.id}
                type="button"
                className={`combo-category-btn ${isActive ? 'active' : ''}`}
                onClick={() => handleCategoryChange(cat.id)}
              >
                <IconComponent size={16} className="combo-cat-icon" />
                <span>{cat.label}</span>
                <span className="combo-cat-count">{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Quick Filter Chips */}
      <div className="combo-quick-filters">
        <span className="combo-filter-label">
          <Filter size={14} /> Lọc nhanh theo môn:
        </span>
        <div className="combo-chips-list">
          {POPULAR_SUBJECTS.map((sub) => {
            const isSelected = selectedSubject === sub.name;
            return (
              <button
                key={sub.code}
                type="button"
                className={`combo-chip ${isSelected ? 'active' : ''}`}
                onClick={() => handleSubjectToggle(sub.name)}
              >
                <span>{sub.name}</span>
                {isSelected && <X size={12} />}
              </button>
            );
          })}
          {(keyword || selectedSubject || activeCategory !== 'ALL') && (
            <button
              type="button"
              className="combo-chip combo-chip-reset"
              onClick={handleClearFilters}
            >
              <span>Xóa bộ lọc</span>
            </button>
          )}
        </div>
      </div>

      {/* Control Toolbar: Stats */}
      <div className="combo-toolbar">
        <div className="combo-stats">
          Tìm thấy <strong>{totalElements}</strong> tổ hợp môn phù hợp
          {activeCategory !== 'ALL' && (
            <span className="combo-active-filter-tag">
              • Khối: {CATEGORIES.find((c) => c.id === activeCategory)?.label}
            </span>
          )}
          {selectedSubject && (
            <span className="combo-active-filter-tag">
              • Chứa môn: {selectedSubject}
            </span>
          )}
          {debouncedKeyword && (
            <span className="combo-active-filter-tag">
              • Từ khóa: "{debouncedKeyword}"
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      {initialLoading && pageData.content.length === 0 ? (
        <div className="state-block">
          <div className="spinner" />
          <h4>Đang nạp dữ liệu tổ hợp môn...</h4>
        </div>
      ) : error && pageData.content.length === 0 ? (
        <div className="alert alert-error">
          <p>{error}</p>
          <button type="button" className="btn btn-sm btn-primary" onClick={fetchPage}>
            Thử lại
          </button>
        </div>
      ) : pageData.content.length === 0 ? (
        <div className="combo-empty-state">
          <div className="combo-empty-icon">
            <Search size={40} />
          </div>
          <h3>Không tìm thấy tổ hợp môn phù hợp</h3>
          <p>
            Không có kết quả nào khớp với điều kiện tìm kiếm hiện tại. Bạn vui lòng thử tìm kiếm bằng từ khóa khác hoặc xóa bộ lọc.
          </p>
          <button type="button" className="btn btn-primary" onClick={handleClearFilters}>
            Xem tất cả 191 tổ hợp
          </button>
        </div>
      ) : (
        /* CARDS GRID VIEW - MẶC ĐỊNH & DUY NHẤT */
        <div className={`combo-cards-wrapper ${isFetching ? 'is-fetching' : ''}`}>
          {isFetching && <div className="combo-loading-bar" />}
          <div className="combo-cards-grid">
            {pageData.content.map((item, idx) => {
              const catInfo = getCategoryInfo(item.combinationCode);
              const subjectsList =
                Array.isArray(item.subjects) && item.subjects.length > 0
                  ? item.subjects
                  : (item.combinationName || '')
                      .split(',')
                      .map((s) => ({ subjectName: s.trim(), subjectCategory: 'Văn hóa' }));

              return (
                <div key={item.combinationCode} className="combo-card">
                  <div className="combo-card-header">
                    <div className="combo-card-left">
                      <span className={`combo-code-badge ${catInfo.badgeClass}`}>
                        {item.combinationCode}
                      </span>
                      <span className="combo-card-subcat">{catInfo.label}</span>
                    </div>
                    <span className="combo-card-stt-badge">
                      #{page * pageSize + idx + 1}
                    </span>
                  </div>

                  <div className="combo-card-subjects">
                    <span className="combo-card-label">Môn xét tuyển:</span>
                    <div className="combo-subject-tags">
                      {subjectsList.map((sub, sIdx) => {
                        const cat = sub.subjectCategory || '';
                        const isLang =
                          cat === 'Ngoại ngữ' ||
                          sub.subjectName.toLowerCase().includes('tiếng') ||
                          sub.subjectName.toLowerCase().includes('ngoại ngữ');
                        const isArt =
                          cat === 'Năng khiếu' ||
                          sub.subjectName.toLowerCase().includes('vẽ') ||
                          sub.subjectName.toLowerCase().includes('hát') ||
                          sub.subjectName.toLowerCase().includes('nhạc') ||
                          sub.subjectName.toLowerCase().includes('thể thao');
                        const isMix =
                          cat === 'Bài thi tổng hợp' ||
                          sub.subjectName.toLowerCase().includes('khoa học');

                        const tagClass = isLang
                          ? 'tag-lang'
                          : isArt
                          ? 'tag-art'
                          : isMix
                          ? 'tag-mix'
                          : 'tag-core';

                        const isFiltered = selectedSubject === sub.subjectName;

                        return (
                          <span
                            key={sIdx}
                            className={`combo-sub-tag ${tagClass} ${isFiltered ? 'is-active-filter' : ''}`}
                            onClick={() => handleSubjectToggle(sub.subjectName)}
                            title={`Bấm để lọc theo môn ${sub.subjectName}`}
                            style={{ cursor: 'pointer' }}
                          >
                            {sub.subjectName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Controls for Cards View */}
          <div className="pagination-bar combo-cards-pagination">
            <div className="pagination-info">
              Hiển thị <strong>{fromRecord}</strong> - <strong>{toRecord}</strong> trong tổng số <strong>{totalElements}</strong> tổ hợp môn
            </div>

            <div className="pagination-actions">
              <div className="pagination-size-select">
                <span>Số lượng:</span>
                <select
                  className="pagination-select"
                  value={pageSize}
                  onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPage(0);
                  }}
                >
                  <option value={12}>12 thẻ / trang</option>
                  <option value={15}>15 thẻ / trang</option>
                  <option value={24}>24 thẻ / trang</option>
                  <option value={48}>48 thẻ / trang</option>
                </select>
              </div>

              <div className="pagination-nav">
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setPage(0)}
                  disabled={page === 0}
                  title="Trang đầu"
                >
                  <ChevronsLeft size={16} />
                </button>
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  title="Trang trước"
                >
                  <ChevronLeft size={16} />
                </button>

                {renderPaginationButtons()}

                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                  disabled={page >= totalPages - 1}
                  title="Trang sau"
                >
                  <ChevronRight size={16} />
                </button>
                <button
                  type="button"
                  className="pagination-btn"
                  onClick={() => setPage(totalPages - 1)}
                  disabled={page >= totalPages - 1}
                  title="Trang cuối"
                >
                  <ChevronsRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
