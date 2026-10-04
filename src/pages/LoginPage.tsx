import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { Globe, Sparkles, BookOpen, Brain, Zap } from 'lucide-react';

export default function LoginPage() {
  const { lang, setLang, login, register } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try {
      if (isRegister) {
        if (!name.trim()) { setError(lang === 'fr' ? 'Veuillez entrer votre nom' : 'يرجى إدخال اسمك'); setLoading(false); return; }
        const success = await register(name, email, password);
        if (!success) setError(lang === 'fr' ? 'Cet email est déjà utilisé' : 'هذا البريد مستخدم بالفعل');
      } else {
        const success = await login(email, password);
        if (!success) setError(lang === 'fr' ? 'Email ou mot de passe incorrect' : 'البريد أو كلمة المرور غير صحيحة');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-animated noise-overlay starfield relative flex flex-col overflow-hidden">
      {/* Animated orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />
      
      {/* Additional decorative orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-500/15 to-blue-500/15 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      {/* Language toggle */}
      <div className="absolute top-6 end-6 z-20">
        <button
          onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass hover:bg-white/10 transition text-sm font-medium text-white/70 hover:text-white"
        >
          <Globe size={16} />
          {lang === 'fr' ? 'العربية' : 'Français'}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 relative z-10">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo & Title */}
          <div className="text-center mb-10">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-500/40 animate-pulse-glow">
                <Sparkles className="text-white" size={32} />
              </div>
              <div className="absolute -top-2 -end-2 w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Zap size={12} className="text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">
              <span className="text-gradient">{t('appName', lang)}</span>
            </h1>
            <p className="text-white/50 mt-2 text-lg">{t('tagline', lang)}</p>
            <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs text-white/60">
              <span>🇲🇦</span>
              <span>Tronc Commun Scientifique</span>
            </div>
          </div>

          {/* Form */}
          <div className="glass-strong rounded-3xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">
              {isRegister 
                ? (lang === 'fr' ? 'Créer un compte' : 'إنشاء حساب') 
                : (lang === 'fr' ? 'Connexion' : 'تسجيل الدخول')}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {isRegister && (
                <div className="animate-fade-in">
                  <label className="block text-sm font-medium text-white/70 mb-2">
                    {t('fullName', lang)}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition"
                    placeholder={lang === 'fr' ? 'Ahmed Benali' : 'أحمد بنعلي'}
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  {t('email', lang)}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition"
                  placeholder="student@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">
                  {t('password', lang)}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none transition"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm px-4 py-3 rounded-xl">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:transform-none"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t('loading', lang)}
                  </span>
                ) : (
                  isRegister ? t('createAccount', lang) : t('login', lang)
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => { setIsRegister(!isRegister); setError(''); }}
                className="text-sm text-white/50 hover:text-white/80 transition"
              >
                {isRegister ? t('hasAccount', lang) : t('noAccount', lang)}{' '}
                <span className="text-purple-400 font-semibold hover:text-purple-300">
                  {isRegister ? t('signIn', lang) : t('register', lang)}
                </span>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-8 grid grid-cols-3 gap-3">
            <div className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition group">
              <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-2 group-hover:scale-110 transition shadow-lg shadow-blue-500/20">
                <BookOpen size={18} className="text-white" />
              </div>
              <p className="text-xs text-white/60 font-medium">{lang === 'fr' ? 'Cours complets' : 'دروس كاملة'}</p>
            </div>
            <div className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition group">
              <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-2 group-hover:scale-110 transition shadow-lg shadow-pink-500/20">
                <Brain size={18} className="text-white" />
              </div>
              <p className="text-xs text-white/60 font-medium">{lang === 'fr' ? 'Tuteur IA' : 'معلم ذكي'}</p>
            </div>
            <div className="glass rounded-2xl p-4 text-center hover:bg-white/10 transition group">
              <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-2 group-hover:scale-110 transition shadow-lg shadow-emerald-500/20">
                <Zap size={18} className="text-white" />
              </div>
              <p className="text-xs text-white/60 font-medium">{lang === 'fr' ? 'Hors ligne' : 'بدون إنترنت'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
