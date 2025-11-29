// TODO: Define app-wide constants

export const APP_NAME = 'ExamIQ';

export const STORAGE_KEYS = {
  AUTH_TOKEN: '@examiq/auth_token',
  REFRESH_TOKEN: '@examiq/refresh_token',
  USER_DATA: '@examiq/user_data',
  THEME: '@examiq/theme',
  LANGUAGE: '@examiq/language',
} as const;

export const QUESTION_TYPES = {
  MCQ: 'mcq',
  TRUE_FALSE: 'true-false',
  SHORT_ANSWER: 'short-answer',
  ESSAY: 'essay',
} as const;

export const DIFFICULTY_LEVELS = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
} as const;

export const MASTERY_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
  MASTER: 'master',
} as const;

export const PRACTICE_SETTINGS = {
  DEFAULT_TIME_LIMIT: 30, // minutes
  QUESTIONS_PER_SET: 10,
  MIN_QUESTIONS: 5,
  MAX_QUESTIONS: 50,
} as const;

export default {
  APP_NAME,
  STORAGE_KEYS,
  QUESTION_TYPES,
  DIFFICULTY_LEVELS,
  MASTERY_LEVELS,
  PRACTICE_SETTINGS,
};

