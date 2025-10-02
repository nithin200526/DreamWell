import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { dreamAPI } from '../../services/api';
import { MOODS, EMERGENCY_RESOURCES } from '../../utils/constants';
import { formatDateTime } from '../../utils/helpers';
import { Edit, Trash2, RefreshCw, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';

const DreamDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dream, setDream] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reinterpreting, setReinterpreting] = useState(false);

  useEffect(() => {
    fetchDream();
  }, [id]);

  const fetchDream = async () => {
    try {
      const response = await dreamAPI.getDreamById(id);
      setDream(response.data.data);
    } catch (error) {
      toast.error('Failed to load dream');
      navigate('/dreams');
    } finally {
      setLoading(false);
    }
  };

  const handleReinterpret = async () => {
    setReinterpreting(true);
    try {
      const response = await dreamAPI.reinterpretDream(id);
      setDream(prev => ({ ...prev, interpretation: response.data.data }));
      toast.success('Dream reinterpreted successfully!');
    } catch (error) {
      toast.error('Failed to reinterpret dream');
    } finally {
      setReinterpreting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this dream?')) return;

    try {
      await dreamAPI.deleteDream(id);
      toast.success('Dream deleted successfully');
      navigate('/dreams');
    } catch (error) {
      toast.error('Failed to delete dream');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const interpretation = dream?.interpretation;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="card mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {dream.title}
              </h1>
              <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                <span>{formatDateTime(dream.dreamDate)}</span>
                <span>•</span>
                <span className="flex items-center">
                  {MOODS[dream.moodAtWake]?.emoji} {MOODS[dream.moodAtWake]?.label}
                </span>
                <span>•</span>
                <span>Sleep Quality: {dream.sleepQuality}/5</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleReinterpret}
                disabled={reinterpreting}
                className="btn-secondary flex items-center space-x-2"
                title="Reinterpret Dream"
              >
                <RefreshCw className={`w-4 h-4 ${reinterpreting ? 'animate-spin' : ''}`} />
              </button>
              <button
                onClick={() => navigate(`/dreams`)}
                className="btn-secondary"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="btn-danger"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {dream.tags && (
            <div className="flex flex-wrap gap-2">
              {dream.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-sm rounded-full"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Dream Content */}
        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Dream Description</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
            {dream.dreamText}
          </p>
        </div>

        {/* User Notes */}
        {dream.userNotes && (
          <div className="card mb-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Personal Notes</h2>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
              {dream.userNotes}
            </p>
          </div>
        )}

        {/* AI Interpretation */}
        {interpretation && (
          <>
            {/* Risk Flag Warning */}
            {interpretation.hasRiskFlag && (
              <div className="card bg-red-50 dark:bg-red-900 border-2 border-red-500 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-red-700 dark:text-red-300 mb-2">
                      Important Notice
                    </h3>
                    <p className="text-red-700 dark:text-red-300 mb-4">
                      {interpretation.riskFlags}
                    </p>
                    <div className="bg-white dark:bg-red-800 rounded-lg p-4">
                      <h4 className="font-bold text-red-700 dark:text-red-300 mb-3">Emergency Resources</h4>
                      {EMERGENCY_RESOURCES.map((resource, index) => (
                        <div key={index} className="mb-3 last:mb-0">
                          <p className="font-semibold text-red-700 dark:text-red-300">{resource.name}</p>
                          <p className="text-red-600 dark:text-red-400 text-sm">{resource.phone}</p>
                          <p className="text-red-600 dark:text-red-400 text-xs">{resource.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Summary */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Summary</h2>
              <p className="text-gray-700 dark:text-gray-300">{interpretation.shortSummary}</p>
            </div>

            {/* Detailed Explanation */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Detailed Analysis</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                {interpretation.detailedExplanation}
              </p>
            </div>

            {/* Predicted Emotions */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Detected Emotions</h2>
              <div className="flex flex-wrap gap-2">
                {interpretation.predictedEmotions.split(',').map((emotion, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 rounded-full"
                  >
                    {emotion.trim()}
                  </span>
                ))}
              </div>
            </div>

            {/* Why It Occurred */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Why This Dream Occurred</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {interpretation.whyOccurred}
              </p>
            </div>

            {/* Suggested Actions */}
            <div className="card mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Suggested Actions</h2>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                {interpretation.suggestedActions}
              </p>
            </div>

            {/* Symbols */}
            {interpretation.symbols && (
              <div className="card mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Dream Symbols</h2>
                <div className="flex flex-wrap gap-2">
                  {interpretation.symbols.split(',').map((symbol, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full"
                    >
                      {symbol.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DreamDetail;
