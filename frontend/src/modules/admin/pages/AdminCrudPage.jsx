import React from 'react';
import { useParams, Link } from 'react-router-dom';
import AdminCrudTable from '../components/AdminCrudTable';
import { ADMIN_ENTITIES } from '../adminEntities';
import { ArrowLeft } from 'lucide-react';

export default function AdminCrudPage() {
  const { entityKey } = useParams();
  const config = ADMIN_ENTITIES[entityKey];

  if (!config) {
    return (
      <div className="page">
        <div className="alert alert-error">Không tìm thấy khối dữ liệu "{entityKey}".</div>
        <Link to="/admin" className="btn btn-ghost"><ArrowLeft size={15} /> Về Tổng quan</Link>
      </div>
    );
  }

  return (
    <div className="page page-full">
      <AdminCrudTable entityKey={entityKey} config={config} />
    </div>
  );
}
