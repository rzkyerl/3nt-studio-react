import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LogOut, Home, DollarSign, Image as ImageIcon, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { type Notification, type Tab } from '../types/admin';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
  notifications: Notification[];
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children, activeTab, setActiveTab, notifications }) => {
  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      signOut(auth);
    }
  };

  const menuItems = [
    { id: 'portfolio', label: 'Portfolio', icon: ImageIcon },
    { id: 'home', label: 'Home Content', icon: Home },
    { id: 'pricing', label: 'Pricing', icon: DollarSign },
  ];

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col sticky top-0 h-screen">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">3</span>
            </div>
            <h1 className="font-heading font-bold text-xl tracking-tight">3NT STUDIO</h1>
          </div>
        </div>

        <nav className="flex-grow p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as Tab)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                  activeTab === item.id 
                    ? "bg-black text-white shadow-lg shadow-black/10" 
                    : "text-gray-500 hover:bg-gray-50 hover:text-black"
                )}
              >
                <Icon size={18} />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h2 className="font-heading font-bold text-lg uppercase tracking-widest text-gray-400">
            {activeTab} Management
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-100">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-gray-600">Admin Live</span>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <div className="p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>
      </main>

      {/* Notifications */}
      <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-3">
        <AnimatePresence>
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className={cn(
                "flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border min-w-[320px]",
                n.type === 'success' 
                  ? "bg-white border-green-100 text-green-800" 
                  : "bg-white border-red-100 text-red-800"
              )}
            >
              {n.type === 'success' ? (
                <div className="w-8 h-8 bg-green-50 rounded-full flex items-center justify-center text-green-500">
                  <CheckCircle2 size={18} />
                </div>
              ) : (
                <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                  <AlertCircle size={18} />
                </div>
              )}
              <p className="text-sm font-semibold">{n.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
