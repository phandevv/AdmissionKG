import React, { useState, useEffect, useCallback } from 'react';

// Hook tải song song nhiều danh sách API: useApiData({ institutions: institutionsApi.list, ... })
export default function useApiData(loaders) {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const keys = Object.keys(loaders);
      const results = await Promise.all(
        keys.map((k) => loaders[k]().catch((err) => ({ __error: err.userMessage || 'Lỗi tải dữ liệu' })))
      );
      const next = {};
      keys.forEach((k, i) => { next[k] = results[i]; });
      setData(next);
    } catch (err) {
      setError(err.userMessage || 'Không thể tải dữ liệu từ máy chủ.');
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, reload: load };
}
