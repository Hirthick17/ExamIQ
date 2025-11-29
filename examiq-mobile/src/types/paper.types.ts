export interface QuestionPaper {
  id: string;
  userId: string;
  college: string;
  subject: string;
  year: number;
  semester?: number;
  fileUrl: string;
  analysisStatus: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: string;
}

export interface Topic {
  id: string;
  paperId: string;
  topicName: string;
  frequency: number;
  priority: 'high' | 'medium' | 'low';
  totalMarks: number;
  createdAt: string;
}

export interface TopicAnalysis {
  topics: Topic[];
  totalQuestions: number;
  paperDetails: QuestionPaper;
}
