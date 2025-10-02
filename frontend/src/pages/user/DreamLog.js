import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { dreamAPI } from '../../services/api';
import { MOODS, SLEEP_QUALITY_LABELS } from '../../utils/constants';
import toast from 'react-hot-toast';
import { Save, Sparkles } from 'lucide-react';

const DreamLog = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    dreamText: '',
    tags: '',
    moodAtWake: 'NEUTRAL',
    sleepQuality: 3,
    dreamDate: new Date().toISOString().slice(0, 16),
    isPrivate: true,
    userNotes: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await dreamAPI.createDream(formData);
      toast.success('Dream logged and interpreted successfully!');
      navigate(`/dreams/${response.data.data.id}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to log dream');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="card">
          <div className="flex items-center space-x-3 mb-6">
            <Sparkles className="w-8 h-8 text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Log Your Dream</h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dream Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., Flying over mountains"
                required
              />
            </div>

            {/* Dream Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Describe Your Dream *
              </label>
              <textarea
                name="dreamText"
                value={formData.dreamText}
                onChange={handleChange}
                rows="6"
                className="input-field"
                placeholder="Describe your dream in detail..."
                required
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="input-field"
                placeholder="e.g., flying, mountains, freedom"
              />
            </div>

            {/* Mood at Wake */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mood When You Woke Up *
              </label>
              <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                {Object.entries(MOODS).map(([key, mood]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, moodAtWake: key }))}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.moodAtWake === key
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                        : 'border-gray-200 dark:border-dark-600 hover:border-primary-300'
                    }`}
                    title={mood.label}
                  >
                    <span className="text-3xl">{mood.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sleep Quality */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sleep Quality: {SLEEP_QUALITY_LABELS[formData.sleepQuality]}
              </label>
              <input
                type="range"
                name="sleepQuality"
                min="1"
                max="5"
                value={formData.sleepQuality}
                onChange={handleChange}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-500 mt-1">
                <span>Very Poor</span>
                <span>Excellent</span>
              </div>
            </div>

            {/* Dream Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Dream Date & Time *
              </label>
              <input
                type="datetime-local"
                name="dreamDate"
                value={formData.dreamDate}
                onChange={handleChange}
                className="input-field"
                required
              />
            </div>

            {/* Privacy */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="isPrivate"
                checked={formData.isPrivate}
                onChange={handleChange}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                Keep this dream private
              </label>
            </div>

            {/* User Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Personal Notes (Optional)
              </label>
              <textarea
                name="userNotes"
                value={formData.userNotes}
                onChange={handleChange}
                rows="3"
                className="input-field"
                placeholder="Add any personal thoughts or context..."
              />
            </div>

            {/* Submit */}
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>{loading ? 'Analyzing...' : 'Log Dream & Get Interpretation'}</span>
              </button>
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default DreamLog;
