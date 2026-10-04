import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface SubjectsProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function SubjectsPage({ onNavigate }: SubjectsProps) {
  const { lang, progress } = useApp();

  const gradientMap: Record<string, string> = {
    math: 'from-blue-500 to-indigo-600',
    physics: 'from-purple-500 to-violet-600',
    svt: 'from-emerald-500 to-teal-600',
    french: 'from-rose-500 to-pink-600',
    arabic: 'from-amber-500 to-orange-600',
    islamic: 'from-cyan-500 to-teal-600',
  };

  const glowMap: Record<string, string> = {
    math: 'shadow-blue-500/20 hover:shadow-blue-500/40',
    physics: 'shadow-purple-500/20 hover:shadow-purple-500/40',
    svt: 'shadow-emerald-500/20 hover:shadow-emerald-500/40',
    french: 'shadow-rose-500/20 hover:shadow-rose-500/40',
    arabic: 'shadow-amber-500/20 hover:shadow-amber-500/40',
    islamic: 'shadow-cyan-500/20 hover:shadow-cyan-500/40',
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      <div className="animate-fade-in-up">
        <h1 className="text-3xl font-black text-white">{t('subjects', lang)}</h1>
        <p className="text-white/40 text-sm mt-1">
          {lang === 'fr' ? 'Tronc Commun Scientifique • 6 matières' : 'الجذع المشترك العلمي • 6 مواد'}
        </p>
      </div>

      <div className="space-y-4 stagger-children">
        {subjects.map(subject => {
          const totalLessons = subject.lessons.length;
          const completedLessons = subject.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
          const percent = Math.round((completedLessons / totalLessons) * 100);

          return (
            <div key={subject.id} className="glass-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              {/* Subject header */}
              <button
                onClick={() => onNavigate('subject-detail', { subjectId: subject.id })}
                className="w-full p-5 flex items-center gap-4 group"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradientMap[subject.id]} flex items-center justify-center text-2xl shadow-lg ${glowMap[subject.id]} group-hover:scale-110 transition-transform`}>
                  {subject.icon}
                </div>
                <div className="flex-1 text-start">
                  <h3 className="font-bold text-white text-lg">{subject.name[lang]}</h3>
                  <p className="text-sm text-white/40 mt-0.5">
                    {completedLessons}/{totalLessons} {t('lessons', lang)}
                  </p>
                </div>
                <div className="text-end">
                  <span className={`text-lg font-black bg-gradient-to-r ${gradientMap[subject.id]} bg-clip-text text-transparent`}>
                    {percent}%
                  </span>
                </div>
              </button>
              
              {/* Progress bar */}
              <div className="px-5 pb-4">
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-gradient-to-r ${gradientMap[subject.id]} rounded-full transition-all duration-700`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>

              {/* Lessons preview */}
              <div className="border-t border-white/5">
                {subject.lessons.slice(0, 2).map((lesson) => {
                  const isComplete = progress.completedLessons.includes(lesson.id);
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => onNavigate('lesson', { subjectId: subject.id, lessonId: lesson.id })}
                      className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      {isComplete ? (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow shadow-emerald-500/20">
                          <CheckCircle size={14} className="text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 rounded-full border-2 border-white/20" />
                      )}
                      <span className={`flex-1 text-start text-sm ${isComplete ? 'text-white/40' : 'text-white/80 font-medium'}`}>
                        {lesson.title[lang]}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-white/30">
                        <Clock size={11} />
                        {lesson.duration}{t('minutes', lang)}
                      </span>
                    </button>
                  );
                })}
                {subject.lessons.length > 2 && (
                  <button
                    onClick={() => onNavigate('subject-detail', { subjectId: subject.id })}
                    className="w-full px-5 py-3 text-sm text-purple-400 font-medium hover:bg-white/5 transition-colors flex items-center gap-1"
                  >
                    {lang === 'fr' ? `+ ${subject.lessons.length - 2} autres leçons` : `+ ${subject.lessons.length - 2} دروس أخرى`}
                    <ArrowRight size={14} />
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
