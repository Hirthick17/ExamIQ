export interface QuestionOption {
  label: string;
  text: string;
  correct: boolean;
}

export interface Question {
  id: string;
  topicId: string;
  questionText: string;
  options: QuestionOption[];
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  points: number;
  createdAt: string;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  timeSpent: number;
}

export interface PracticeSession {
  topicId: string;
  questions: Question[];
  answers: UserAnswer[];
  startTime: string;
  endTime?: string;
  totalPoints: number;
  accuracy: number;
}
