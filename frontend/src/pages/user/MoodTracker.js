import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { moodAPI } from '../../services/api';
import { MOODS } from '../../utils/constants';
import { Calendar, TrendingUp, ChevronLeft, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';

const MoodTracker = () => {
  const [moods, setMoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedMood, setSelectedMood] = useState('NEUTRAL');
  const [notes, setNotes] = useState('');
  const [triggers, setTriggers] = useState('');
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  
  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };
  
  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  useEffect(() => {
    fetchMoods();
  }, []);

  const fetchMoods = async () => {
    try {
      const response = await moodAPI.getAllMoodEntries();
      setMoods(response.data.data);
    } catch (error) {
      toast.error('Failed to load mood entries');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await moodAPI.createMoodEntry({
        entryDate: selectedDate,
        mood: selectedMood,
        notes,
        triggers,
      });
      toast.success('Mood entry saved!');
      fetchMoods();
      setNotes('');
      setTriggers('');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to save mood entry');
    }
  };

  const getMoodForDate = (date) => {
    return moods.find(m => m.entryDate === date);
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= lastDay.getDate(); day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };
  
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const calendarDays = generateCalendarDays();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Mood Tracker</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Log Mood */}
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Log Today's Mood</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  How are you feeling?
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {Object.entries(MOODS).map(([key, mood]) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setSelectedMood(key)}
                      className={`p-4 rounded-lg border-2 transition-all ${
                        selectedMood === key
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900 scale-110'
                          : 'border-gray-200 dark:border-dark-600 hover:border-primary-300'
                      }`}
                      title={mood.label}
                    >
                      <span className="text-4xl">{mood.emoji}</span>
                    </button>
                  ))}
                </div>
                <p className="text-center mt-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  {MOODS[selectedMood]?.label}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  className="input-field"
                  placeholder="How was your day? Any thoughts?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Triggers (Optional)
                </label>
                <input
                  type="text"
                  value={triggers}
                  onChange={(e) => setTriggers(e.target.value)}
                  className="input-field"
                  placeholder="What influenced your mood?"
                />
              </div>

              <button type="submit" className="w-full btn-primary">
                Save Mood Entry
              </button>
            </form>
          </div>

          {/* Mood Calendar */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
                <Calendar className="w-6 h-6 mr-2" />
                Mood Calendar
              </h2>
            </div>
            
            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={goToPreviousMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-semibold text-gray-900 dark:text-white">{monthName}</span>
                <button onClick={goToToday} className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400">
                  Today
                </button>
              </div>
              <button onClick={goToNextMonth} className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded-lg">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {calendarDays.map((day, index) => {
                if (!day) {
                  return <div key={`empty-${index}`} className="aspect-square" />;
                }

                const dateStr = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
                const moodEntry = getMoodForDate(dateStr);
                const today = new Date();
                const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
                const isToday = dateStr === todayStr;

                return (
                  <div
                    key={dateStr}
                    className={`aspect-square rounded-lg border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${
                      isToday
                        ? 'border-primary-600 bg-primary-50 dark:bg-primary-900'
                        : 'border-gray-200 dark:border-dark-600'
                    }`}
                    title={moodEntry ? MOODS[moodEntry.mood]?.label : 'No entry'}
                  >
                    <span className="text-xs text-gray-600 dark:text-gray-400">{day.getDate()}</span>
                    {moodEntry && (
                      <span className="text-2xl">{MOODS[moodEntry.mood]?.emoji}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Recent Entries */}
        <div className="card mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <TrendingUp className="w-6 h-6 mr-2" />
            Recent Entries
          </h2>

          {moods.length === 0 ? (
            <p className="text-center text-gray-600 dark:text-gray-400 py-8">
              No mood entries yet. Start tracking your mood today!
            </p>
          ) : (
            <div className="space-y-4">
              {moods.slice(0, 10).map((mood) => (
                <div
                  key={mood.id}
                  className="p-4 bg-gray-50 dark:bg-dark-700 rounded-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                      <span className="text-4xl">{MOODS[mood.mood]?.emoji}</span>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {MOODS[mood.mood]?.label}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {new Date(mood.entryDate).toLocaleDateString('en-US', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        {mood.notes && (
                          <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
                            {mood.notes}
                          </p>
                        )}
                        {mood.triggers && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                            Triggers: {mood.triggers}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MoodTracker;
