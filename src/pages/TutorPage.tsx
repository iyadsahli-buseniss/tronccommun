import { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { subjects } from '../data/curriculum';
import { Send, Bot, User, Wifi, WifiOff, Lightbulb } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Simulated AI responses based on curriculum content
function generateTutorResponse(userMessage: string, lang: 'fr' | 'ar'): string {
  const msg = userMessage.toLowerCase();
  
  // Math-related
  if (msg.includes('ensemble') || msg.includes('nombre') || msg.includes('مجموعة') || msg.includes('عدد')) {
    return lang === 'fr' 
      ? "Bonne question ! 📐\n\nLes ensembles de nombres sont organisés hiérarchiquement :\n\n• **ℕ** (naturels) : 0, 1, 2, 3...\n• **ℤ** (entiers relatifs) : ..., -2, -1, 0, 1, 2...\n• **ℚ** (rationnels) : fractions a/b\n• **ℝ** (réels) : tous les nombres\n\n💡 **Astuce** : Pour classer un nombre, demande-toi : peut-il être négatif ? Est-ce une fraction ? A-t-il une racine carrée ?\n\nVeux-tu un exercice pour t'entraîner ?"
      : "سؤال جيد! 📐\n\nمجموعات الأعداد مرتبة بشكل هرمي:\n\n• **ℕ** (طبيعية): 0, 1, 2, 3...\n• **ℤ** (صحيحة نسبية): ..., -2, -1, 0, 1, 2...\n• **ℚ** (ناطقية): كسور a/b\n• **ℝ** (حقيقية): جميع الأعداد\n\n💡 **نصيحة**: لتصنيف عدد، اسأل نفسك: هل يمكن أن يكون سالباً؟ هل هو كسر؟ هل له جذر تربيعي؟\n\nهل تريد تمريناً للتدريب؟";
  }
  
  if (msg.includes('fraction') || msg.includes('كسر')) {
    return lang === 'fr'
      ? "Pour additionner des fractions 🧮\n\n**Même dénominateur** : a/b + c/b = (a+c)/b\n**Dénominateurs différents** :\n1. Trouver le PPCM des dénominateurs\n2. Mettre chaque fraction au même dénominateur\n3. Additionner les numérateurs\n\n**Exemple** : 2/3 + 1/4\n= 8/12 + 3/12 = 11/12\n\n💡 Le PPCM de 3 et 4 est 12.\n\nVeux-tu un autre exemple ?"
      : "لجمع الكسور 🧮\n\n**نفس المقام**: a/b + c/b = (a+c)/b\n**مقامات مختلفة**:\n1. إيجاد المضاعف المشترك الأصغر\n2. توحيد المقامات\n3. جمع البسوط\n\n**مثال**: 2/3 + 1/4\n= 8/12 + 3/12 = 11/12\n\n💡 المضاعف المشترك الأصغر لـ 3 و 4 هو 12.\n\nهل تريد مثالاً آخر؟";
  }
  
  // Physics
  if (msg.includes('ohm') || msg.includes('tension') || msg.includes('courant') || msg.includes('قانون') || msg.includes('أوم')) {
    return lang === 'fr'
      ? "La loi d'Ohm ⚡\n\n**U = R × I**\n\n• **U** = tension (en Volts, V)\n• **R** = résistance (en Ohms, Ω)\n• **I** = intensité (en Ampères, A)\n\n**Formules dérivées** :\n• I = U/R\n• R = U/I\n\n**Exemple** : Si U = 12V et R = 4Ω\n→ I = 12/4 = 3A\n\n💡 Mnémotechnique : **U**ri (comme un cri !) pour U = R × I"
      : "قانون أوم ⚡\n\n**U = R × I**\n\n• **U** = التوتر (بالفولط V)\n• **R** = المقاومة (بالأوم Ω)\n• **I** = الشدة (بالأمبير A)\n\n**الصيغ المشتقة**:\n• I = U/R\n• R = U/I\n\n**مثال**: إذا كان U = 12V و R = 4Ω\n→ I = 12/4 = 3A\n\n💡 للتذكر: U = R × I";
  }
  
  // SVT
  if (msg.includes('cellule') || msg.includes('خلية')) {
    return lang === 'fr'
      ? "La cellule 🔬\n\nC'est l'unité de base du vivant. Il existe deux types :\n\n**Cellule animale** :\n• Membrane plasmique\n• Cytoplasme\n• Noyau (ADN)\n• Mitochondries (énergie)\n\n**Cellule végétale** (+ éléments spécifiques) :\n• Paroi cellulosique (rigidité)\n• Chloroplastes (photosynthèse)\n• Grande vacuole\n\n💡 Pour retenir : les végétaux ont une \"armure\" (paroi) et des \"panneaux solaires\" (chloroplastes) !"
      : "الخلية 🔬\n\nهي الوحدة الأساسية للحياة. يوجد نوعان:\n\n**الخلية الحيوانية**:\n• غشاء بلازمي\n• سيتوبلازم\n• نواة (ADN)\n• ميتوكوندريا (طاقة)\n\n**الخلية النباتية** (+ عناصر خاصة):\n• جدار سليولوزي (صلابة)\n• بلاستيدات خضراء (تركيب ضوئي)\n• فجوة كبيرة\n\n💡 للتذكر: النباتات لها \"درع\" (جدار) و\"ألواح شمسية\" (بلاستيدات خضراء)!";
  }

  // Default response
  return lang === 'fr'
    ? "Je suis là pour t'aider ! 🎓\n\nTu peux me poser des questions sur :\n• 📐 Les mathématiques (ensembles, calcul, fractions...)\n• ⚗️ La physique-chimie (courant, états de la matière...)\n• 🌿 Les SVT (cellule, respiration...)\n• 📖 Le français (types de textes...)\n\n💡 **Conseil** : Essaie d'être précis dans ta question pour que je puisse mieux t'aider.\n\nPar exemple : \"Comment additionner des fractions ?\" ou \"Explique la loi d'Ohm\""
    : "أنا هنا لمساعدتك! 🎓\n\nيمكنك سؤالي عن:\n• 📐 الرياضيات (مجموعات، حساب، كسور...)\n• ⚗️ الفيزياء والكيمياء (تيار، حالات المادة...)\n• 🌿 علوم الحياة والأرض (خلية، تنفس...)\n• 📖 الفرنسية (أنواع النصوص...)\n\n💡 **نصيحة**: حاول أن تكون دقيقاً في سؤالك لأساعدك بشكل أفضل.\n\nمثال: \"كيف أجمع الكسور؟\" أو \"اشرح لي قانون أوم\"";
}

export default function TutorPage() {
  const { lang, isOnline } = useApp();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: t('tutorWelcome', lang) + '\n\n' + t('tutorDesc', lang) }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !isOnline) return;
    
    const userMsg: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking
    setTimeout(() => {
      const response = generateTutorResponse(input, lang);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const suggestedQuestions = lang === 'fr' 
    ? ['Comment classer les nombres ?', 'Explique la loi d\'Ohm', 'La cellule végétale vs animale']
    : ['كيف أصنف الأعداد؟', 'اشرح قانون أوم', 'الخلية النباتية مقابل الحيوانية'];

  // Render markdown-like content
  const renderMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('• ')) {
        const text = line.slice(2).replace(/\*\*(.*?)\*\*/g, '§$1§');
        const parts = text.split(/§/);
        return (
          <div key={i} className="flex gap-2 ml-2">
            <span>•</span>
            <span>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</span>
          </div>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold mt-2">{line.slice(2, -2)}</p>;
      }
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j}>{p}</strong> : p)}</p>
        );
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i}>{line}</p>;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-7rem)] animate-fade-in pb-16 lg:pb-0">
      {/* Offline notice */}
      {!isOnline && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3 flex items-center gap-2 text-sm text-orange-700">
          <WifiOff size={16} />
          <span>{t('offlineNotice', lang)}</span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'assistant' ? 'bg-primary-100 text-primary-600' : 'bg-gray-200 text-gray-600'
            }`}>
              {msg.role === 'assistant' ? <Bot size={16} /> : <User size={16} />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'assistant' 
                ? 'bg-white border border-gray-100 shadow-sm text-gray-700' 
                : 'bg-primary-600 text-white'
            }`}>
              {renderMessage(msg.content)}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
            <Lightbulb size={12} />
            {lang === 'fr' ? 'Suggestions' : 'اقتراحات'}
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => { setInput(q); }}
                className="px-3 py-1.5 bg-primary-50 text-primary-700 text-xs rounded-full border border-primary-200 hover:bg-primary-100 transition"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-gray-200 pt-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={t('typeMessage', lang)}
            disabled={!isOnline}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none text-sm disabled:bg-gray-100 disabled:text-gray-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || !isOnline}
            className="px-4 py-2.5 bg-primary-600 text-white rounded-xl hover:bg-primary-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
