export interface UserProgress {
  id: string;
  userId: string;
  questionId: string;
  topicId: string;
  answeredCorrectly: boolean;
  timeSpent: number;
  attemptNumber: number;
  createdAt: string;
}

export interface Badge {
  id: string;
  userId: string;
  badgeName: string;
  badgeType: 'first_question' | 'topic_master' | 'week_streak' | 'century';
  earnedAt: string;
}

export interface TopicProgress {
  topicId: string;
  topicName: string;
  questionsAttempted: number;
  correctAnswers: number;
  accuracy: number;
  timeSpent: number;
  lastPracticed?: string;
}

export interface DashboardStats {
  totalPoints: number;
  currentStreak: number;
  papersUploaded: number;
  questionsPracticed: number;
  topicsMastered: number;
  recentBadges: Badge[];
  weakTopics: TopicProgress[];
}
