import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { Clock, CheckCircle, Lock } from 'lucide-react';

interface SubjectsProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function SubjectsPage({ onNavigate }: SubjectsProps) {
  const { lang, progress } = useApp();

  return (
    <div className="space-y-6 animate-fade-in pb-16 lg:pb-0">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">{t('subjects', lang)}</h1>
        <p className="text-gray-500 text-sm mt-1">
          {lang === 'fr' ? 'Tronc Commun Scientifique' : 'الجذع المشترك العلمي'}
        </p>
      </div>

      <div className="space-y-4">
        {subjects.map(subject => {
          const totalLessons = subject.lessons.length;
          const completedLessons = subject.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
          const percent = Math.round((completedLessons / totalLessons) * 100);

          return (
            <div key={subject.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {/* Subject header */}
              <button
                onClick={() => onNavigate('subject-detail', { subjectId: subject.id })}
                className="w-full p-4 flex items-center gap-4 hover:bg-gray-50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center text-2xl shadow-sm`}>
                  {subject.icon}
                </div>
                <div className="flex-1 text-start">
                  <h3 className="font-bold text-gray-800">{subject.name[lang]}</h3>
                  <p className="text-sm text-gray-500">
                    {completedLessons}/{totalLessons} {t('lessons', lang)}
                  </p>
                </div>
                <div className="text-end">
                  <span className="text-sm font-semibold text-primary-600">{percent}%</span>
                </div>
              </button>
              
              {/* Progress bar */}
              <div className="px-4 pb-3">
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all duration-500`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* Lessons list preview */}
              <div className="border-t border-gray-100">
                {subject.lessons.slice(0, 2).map((lesson, idx) => {
                  const isComplete = progress.completedLessons.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onNavigate('lesson', { subjectId: subject.id, lessonId: lesson.id })}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                    >
                      {isComplete ? (
                        <CheckCircle size={18} className="text-accent-500 shrink-0" />
                      ) : (
                        <div className="w-[18px] h-[18px] rounded-full border-2 border-gray-300 shrink-0" />
                      )}
                      <span className={`flex-1 text-start text-sm ${isComplete ? 'text-gray-500' : 'text-gray-700 font-medium'}`}>
                        {lesson.title[lang]}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <Clock size={12} />
                        {lesson.duration}{t('minutes', lang)}
                      </span>
                    </button>
                  );
                })}
                {subject.lessons.length > 2 && (
                  <button
                    onClick={() => onNavigate('subject-detail', { subjectId: subject.id })}
                    className="w-full px-4 py-2 text-sm text-primary-600 font-medium hover:bg-primary-50 transition-colors"
                  >
                    {lang === 'fr' ? `+ ${subject.lessons.length - 2} autres leçons` : `+ ${subject.lessons.length - 2} دروس أخرى`}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
