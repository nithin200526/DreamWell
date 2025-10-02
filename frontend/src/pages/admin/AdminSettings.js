import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { adminAPI } from '../../services/api';
import { Settings, Save } from 'lucide-react';
import toast from 'react-hot-toast';

const AdminSettings = () => {
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    appName: 'DreamWell',
    appLogo: '/logo.png',
    footerText: '© 2025 DreamWell. All rights reserved.',
    emergencyHelpline: 'National Suicide Prevention Lifeline: 988',
  });

  const handleSave = async (key) => {
    setLoading(true);
    try {
      await adminAPI.updateSystemSetting(key, settings[key]);
      toast.success('Setting updated successfully!');
    } catch (error) {
      toast.error('Failed to update setting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center space-x-3 mb-8">
          <Settings className="w-8 h-8 text-primary-600" />
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">System Settings</h1>
        </div>

        <div className="space-y-6">
          {/* App Name */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Application Name</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                value={settings.appName}
                onChange={(e) => setSettings({ ...settings, appName: e.target.value })}
                className="input-field flex-1"
              />
              <button
                onClick={() => handleSave('app.name')}
                disabled={loading}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Footer Text */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Footer Text</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                value={settings.footerText}
                onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                className="input-field flex-1"
              />
              <button
                onClick={() => handleSave('app.footer.text')}
                disabled={loading}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Emergency Helpline */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Emergency Helpline</h2>
            <div className="flex space-x-4">
              <input
                type="text"
                value={settings.emergencyHelpline}
                onChange={(e) => setSettings({ ...settings, emergencyHelpline: e.target.value })}
                className="input-field flex-1"
              />
              <button
                onClick={() => handleSave('emergency.helpline')}
                disabled={loading}
                className="btn-primary flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>Save</span>
              </button>
            </div>
          </div>

          {/* Info */}
          <div className="card bg-blue-50 dark:bg-blue-900 border-2 border-blue-500">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              <strong>Note:</strong> Changes to system settings will take effect immediately. Make sure to test after updating critical settings.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AdminSettings;
