import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { analyticsAPI } from '../../services/api';
import { BarChart3, Download, TrendingUp, Moon, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const Analytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await analyticsAPI.getAnalytics();
      setAnalytics(response.data.data);
    } catch (error) {
      toast.error('Failed to load analytics');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    try {
      const response = await analyticsAPI.exportData();
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `dreamwell-data-${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success('Data exported successfully!');
    } catch (error) {
      toast.error('Failed to export data');
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart3 className="w-8 h-8 mr-3" />
            Analytics & Insights
          </h1>
          <button onClick={handleExport} className="btn-primary flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Data</span>
          </button>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Dreams</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics?.totalDreams || 0}
                </p>
              </div>
              <Moon className="w-12 h-12 text-primary-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">This Week</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics?.recentDreamsCount || 0}
                </p>
              </div>
              <TrendingUp className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg Sleep Quality</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics?.averageSleepQuality?.toFixed(1) || 'N/A'}
                </p>
              </div>
              <Heart className="w-12 h-12 text-purple-600" />
            </div>
          </div>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Most Common Mood</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {analytics?.mostCommonMood || 'N/A'}
                </p>
              </div>
              <Heart className="w-12 h-12 text-pink-600" />
            </div>
          </div>
        </div>

        {/* Top Symbols */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Top Recurring Dream Symbols
          </h2>
          {analytics?.topSymbols && analytics.topSymbols.length > 0 ? (
            <div className="space-y-3">
              {analytics.topSymbols.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {item.symbol}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {item.count} times
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-dark-700 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{
                          width: `${(item.count / analytics.topSymbols[0].count) * 100}%`
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 py-8">
              No symbol data available yet. Keep logging dreams!
            </p>
          )}
        </div>

        {/* Mood Trends */}
        <div className="card mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Mood Distribution
          </h2>
          {analytics?.moodTrends && Object.keys(analytics.moodTrends).length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(analytics.moodTrends).map(([mood, count]) => (
                <div key={mood} className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900 dark:text-white">{mood}</span>
                    <span className="text-2xl font-bold text-primary-600">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 py-8">
              No mood data available yet. Start tracking your mood!
            </p>
          )}
        </div>

        {/* Mood vs Sleep Correlation */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Mood vs Sleep Quality Correlation
          </h2>
          {analytics?.moodSleepCorrelation && Object.keys(analytics.moodSleepCorrelation).length > 0 ? (
            <div className="space-y-3">
              {Object.entries(analytics.moodSleepCorrelation).map(([mood, avgSleep]) => (
                <div key={mood} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-dark-700 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">{mood}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Avg Sleep Quality:
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      {avgSleep}/5
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-400 py-8">
              Not enough data to show correlations yet.
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Analytics;
