import { useState, useEffect } from 'react';
import papersService from '../src/services/papers.service';

// TODO: Implement usePapers hook
export function usePapers() {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch papers
    setLoading(false);
  }, []);

  return {
    papers,
    loading,
    error,
    refreshPapers: async () => {
      // TODO: Implement refresh
    },
  };
}

