import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { dreamAPI, moodAPI, analyticsAPI } from '../../services/api';
import { PlusCircle, Moon, Heart, TrendingUp, Calendar } from 'lucide-react';
import { MOODS } from '../../utils/constants';
import { formatRelativeTime } from '../../utils/helpers';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [dreams, setDreams] = useState([]);
  const [recentMoods, setRecentMoods] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [dreamsRes, moodsRes, analyticsRes] = await Promise.all([
        dreamAPI.getAllDreams(),
        moodAPI.getAllMoodEntries(),
        analyticsAPI.getAnalytics(),
      ]);

      setDreams(dreamsRes.data.data.slice(0, 5));
      setRecentMoods(moodsRes.data.data.slice(0, 7));
      setAnalytics(analyticsRes.data.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.name}! 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Here's what's happening with your dreams and mood
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <Link
            to="/log-dream"
            className="card hover:shadow-xl transition-all flex items-center justify-between group"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Log a Dream</h3>
              <p className="text-gray-600 dark:text-gray-400">Record your latest dream</p>
            </div>
            <PlusCircle className="w-12 h-12 text-primary-600 group-hover:scale-110 transition-transform" />
          </Link>

          <Link
            to="/mood-tracker"
            className="card hover:shadow-xl transition-all flex items-center justify-between group"
          >
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Track Mood</h3>
              <p className="text-gray-600 dark:text-gray-400">How are you feeling today?</p>
            </div>
            <Heart className="w-12 h-12 text-pink-600 group-hover:scale-110 transition-transform" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Dreams</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics?.totalDreams || 0}
                </p>
              </div>
              <Moon className="w-10 h-10 text-primary-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">This Week</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics?.recentDreamsCount || 0}
                </p>
              </div>
              <Calendar className="w-10 h-10 text-green-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Avg Sleep</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics?.averageSleepQuality?.toFixed(1) || 'N/A'}
                </p>
              </div>
              <TrendingUp className="w-10 h-10 text-purple-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Common Mood</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {MOODS[analytics?.mostCommonMood]?.emoji || '😊'}
                </p>
              </div>
              <Heart className="w-10 h-10 text-pink-600" />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Dreams */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Recent Dreams</h2>
              <Link to="/dreams" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>

            {dreams.length === 0 ? (
              <div className="text-center py-8">
                <Moon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No dreams logged yet</p>
                <Link to="/log-dream" className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block">
                  Log your first dream
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {dreams.map((dream) => (
                  <Link
                    key={dream.id}
                    to={`/dreams/${dream.id}`}
                    className="block p-4 bg-gray-50 dark:bg-dark-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-600 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {dream.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {dream.dreamText}
                        </p>
                        <div className="flex items-center space-x-4 mt-2">
                          <span className="text-xs text-gray-500 dark:text-gray-500">
                            {formatRelativeTime(dream.createdAt)}
                          </span>
                          <span className="text-2xl">
                            {MOODS[dream.moodAtWake]?.emoji}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Mood Trend */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mood Trend (7 Days)</h2>
              <Link to="/mood-tracker" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All
              </Link>
            </div>

            {recentMoods.length === 0 ? (
              <div className="text-center py-8">
                <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400">No mood entries yet</p>
                <Link to="/mood-tracker" className="text-primary-600 hover:text-primary-700 text-sm font-medium mt-2 inline-block">
                  Track your mood
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentMoods.map((mood) => (
                  <div
                    key={mood.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{MOODS[mood.mood]?.emoji}</span>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {MOODS[mood.mood]?.label}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                          {new Date(mood.entryDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
