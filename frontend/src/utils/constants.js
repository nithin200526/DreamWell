export const MOODS = {
  VERY_HAPPY: { emoji: '😄', label: 'Very Happy', color: 'text-green-500' },
  HAPPY: { emoji: '😊', label: 'Happy', color: 'text-green-400' },
  NEUTRAL: { emoji: '😐', label: 'Neutral', color: 'text-gray-500' },
  SAD: { emoji: '😢', label: 'Sad', color: 'text-blue-500' },
  VERY_SAD: { emoji: '😭', label: 'Very Sad', color: 'text-blue-700' },
  ANXIOUS: { emoji: '😰', label: 'Anxious', color: 'text-yellow-500' },
  PEACEFUL: { emoji: '😌', label: 'Peaceful', color: 'text-purple-500' },
  CONFUSED: { emoji: '😕', label: 'Confused', color: 'text-orange-500' },
};

export const SLEEP_QUALITY_LABELS = {
  1: 'Very Poor',
  2: 'Poor',
  3: 'Fair',
  4: 'Good',
  5: 'Excellent',
};

export const EMERGENCY_RESOURCES = [
  {
    name: 'National Suicide Prevention Lifeline',
    phone: '988',
    description: '24/7 free and confidential support',
  },
  {
    name: 'Crisis Text Line',
    phone: 'Text HOME to 741741',
    description: 'Free 24/7 crisis support via text',
  },
  {
    name: 'SAMHSA National Helpline',
    phone: '1-800-662-4357',
    description: 'Treatment referral and information',
  },
];

export const FAQ_DATA = [
  {
    question: 'How does dream interpretation work?',
    answer: 'Our AI analyzes your dream text, mood, and sleep quality to provide psychological insights, identify emotions, and suggest actions to improve your well-being.',
  },
  {
    question: 'Is my data private?',
    answer: 'Yes! All your dreams are private by default. You can export or delete your data anytime. We use encryption and follow best security practices.',
  },
  {
    question: 'How accurate is the AI interpretation?',
    answer: 'Our AI uses advanced language models trained on psychological research. While insights are helpful, they should not replace professional mental health advice.',
  },
  {
    question: 'Can I track my mood without logging dreams?',
    answer: 'Absolutely! The mood tracker is independent and can be used daily to monitor your emotional patterns.',
  },
  {
    question: 'What happens if my dream is flagged?',
    answer: 'If the AI detects concerning themes, we display emergency resources and notify our support team to ensure you get help if needed.',
  },
];
