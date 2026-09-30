'use client';

import React, { useState } from 'react';
import { Settings, Lock, User, Palette, Globe, Save } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export default function SettingsPage() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'appearance'>('profile');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Settings saved successfully!', 'success');
  };

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Configure your personal preferences and workspace settings.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Settings Navigation Tabs */}
        <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm space-y-1 h-fit">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'profile' ? 'bg-purple-50 text-purple-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
          >
            <User className="w-4 h-4 mr-3" /> Profile Info
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'security' ? 'bg-purple-50 text-purple-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
          >
            <Lock className="w-4 h-4 mr-3" /> Security
          </button>
          <button
            onClick={() => setActiveTab('appearance')}
            className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === 'appearance' ? 'bg-purple-50 text-purple-600' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
              }`}
          >
            <Palette className="w-4 h-4 mr-3" /> Appearance
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <form onSubmit={handleSave} className="space-y-6">
            {activeTab === 'profile' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Profile Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">First Name</label>
                    <input
                      type="text"
                      defaultValue="Admin"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Last Name</label>
                    <input
                      type="text"
                      defaultValue="User"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
                    <input
                      type="email"
                      defaultValue="admin@almahy.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
                    />
                  </div>
                </div>
              </div>
            )}



            {activeTab === 'security' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Security & Password</h3>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Current Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">New Password</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-800 focus:outline-none focus:border-purple-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">Theme Settings</h3>
                <p className="text-sm text-slate-600">Current Theme: <span className="font-bold text-purple-600">Al Mahy Light Mode</span></p>
              </div>
            )}

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="flex items-center px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-sm font-semibold shadow-md shadow-purple-500/20 transition-all"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
