import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { adminAPI } from '../../services/api';
import { Users, Moon, AlertTriangle, MessageCircle, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await adminAPI.getSystemAnalytics();
      setAnalytics(response.data.data);
    } catch (error) {
      toast.error('Failed to load analytics');
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">System overview and management</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Link to="/admin/users" className="card hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics?.totalUsers || 0}
                </p>
                <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                  {analytics?.activeUsers || 0} active
                </p>
              </div>
              <Users className="w-12 h-12 text-primary-600" />
            </div>
          </Link>

          <div className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Dreams</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics?.totalDreams || 0}
                </p>
              </div>
              <Moon className="w-12 h-12 text-purple-600" />
            </div>
          </div>

          <Link to="/admin/dreams" className="card hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Flagged Dreams</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics?.flaggedDreams || 0}
                </p>
              </div>
              <AlertTriangle className="w-12 h-12 text-red-600" />
            </div>
          </Link>

          <Link to="/admin/support" className="card hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Open Tickets</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-white">
                  {analytics?.openTickets || 0}
                </p>
              </div>
              <MessageCircle className="w-12 h-12 text-green-600" />
            </div>
          </Link>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Link to="/admin/users" className="card hover:shadow-xl transition-all group">
            <Users className="w-10 h-10 text-primary-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Manage Users</h3>
            <p className="text-gray-600 dark:text-gray-400">View and manage user accounts</p>
          </Link>

          <Link to="/admin/dreams" className="card hover:shadow-xl transition-all group">
            <AlertTriangle className="w-10 h-10 text-red-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Flagged Dreams</h3>
            <p className="text-gray-600 dark:text-gray-400">Review dreams with risk flags</p>
          </Link>

          <Link to="/admin/support" className="card hover:shadow-xl transition-all group">
            <MessageCircle className="w-10 h-10 text-green-600 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Support Tickets</h3>
            <p className="text-gray-600 dark:text-gray-400">Respond to user inquiries</p>
          </Link>
        </div>

        {/* Top Symbols */}
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <TrendingUp className="w-6 h-6 text-primary-600" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Top Dream Symbols (All Users)
            </h2>
          </div>

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
                        {item.count} occurrences
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
              No symbol data available yet
            </p>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
