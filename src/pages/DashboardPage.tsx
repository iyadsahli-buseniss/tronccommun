import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { BookOpen, Target, Flame, Award, ArrowRight } from 'lucide-react';

interface DashboardProps {
  onNavigate: (page: string, data?: any) => void;
}

export default function DashboardPage({ onNavigate }: DashboardProps) {
  const { lang, progress, user } = useApp();

  const totalLessons = subjects.reduce((acc, s) => acc + s.lessons.length, 0);
  const completedCount = progress.completedLessons.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // Find next incomplete lesson
  const nextLesson = subjects
    .flatMap(s => s.lessons.map(l => ({ ...l, subject: s })))
    .find(l => !progress.completedLessons.includes(l.id));

  return (
    <div className="space-y-6 animate-fade-in pb-16 lg:pb-0">
      {/* Welcome */}
      <div className="bg-gradient-to-br from-primary-600 to-primary-800 rounded-2xl p-6 text-white shadow-lg">
        <h1 className="text-2xl font-bold">
          {t('welcome', lang)}, {user?.name?.split(' ')[0]} 👋
        </h1>
        <p className="text-primary-100 mt-1">{t('tagline', lang)}</p>
        
        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span>{t('progress', lang)}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="h-2 bg-primary-900/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-accent-400 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <Flame className="mx-auto text-orange-500 mb-1" size={24} />
          <p className="text-2xl font-bold text-gray-800">{progress.streak}</p>
          <p className="text-xs text-gray-500">{t('streak', lang)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <BookOpen className="mx-auto text-primary-500 mb-1" size={24} />
          <p className="text-2xl font-bold text-gray-800">{completedCount}</p>
          <p className="text-xs text-gray-500">{t('completedLessons', lang)}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm text-center">
          <Award className="mx-auto text-accent-500 mb-1" size={24} />
          <p className="text-2xl font-bold text-gray-800">{progress.totalExercisesDone}</p>
          <p className="text-xs text-gray-500">{t('exercisesDone', lang)}</p>
        </div>
      </div>

      {/* Diagnostic CTA */}
      {progress.diagnosticScore === null && (
        <button
          onClick={() => onNavigate('diagnostic')}
          className="w-full bg-gradient-to-r from-warm-500 to-orange-500 rounded-xl p-4 text-white shadow-md hover:shadow-lg transition-all flex items-center justify-between"
        >
          <div className="text-start">
            <h3 className="font-bold text-lg">{t('startDiagnostic', lang)}</h3>
            <p className="text-orange-100 text-sm">{t('diagnosticDesc', lang)}</p>
          </div>
          <ArrowRight size={24} className="opacity-80" />
        </button>
      )}

      {/* Diagnostic results */}
      {progress.diagnosticScore !== null && (
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <div className="flex items-center gap-3">
            <Target className="text-primary-500" size={24} />
            <div>
              <p className="font-semibold text-gray-800">{t('results', lang)}</p>
              <p className="text-sm text-gray-500">{t('yourScore', lang)}: {progress.diagnosticScore}%</p>
            </div>
          </div>
        </div>
      )}

      {/* Continue learning */}
      {nextLesson && (
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-3">{t('continueLearning', lang)}</h3>
          <button
            onClick={() => onNavigate('lesson', { subjectId: nextLesson.subject.id, lessonId: nextLesson.id })}
            className="w-full flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="text-2xl">{nextLesson.subject.icon}</span>
            <div className="flex-1 text-start">
              <p className="font-medium text-gray-800">{nextLesson.title[lang]}</p>
              <p className="text-xs text-gray-500">
                {nextLesson.subject.name[lang]} • {nextLesson.duration} {t('minutes', lang)}
              </p>
            </div>
            <ArrowRight size={18} className="text-gray-400" />
          </button>
        </div>
      )}

      {/* Subjects overview */}
      <div>
        <h3 className="font-semibold text-gray-800 mb-3">{t('subjects', lang)}</h3>
        <div className="grid grid-cols-2 gap-3">
          {subjects.map(subject => {
            const subjectLessons = subject.lessons.length;
            const subjectCompleted = subject.lessons.filter(l => progress.completedLessons.includes(l.id)).length;
            const subjectPercent = Math.round((subjectCompleted / subjectLessons) * 100);
            
            return (
              <button
                key={subject.id}
                onClick={() => onNavigate('subject-detail', { subjectId: subject.id })}
                className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all text-start"
              >
                <span className="text-2xl">{subject.icon}</span>
                <p className="font-medium text-gray-800 mt-2 text-sm">{subject.name[lang]}</p>
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>{subjectCompleted}/{subjectLessons}</span>
                    <span>{subjectPercent}%</span>
                  </div>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${subject.color} rounded-full transition-all`}
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
