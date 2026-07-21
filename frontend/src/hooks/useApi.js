import { useState, useEffect, useCallback } from 'react';

export const useApi = (apiFunction, immediate = true, initialData = null) => {
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(immediate);
  const [error, setError] = useState(null);

  const execute = useCallback(async (...params) => {
    setLoading(true);
    setError(null);
    try {
      const result = await apiFunction(...params);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Error fetching data');
      throw err;
    } finally {
      setLoading(false);
    }
  }, [apiFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { data, loading, error, execute };
};
