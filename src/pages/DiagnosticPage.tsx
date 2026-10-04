import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { diagnosticQuestions } from '../data/curriculum';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Target, Sparkles } from 'lucide-react';

interface DiagnosticProps {
  onNavigate: (page: string) => void;
}

export default function DiagnosticPage({ onNavigate }: DiagnosticProps) {
  const { lang, saveDiagnosticResult, progress } = useApp();
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = diagnosticQuestions[currentQ];
  const total = diagnosticQuestions.length;

  const handleAnswer = () => {
    if (selected === null) return;
    setAnswered(true);
    if (selected === question.correctIndex) setCorrectCount(c => c + 1);
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const finalScore = Math.round((correctCount / total) * 100);
      saveDiagnosticResult(finalScore);
      setFinished(true);
    }
  };

  if (finished) {
    const finalScore = Math.round((correctCount / total) * 100);
    return (
      <div className="max-w-lg mx-auto animate-scale-in pb-20 lg:pb-0">
        <div className="glass-strong rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 start-0 w-48 h-48 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 end-0 w-32 h-32 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="text-6xl mb-4">
              {finalScore >= 70 ? '🎉' : finalScore >= 40 ? '💪' : '📚'}
            </div>
            <h2 className="text-2xl font-black text-white">{t('results', lang)}</h2>
            <div className="mt-5 relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-pink-500/20 border-4 border-white/10 flex items-center justify-center">
                <span className="text-4xl font-black text-gradient">{finalScore}%</span>
              </div>
              <div className="absolute -top-2 -end-2 w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Sparkles size={14} className="text-white" />
              </div>
            </div>
            <p className="mt-4 text-white/60">
              {correctCount}/{total} {lang === 'fr' ? 'bonnes réponses' : 'إجابات صحيحة'}
            </p>
            <p className="mt-2 text-sm text-white/40">
              {finalScore >= 70 
                ? (lang === 'fr' ? 'Excellent ! Tu as de bonnes bases.' : 'ممتاز! لديك أساسيات جيدة.')
                : finalScore >= 40
                  ? (lang === 'fr' ? 'Bon début ! Continuons à apprendre.' : 'بداية جيدة! لنواصل التعلم.')
                  : (lang === 'fr' ? 'Pas de souci, on va t\'aider à progresser !' : 'لا بأس، سنساعدك على التقدم!')}
            </p>
            
            <div className="mt-6 flex gap-3 justify-center">
              <button
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition"
              >
                {t('dashboard', lang)}
              </button>
              <button
                onClick={() => { setStarted(false); setCurrentQ(0); setSelected(null); setAnswered(false); setCorrectCount(0); setFinished(false); }}
                className="px-6 py-3 glass text-white/70 font-medium rounded-xl hover:bg-white/10 transition flex items-center gap-2"
              >
                <RotateCcw size={16} />
                {t('restartDiagnostic', lang)}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-lg mx-auto animate-fade-in-up pb-20 lg:pb-0">
        <div className="glass-strong rounded-3xl p-8 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 end-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 via-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-orange-500/30 mb-5">
              <Target className="text-white" size={36} />
            </div>
            <h2 className="text-2xl font-black text-white">{t('diagnosticTitle', lang)}</h2>
            <p className="mt-3 text-white/50">{t('diagnosticIntro', lang)}</p>
            
            <div className="mt-5 glass rounded-xl p-4 text-sm text-white/50 space-y-2">
              <p className="flex items-center justify-center gap-2"><span className="text-lg">📝</span> {total} {lang === 'fr' ? 'questions' : 'أسئلة'}</p>
              <p className="flex items-center justify-center gap-2"><span className="text-lg">⏱️</span> {lang === 'fr' ? '~5 minutes' : '~5 دقائق'}</p>
              <p className="flex items-center justify-center gap-2"><span className="text-lg">📚</span> {lang === 'fr' ? 'Toutes les matières' : 'جميع المواد'}</p>
            </div>

            {progress.diagnosticScore !== null && (
              <p className="mt-4 text-sm text-white/40">
                {lang === 'fr' ? 'Dernier score: ' : 'آخر نتيجة: '}
                <span className="text-purple-400 font-bold">{progress.diagnosticScore}%</span>
              </p>
            )}

            <button
              onClick={() => setStarted(true)}
              className="mt-6 px-8 py-4 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold rounded-xl shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              {t('start', lang)} 🚀
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto animate-fade-in pb-20 lg:pb-0">
      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-sm text-white/40 mb-2">
          <span>{t('question', lang)} {currentQ + 1} {t('of', lang)} {total}</span>
          <span>{Math.round(((currentQ + (answered ? 1 : 0)) / total) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentQ + (answered ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="glass-strong rounded-3xl p-6 shadow-2xl">
        <p className="text-lg font-bold text-white mb-6">
          {question.question[lang]}
        </p>

        <div className="space-y-3">
          {question.options[lang].map((option, idx) => {
            let optionStyle = 'border-white/10 hover:border-purple-500/50 hover:bg-white/5';
            if (selected === idx && !answered) optionStyle = 'border-purple-500 bg-purple-500/10';
            if (answered) {
              if (idx === question.correctIndex) optionStyle = 'border-emerald-500 bg-emerald-500/10';
              else if (idx === selected) optionStyle = 'border-rose-500 bg-rose-500/10';
              else optionStyle = 'border-white/5 opacity-40';
            }

            return (
              <button
                key={idx}
                onClick={() => !answered && setSelected(idx)}
                disabled={answered}
                className={`w-full p-4 rounded-xl border-2 text-start transition-all ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center text-sm font-bold transition-all ${
                    selected === idx && !answered ? 'bg-purple-500 text-white shadow-lg' :
                    answered && idx === question.correctIndex ? 'bg-emerald-500 text-white' :
                    answered && idx === selected ? 'bg-rose-500 text-white' :
                    'bg-white/5 text-white/50'
                  }`}>
                    {answered && idx === question.correctIndex ? <CheckCircle size={18} /> :
                     answered && idx === selected && idx !== question.correctIndex ? <XCircle size={18} /> :
                     String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-medium text-white/90">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6">
          {!answered ? (
            <button
              onClick={handleAnswer}
              disabled={selected === null}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 disabled:opacity-50 hover:shadow-purple-500/50 transition"
            >
              {t('checkAnswer', lang)}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition flex items-center justify-center gap-2"
            >
              {currentQ < total - 1 ? t('nextQuestion', lang) : t('finish', lang)}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
