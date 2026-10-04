import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { ArrowLeft, ArrowRight, CheckCircle, Clock, BookOpen, Dumbbell, ChevronLeft, Sparkles } from 'lucide-react';

interface LessonProps {
  subjectId: string;
  lessonId: string;
  onNavigate: (page: string, data?: any) => void;
}

export default function LessonPage({ subjectId, lessonId, onNavigate }: LessonProps) {
  const { lang, markLessonComplete, isLessonCompleted } = useApp();
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

  const gradientMap: Record<string, string> = {
    math: 'from-blue-500 to-indigo-600',
    physics: 'from-purple-500 to-violet-600',
    svt: 'from-emerald-500 to-teal-600',
    french: 'from-rose-500 to-pink-600',
    arabic: 'from-amber-500 to-orange-600',
    islamic: 'from-cyan-500 to-teal-600',
  };
  const gradient = gradientMap[subject.id] || 'from-gray-500 to-gray-600';

  const handleMarkComplete = () => {
    if (!isCompleted) markLessonComplete(lessonId);
  };

  const handleAnswer = () => {
    if (selected === null) return;
    setAnswered(true);
    if (selected === lesson.exercises[currentExercise].correctIndex) setScore(s => s + 1);
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

  const renderContent = (text: string) => {
    return text.split('\n').map((line, i) => {
      if (line.startsWith('• ')) {
        const content = line.slice(2).replace(/\*\*(.*?)\*\*/g, '<strong class="text-white">$1</strong>');
        return <li key={i} className="ms-4 text-white/70 leading-relaxed list-disc" dangerouslySetInnerHTML={{ __html: content }} />;
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <h4 key={i} className="font-bold text-white mt-4 mb-1.5 text-base">{line.slice(2, -2)}</h4>;
      }
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i} className="text-white/70 leading-relaxed">
            {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="text-white">{part}</strong> : part)}
          </p>
        );
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i} className="text-white/70 leading-relaxed">{line}</p>;
    });
  };

  // Practice finished
  if (showPractice && practiceFinished) {
    const total = lesson.exercises.length;
    const percent = Math.round((score / total) * 100);
    return (
      <div className="max-w-lg mx-auto animate-scale-in pb-20 lg:pb-0">
        <div className="glass-strong rounded-3xl p-8 text-center shadow-2xl">
          <div className="text-6xl mb-4">{percent >= 70 ? '🎉' : percent >= 40 ? '💪' : '📚'}</div>
          <h2 className="text-2xl font-black text-white">{t('results', lang)}</h2>
          <div className="mt-5 inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-4 border-white/10">
            <span className="text-3xl font-black text-gradient">{score}/{total}</span>
          </div>
          <p className="mt-3 text-white/50 text-lg">{percent}%</p>
          <p className="mt-2 text-sm text-white/40">
            {percent >= 70 
              ? (lang === 'fr' ? 'Excellent travail !' : 'عمل ممتاز!')
              : percent >= 40
                ? (lang === 'fr' ? 'Bien joué, continue !' : 'أحسنت، واصل!')
                : (lang === 'fr' ? 'Continue à pratiquer !' : 'واصل التدريب!')}
          </p>
          
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => { setShowPractice(false); setPracticeFinished(false); setCurrentExercise(0); setSelected(null); setAnswered(false); setScore(0); }}
              className="px-5 py-3 glass rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/10 transition"
            >
              {t('tryAgain', lang)}
            </button>
            {lessonIndex < subject.lessons.length - 1 && (
              <button
                onClick={() => onNavigate('lesson', { subjectId, lessonId: subject.lessons[lessonIndex + 1].id })}
                className="px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition flex items-center gap-2"
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

  // Practice mode
  if (showPractice) {
    const exercise = lesson.exercises[currentExercise];
    return (
      <div className="max-w-lg mx-auto animate-fade-in pb-20 lg:pb-0">
        <button
          onClick={() => { setShowPractice(false); setPracticeFinished(false); setCurrentExercise(0); setSelected(null); setAnswered(false); setScore(0); }}
          className="flex items-center gap-2 text-white/50 hover:text-white/80 mb-4 text-sm transition"
        >
          <ChevronLeft size={16} />
          {lang === 'fr' ? 'Retour à la leçon' : 'العودة للدرس'}
        </button>

        <div className="mb-4">
          <div className="flex justify-between text-sm text-white/40 mb-2">
            <span>{t('question', lang)} {currentExercise + 1}/{lesson.exercises.length}</span>
            <span className="text-emerald-400 font-bold">{t('score', lang)}: {score}</span>
          </div>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500" style={{ width: `${((currentExercise + (answered ? 1 : 0)) / lesson.exercises.length) * 100}%` }} />
          </div>
        </div>

        <div className="glass-strong rounded-3xl p-6 shadow-2xl">
          <p className="text-lg font-bold text-white mb-6">{exercise.question[lang]}</p>
          
          <div className="space-y-3">
            {exercise.options[lang].map((option, idx) => {
              let style = 'border-white/10 hover:border-purple-500/50 hover:bg-white/5';
              if (selected === idx && !answered) style = 'border-purple-500 bg-purple-500/10';
              if (answered) {
                if (idx === exercise.correctIndex) style = 'border-emerald-500 bg-emerald-500/10';
                else if (idx === selected) style = 'border-rose-500 bg-rose-500/10';
                else style = 'border-white/5 opacity-40';
              }
              return (
                <button key={idx} onClick={() => !answered && setSelected(idx)} disabled={answered}
                  className={`w-full p-4 rounded-xl border-2 text-start transition-all ${style}`}>
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                      selected === idx && !answered ? 'bg-purple-500 text-white' :
                      answered && idx === exercise.correctIndex ? 'bg-emerald-500 text-white' :
                      answered && idx === selected ? 'bg-rose-500 text-white' :
                      'bg-white/5 text-white/50'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-medium text-white/90">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {answered && (
            <div className={`mt-5 p-4 rounded-xl ${selected === exercise.correctIndex ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
              <p className="font-bold text-sm mb-1.5">
                {selected === exercise.correctIndex ? `✅ ${t('correct', lang)}` : `❌ ${t('incorrect', lang)}`}
              </p>
              <p className="text-sm text-white/60">{exercise.explanation[lang]}</p>
            </div>
          )}

          <div className="mt-5">
            {!answered ? (
              <button onClick={handleAnswer} disabled={selected === null}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 disabled:opacity-50 hover:shadow-purple-500/50 transition">
                {t('checkAnswer', lang)}
              </button>
            ) : (
              <button onClick={handleNextExercise}
                className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition flex items-center justify-center gap-2">
                {currentExercise < lesson.exercises.length - 1 ? t('nextQuestion', lang) : t('finish', lang)}
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Lesson content view
  return (
    <div className="max-w-2xl mx-auto animate-fade-in-up pb-20 lg:pb-0">
      <button
        onClick={() => onNavigate('subject-detail', { subjectId })}
        className="flex items-center gap-2 text-white/50 hover:text-white/80 mb-4 text-sm transition"
      >
        <ChevronLeft size={16} />
        {subject.name[lang]}
      </button>

      <div className="glass-strong rounded-3xl overflow-hidden shadow-2xl">
        {/* Lesson header */}
        <div className={`relative bg-gradient-to-r ${gradient} p-6 overflow-hidden`}>
          <div className="absolute top-0 end-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-sm text-white/70 mb-2">
              <Clock size={14} />
              <span>{lesson.duration} {t('minutes', lang)}</span>
              {isCompleted && <CheckCircle size={14} className="text-emerald-300 ms-2" />}
            </div>
            <h1 className="text-xl font-black text-white">{lesson.title[lang]}</h1>
            <p className="text-sm text-white/60 mt-1">
              {lang === 'fr' ? 'Leçon' : 'درس'} {lessonIndex + 1}/{subject.lessons.length}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-1">
            {renderContent(lesson.content[lang])}
          </div>

          {/* Examples */}
          {lesson.examples[lang].length > 0 && (
            <div className="mt-6">
              <h3 className="font-bold text-white flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <BookOpen size={14} className="text-white" />
                </div>
                {t('examples', lang)}
              </h3>
              <div className="space-y-2">
                {lesson.examples[lang].map((ex, i) => (
                  <div key={i} className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4 text-sm text-white/70">
                    {ex}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-8 flex flex-col gap-3">
            {!isCompleted && (
              <button
                onClick={handleMarkComplete}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition flex items-center justify-center gap-2"
              >
                <CheckCircle size={18} />
                {lang === 'fr' ? 'Marquer comme terminé' : 'تحديد كمكتمل'}
              </button>
            )}
            
            {lesson.exercises.length > 0 && (
              <button
                onClick={() => setShowPractice(true)}
                className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl shadow-lg shadow-pink-500/30 hover:shadow-pink-500/50 transition flex items-center justify-center gap-2"
              >
                <Dumbbell size={18} />
                {t('practice', lang)} ({lesson.exercises.length})
              </button>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-2">
              {lessonIndex > 0 && (
                <button
                  onClick={() => onNavigate('lesson', { subjectId, lessonId: subject.lessons[lessonIndex - 1].id })}
                  className="flex-1 py-3 glass rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/10 transition flex items-center justify-center gap-2 text-sm"
                >
                  <ArrowLeft size={16} />
                  {t('previousLesson', lang)}
                </button>
              )}
              {lessonIndex < subject.lessons.length - 1 && (
                <button
                  onClick={() => onNavigate('lesson', { subjectId, lessonId: subject.lessons[lessonIndex + 1].id })}
                  className="flex-1 py-3 glass rounded-xl font-medium text-white/70 hover:text-white hover:bg-white/10 transition flex items-center justify-center gap-2 text-sm"
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
