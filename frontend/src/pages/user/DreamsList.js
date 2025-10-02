import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { dreamAPI } from '../../services/api';
import { MOODS } from '../../utils/constants';
import { formatDate, truncateText } from '../../utils/helpers';
import { Search, Moon, Filter } from 'lucide-react';
import toast from 'react-hot-toast';

const DreamsList = () => {
  const [dreams, setDreams] = useState([]);
  const [filteredDreams, setFilteredDreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('ALL');

  useEffect(() => {
    fetchDreams();
  }, []);

  useEffect(() => {
    filterDreams();
  }, [searchTerm, filterMood, dreams]);

  const fetchDreams = async () => {
    try {
      const response = await dreamAPI.getAllDreams();
      setDreams(response.data.data);
      setFilteredDreams(response.data.data);
    } catch (error) {
      toast.error('Failed to load dreams');
    } finally {
      setLoading(false);
    }
  };

  const filterDreams = () => {
    let filtered = dreams;

    if (searchTerm) {
      filtered = filtered.filter(dream =>
        dream.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dream.dreamText.toLowerCase().includes(searchTerm.toLowerCase()) ||
        dream.tags?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterMood !== 'ALL') {
      filtered = filtered.filter(dream => dream.moodAtWake === filterMood);
    }

    setFilteredDreams(filtered);
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
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Dreams</h1>
          <Link to="/log-dream" className="btn-primary">
            Log New Dream
          </Link>
        </div>

        {/* Search and Filter */}
        <div className="card mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input-field pl-10"
                placeholder="Search dreams..."
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={filterMood}
                onChange={(e) => setFilterMood(e.target.value)}
                className="input-field pl-10"
              >
                <option value="ALL">All Moods</option>
                {Object.entries(MOODS).map(([key, mood]) => (
                  <option key={key} value={key}>
                    {mood.emoji} {mood.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Dreams Grid */}
        {filteredDreams.length === 0 ? (
          <div className="text-center py-16">
            <Moon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {searchTerm || filterMood !== 'ALL' ? 'No dreams found' : 'No dreams yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {searchTerm || filterMood !== 'ALL' ? 'Try adjusting your filters' : 'Start logging your dreams to see them here'}
            </p>
            {!searchTerm && filterMood === 'ALL' && (
              <Link to="/log-dream" className="btn-primary">
                Log Your First Dream
              </Link>
            )}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDreams.map((dream) => (
              <Link
                key={dream.id}
                to={`/dreams/${dream.id}`}
                className="card hover:shadow-xl transition-all group"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                    {dream.title}
                  </h3>
                  <span className="text-3xl">{MOODS[dream.moodAtWake]?.emoji}</span>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {truncateText(dream.dreamText, 150)}
                </p>

                {dream.tags && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dream.tags.split(',').slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 text-xs rounded-full"
                      >
                        {tag.trim()}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500">
                  <span>{formatDate(dream.dreamDate)}</span>
                  <span>Sleep: {dream.sleepQuality}/5</span>
                </div>

                {dream.isFlagged && (
                  <div className="mt-3 px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 text-xs rounded-full inline-block">
                    ⚠️ Flagged
                  </div>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default DreamsList;
