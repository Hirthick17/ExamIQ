export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

export interface UploadPaperRequest {
  file: File | Blob;
  college: string;
  subject: string;
  year: number;
  semester?: number;
}

export interface GenerateQuestionsRequest {
  topicId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  count: number;
}

export interface SubmitAnswerRequest {
  questionId: string;
  selectedOption: string;
  timeSpent: number;
}
