import { useState } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { diagnosticQuestions } from '../data/curriculum';
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

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
    if (selected === question.correctIndex) {
      setCorrectCount(c => c + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < total - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      const score = Math.round(((correctCount + (selected === question.correctIndex ? 0 : 0)) / total) * 100);
      const finalScore = Math.round((correctCount / total) * 100);
      saveDiagnosticResult(finalScore);
      setFinished(true);
    }
  };

  if (finished) {
    const finalScore = Math.round((correctCount / total) * 100);
    return (
      <div className="max-w-lg mx-auto animate-fade-in pb-16 lg:pb-0">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg text-center">
          <div className="text-5xl mb-4">
            {finalScore >= 70 ? '🎉' : finalScore >= 40 ? '💪' : '📚'}
          </div>
          <h2 className="text-2xl font-bold text-gray-800">{t('results', lang)}</h2>
          <div className="mt-4">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary-50 border-4 border-primary-200">
              <span className="text-3xl font-bold text-primary-700">{finalScore}%</span>
            </div>
          </div>
          <p className="mt-4 text-gray-600">
            {correctCount}/{total} {lang === 'fr' ? 'bonnes réponses' : 'إجابات صحيحة'}
          </p>
          <p className="mt-2 text-sm text-gray-500">
            {finalScore >= 70 
              ? (lang === 'fr' ? 'Excellent ! Tu as de bonnes bases.' : 'ممتاز! لديك أساسيات جيدة.')
              : finalScore >= 40
                ? (lang === 'fr' ? 'Bon début ! Continuons à apprendre.' : 'بداية جيدة! لنواصل التعلم.')
                : (lang === 'fr' ? 'Pas de souci, on va t\'aider à progresser !' : 'لا بأس، سنساعدك على التقدم!')
            }
          </p>
          
          <div className="mt-6 flex gap-3 justify-center">
            <button
              onClick={() => onNavigate('dashboard')}
              className="px-6 py-2.5 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition"
            >
              {t('dashboard', lang)}
            </button>
            <button
              onClick={() => { setStarted(false); setCurrentQ(0); setSelected(null); setAnswered(false); setCorrectCount(0); setFinished(false); }}
              className="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition flex items-center gap-2"
            >
              <RotateCcw size={16} />
              {t('restartDiagnostic', lang)}
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!started) {
    return (
      <div className="max-w-lg mx-auto animate-fade-in pb-16 lg:pb-0">
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg text-center">
          <div className="text-5xl mb-4">🎯</div>
          <h2 className="text-2xl font-bold text-gray-800">{t('diagnosticTitle', lang)}</h2>
          <p className="mt-3 text-gray-600">{t('diagnosticIntro', lang)}</p>
          
          <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
            <p>{total} {lang === 'fr' ? 'questions' : 'أسئلة'}</p>
            <p>{lang === 'fr' ? '~5 minutes' : '~5 دقائق'}</p>
            <p>{lang === 'fr' ? 'Toutes les matières' : 'جميع المواد'}</p>
          </div>

          {progress.diagnosticScore !== null && (
            <p className="mt-3 text-sm text-gray-500">
              {lang === 'fr' ? 'Dernier score: ' : 'آخر نتيجة: '}{progress.diagnosticScore}%
            </p>
          )}

          <button
            onClick={() => setStarted(true)}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            {t('start', lang)}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto animate-fade-in pb-16 lg:pb-0">
      {/* Progress */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-1">
          <span>{t('question', lang)} {currentQ + 1} {t('of', lang)} {total}</span>
          <span>{Math.round(((currentQ + (answered ? 1 : 0)) / total) * 100)}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentQ + (answered ? 1 : 0)) / total) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg">
        <p className="text-lg font-semibold text-gray-800 mb-6">
          {question.question[lang]}
        </p>

        <div className="space-y-3">
          {question.options[lang].map((option, idx) => {
            let optionStyle = 'border-gray-200 hover:border-primary-300 hover:bg-primary-50';
            if (selected === idx && !answered) {
              optionStyle = 'border-primary-500 bg-primary-50';
            }
            if (answered) {
              if (idx === question.correctIndex) {
                optionStyle = 'border-green-500 bg-green-50';
              } else if (idx === selected && idx !== question.correctIndex) {
                optionStyle = 'border-red-500 bg-red-50';
              } else {
                optionStyle = 'border-gray-200 opacity-50';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => !answered && setSelected(idx)}
                disabled={answered}
                className={`w-full p-4 rounded-xl border-2 text-start transition-all ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    selected === idx ? 'bg-primary-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {answered && idx === question.correctIndex ? <CheckCircle size={18} className="text-green-600" /> :
                     answered && idx === selected ? <XCircle size={18} className="text-red-600" /> :
                     String.fromCharCode(65 + idx)}
                  </span>
                  <span className="font-medium text-gray-800">{option}</span>
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
              className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg disabled:opacity-50 hover:bg-primary-700 transition"
            >
              {t('checkAnswer', lang)}
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="w-full py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition flex items-center justify-center gap-2"
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
