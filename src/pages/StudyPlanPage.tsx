import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { Calendar, TrendingUp, TrendingDown, Target, BookOpen, Clock } from 'lucide-react';

interface StudyPlanProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function StudyPlanPage({ onNavigate }: StudyPlanProps) {
  const { lang, progress } = useApp();

  // Calculate subject performance
  const subjectPerformance = subjects.map(subject => {
    const totalLessons = subject.lessons.length;
    const completed = subject.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
    const exerciseResults = subject.lessons
      .map(l => progress.exerciseResults[l.id])
      .filter(Boolean);
    
    const avgScore = exerciseResults.length > 0
      ? Math.round(exerciseResults.reduce((sum, r) => sum + (r.score / r.total) * 100, 0) / exerciseResults.length)
      : null;

    return {
      ...subject,
      totalLessons,
      completed,
      percent: Math.round((completed / totalLessons) * 100),
      avgScore,
    };
  });

  // Identify weak and strong areas
  const weakAreas = subjectPerformance.filter(s => s.avgScore !== null && s.avgScore < 60);
  const strongAreas = subjectPerformance.filter(s => s.avgScore !== null && s.avgScore >= 60);
  const notStarted = subjectPerformance.filter(s => s.completed === 0);

  // Generate study recommendations
  const recommendations = [
    ...notStarted.map(s => ({
      type: 'start' as const,
      subject: s,
      priority: 3,
    })),
    ...weakAreas.map(s => ({
      type: 'improve' as const,
      subject: s,
      priority: 1,
    })),
    ...strongAreas.filter(s => s.percent < 100).map(s => ({
      type: 'continue' as const,
      subject: s,
      priority: 2,
    })),
  ].sort((a, b) => a.priority - b.priority);

  // Weekly goal
  const weeklyLessons = 5;
  const thisWeekProgress = Math.min(progress.completedLessons.length, weeklyLessons);

  return (
    <div className="space-y-6 animate-fade-in pb-16 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{t('yourPlan', lang)}</h1>
        <p className="text-gray-500 text-sm mt-1">
          {lang === 'fr' ? 'Basé sur ton diagnostic et ta progression' : 'بناءً على تشخيصك وتقدمك'}
        </p>
      </div>

      {/* Weekly goal */}
      <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
            <Target className="text-primary-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{t('weeklyGoal', lang)}</h3>
            <p className="text-sm text-gray-500">{thisWeekProgress}/{weeklyLessons} {t('lessons', lang)}</p>
          </div>
        </div>
        <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all"
            style={{ width: `${(thisWeekProgress / weeklyLessons) * 100}%` }}
          />
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Calendar size={18} className="text-primary-500" />
            {t('recommended', lang)}
          </h3>
          <div className="space-y-2">
            {recommendations.slice(0, 5).map((rec, idx) => {
              const nextLesson = rec.subject.lessons.find(l => !progress.completedLessons.includes(l.id));
              if (!nextLesson) return null;

              return (
                <button
                  key={idx}
                  onClick={() => onNavigate('lesson', { subjectId: rec.subject.id, lessonId: nextLesson.id })}
                  className="w-full bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-3 text-start"
                >
                  <span className="text-xl">{rec.subject.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-800 text-sm truncate">{nextLesson.title[lang]}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-2">
                      <span>{rec.subject.name[lang]}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock size={10} />{nextLesson.duration}{t('minutes', lang)}</span>
                    </p>
                  </div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    rec.type === 'improve' ? 'bg-red-50 text-red-600' :
                    rec.type === 'start' ? 'bg-blue-50 text-blue-600' :
                    'bg-green-50 text-green-600'
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
        <h3 className="font-semibold text-gray-800 mb-3">
          {lang === 'fr' ? 'Vue d\'ensemble' : 'نظرة عامة'}
        </h3>
        <div className="space-y-3">
          {subjectPerformance.map(subject => (
            <div key={subject.id} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">{subject.icon}</span>
                <div className="flex-1">
                  <p className="font-medium text-gray-800 text-sm">{subject.name[lang]}</p>
                  <p className="text-xs text-gray-500">
                    {subject.completed}/{subject.totalLessons} {t('lessons', lang)}
                    {subject.avgScore !== null && ` • ${lang === 'fr' ? 'Score moyen' : 'معدل النقاط'}: ${subject.avgScore}%`}
                  </p>
                </div>
                {subject.avgScore !== null && (
                  subject.avgScore >= 60 
                    ? <TrendingUp size={18} className="text-accent-500" />
                    : <TrendingDown size={18} className="text-red-500" />
                )}
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all`}
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
            <div className="bg-red-50 rounded-xl p-4 border border-red-100">
              <h4 className="font-semibold text-red-700 flex items-center gap-2 text-sm mb-2">
                <TrendingDown size={16} />
                {t('weakAreas', lang)}
              </h4>
              {weakAreas.map(s => (
                <p key={s.id} className="text-sm text-red-600">{s.icon} {s.name[lang]} ({s.avgScore}%)</p>
              ))}
            </div>
          )}
          {strongAreas.length > 0 && (
            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <h4 className="font-semibold text-green-700 flex items-center gap-2 text-sm mb-2">
                <TrendingUp size={16} />
                {t('strongAreas', lang)}
              </h4>
              {strongAreas.map(s => (
                <p key={s.id} className="text-sm text-green-600">{s.icon} {s.name[lang]} ({s.avgScore}%)</p>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No diagnostic yet */}
      {progress.diagnosticScore === null && (
        <div className="bg-warm-50 border border-warm-100 rounded-xl p-4 text-center">
          <p className="text-sm text-gray-600">
            {lang === 'fr' 
              ? '💡 Passe le test de positionnement pour obtenir des recommandations personnalisées !'
              : '💡 أجرِ اختبار تحديد المستوى للحصول على توصيات مخصصة!'}
          </p>
          <button
            onClick={() => onNavigate('diagnostic')}
            className="mt-3 px-4 py-2 bg-warm-500 text-white text-sm font-medium rounded-lg hover:bg-warm-600 transition"
          >
            {t('startDiagnostic', lang)}
          </button>
        </div>
      )}
    </div>
  );
}
