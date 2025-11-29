// TODO: Define badge definitions
export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'achievement' | 'milestone' | 'streak' | 'topic';
  requirement: number;
}

export const Badges: BadgeDefinition[] = [
  {
    id: 'first-question',
    name: 'First Question',
    description: 'Answer your first question',
    icon: '🎯',
    category: 'achievement',
    requirement: 1,
  },
  {
    id: 'topic-master',
    name: 'Topic Master',
    description: 'Master a topic with 100% accuracy',
    icon: '⭐',
    category: 'topic',
    requirement: 100,
  },
  {
    id: 'week-warrior',
    name: 'Week Warrior',
    description: 'Maintain a 7-day streak',
    icon: '🔥',
    category: 'streak',
    requirement: 7,
  },
  {
    id: 'century-club',
    name: 'Century Club',
    description: 'Answer 100 questions',
    icon: '💯',
    category: 'milestone',
    requirement: 100,
  },
];

export default Badges;

