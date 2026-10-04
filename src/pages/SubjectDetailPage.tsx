import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { Clock, CheckCircle, ChevronLeft, BookOpen } from 'lucide-react';

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
        <p className="text-gray-500">{lang === 'fr' ? 'Matière non trouvée' : 'المادة غير موجودة'}</p>
      </div>
    );
  }

  const totalLessons = subject.lessons.length;
  const completedLessons = subject.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
  const percent = Math.round((completedLessons / totalLessons) * 100);

  return (
    <div className="animate-fade-in pb-16 lg:pb-0">
      {/* Back button */}
      <button
        onClick={() => onNavigate('subjects')}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 text-sm"
      >
        <ChevronLeft size={16} />
        {t('subjects', lang)}
      </button>

      {/* Subject header */}
      <div className={`bg-gradient-to-r ${subject.color} rounded-2xl p-6 text-white shadow-lg mb-6`}>
        <div className="flex items-center gap-4">
          <span className="text-4xl">{subject.icon}</span>
          <div>
            <h1 className="text-2xl font-bold">{subject.name[lang]}</h1>
            <p className="opacity-80 text-sm mt-1">
              {completedLessons}/{totalLessons} {t('lessons', lang)} • {percent}%
            </p>
          </div>
        </div>
        <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full transition-all" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-3">
        {subject.lessons.map((lesson, idx) => {
          const isComplete = progress.completedLessons.includes(lesson.id);
          const exerciseResult = progress.exerciseResults[lesson.id];
          
          return (
            <button
              key={lesson.id}
              onClick={() => onNavigate('lesson', { subjectId, lessonId: lesson.id })}
              className="w-full bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-center gap-4 text-start"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                isComplete ? 'bg-accent-100 text-accent-600' : 'bg-gray-100 text-gray-400'
              }`}>
                {isComplete ? <CheckCircle size={20} /> : <BookOpen size={20} />}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${isComplete ? 'text-gray-500' : 'text-gray-800'}`}>
                  {lesson.title[lang]}
                </p>
                <div className="flex items-center gap-3 mt-1">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock size={12} />
                    {lesson.duration} {t('minutes', lang)}
                  </span>
                  {exerciseResult && (
                    <span className="text-xs text-accent-600 font-medium">
                      {exerciseResult.score}/{exerciseResult.total} ✓
                    </span>
                  )}
                  {lesson.exercises.length > 0 && (
                    <span className="text-xs text-gray-400">
                      {lesson.exercises.length} {t('exercises', lang)}
                    </span>
                  )}
                </div>
              </div>

              <div className="shrink-0">
                {isComplete ? (
                  <span className="text-xs font-medium text-accent-600 bg-accent-50 px-2 py-1 rounded-full">
                    {t('completed', lang)}
                  </span>
                ) : (
                  <span className="text-xs font-medium text-primary-600 bg-primary-50 px-2 py-1 rounded-full">
                    {t('start', lang)}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
