import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { Calendar, TrendingUp, TrendingDown, Target, Clock, Sparkles, Zap } from 'lucide-react';

interface StudyPlanProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function StudyPlanPage({ onNavigate }: StudyPlanProps) {
  const { lang, progress } = useApp();

  const subjectPerformance = subjects.map(subject => {
    const totalLessons = subject.lessons.length;
    const completed = subject.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const exerciseResults = subject.lessons
      .map(l => progress.exerciseResults[l.id])
      .filter(Boolean);
    
    const avgScore = exerciseResults.length > 0
      ? Math.round(exerciseResults.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / exerciseResults.length)
      : null;

    return { ...subject, totalLessons, completed, percent: Math.round((completed / totalLessons) * 100), avgScore };
  });

  const weakAreas = subjectPerformance.filter(s => s.avgScore !== null && s.avgScore < 60);
  const strongAreas = subjectPerformance.filter(s => s.avgScore !== null && s.avgScore >= 60);
  const notStarted = subjectPerformance.filter(s => s.completed === 0);

  const recommendations = [
    ...notStarted.map(s => ({ type: 'start' as const, subject: s, priority: 3 })),
    ...weakAreas.map(s => ({ type: 'improve' as const, subject: s, priority: 1 })),
    ...strongAreas.filter(s => s.percent < 100).map(s => ({ type: 'continue' as const, subject: s, priority: 2 })),
  ].sort((a, b) => a.priority - b.priority);

  const weeklyLessons = 5;
  const thisWeekProgress = Math.min(progress.completedLessons.length, weeklyLessons);

  const gradientMap: Record<string, string> = {
    math: 'from-blue-500 to-indigo-600',
    physics: 'from-purple-500 to-violet-600',
    svt: 'from-emerald-500 to-teal-600',
    french: 'from-rose-500 to-pink-600',
    arabic: 'from-amber-500 to-orange-600',
    islamic: 'from-cyan-500 to-teal-600',
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-20 lg:pb-0">
      <div>
        <h1 className="text-3xl font-black text-white">{t('yourPlan', lang)}</h1>
        <p className="text-white/40 text-sm mt-1">
          {lang === 'fr' ? 'Personnalisé selon ton niveau' : 'مخصص حسب مستواك'}
        </p>
      </div>

      {/* Weekly goal */}
      <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 end-0 w-32 h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="relative z-10 flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Target className="text-white" size={22} />
          </div>
          <div>
            <h3 className="font-bold text-white">{t('weeklyGoal', lang)}</h3>
            <p className="text-sm text-white/40">{thisWeekProgress}/{weeklyLessons} {t('lessons', lang)}</p>
          </div>
          <div className="ms-auto">
            <span className="text-2xl font-black text-gradient">{Math.round((thisWeekProgress / weeklyLessons) * 100)}%</span>
          </div>
        </div>
        <div className="h-3 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full transition-all duration-700"
            style={{ width: `${(thisWeekProgress / weeklyLessons) * 100}%` }}
          />
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h3 className="font-bold text-white mb-3 flex items-center gap-2">
            <Sparkles size={18} className="text-amber-400" />
            {t('recommended', lang)}
          </h3>
          <div className="space-y-2 stagger-children">
            {recommendations.slice(0, 5).map((rec, idx) => {
              const nextLesson = rec.subject.lessons.find(l => !progress.completedLessons.includes(l.id));
              if (!nextLesson) return null;

              return (
                <button
                  key={idx}
                  onClick={() => onNavigate('lesson', { subjectId: rec.subject.id, lessonId: nextLesson.id })}
                  className="w-full glass-card rounded-xl p-4 flex items-center gap-3 group hover:scale-[1.01] active:scale-[0.99] transition-all"
                >
                  <span className="text-2xl">{rec.subject.icon}</span>
                  <div className="flex-1 min-w-0 text-start">
                    <p className="font-semibold text-white text-sm truncate">{nextLesson.title[lang]}</p>
                    <p className="text-xs text-white/30 flex items-center gap-2 mt-0.5">
                      <span>{rec.subject.name[lang]}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{nextLesson.duration}{t('minutes', lang)}</span>
                    </p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1.5 rounded-full border ${
                    rec.type === 'improve' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' :
                    rec.type === 'start' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                    'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {rec.type === 'improve' ? (lang === 'fr' ? 'À améliorer' : 'للتحسين') :
                     rec.type === 'start' ? (lang === 'fr' ? 'Nouveau' : 'جديد') :
                     (lang === 'fr' ? 'Continuer' : 'متابعة')}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Performance overview */}
      <div>
        <h3 className="font-bold text-white mb-3">
          {lang === 'fr' ? 'Vue d\'ensemble' : 'نظرة عامة'}
        </h3>
        <div className="space-y-3 stagger-children">
          {subjectPerformance.map(subject => (
            <div key={subject.id} className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3 mb-2.5">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradientMap[subject.id]} flex items-center justify-center text-lg shadow-lg`}>
                  {subject.icon}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm">{subject.name[lang]}</p>
                  <p className="text-xs text-white/30">
                    {subject.completed}/{subject.totalLessons} {t('lessons', lang)}
                    {subject.avgScore !== null && ` • ${subject.avgScore}%`}
                  </p>
                </div>
                {subject.avgScore !== null && (
                  subject.avgScore >= 60 
                    ? <TrendingUp size={18} className="text-emerald-400" />
                    : <TrendingDown size={18} className="text-rose-400" />
                )}
              </div>
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${gradientMap[subject.id]} rounded-full transition-all duration-700`}
                  style={{ width: `${subject.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak/Strong areas */}
      {(weakAreas.length > 0 || strongAreas.length > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {weakAreas.length > 0 && (
            <div className="glass-card rounded-xl p-4 border-rose-500/20 bg-rose-500/5">
              <h4 className="font-bold text-rose-400 flex items-center gap-2 text-sm mb-3">
                <TrendingDown size={16} />
                {t('weakAreas', lang)}
              </h4>
              {weakAreas.map(s => (
                <div key={s.id} className="flex items-center gap-2 py-1.5">
                  <span>{s.icon}</span>
                  <span className="text-sm text-white/70 flex-1">{s.name[lang]}</span>
                  <span className="text-sm font-bold text-rose-400">{s.avgScore}%</span>
                </div>
              ))}
            </div>
          )}
          {strongAreas.length > 0 && (
            <div className="glass-card rounded-xl p-4 border-emerald-500/20 bg-emerald-500/5">
              <h4 className="font-bold text-emerald-400 flex items-center gap-2 text-sm mb-3">
                <TrendingUp size={16} />
                {t('strongAreas', lang)}
              </h4>
              {strongAreas.map(s => (
                <div key={s.id} className="flex items-center gap-2 py-1.5">
                  <span>{s.icon}</span>
                  <span className="text-sm text-white/70 flex-1">{s.name[lang]}</span>
                  <span className="text-sm font-bold text-emerald-400">{s.avgScore}%</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No diagnostic yet */}
      {progress.diagnosticScore === null && (
        <div className="glass-card rounded-2xl p-5 text-center bg-gradient-to-r from-amber-500/5 to-orange-500/5 border-amber-500/20">
          <div className="w-12 h-12 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20 mb-3">
            <Zap className="text-white" size={20} />
          </div>
          <p className="text-sm text-white/60">
            {lang === 'fr' 
              ? 'Passe le test de positionnement pour des recommandations personnalisées !'
              : 'أجرِ اختبار تحديد المستوى للحصول على توصيات مخصصة!'}
          </p>
          <button
            onClick={() => onNavigate('diagnostic')}
            className="mt-4 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/30 hover:shadow-amber-500/50 transition"
          >
            {t('startDiagnostic', lang)}
          </button>
        </div>
      )}
    </div>
  );
}
