import { useState, useEffect } from 'react';
import questionsService from '../src/services/questions.service';

// TODO: Implement useQuestions hook
export function useQuestions(topicId?: string) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: Fetch questions
    setLoading(false);
  }, [topicId]);

  return {
    questions,
    loading,
    error,
    submitAnswer: async (questionId: string, answer: any) => {
      // TODO: Implement submit answer
    },
  };
}

