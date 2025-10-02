import { format, formatDistanceToNow } from 'date-fns';

export const formatDate = (date) => {
  return format(new Date(date), 'MMM dd, yyyy');
};

export const formatDateTime = (date) => {
  return format(new Date(date), 'MMM dd, yyyy hh:mm a');
};

export const formatRelativeTime = (date) => {
  return formatDistanceToNow(new Date(date), { addSuffix: true });
};

export const getMoodColor = (mood) => {
  const colors = {
    VERY_HAPPY: 'bg-green-500',
    HAPPY: 'bg-green-400',
    NEUTRAL: 'bg-gray-500',
    SAD: 'bg-blue-500',
    VERY_SAD: 'bg-blue-700',
    ANXIOUS: 'bg-yellow-500',
    PEACEFUL: 'bg-purple-500',
    CONFUSED: 'bg-orange-500',
  };
  return colors[mood] || 'bg-gray-500';
};

export const getSleepQualityColor = (quality) => {
  if (quality >= 4) return 'text-green-500';
  if (quality === 3) return 'text-yellow-500';
  return 'text-red-500';
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const downloadCSV = (csvContent, filename) => {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};
