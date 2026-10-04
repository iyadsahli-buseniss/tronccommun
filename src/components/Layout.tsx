import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { 
  Home, BookOpen, MessageCircle, Calendar, 
  Menu, X, LogOut, Globe, Wifi, WifiOff 
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const { lang, setLang, logout, isOnline, user } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', icon: Home, label: t('dashboard', lang) },
    { id: 'subjects', icon: BookOpen, label: t('subjects', lang) },
    { id: 'tutor', icon: MessageCircle, label: t('tutor', lang) },
    { id: 'study-plan', icon: Calendar, label: t('studyPlan', lang) },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Bar */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-bold text-primary-800 text-lg hidden sm:block">
                {t('appName', lang)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Online/Offline indicator */}
            <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs ${isOnline ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              <span className="hidden sm:inline">{isOnline ? t('online', lang) : t('offline', lang)}</span>
            </div>
            
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-gray-100 text-sm font-medium text-gray-600"
            >
              <Globe size={16} />
              <span>{lang === 'fr' ? 'AR' : 'FR'}</span>
            </button>
            
            {/* Logout */}
            <button
              onClick={logout}
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              title={t('logout', lang)}
            >
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-5xl mx-auto w-full">
        {/* Sidebar - Desktop */}
        <nav className="hidden lg:flex flex-col w-56 bg-white border-e border-gray-200 p-4 gap-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === item.id 
                  ? 'bg-primary-50 text-primary-700' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          
          <div className="mt-auto pt-4 border-t border-gray-200">
            <div className="px-3 py-2">
              <p className="text-xs text-gray-500">{user?.name}</p>
              <p className="text-xs text-gray-400 truncate">{user?.email}</p>
            </div>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 z-40 bg-black/30" onClick={() => setMenuOpen(false)}>
            <nav className="w-64 h-full bg-white p-4 shadow-xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-2 mb-6 px-2">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">D</span>
                </div>
                <div>
                  <p className="font-bold text-primary-800">{t('appName', lang)}</p>
                  <p className="text-xs text-gray-500">{user?.name}</p>
                </div>
              </div>
              
              {navItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                  className={`flex items-center gap-3 w-full px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === item.id 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <item.icon size={18} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {children}
        </main>
      </div>

      {/* Bottom nav - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
        <div className="flex justify-around py-2">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs ${
                currentPage === item.id 
                  ? 'text-primary-700' 
                  : 'text-gray-500'
              }`}
            >
              <item.icon size={20} />
              <span className="truncate max-w-[60px]">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>
    </div>
  );
}
