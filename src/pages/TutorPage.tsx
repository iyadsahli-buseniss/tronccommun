import { useState, useRef, useEffect } from 'react';
import { useApp } from '../contexts/AppContext';
import { t } from '../data/translations';
import { Send, Bot, User, WifiOff, Lightbulb, Sparkles } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function generateTutorResponse(userMessage: string, lang: 'fr' | 'ar'): string {
  const msg = userMessage.toLowerCase();
  
  if (msg.includes('ensemble') || msg.includes('nombre') || msg.includes('مجموعة') || msg.includes('عدد')) {
    return lang === 'fr' 
      ? "Bonne question ! 📐\n\nLes ensembles de nombres sont organisés hiérarchiquement :\n\n• **ℕ** (naturels) : 0, 1, 2, 3...\n• **ℤ** (entiers relatifs) : ..., -2, -1, 0, 1, 2...\n• **ℚ** (rationnels) : fractions a/b\n• **ℝ** (réels) : tous les nombres\n\n💡 **Astuce** : Pour classer un nombre, demande-toi : peut-il être négatif ? Est-ce une fraction ? A-t-il une racine carrée ?\n\nVeux-tu un exercice pour t'entraîner ?"
      : "سؤال جيد! 📐\n\nمجموعات الأعداد مرتبة بشكل هرمي:\n\n• **ℕ** (طبيعية): 0, 1, 2, 3...\n• **ℤ** (صحيحة نسبية): ..., -2, -1, 0, 1, 2...\n• **ℚ** (ناطقية): كسور a/b\n• **ℝ** (حقيقية): جميع الأعداد\n\n💡 **نصيحة**: لتصنيف عدد، اسأل نفسك: هل يمكن أن يكون سالباً؟ هل هو كسر؟ هل له جذر تربيعي؟\n\nهل تريد تمريناً للتدريب؟";
  }
  
  if (msg.includes('fraction') || msg.includes('كسر')) {
    return lang === 'fr'
      ? "Pour additionner des fractions 🧮\n\n**Même dénominateur** : a/b + c/b = (a+c)/b\n**Dénominateurs différents** :\n1. Trouver le PPCM des dénominateurs\n2. Mettre chaque fraction au même dénominateur\n3. Additionner les numérateurs\n\n**Exemple** : 2/3 + 1/4\n= 8/12 + 3/12 = 11/12\n\n💡 Le PPCM de 3 et 4 est 12."
      : "لجمع الكسور 🧮\n\n**نفس المقام**: a/b + c/b = (a+c)/b\n**مقامات مختلفة**:\n1. إيجاد المضاعف المشترك الأصغر\n2. توحيد المقامات\n3. جمع البسوط\n\n**مثال**: 2/3 + 1/4\n= 8/12 + 3/12 = 11/12\n\n💡 المضاعف المشترك الأصغر لـ 3 و 4 هو 12.";
  }
  
  if (msg.includes('ohm') || msg.includes('tension') || msg.includes('courant') || msg.includes('قانون') || msg.includes('أوم')) {
    return lang === 'fr'
      ? "La loi d'Ohm ⚡\n\n**U = R × I**\n\n• **U** = tension (en Volts, V)\n• **R** = résistance (en Ohms, Ω)\n• **I** = intensité (en Ampères, A)\n\n**Exemple** : Si U = 12V et R = 4Ω\n→ I = 12/4 = 3A\n\n💡 Mnémotechnique : **U**ri (comme un cri !) pour U = R × I"
      : "قانون أوم ⚡\n\n**U = R × I**\n\n• **U** = التوتر (بالفولط V)\n• **R** = المقاومة (بالأوم Ω)\n• **I** = الشدة (بالأمبير A)\n\n**مثال**: إذا كان U = 12V و R = 4Ω\n→ I = 12/4 = 3A";
  }
  
  if (msg.includes('cellule') || msg.includes('خلية')) {
    return lang === 'fr'
      ? "La cellule 🔬\n\nC'est l'unité de base du vivant.\n\n**Cellule animale** :\n• Membrane plasmique\n• Cytoplasme\n• Noyau (ADN)\n• Mitochondries (énergie)\n\n**Cellule végétale** (+ éléments) :\n• Paroi cellulosique (rigidité)\n• Chloroplastes (photosynthèse)\n• Grande vacuole\n\n💡 Les végétaux ont une \"armure\" (paroi) et des \"panneaux solaires\" (chloroplastes) !"
      : "الخلية 🔬\n\nهي الوحدة الأساسية للحياة.\n\n**الخلية الحيوانية**:\n• غشاء بلازمي\n• سيتوبلازم\n• نواة (ADN)\n• ميتوكوندريا (طاقة)\n\n**الخلية النباتية** (+ عناصر):\n• جدار سليولوزي (صلابة)\n• بلاستيدات خضراء (تركيب ضوئي)\n• فجوة كبيرة\n\n💡 النباتات لها \"درع\" (جدار) و\"ألواح شمسية\" (بلاستيدات خضراء)!";
  }

  return lang === 'fr'
    ? "Je suis là pour t'aider ! 🎓\n\nTu peux me poser des questions sur :\n• 📐 Les mathématiques\n• ⚗️ La physique-chimie\n• 🌿 Les SVT\n• 📖 Le français\n\n💡 Essaie d'être précis dans ta question.\n\nPar exemple : \"Comment additionner des fractions ?\" ou \"Explique la loi d'Ohm\""
    : "أنا هنا لمساعدتك! 🎓\n\nيمكنك سؤالي عن:\n• 📐 الرياضيات\n• ⚗️ الفيزياء والكيمياء\n• 🌿 علوم الحياة والأرض\n• 📖 الفرنسية\n\n💡 حاول أن تكون دقيقاً في سؤالك.\n\nمثال: \"كيف أجمع الكسور؟\" أو \"اشرح لي قانون أوم\"";
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

    setTimeout(() => {
      const response = generateTutorResponse(input, lang);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 1000 + Math.random() * 800);
  };

  const suggestedQuestions = lang === 'fr' 
    ? ['Comment classer les nombres ?', 'Explique la loi d\'Ohm', 'La cellule végétale vs animale']
    : ['كيف أصنف الأعداد؟', 'اشرح قانون أوم', 'الخلية النباتية مقابل الحيوانية'];

  const renderMessage = (content: string) => {
    return content.split('\n').map((line, i) => {
      if (line.startsWith('• ')) {
        const text = line.slice(2).replace(/\*\*(.*?)\*\*/g, '§$1§');
        const parts = text.split(/§/);
        return (
          <div key={i} className="flex gap-2 ms-2">
            <span>•</span>
            <span>{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p)}</span>
          </div>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-bold text-white mt-2">{line.slice(2, -2)}</p>;
      }
      if (line.includes('**')) {
        const parts = line.split(/\*\*(.*?)\*\*/g);
        return (
          <p key={i}>{parts.map((p, j) => j % 2 === 1 ? <strong key={j} className="text-white">{p}</strong> : p)}</p>
        );
      }
      if (line.trim() === '') return <br key={i} />;
      return <p key={i}>{line}</p>;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)] lg:h-[calc(100vh-6rem)] animate-fade-in pb-20 lg:pb-0">
      {/* Offline notice */}
      {!isOnline && (
        <div className="glass rounded-xl p-3 mb-3 flex items-center gap-2 text-sm text-orange-400 border border-orange-500/20 bg-orange-500/5">
          <WifiOff size={16} />
          <span>{t('offlineNotice', lang)}</span>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 pb-4 scrollbar-hide">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-lg ${
              msg.role === 'assistant' 
                ? 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-purple-500/20' 
                : 'bg-gradient-to-br from-pink-500 to-rose-600 shadow-pink-500/20'
            }`}>
              {msg.role === 'assistant' ? <Bot size={16} className="text-white" /> : <User size={16} className="text-white" />}
            </div>
            <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
              msg.role === 'assistant' 
                ? 'glass text-white/80' 
                : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-purple-500/20'
            }`}>
              {renderMessage(msg.content)}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex gap-3 animate-fade-in">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Bot size={16} className="text-white" />
            </div>
            <div className="glass rounded-2xl px-5 py-4">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested questions */}
      {messages.length <= 1 && (
        <div className="mb-3">
          <p className="text-xs text-white/40 mb-2 flex items-center gap-1.5 font-medium">
            <Lightbulb size={12} className="text-amber-400" />
            {lang === 'fr' ? 'Suggestions' : 'اقتراحات'}
          </p>
          <div className="flex flex-wrap gap-2">
            {suggestedQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => setInput(q)}
                className="px-3 py-2 glass rounded-xl text-xs text-white/60 hover:text-white hover:bg-white/10 transition border border-white/5 hover:border-purple-500/30"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="border-t border-white/5 pt-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={t('typeMessage', lang)}
            disabled={!isOnline}
            className="flex-1 px-4 py-3 rounded-xl glass text-white placeholder-white/30 focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 outline-none text-sm disabled:opacity-50 border border-white/5"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || !isOnline}
            className="px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/30 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
