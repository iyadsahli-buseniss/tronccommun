import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { BookOpen, Target, Flame, Award, ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function DashboardPage({ onNavigate }: DashboardProps) {
  const { lang, progress, user } = useApp();

  const totalLessons = subjects.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  const nextLesson = subjects
    .flatMap(s => s.lessons.map(l => ({ ...l, subject: s })))
    .find(l => !progress.completedLessons.includes(l.id));

  // SVG Progress Ring
  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Welcome Hero */}
      <div className="relative overflow-hidden rounded-3xl p-6 lg:p-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 shadow-2xl shadow-purple-500/20">
        {/* Decorative elements */}
        <div className="absolute top-0 end-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 start-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-4 end-4 opacity-20">
          <Sparkles size={40} className="text-white animate-pulse" />
        </div>
        
        <div className="relative z-10 flex items-center gap-6">
          <div className="flex-1">
            <p className="text-white/60 text-sm font-medium">
              {lang === 'fr' ? 'Bonjour' : 'مرحباً'} 👋
            </p>
            <h1 className="text-2xl lg:text-3xl font-black text-white mt-1">
              {user?.name?.split(' ')[0]}
            </h1>
            <p className="text-white/60 mt-2 text-sm">
              {progressPercent === 0 
                ? (lang === 'fr' ? 'Commençons ton parcours !' : 'لنبدأ مسارك!')
                : progressPercent < 50
                  ? (lang === 'fr' ? 'Continue comme ça !' : 'واصل هكذا!')
                  : (lang === 'fr' ? 'Tu es en feu 🔥' : 'أنت متألق 🔥')}
            </p>
          </div>
          
          {/* Progress Ring */}
          <div className="relative w-28 h-28 shrink-0">
            <svg className="progress-ring w-28 h-28">
              <circle
                className="text-white/10"
                strokeWidth="8"
                stroke="currentColor"
                fill="transparent"
                r="54"
                cx="56"
                cy="56"
              />
              <circle
                className="text-white progress-ring-circle"
                strokeWidth="8"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="54"
                cx="56"
                cy="56"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-black text-white">{progressPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-3 stagger-children">
        <div className="glass-card rounded-2xl p-4 text-center group cursor-default">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center mb-2 group-hover:scale-110 transition shadow-lg shadow-orange-500/20">
            <Flame className="text-white" size={22} />
          </div>
          <p className="text-2xl font-black text-white">{progress.streak}</p>
          <p className="text-xs text-white/40 font-medium mt-0.5">{t('streak', lang)}</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center group cursor-default">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center mb-2 group-hover:scale-110 transition shadow-lg shadow-indigo-500/20">
            <BookOpen className="text-white" size={22} />
          </div>
          <p className="text-2xl font-black text-white">{completedCount}</p>
          <p className="text-xs text-white/40 font-medium mt-0.5">{t('completedLessons', lang)}</p>
        </div>
        <div className="glass-card rounded-2xl p-4 text-center group cursor-default">
          <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mb-2 group-hover:scale-110 transition shadow-lg shadow-emerald-500/20">
            <Award className="text-white" size={22} />
          </div>
          <p className="text-2xl font-black text-white">{progress.totalExercisesDone}</p>
          <p className="text-xs text-white/40 font-medium mt-0.5">{t('exercisesDone', lang)}</p>
        </div>
      </div>

      {/* Diagnostic CTA */}
      {progress.diagnosticScore === null && (
        <button
          onClick={() => onNavigate('diagnostic')}
          className="w-full relative overflow-hidden rounded-2xl p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 shadow-xl shadow-orange-500/20 hover:shadow-orange-500/40 hover:scale-[1.01] active:scale-[0.99] transition-all group"
        >
          <div className="absolute top-0 end-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex items-center justify-between">
            <div className="text-start">
              <div className="flex items-center gap-2 mb-1">
                <Target size={18} className="text-white/80" />
                <h3 className="font-bold text-white text-lg">{t('startDiagnostic', lang)}</h3>
              </div>
              <p className="text-white/70 text-sm">{t('diagnosticDesc', lang)}</p>
            </div>
            <ArrowRight size={24} className="text-white/60 group-hover:translate-x-1 transition-transform" />
          </div>
        </button>
      )}

      {/* Diagnostic results */}
      {progress.diagnosticScore !== null && (
        <div className="glass-card rounded-2xl p-5">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Target className="text-white" size={24} />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white">{t('results', lang)}</p>
              <p className="text-sm text-white/50">{t('yourScore', lang)}: <span className="text-cyan-400 font-bold">{progress.diagnosticScore}%</span></p>
            </div>
            <button
              onClick={() => onNavigate('diagnostic')}
              className="px-4 py-2 rounded-xl glass text-sm text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              {lang === 'fr' ? 'Refaire' : 'إعادة'}
            </button>
          </div>
        </div>
      )}

      {/* Continue learning */}
      {nextLesson && (
        <div className="glass-card rounded-2xl p-5">
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <TrendingUp size={18} className="text-emerald-400" />
            {t('continueLearning', lang)}
          </h3>
          <button
            onClick={() => onNavigate('lesson', { subjectId: nextLesson.subject.id, lessonId: nextLesson.id })}
            className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all group"
          >
            <span className="text-3xl">{nextLesson.subject.icon}</span>
            <div className="flex-1 text-start">
              <p className="font-semibold text-white">{nextLesson.title[lang]}</p>
              <p className="text-xs text-white/40 mt-0.5">
                {nextLesson.subject.name[lang]} • {nextLesson.duration} {t('minutes', lang)}
              </p>
            </div>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition shadow-lg">
              <ArrowRight size={14} className="text-white" />
            </div>
          </button>
        </div>
      )}

      {/* Subjects Grid */}
      <div>
        <h3 className="font-bold text-white mb-4 text-lg">{t('subjects', lang)}</h3>
        <div className="grid grid-cols-2 gap-3 stagger-children">
          {subjects.map(subject => {
            const subjectLessons = subject.lessons.length;
            const subjectCompleted = subject.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
            const subjectPercent = Math.round((subjectCompleted / subjectLessons) * 100);
            
            const gradientMap: Record<string, string> = {
              math: 'from-blue-500 to-indigo-600',
              physics: 'from-purple-500 to-violet-600',
              svt: 'from-emerald-500 to-teal-600',
              french: 'from-rose-500 to-pink-600',
              arabic: 'from-amber-500 to-orange-600',
              islamic: 'from-cyan-500 to-teal-600',
            };
            
            const glowMap: Record<string, string> = {
              math: 'shadow-blue-500/20',
              physics: 'shadow-purple-500/20',
              svt: 'shadow-emerald-500/20',
              french: 'shadow-rose-500/20',
              arabic: 'shadow-amber-500/20',
              islamic: 'shadow-cyan-500/20',
            };

            return (
              <button
                key={subject.id}
                onClick={() => onNavigate('subject-detail', { subjectId: subject.id })}
                className={`glass-card rounded-2xl p-4 text-start group hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg ${glowMap[subject.id] || ''}`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradientMap[subject.id] || 'from-gray-500 to-gray-600'} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                  {subject.icon}
                </div>
                <p className="font-bold text-white mt-3 text-sm">{subject.name[lang]}</p>
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-white/40 mb-1.5">
                    <span>{subjectCompleted}/{subjectLessons}</span>
                    <span className="font-bold text-white/60">{subjectPercent}%</span>
                  </div>
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${gradientMap[subject.id] || 'from-gray-500 to-gray-600'} rounded-full transition-all duration-700`}
                      style={{ width: `${subjectPercent}%` }}
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
