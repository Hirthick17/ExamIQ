export interface User {
  id: string;
  email: string;
  name: string;
  college?: string;
  branch?: string;
  semester?: number;
  points: number;
  createdAt: string;
  lastActive: string;
}

export interface UserProfile extends User {
  currentStreak: number;
  totalQuestionsAttempted: number;
  papersUploaded: number;
  topicsMastered: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData extends AuthCredentials {
  name: string;
  college?: string;
  branch?: string;
  semester?: number;
}
