import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen, Dumbbell, ChevronLeft } from 'lucide-react';

interface LessonProps {
  subjectId: string;
  lessonId: string;
  onNavigate: (page: string, data?: any) => void;
}

export default function LessonPage({ subjectId, lessonId, onNavigate }: LessonProps) {
  const { lang, progress, markLessonComplete, isLessonCompleted } = useApp();
  const [showPractice, setShowPractice] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [practiceFinished, setPracticeFinished] = useState(false);

  const subject = subjects.find(s => s.id === subjectId)!;
  const lesson = subject.lessons.find(l => l.id === lessonId)!;
  const lessonIndex = subject.lessons.findIndex(l => l.id === lessonId);
  const isCompleted = isLessonCompleted(lessonId);

  const handleMarkComplete = () => {
    if (!isCompleted) {
      markLessonComplete(lessonId);
    }
  };

  const handleAnswer = () => {
    if (selected === null) return;
    setAnswered(true);
    if (selected === lesson.exercises[currentExercise].correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNextExercise = () => {
    if (currentExercise < lesson.exercises.length - 1) {
      setCurrentExercise(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setPracticeFinished(true);
      markLessonComplete(lessonId);
    }
  };

  // Render markdown-like content
  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('• ')) {
        const content = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        return <li key={i} className="ml-4 text-gray-700 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }} />;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h4 key={i} className="font-bold text-gray-800 mt-3 mb-1">{line.slice(2, -2)}</h4>;
      }
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-gray-700 leading-relaxed">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j}>{part}</strong> : part)}
          </p>
        );
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-gray-700 leading-relaxed">{line}</p>;
    });
  };

  if (showPractice) {
    if (practiceFinished) {
      const total = lesson.exercises.length;
      const percent = Math.round((score / total) * 100);
      return (
        <div className="max-w-lg mx-auto animate-fade-in pb-16 lg:pb-0">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg text-center">
            <div className="text-5xl mb-4">{percent >= 70 ? '🎉' : percent >= 40 ? '💪' : '📚'}</div>
            <h2 className="text-xl font-bold text-gray-800">{t('results', lang)}</h2>
            <div className="mt-4 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-50 border-4 border-primary-200">
              <span className="text-2xl font-bold text-primary-700">{score}/{total}</span>
            </div>
            <p className="mt-3 text-gray-600">{percent}%</p>
            
            <div className="mt-6 flex gap-3 justify-center">
              <button
                onClick={() => { setShowPractice(false); setPracticeFinished(false); setCurrentExercise(0); setSelected(null); setAnswered(false); setScore(0); }}
                className="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition"
              >
                {t('tryAgain', lang)}
              </button>
              {lessonIndex < subject.lessons.length - 1 && (
                <button
                  onClick={() => onNavigate('lesson', { subjectId, lessonId: subject.lessons[lessonIndex + 1].id })}
                  className="px-5 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition flex items-center gap-2"
                >
                  {t('nextLesson', lang)}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      );
    }

    const exercise = lesson.exercises[currentExercise];
    return (
      <div className="max-w-lg mx-auto animate-fade-in pb-16 lg:pb-0">
        <button
          onClick={() => { setShowPractice(false); setPracticeFinished(false); setCurrentExercise(0); setSelected(null); setAnswered(false); setScore(0); }}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 text-sm"
        >
          <ChevronLeft size={16} />
          {t('backToSubject', lang)}
        </button>

        <div className="mb-3">
          <div className="flex justify-between text-sm text-gray-500 mb-1">
            <span>{t('question', lang)} {currentExercise + 1} {t('of', lang)} {lesson.exercises.length}</span>
            <span>{t('score', lang)}: {score}</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-accent-500 rounded-full transition-all" style={{ width: `${((currentExercise + (answered ? 1 : 0)) / lesson.exercises.length) * 100}%` }} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
          <p className="text-lg font-semibold text-gray-800 mb-6">{exercise.question[lang]}</p>
          
          <div className="space-y-3">
            {exercise.options[lang].map((option, idx) => {
              let style = 'border-gray-200 hover:border-primary-300';
              if (selected === idx && !answered) style = 'border-primary-500 bg-primary-50';
              if (answered) {
                if (idx === exercise.correctIndex) style = 'border-green-500 bg-green-50';
                else if (idx === selected) style = 'border-red-500 bg-red-50';
                else style = 'border-gray-200 opacity-50';
              }
              return (
                <button key={idx} onClick={() => !answered && setSelected(idx)} disabled={answered}
                  className={`w-full p-4 rounded-xl border-2 text-start transition-all ${style}`}>
                  <span className="font-medium text-gray-800">{option}</span>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`mt-4 p-3 rounded-lg ${selected === exercise.correctIndex ? 'bg-green-50 border border-green-200' : 'bg-orange-50 border border-orange-200'}`}>
              <p className="font-semibold text-sm mb-1">
                {selected === exercise.correctIndex ? `✅ ${t('correct', lang)}` : `❌ ${t('incorrect', lang)}`}
              </p>
              <p className="text-sm text-gray-600">{exercise.explanation[lang]}</p>
            </div>
          )}

          <div className="mt-4">
            {!answered ? (
              <button onClick={handleAnswer} disabled={selected === null}
                className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-primary-700 transition">
                {t('checkAnswer', lang)}
              </button>
            ) : (
              <button onClick={handleNextExercise}
                className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2">
                {currentExercise < lesson.exercises.length - 1 ? t('nextQuestion', lang) : t('finish', lang)}
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto animate-fade-in pb-16 lg:pb-0">
      {/* Header */}
      <button
        onClick={() => onNavigate('subject-detail', { subjectId })}
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4 text-sm"
      >
        <ChevronLeft size={16} />
        {subject.name[lang]}
      </button>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Lesson header */}
        <div className={`bg-gradient-to-r ${subject.color} p-6 text-white`}>
          <div className="flex items-center gap-2 text-sm opacity-80 mb-2">
            <Clock size={14} />
            {lesson.duration} {t('minutes', lang)}
            {isCompleted && <CheckCircle size={14} className="ms-2" />}
          </div>
          <h1 className="text-xl font-bold">{lesson.title[lang]}</h1>
          <p className="text-sm opacity-80 mt-1">
            {lang === 'fr' ? 'Leçon' : 'درس'} {lessonIndex + 1}/{subject.lessons.length}
          </p>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="prose prose-sm max-w-none">
            {renderContent(lesson.content[lang])}
          </div>

          {/* Examples */}
          {lesson.examples[lang].length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-gray-800 flex items-center gap-2 mb-3">
                <BookOpen size={18} className="text-primary-500" />
                {t('examples', lang)}
              </h3>
              <div className="space-y-2">
                {lesson.examples[lang].map((ex, i) => (
                  <div key={i} className="bg-primary-50 border border-primary-100 rounded-lg p-3 text-sm text-gray-700">
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            {!isCompleted && (
              <button
                onClick={handleMarkComplete}
                className="w-full py-3 bg-accent-500 text-white font-semibold rounded-lg hover:bg-accent-600 transition flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                {lang === 'fr' ? 'Marquer comme terminé' : 'تحديد كمكتمل'}
              </button>
            )}
            
            {lesson.exercises.length > 0 && (
              <button
                onClick={() => setShowPractice(true)}
                className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2"
              >
                <Dumbbell size={18} />
                {t('practice', lang)} ({lesson.exercises.length} {t('exercises', lang)})
              </button>
            )}

            {/* Navigation */}
            <div className="flex gap-3">
              {lessonIndex > 0 && (
                <button
                  onClick={() => onNavigate('lesson', { subjectId, lessonId: subject.lessons[lessonIndex - 1].id })}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2 text-sm"
                >
                  <ArrowLeft size={16} />
                  {t('previousLesson', lang)}
                </button>
              )}
              {lessonIndex < subject.lessons.length - 1 && (
                <button
                  onClick={() => onNavigate('lesson', { subjectId, lessonId: subject.lessons[lessonIndex + 1].id })}
                  className="flex-1 py-2.5 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition flex items-center justify-center gap-2 text-sm"
                >
                  {t('nextLesson', lang)}
                  <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
