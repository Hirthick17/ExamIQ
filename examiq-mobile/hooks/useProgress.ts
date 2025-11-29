import { useState, useEffect } from 'react';
import progressService from '../src/services/progress.service';

// TODO: Implement useProgress hook
export function useProgress() {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch progress
    setLoading(false);
  }, []);

  return {
    progress,
    loading,
    error,
    refreshProgress: async () => {
      // TODO: Implement refresh
    },
  };
}

