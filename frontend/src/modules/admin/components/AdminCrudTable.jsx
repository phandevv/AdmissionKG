import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus, RefreshCw, Pencil, Trash2, Search, ArrowLeft, AlertCircle, Loader2, Inbox,
} from 'lucide-react';
import { trackCareerMappingsApi, twdEvaluationLogsApi } from '../../shared/services/api';
import { ADMIN_ENTITIES } from '../adminEntities';

// API cho các khối có thao tác đặc biệt
const specialApis = {
  'track-career-mappings': {
    ...trackCareerMappingsApi,
    update: null,
    remove: (row) => trackCareerMappingsApi.remove(row.trackId, row.careerId),
  },
  'twd-evaluation-logs': {
    ...twdEvaluationLogsApi,
    update: null,
  },
};

export default function AdminCrudTable({ entityKey, config }) {
  const [rows, setRows] = useState([]);
  const [refs, setRefs] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notice, setNotice] = useState(null);
  const [keyword, setKeyword] = useState('');

  const [modal, setModal] = useState(null); // { mode: 'create'|'edit', values: {} }
  const [deleteRow, setDeleteRow] = useState(null);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState(null);

  const api = specialApis[entityKey] || config.api;

  const refKeys = useMemo(() => {
    const keys = new Set();
    config.fields.forEach((f) => { if (f.ref) keys.add(f.ref); });
    return [...keys];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityKey]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const list = await api.list();
      setRows(Array.isArray(list) ? list : []);
      const refData = {};
      await Promise.all(refKeys.map(async (rk) => {
        const refCfg = ADMIN_ENTITIES[rk];
        if (!refCfg) return;
        try {
          const data = await refCfg.api.list();
          refData[rk] = Array.isArray(data) ? data : [];
        } catch { refData[rk] = []; }
      }));
      setRefs(refData);
    } catch (err) {
      setError(err.userMessage || 'Không tải được dữ liệu.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [entityKey]);

  useEffect(() => { load(); }, [load]);

  const filtered = useMemo(() => {
    const kw = keyword.trim().toLowerCase();
    if (!kw) return rows;
    return rows.filter((r) =>
      config.columns.some((c) => String(r[c.key] ?? '').toLowerCase().includes(kw))
    );
  }, [rows, keyword, config.columns]);

  const openCreate = () => {
    const values = {};
    config.fields.forEach((f) => { values[f.key] = f.default ?? ''; });
    setFormError(null);
    setModal({ mode: 'create', values });
  };

  const openEdit = (row) => {
    const values = {};
    config.fields.forEach((f) => {
      const v = row[f.key];
      if (f.type === 'json') values[f.key] = v ? JSON.stringify(v, null, 2) : '';
      else if (f.type === 'list') values[f.key] = Array.isArray(v) ? v.join(', ') : (v ?? '');
      else values[f.key] = v ?? '';
    });
    setFormError(null);
    setModal({ mode: 'edit', values, row });
  };

  const buildPayload = (values) => {
    const payload = {};
    for (const f of config.fields) {
      const raw = values[f.key];
      if (f.type === 'json') {
        if (raw && String(raw).trim()) {
          try { payload[f.key] = JSON.parse(raw); }
          catch { throw new Error(`Trường "${f.label}" không phải JSON hợp lệ.`); }
        } else payload[f.key] = null;
      } else if (f.type === 'list') {
        payload[f.key] = raw ? String(raw).split(',').map((s) => s.trim()).filter(Boolean) : [];
      } else if (f.type === 'number') {
        payload[f.key] = raw === '' || raw == null ? null : Number(raw);
      } else if (f.ref) {
        payload[f.key] = raw === '' || raw == null ? null : String(raw);
      } else {
        payload[f.key] = raw === '' ? null : raw;
      }
    }
    return payload;
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!modal) return;
    setSaving(true);
    setFormError(null);
    try {
      const payload = buildPayload(modal.values);
      if (modal.mode === 'create') await api.create(payload);
      else if (api.update) await api.update(modal.row[config.idKey], payload);
      setNotice(modal.mode === 'create' ? 'Đã thêm bản ghi thành công.' : 'Đã cập nhật bản ghi.');
      setModal(null);
      load();
    } catch (err) {
      setFormError(err.message || err.userMessage || 'Lưu thất bại.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteRow) return;
    setSaving(true);
    try {
      if (config.specialDelete) await api.remove(deleteRow);
      else await api.remove(deleteRow[config.idKey]);
      setNotice('Đã xóa bản ghi.');
      setDeleteRow(null);
      load();
    } catch (err) {
      setNotice(null);
      setError(err.userMessage || 'Xóa thất bại.');
      setDeleteRow(null);
    } finally {
      setSaving(false);
    }
  };

  // Render giá trị ô bảng
  const renderCell = (row, col) => {
    const v = row[col.key];
    if (col.render) return col.render(v, row, refs);
    if (v == null || v === '') return <span className="cell-muted">—</span>;
    if (typeof v === 'object') return <span className="cell-muted">{JSON.stringify(v)}</span>;
    return String(v);
  };

  const Icon = config.icon;

  return (
    <>
      <div className="page-header">
        <div className="page-title">
          <span className="page-title-icon"><Icon size={21} /></span>
          <div>
            <h1>{config.label}</h1>
            <p className="page-subtitle">{config.description}</p>
          </div>
        </div>
        <div className="page-actions">
          <Link to="/admin" className="btn btn-ghost"><ArrowLeft size={15} /> Tổng quan</Link>
          <button className="btn btn-ghost" onClick={load} disabled={loading}>
            {loading ? <Loader2 size={15} className="animate-spin" /> : <RefreshCw size={15} />} Làm mới
          </button>
          {config.createable !== false && (
            <button className="btn btn-primary" onClick={openCreate}><Plus size={16} /> Thêm mới</button>
          )}
        </div>
      </div>

      {notice && <div className="alert alert-success">{notice}</div>}
      {error && <div className="alert alert-error"><AlertCircle size={16} /> {error}</div>}

      <div className="filter-bar">
        <div className="filter-search">
          <Search size={15} />
          <input
            placeholder={`Tìm trong ${config.label.toLowerCase()}...`}
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <span className="cell-muted">{filtered.length} bản ghi</span>
      </div>

      <div className="card">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {config.columns.map((c) => (
                  <th key={c.key} style={c.align ? { textAlign: c.align } : undefined}>{c.label}</th>
                ))}
                <th style={{ textAlign: 'center', width: 110 }}>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={config.columns.length + 1}>
                  <div className="state-block"><div className="spinner" /><h4>Đang tải dữ liệu...</h4></div>
                </td></tr>
              ) : filtered.length === 0 ? (
                <tr><td colSpan={config.columns.length + 1}>
                  <div className="state-block">
                    <Inbox size={40} />
                    <h4>Chưa có dữ liệu</h4>
                    <p>{config.createable !== false ? 'Nhấn "Thêm mới" để tạo bản ghi đầu tiên.' : 'Bảng này đang trống.'}</p>
                  </div>
                </td></tr>
              ) : filtered.map((row, i) => (
                <tr key={row[config.idKey] ?? i}>
                  {config.columns.map((c) => (
                    <td key={c.key} style={c.align ? { textAlign: c.align } : undefined}>
                      {renderCell(row, c)}
                    </td>
                  ))}
                  <td>
                    <div className="action-buttons-group">
                      {api.update && (
                        <button className="btn-icon" title="Sửa" onClick={() => openEdit(row)}><Pencil size={14} /></button>
                      )}
                      {config.deletable !== false && (
                        <button className="btn-icon danger" title="Xóa" onClick={() => setDeleteRow(row)}><Trash2 size={14} /></button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal thêm / sửa */}
      {modal && (
        <div className="modal-backdrop" onClick={() => setModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <form onSubmit={handleSave}>
              <div className="modal-header">
                <h3>{modal.mode === 'create' ? `Thêm ${config.label}` : `Sửa ${config.label}`}</h3>
                <button type="button" className="btn-icon" onClick={() => setModal(null)}>✕</button>
              </div>
              <div className="modal-body">
                {formError && <div className="alert alert-error">{formError}</div>}
                <div className="form-row">
                  {config.fields.map((f) => (
                    <div key={f.key} className="form-group" style={f.fullWidth ? { gridColumn: '1 / -1' } : undefined}>
                      <label>{f.label} {f.required && <span className="req">*</span>}</label>
                      {f.type === 'select' ? (
                        <select
                          value={modal.values[f.key] ?? ''}
                          required={f.required}
                          onChange={(e) => setModal({ ...modal, values: { ...modal.values, [f.key]: e.target.value } })}
                        >
                          <option value="">— Chọn —</option>
                          {f.options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                        </select>
                      ) : f.ref ? (
                        <RefSelect
                          refs={refs}
                          refKey={f.ref}
                          value={modal.values[f.key] ?? ''}
                          required={f.required}
                          onChange={(v) => setModal({ ...modal, values: { ...modal.values, [f.key]: v } })}
                        />
                      ) : f.type === 'json' || f.type === 'textarea' ? (
                        <textarea
                          rows={f.type === 'json' ? 4 : 3}
                          value={modal.values[f.key] ?? ''}
                          required={f.required}
                          placeholder={f.type === 'json' ? '{"key": "value"}' : f.placeholder}
                          onChange={(e) => setModal({ ...modal, values: { ...modal.values, [f.key]: e.target.value } })}
                        />
                      ) : (
                        <input
                          type={f.type === 'number' ? 'number' : 'text'}
                          step={f.step}
                          value={modal.values[f.key] ?? ''}
                          required={f.required}
                          disabled={modal.mode === 'edit' && f.immutable}
                          placeholder={f.placeholder}
                          onChange={(e) => setModal({ ...modal, values: { ...modal.values, [f.key]: e.target.value } })}
                        />
                      )}
                      {f.hint && <small className="hint">{f.hint}</small>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-ghost" onClick={() => setModal(null)}>Hủy</button>
                <button type="submit" className="btn btn-primary" disabled={saving}>
                  {saving ? <Loader2 size={15} className="animate-spin" /> : null}
                  {modal.mode === 'create' ? 'Tạo mới' : 'Lưu thay đổi'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal xóa */}
      {deleteRow && (
        <div className="modal-backdrop" onClick={() => setDeleteRow(null)}>
          <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header"><h3>Xác nhận xóa</h3></div>
            <div className="modal-body">
              <p style={{ fontSize: '0.9rem' }}>
                Bạn chắc chắn muốn xóa bản ghi{' '}
                <strong>{String(deleteRow[config.idKey] ?? deleteRow[config.columns[0].key])}</strong>?
                Hành động này không thể hoàn tác.
              </p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-ghost" onClick={() => setDeleteRow(null)}>Hủy</button>
              <button className="btn btn-danger" onClick={handleDelete} disabled={saving}>
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Trash2 size={15} />} Xóa vĩnh viễn
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function RefSelect({ refs, refKey, value, required, onChange }) {
  const list = refs[refKey] || [];
  const cfg = ADMIN_ENTITIES[refKey];
  return (
    <select value={value ?? ''} required={required} onChange={(e) => onChange(e.target.value)}>
      <option value="">— Chọn {cfg?.label || refKey} —</option>
      {list.map((item) => (
        <option key={item[cfg.idKey]} value={item[cfg.idKey]}>
          {item[cfg.refLabel || cfg.idKey]}{cfg.refSecondary ? ` (${item[cfg.refSecondary] ?? ''})` : ''}
        </option>
      ))}
    </select>
  );
}
