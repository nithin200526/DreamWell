import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { adminAPI } from '../../services/api';
import { AlertTriangle, Eye } from 'lucide-react';
import { formatDateTime, truncateText } from '../../utils/helpers';
import { EMERGENCY_RESOURCES } from '../../utils/constants';
import toast from 'react-hot-toast';

const AdminDreams = () => {
  const [dreams, setDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDream, setSelectedDream] = useState(null);

  useEffect(() => {
    fetchFlaggedDreams();
  }, []);

  const fetchFlaggedDreams = async () => {
    try {
      const response = await adminAPI.getFlaggedDreams();
      setDreams(response.data.data);
    } catch (error) {
      toast.error('Failed to load flagged dreams');
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
        <div className="flex items-center space-x-3 mb-8">
          <AlertTriangle className="w-8 h-8 text-red-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Flagged Dreams</h1>
            <p className="text-gray-600 dark:text-gray-400">Dreams with potential risk indicators</p>
          </div>
        </div>

        {dreams.length === 0 ? (
          <div className="card text-center py-16">
            <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No Flagged Dreams
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              All dreams are currently safe. Great news!
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-6">
            {dreams.map((dream) => (
              <div key={dream.id} className="card border-2 border-red-500">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {dream.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      User ID: {dream.user?.id} • {formatDateTime(dream.createdAt)}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedDream(dream)}
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                </div>

                <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-4">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                    ⚠️ Risk Flag:
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {dream.flagReason}
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {truncateText(dream.dreamText, 200)}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">
                    Sleep Quality: {dream.sleepQuality}/5
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    Mood: {dream.moodAtWake}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dream Detail Modal */}
        {selectedDream && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-dark-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {selectedDream.title}
                  </h2>
                  <button
                    onClick={() => setSelectedDream(null)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    ✕
                  </button>
                </div>

                <div className="bg-red-50 dark:bg-red-900 rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold text-red-700 dark:text-red-300 mb-2">
                    ⚠️ Risk Flag:
                  </p>
                  <p className="text-sm text-red-600 dark:text-red-400 mb-4">
                    {selectedDream.flagReason}
                  </p>

                  <div className="bg-white dark:bg-red-800 rounded-lg p-4">
                    <h4 className="font-bold text-red-700 dark:text-red-300 mb-3">
                      Emergency Resources (Provided to User)
                    </h4>
                    {EMERGENCY_RESOURCES.map((resource, index) => (
                      <div key={index} className="mb-3 last:mb-0">
                        <p className="font-semibold text-red-700 dark:text-red-300">
                          {resource.name}
                        </p>
                        <p className="text-red-600 dark:text-red-400 text-sm">{resource.phone}</p>
                        <p className="text-red-600 dark:text-red-400 text-xs">
                          {resource.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-gray-900 dark:text-white mb-2">Dream Content</h3>
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                      {selectedDream.dreamText}
                    </p>
                  </div>

                  {selectedDream.userNotes && (
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">User Notes</h3>
                      <p className="text-gray-700 dark:text-gray-300">
                        {selectedDream.userNotes}
                      </p>
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-4 pt-4 border-t border-gray-200 dark:border-dark-700">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Dream Date</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {formatDateTime(selectedDream.dreamDate)}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Mood at Wake</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedDream.moodAtWake}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Quality</p>
                      <p className="font-semibold text-gray-900 dark:text-white">
                        {selectedDream.sleepQuality}/5
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default AdminDreams;
