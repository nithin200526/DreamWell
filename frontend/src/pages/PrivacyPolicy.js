import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Privacy Policy</h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-8">Last Updated: October 2, 2024</p>

        <div className="space-y-8 text-gray-700 dark:text-gray-300">
          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">1. Introduction</h2>
            <p>
              Welcome to DreamWell. We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">2. Information We Collect</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">2.1 Personal Information</h3>
            <p className="mb-3">When you register for an account, we collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Name and email address</li>
              <li>Password (encrypted)</li>
              <li>Account preferences (theme, language, notification settings)</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">2.2 Dream and Mood Data</h3>
            <p className="mb-3">When you use our Service, we collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Dream descriptions and titles</li>
              <li>Mood entries and emotional states</li>
              <li>Sleep quality ratings</li>
              <li>Tags, notes, and personal observations</li>
              <li>Dates and timestamps of entries</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">2.3 Usage Data</h3>
            <p className="mb-3">We automatically collect:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>IP address and browser type</li>
              <li>Device information</li>
              <li>Pages visited and features used</li>
              <li>Time spent on the Service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">3. How We Use Your Information</h2>
            <p className="mb-3">We use your information to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Provide and maintain the Service</li>
              <li>Generate AI-powered dream interpretations</li>
              <li>Track your mood patterns and provide insights</li>
              <li>Send you notifications (if enabled)</li>
              <li>Improve our AI models using anonymized data</li>
              <li>Respond to your support requests</li>
              <li>Detect and prevent fraud or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">4. Data Privacy and Security</h2>
            
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">4.1 Privacy by Default</h3>
            <p>
              All your dreams are marked as private by default. Only you can see your dream content unless you explicitly choose to share it.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 mt-4">4.2 Data Security</h3>
            <p className="mb-3">We implement security measures including:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Encryption of data in transit (HTTPS/TLS)</li>
              <li>Encrypted password storage</li>
              <li>Secure authentication with JWT tokens</li>
              <li>Regular security audits</li>
              <li>Access controls and monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">5. Third-Party Services</h2>
            <p className="mb-3">We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li><strong>Groq AI:</strong> For dream interpretation. We send your dream text to Groq's API, but they do not store or use your data for training.</li>
              <li><strong>Email Service:</strong> For sending verification and password reset emails.</li>
            </ul>
            <p className="mt-3">We do not sell your personal data to third parties.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">6. Data Retention</h2>
            <p>
              We retain your personal data for as long as your account is active or as needed to provide you services. You can delete your account and all associated data at any time through your profile settings. Upon deletion, your data will be permanently removed from our systems within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">7. Your Rights</h2>
            <p className="mb-3">You have the right to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt-out of email notifications</li>
              <li>Object to data processing</li>
            </ul>
            <p className="mt-3">You can exercise these rights through your profile settings or by contacting us.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">8. Children's Privacy</h2>
            <p>
              DreamWell is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and maintained on servers located outside of your country. By using the Service, you consent to the transfer of your information to countries that may have different data protection laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">10. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">11. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <ul className="list-none space-y-2 ml-4 mt-3">
              <li>• Email: privacy@dreamwell.com</li>
              <li>• Support Page: <a href="/support" className="text-primary-600 hover:text-primary-700">DreamWell Support</a></li>
            </ul>
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
