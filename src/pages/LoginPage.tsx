import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { Globe } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 flex flex-col">
      {/* Language toggle */}
      <div className="absolute top-4 end-4">
        <button
          onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white shadow-sm border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50"
        >
          <Globe size={16} />
          {lang === 'fr' ? 'العربية' : 'Français'}
        </button>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
              <span className="text-white font-bold text-2xl">D</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{t('appName', lang)}</h1>
            <p className="text-gray-500 mt-1">{t('tagline', lang)}</p>
            <p className="text-xs text-gray-400 mt-2">Tronc Commun Scientifique • المغرب</p>
          </div>

          {/* Form */}
          <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              {isRegister ? t('createAccount', lang) : t('signIn', lang)}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t('fullName', lang)}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    placeholder={lang === 'fr' ? 'Ahmed Benali' : 'أحمد بنعلي'}
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('email', lang)}
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="student@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('password', lang)}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                  placeholder="••••••••"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50"
              >
                {loading ? t('loading', lang) : (isRegister ? t('createAccount', lang) : t('login', lang))}
              </button>
            </form>

            <div className="mt-4 text-center">
              <button
                onClick={() => { setIsRegister(!isRegister); setError(''); }}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                {isRegister ? t('hasAccount', lang) : t('noAccount', lang)}{' '}
                <span className="underline">{isRegister ? t('signIn', lang) : t('register', lang)}</span>
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-6 grid grid-cols-3 gap-3 text-center">
            <div className="bg-white/80 rounded-xl p-3 border border-gray-100">
              <span className="text-2xl">📚</span>
              <p className="text-xs text-gray-600 mt-1">{lang === 'fr' ? 'Cours complets' : 'دروس كاملة'}</p>
            </div>
            <div className="bg-white/80 rounded-xl p-3 border border-gray-100">
              <span className="text-2xl">🤖</span>
              <p className="text-xs text-gray-600 mt-1">{lang === 'fr' ? 'Tuteur IA' : 'معلم ذكي'}</p>
            </div>
            <div className="bg-white/80 rounded-xl p-3 border border-gray-100">
              <span className="text-2xl">📱</span>
              <p className="text-xs text-gray-600 mt-1">{lang === 'fr' ? 'Hors ligne' : 'بدون إنترنت'}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
