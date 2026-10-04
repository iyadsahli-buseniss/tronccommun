import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { Clock, CheckCircle, ChevronLeft, BookOpen, Play } from 'lucide-react';

interface SubjectDetailProps {
  subjectId: string;
  onNavigate: (page: string, data?: any) => void;
}

export default function SubjectDetailPage({ subjectId, onNavigate }: SubjectDetailProps) {
  const { lang, progress } = useApp();
  const subject = subjects.find(s => s.id === subjectId);

  if (!subject) {
    return (
      <div className="text-center py-12">
        <p className="text-white/50">{lang === 'fr' ? 'Matière non trouvée' : 'المادة غير موجودة'}</p>
      </div>
    );
  }

  const totalLessons = subject.lessons.length;
  const completedLessons = subject.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const percent = Math.round((completedLessons / totalLessons) * 100);

  const gradientMap: Record<string, string> = {
    math: 'from-blue-500 to-indigo-600',
    physics: 'from-purple-500 to-violet-600',
    svt: 'from-emerald-500 to-teal-600',
    french: 'from-rose-500 to-pink-600',
    arabic: 'from-amber-500 to-orange-600',
    islamic: 'from-cyan-500 to-teal-600',
  };

  const gradient = gradientMap[subject.id] || 'from-gray-500 to-gray-600';

  return (
    <div className="animate-fade-in-up pb-20 lg:pb-0">
      {/* Back button */}
      <button
        onClick={() => onNavigate('subjects')}
        className="flex items-center gap-2 text-white/50 hover:text-white/80 mb-4 text-sm transition"
      >
        <ChevronLeft size={16} />
        {t('subjects', lang)}
      </button>

      {/* Subject header */}
      <div className={`relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${gradient} shadow-2xl mb-6`}>
        <div className="absolute top-0 end-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 start-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="relative z-10 flex items-center gap-5">
          <span className="text-5xl">{subject.icon}</span>
          <div>
            <h1 className="text-2xl font-black text-white">{subject.name[lang]}</h1>
            <p className="text-white/70 text-sm mt-1">
              {completedLessons}/{totalLessons} {t('lessons', lang)} • {percent}%
            </p>
          </div>
        </div>
        
        <div className="relative z-10 mt-5 h-2.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all duration-700" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-3 stagger-children">
        {subject.lessons.map((lesson, idx) => {
          const isComplete = progress.completedLessons.includes(lesson.id);
          const exerciseResult = progress.exerciseResults[lesson.id];
          
          return (
            <button
              key={lesson.id}
              onClick={() => onNavigate('lesson', { subjectId, lessonId: lesson.id })}
              className="w-full glass-card rounded-2xl p-5 flex items-center gap-4 group hover:scale-[1.01] active:scale-[0.99] transition-all"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110 ${
                isComplete 
                  ? 'bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg shadow-emerald-500/20' 
                  : `bg-gradient-to-br ${gradient} shadow-lg opacity-80 group-hover:opacity-100`
              }`}>
                {isComplete ? <CheckCircle size={22} className="text-white" /> : <span className="text-white font-bold text-lg">{idx + 1}</span>}
              </div>
              
              <div className="flex-1 min-w-0 text-start">
                <p className={`font-semibold ${isComplete ? 'text-white/50' : 'text-white'}`}>
                  {lesson.title[lang]}
                </p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="flex items-center gap-1 text-xs text-white/30">
                    <Clock size={11} />
                    {lesson.duration} {t('minutes', lang)}
                  </span>
                  {exerciseResult && (
                    <span className="text-xs text-emerald-400 font-bold">
                      {exerciseResult.score}/{exerciseResult.total} ✓
                    </span>
                  )}
                  {lesson.exercises.length > 0 && (
                    <span className="text-xs text-white/30">
                      {lesson.exercises.length} {t('exercises', lang)}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0">
                {isComplete ? (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                    {t('completed', lang)}
                  </span>
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition">
                    <Play size={16} className="text-white/50 group-hover:text-white transition" />
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
