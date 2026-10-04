import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { 
  Home, BookOpen, MessageCircle, Calendar, 
  Menu, X, LogOut, Globe, Wifi, WifiOff, Sparkles
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
    { id: 'dashboard', icon: Home, label: t('dashboard', lang), gradient: 'from-indigo-500 to-purple-500' },
    { id: 'subjects', icon: BookOpen, label: t('subjects', lang), gradient: 'from-cyan-500 to-blue-500' },
    { id: 'tutor', icon: MessageCircle, label: t('tutor', lang), gradient: 'from-pink-500 to-rose-500' },
    { id: 'study-plan', icon: Calendar, label: t('studyPlan', lang), gradient: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-animated noise-overlay starfield relative">
      {/* Floating orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Top Bar */}
      <header className="glass-strong sticky top-0 z-50 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-xl glass hover:bg-white/10 transition"
            >
              {menuOpen ? <X size={20} className="text-white" /> : <Menu size={20} className="text-white" />}
            </button>
            <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-all group-hover:scale-105">
                <Sparkles className="text-white" size={18} />
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-white text-lg tracking-tight">
                  {t('appName', lang)}
                </span>
                <span className="text-[10px] text-white/40 block -mt-1">Tronc Commun</span>
              </div>
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Online/Offline indicator */}
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
              isOnline 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
            }`}>
              {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
              <span className="hidden sm:inline">{isOnline ? t('online', lang) : t('offline', lang)}</span>
            </div>
            
            {/* Language toggle */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass hover:bg-white/10 transition text-sm font-medium text-white/70 hover:text-white"
            >
              <Globe size={14} />
              <span>{lang === 'fr' ? 'عربي' : 'FR'}</span>
            </button>
            
            {/* User avatar */}
            <button
              onClick={logout}
              className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm hover:scale-105 transition shadow-lg shadow-indigo-500/20"
              title={`${user?.name} - ${t('logout', lang)}`}
            >
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 max-w-6xl mx-auto w-full relative z-10">
        {/* Sidebar - Desktop */}
        <nav className="hidden lg:flex flex-col w-60 p-4 gap-2 sticky top-16 h-[calc(100vh-4rem)]">
          <div className="flex-1 space-y-1">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive 
                      ? 'glass-strong text-white shadow-lg' 
                      : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isActive 
                      ? `bg-gradient-to-br ${item.gradient} shadow-lg` 
                      : 'bg-white/5'
                  }`}>
                    <item.icon size={16} className={isActive ? 'text-white' : 'text-white/50'} />
                  </div>
                  <span>{item.label}</span>
                  {isActive && <div className={`ms-auto w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.gradient}`} />}
                </button>
              );
            })}
          </div>
          
          {/* User card at bottom */}
          <div className="glass rounded-xl p-3 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                {user?.name?.charAt(0)?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{user?.name}</p>
                <p className="text-xs text-white/40 truncate">{user?.email}</p>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile menu overlay */}
        {menuOpen && (
          <div className="lg:hidden fixed inset-0 z-40" onClick={() => setMenuOpen(false)}>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <nav className="absolute start-0 top-0 bottom-0 w-72 glass-strong p-5 shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                  <Sparkles className="text-white" size={20} />
                </div>
                <div>
                  <p className="font-bold text-white text-lg">{t('appName', lang)}</p>
                  <p className="text-xs text-white/50">{user?.name}</p>
                </div>
              </div>
              
              <div className="space-y-2">
                {navItems.map(item => {
                  const isActive = currentPage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => { onNavigate(item.id); setMenuOpen(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${
                        isActive 
                          ? 'glass-strong text-white' 
                          : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        isActive ? `bg-gradient-to-br ${item.gradient}` : 'bg-white/5'
                      }`}>
                        <item.icon size={18} className={isActive ? 'text-white' : 'text-white/50'} />
                      </div>
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto min-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>

      {/* Bottom nav - Mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="glass-strong border-t border-white/5 px-2 py-2">
          <div className="flex justify-around">
            {navItems.map(item => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                    isActive ? 'bg-white/10' : ''
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                    isActive ? `bg-gradient-to-br ${item.gradient} shadow-lg` : ''
                  }`}>
                    <item.icon size={18} className={isActive ? 'text-white' : 'text-white/40'} />
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? 'text-white' : 'text-white/40'}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
