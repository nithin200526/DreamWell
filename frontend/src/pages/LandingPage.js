import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Brain, TrendingUp, Shield, Sparkles, Moon, Heart, BarChart3, MessageCircle } from 'lucide-react';
import { FAQ_DATA } from '../utils/constants';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-white dark:bg-dark-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Unlock the Secrets of Your
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600"> Dreams</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                AI-powered dream interpretation and mood tracking for better mental wellness. Understand your subconscious and improve your emotional health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                {isAuthenticated ? (
                  <Link to="/dashboard" className="btn-primary text-center">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link to="/signup" className="btn-primary text-center">
                      Get Started Free
                    </Link>
                    <Link to="/login" className="btn-secondary text-center">
                      Sign In
                    </Link>
                  </>
                )}
              </div>
            </div>

            <div className="relative animate-slide-up">
              <div className="relative z-10 bg-white dark:bg-dark-800 rounded-2xl shadow-2xl p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <Moon className="w-8 h-8 text-primary-600" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Dream Analysis</h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  "I dreamed I was flying over mountains..."
                </p>
                <div className="bg-primary-50 dark:bg-dark-700 rounded-lg p-4">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong className="text-primary-600">AI Insight:</strong> Flying dreams often represent freedom, ambition, and breaking free from limitations. This suggests you're ready to overcome obstacles in your life.
                  </p>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary-200 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-pulse-slow"></div>
              <div className="absolute -bottom-8 -left-4 w-72 h-72 bg-purple-200 dark:bg-purple-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white dark:bg-dark-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Features for Your Mental Wellness
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to understand your dreams and track your mood
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="card hover:scale-105 transition-transform">
              <Brain className="w-12 h-12 text-primary-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">AI Dream Interpretation</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Advanced AI analyzes your dreams to provide deep psychological insights and meanings.
              </p>
            </div>

            <div className="card hover:scale-105 transition-transform">
              <Heart className="w-12 h-12 text-pink-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Mood Tracking</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Track your daily moods and identify patterns to improve your emotional well-being.
              </p>
            </div>

            <div className="card hover:scale-105 transition-transform">
              <BarChart3 className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Analytics & Insights</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Visualize trends, recurring symbols, and correlations between dreams and mood.
              </p>
            </div>

            <div className="card hover:scale-105 transition-transform">
              <Shield className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Privacy & Security</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your dreams are private by default. Export or delete your data anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-gray-50 dark:bg-dark-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Start your journey in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Log Your Dream</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Write down your dream, add mood and sleep quality details.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Get AI Analysis</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Our AI provides instant interpretation with actionable insights.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-pink-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Track & Improve</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Monitor patterns and improve your mental wellness over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white dark:bg-dark-900">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Get answers to the most commonly asked questions about DreamWell
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, index) => (
              <details key={index} className="card group">
                <summary className="font-semibold text-gray-900 dark:text-white cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <p className="text-gray-600 dark:text-gray-400 mt-3">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Understand Your Dreams?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of users improving their mental wellness with DreamWell
          </p>
          {!isAuthenticated && (
            <Link to="/signup" className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Start Free Today
            </Link>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
