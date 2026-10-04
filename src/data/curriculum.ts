export interface Exercise {
  id: string;
  question: { fr: string; ar: string };
  options: { fr: string[]; ar: string[] };
  correctIndex: number;
  explanation: { fr: string; ar: string };
}

export interface Lesson {
  id: string;
  title: { fr: string; ar: string };
  content: { fr: string; ar: string };
  examples: { fr: string[]; ar: string[] };
  exercises: Exercise[];
  duration: number; // minutes
}

export interface Subject {
  id: string;
  name: { fr: string; ar: string };
  icon: string;
  color: string;
  lessons: Lesson[];
}

export const subjects: Subject[] = [
  {
    id: 'math',
    name: { fr: 'Mathématiques', ar: 'الرياضيات' },
    icon: '📐',
    color: 'from-blue-500 to-blue-700',
    lessons: [
      {
        id: 'math-1',
        title: { fr: 'Les ensembles de nombres', ar: 'مجموعات الأعداد' },
        duration: 25,
        content: {
          fr: "Les nombres se classifient en plusieurs ensembles:\n\n• **ℕ** (entiers naturels): 0, 1, 2, 3, ...\n• **ℤ** (entiers relatifs): ..., -2, -1, 0, 1, 2, ...\n• **𝔻** (nombres décimaux): nombres à virgule finie\n• **ℚ** (nombres rationnels): fractions a/b où b≠0\n• **ℝ** (nombres réels): tous les nombres sur la droite numérique\n\nChaque ensemble est inclus dans le suivant: ℕ ⊂ ℤ ⊂ 𝔻 ⊂ ℚ ⊂ ℝ",
          ar: "تُصنف الأعداد إلى عدة مجموعات:\n\n• **ℕ** (الأعداد الطبيعية): 0, 1, 2, 3, ...\n• **ℤ** (الأعداد الصحيحة النسبية): ..., -2, -1, 0, 1, 2, ...\n• **𝔻** (الأعداد العشرية): أعداد ذات فاصلة منتهية\n• **ℚ** (الأعداد الناطقة): كسور a/b حيث b≠0\n• **ℝ** (الأعداد الحقيقية): جميع الأعداد على المستقيم العددي\n\nكل مجموعة مُضمنة في التي تليها: ℕ ⊂ ℤ ⊂ 𝔻 ⊂ ℚ ⊂ ℝ"
        },
        examples: {
          fr: [
            "Exemple 1: Classer les nombres suivants\n5 ∈ ℕ ✓ (entier naturel)\n-3 ∈ ℤ ✓ (entier relatif)\n2/7 ∈ ℚ ✓ (rationnel)\n√2 ∈ ℝ ✓ (irrationnel)"
          ],
          ar: [
            "مثال 1: تصنيف الأعداد التالية\n5 ∈ ℕ ✓ (عدد طبيعي)\n-3 ∈ ℤ ✓ (عدد صحيح نسبي)\n2/7 ∈ ℚ ✓ (عدد ناطق)\n√2 ∈ ℝ ✓ (عدد غير ناطق)"
          ]
        },
        exercises: [
          {
            id: 'math-1-ex1',
            question: { fr: 'À quel ensemble appartient le nombre -5?', ar: 'إلى أي مجموعة ينتمي العدد -5؟' },
            options: { fr: ['ℕ', 'ℤ', 'ℚ seulement', 'ℝ seulement'], ar: ['ℕ', 'ℤ', 'ℚ فقط', 'ℝ فقط'] },
            correctIndex: 1,
            explanation: { fr: '-5 est un entier relatif (négatif), donc -5 ∈ ℤ. Il appartient aussi à ℚ et ℝ, mais ℤ est la réponse la plus précise.', ar: '-5 عدد صحيح نسبي (سالب)، إذن -5 ∈ ℤ. ينتمي أيضاً إلى ℚ و ℝ، لكن ℤ هي الإجابة الأدق.' }
          },
          {
            id: 'math-1-ex2',
            question: { fr: 'Quelle est la bonne relation d\'inclusion?', ar: 'ما هي علاقة الاحتواء الصحيحة؟' },
            options: { fr: ['ℝ ⊂ ℚ', 'ℕ ⊂ ℤ', 'ℤ ⊂ ℕ', 'ℚ ⊂ ℤ'], ar: ['ℝ ⊂ ℚ', 'ℕ ⊂ ℤ', 'ℤ ⊂ ℕ', 'ℚ ⊂ ℤ'] },
            correctIndex: 1,
            explanation: { fr: 'Les entiers naturels (ℕ) sont inclus dans les entiers relatifs (ℤ) car tout entier positif est aussi un entier relatif.', ar: 'الأعداد الطبيعية (ℕ) مُضمنة في الأعداد الصحيحة النسبية (ℤ) لأن كل عدد صحيح موجب هو أيضاً عدد صحيح نسبي.' }
          },
          {
            id: 'math-1-ex3',
            question: { fr: 'Le nombre √3 est:', ar: 'العدد √3 هو:' },
            options: { fr: ['Rationnel', 'Entier naturel', 'Irrationnel', 'Décimal'], ar: ['ناطق', 'طبيعي', 'أصم', 'عشري'] },
            correctIndex: 2,
            explanation: { fr: '√3 ne peut pas s\'écrire comme une fraction a/b. C\'est un nombre irrationnel qui appartient à ℝ mais pas à ℚ.', ar: '√3 لا يمكن كتابته على شكل كسر a/b. إنه عدد أصم ينتمي إلى ℝ وليس إلى ℚ.' }
          }
        ]
      },
      {
        id: 'math-2',
        title: { fr: 'Calcul dans ℤ et ℚ', ar: 'الحساب في ℤ و ℚ' },
        duration: 30,
        content: {
          fr: "Les règles de calcul dans les ensembles numériques:\n\n**Priorité des opérations:**\n1. Parenthèses\n2. Puissances\n3. Multiplication et division (de gauche à droite)\n4. Addition et soustraction (de gauche à droite)\n\n**Fractions:**\n• a/b + c/b = (a+c)/b\n• a/b × c/d = (a×c)/(b×d)\n• a/b ÷ c/d = a/b × d/c",
          ar: "قواعد الحساب في المجموعات العددية:\n\n**أولويات العمليات:**\n1. الأقواس\n2. الأسس\n3. الضرب والقسمة (من اليسار إلى اليمين)\n4. الجمع والطرح (من اليسار إلى اليمين)\n\n**الكسور:**\n• a/b + c/b = (a+c)/b\n• a/b × c/d = (a×c)/(b×d)\n• a/b ÷ c/d = a/b × d/c"
        },
        examples: {
          fr: [
            "Exemple: Calculer 2/3 + 1/4\n= 8/12 + 3/12 (même dénominateur 12)\n= 11/12"
          ],
          ar: [
            "مثال: حساب 2/3 + 1/4\n= 8/12 + 3/12 (نفس المقام 12)\n= 11/12"
          ]
        },
        exercises: [
          {
            id: 'math-2-ex1',
            question: { fr: 'Calculer: 3/4 + 2/3', ar: 'احسب: 3/4 + 2/3' },
            options: { fr: ['5/7', '17/12', '5/12', '1/2'], ar: ['5/7', '17/12', '5/12', '1/2'] },
            correctIndex: 1,
            explanation: { fr: '3/4 + 2/3 = 9/12 + 8/12 = 17/12. On met au même dénominateur (12).', ar: '3/4 + 2/3 = 9/12 + 8/12 = 17/12. نوحد المقامات (12).' }
          },
          {
            id: 'math-2-ex2',
            question: { fr: 'Calculer: (-3) × 4 + 2', ar: 'احسب: (-3) × 4 + 2' },
            options: { fr: ['-10', '10', '-14', '6'], ar: ['-10', '10', '-14', '6'] },
            correctIndex: 0,
            explanation: { fr: '(-3) × 4 + 2 = -12 + 2 = -10. La multiplication est prioritaire.', ar: '(-3) × 4 + 2 = -12 + 2 = -10. الضرب له الأولوية.' }
          }
        ]
      },
      {
        id: 'math-3',
        title: { fr: 'La droite graduée et encadrement', ar: 'المستقيم المدرج والتأطير' },
        duration: 20,
        content: {
          fr: "**Droite graduée:**\nChaque nombre réel correspond à un unique point sur la droite graduée.\n\n**Valeur absolue:**\n|a| = a si a ≥ 0\n|a| = -a si a < 0\n\n**Encadrement:**\nEncadrer un nombre c'est trouver deux valeurs entre lesquelles il se situe.\nExemple: 3,14 < π < 3,15",
          ar: "**المستقيم المدرج:**\nكل عدد حقيقي يقابل نقطة وحيدة على المستقيم المدرج.\n\n**القيمة المطلقة:**\n|a| = a إذا كان a ≥ 0\n|a| = -a إذا كان a < 0\n\n**التأطير:**\nتأطير عدد يعني إيجاد قيمتين يقع بينهما.\nمثال: 3,14 < π < 3,15"
        },
        examples: { fr: ["|−7| = 7", "|3| = 3", "Encadrer √5: 2,23 < √5 < 2,24"], ar: ["|−7| = 7", "|3| = 3", "تأطير √5: 2,23 < √5 < 2,24"] },
        exercises: [
          {
            id: 'math-3-ex1',
            question: { fr: 'Quelle est la valeur absolue de -12?', ar: 'ما هي القيمة المطلقة لـ -12؟' },
            options: { fr: ['-12', '12', '0', '-1'], ar: ['-12', '12', '0', '-1'] },
            correctIndex: 1,
            explanation: { fr: '|-12| = 12 car -12 < 0, donc |-12| = -(-12) = 12.', ar: '|-12| = 12 لأن -12 < 0، إذن |-12| = -(-12) = 12.' }
          }
        ]
      }
    ]
  },
  {
    id: 'physics',
    name: { fr: 'Physique-Chimie', ar: 'الفيزياء والكيمياء' },
    icon: '⚗️',
    color: 'from-purple-500 to-purple-700',
    lessons: [
      {
        id: 'phys-1',
        title: { fr: 'Les états de la matière', ar: 'حالات المادة' },
        duration: 20,
        content: {
          fr: "La matière existe sous trois états principaux:\n\n• **Solide**: forme propre et volume propre\n• **Liquide**: pas de forme propre, volume propre\n• **Gaz**: pas de forme propre, pas de volume propre\n\n**Changements d'état:**\nFusion: solide → liquide\nSolidification: liquide → solide\nVaporisation: liquide → gaz\nLiquéfaction: gaz → liquide",
          ar: "توجد المادة في ثلاث حالات رئيسية:\n\n• **صلب**: شكل خاص وحجم خاص\n• **سائل**: لا شكل خاص، حجم خاص\n• **غاز**: لا شكل خاص، لا حجم خاص\n\n**تغيرات الحالة:**\nالانصهار: صلب ← سائل\nالتجمد: سائل ← صلب\nالتبخر: سائل ← غاز\nالتكثف: غاز ← سائل"
        },
        examples: { fr: ["La glace fond à 0°C (fusion)", "L'eau bout à 100°C (vaporisation)"], ar: ["الجليد ينصهر عند 0°C (انصهار)", "الماء يغلي عند 100°C (تبخر)"] },
        exercises: [
          {
            id: 'phys-1-ex1',
            question: { fr: 'Comment appelle-t-on le passage de l\'état liquide à l\'état gazeux?', ar: 'ما اسم التحول من الحالة السائلة إلى الحالة الغازية؟' },
            options: { fr: ['Fusion', 'Vaporisation', 'Solidification', 'Condensation'], ar: ['انصهار', 'تبخر', 'تجمد', 'تكثف'] },
            correctIndex: 1,
            explanation: { fr: 'Le passage de liquide à gaz s\'appelle la vaporisation (ébullition ou évaporation).', ar: 'التحول من سائل إلى غاز يسمى التبخر (غليان أو تبخر سطحي).' }
          },
          {
            id: 'phys-1-ex2',
            question: { fr: 'Un gaz a-t-il un volume propre?', ar: 'هل الغاز له حجم خاص؟' },
            options: { fr: ['Oui, toujours', 'Non, il prend le volume du récipient', 'Oui, si la température est constante', 'Dépend de la pression'], ar: ['نعم، دائماً', 'لا، يأخذ حجم الوعاء', 'نعم، إذا كانت الحرارة ثابتة', 'يعتمد على الضغط'] },
            correctIndex: 1,
            explanation: { fr: 'Un gaz n\'a pas de volume propre. Il occupe tout le volume du récipient qui le contient.', ar: 'الغاز ليس له حجم خاص. يشغل كل حجم الوعاء الذي يحتويه.' }
          }
        ]
      },
      {
        id: 'phys-2',
        title: { fr: 'Le courant électrique', ar: 'التيار الكهربائي' },
        duration: 25,
        content: {
          fr: "**Circuit électrique:**\nUn circuit est un chemin fermé permettant la circulation du courant.\n\n**Composants:**\n• Générateur (pile): fournit l'énergie\n• Récepteur (lampe, moteur): utilise l'énergie\n• Interrupteur: ouvre/ferme le circuit\n• Fils de connexion: relient les composants\n\n**Loi d'Ohm:**\nU = R × I\nU: tension en volts (V)\nR: résistance en ohms (Ω)\nI: intensité en ampères (A)",
          ar: "**الدائرة الكهربائية:**\nالدائرة هي مسار مغلق يسمح بمرور التيار.\n\n**المكونات:**\n• المولد (بطارية): يوفر الطاقة\n• المستقبل (مصباح، محرك): يستهلك الطاقة\n• القاطع: يفتح/يغلق الدائرة\n• أسلاك التوصيل: تربط المكونات\n\n**قانون أوم:**\nU = R × I\nU: التوتر بالفولط (V)\nR: المقاومة بالأوم (Ω)\nI: الشدة بالأمبير (A)"
        },
        examples: { fr: ["U = 6V, R = 3Ω → I = U/R = 6/3 = 2A"], ar: ["U = 6V, R = 3Ω → I = U/R = 6/3 = 2A"] },
        exercises: [
          {
            id: 'phys-2-ex1',
            question: { fr: 'Si U = 12V et R = 4Ω, quelle est l\'intensité I?', ar: 'إذا كان U = 12V و R = 4Ω، ما هي الشدة I؟' },
            options: { fr: ['48 A', '3 A', '8 A', '16 A'], ar: ['48 A', '3 A', '8 A', '16 A'] },
            correctIndex: 1,
            explanation: { fr: 'I = U/R = 12/4 = 3 A', ar: 'I = U/R = 12/4 = 3 A' }
          }
        ]
      }
    ]
  },
  {
    id: 'svt',
    name: { fr: 'Sciences de la Vie et de la Terre', ar: 'علوم الحياة والأرض' },
    icon: '🌿',
    color: 'from-green-500 to-green-700',
    lessons: [
      {
        id: 'svt-1',
        title: { fr: 'La cellule, unité du vivant', ar: 'الخلية، وحدة الكائنات الحية' },
        duration: 25,
        content: {
          fr: "**La cellule** est l'unité structurale et fonctionnelle de tous les êtres vivants.\n\n**Types de cellules:**\n• Cellule animale: membrane, cytoplasme, noyau, mitochondries\n• Cellule végétale: + paroi cellulosique, chloroplastes, vacuole\n\n**Organites:**\n• Noyau: contient l'ADN\n• Mitochondries: production d'énergie\n• Chloroplastes: photosynthèse (végétaux)\n• Membrane plasmique: frontière de la cellule",
          ar: "**الخلية** هي الوحدة البنيوية والوظيفية لجميع الكائنات الحية.\n\n**أنواع الخلايا:**\n• الخلية الحيوانية: غشاء، سيتوبلازم، نواة، ميتوكوندريا\n• الخلية النباتية: + جدار سليولوزي، بلاستيدات خضراء، فجوة\n\n**العضيات:**\n• النواة: تحتوي على ADN\n• الميتوكوندريا: إنتاج الطاقة\n• البلاستيدات الخضراء: التركيب الضوئي (النباتات)\n• الغشاء البلازمي: حدود الخلية"
        },
        examples: { fr: ["Une cellule végétale se distingue par sa paroi rigide et ses chloroplastes"], ar: ["الخلية النباتية تتميز بجدارها الصلب وبلاستيداتها الخضراء"] },
        exercises: [
          {
            id: 'svt-1-ex1',
            question: { fr: 'Quel organite est responsable de la photosynthèse?', ar: 'ما هي العضية المسؤولة عن التركيب الضوئي؟' },
            options: { fr: ['Mitochondrie', 'Noyau', 'Chloroplaste', 'Vacuole'], ar: ['ميتوكوندريا', 'نواة', 'بلاستيدة خضراء', 'فجوة'] },
            correctIndex: 2,
            explanation: { fr: 'Les chloroplastes contiennent la chlorophylle qui capte l\'énergie lumineuse pour la photosynthèse.', ar: 'البلاستيدات الخضراء تحتوي على الكلوروفيل التي تمتص الطاقة الضوئية للتركيب الضوئي.' }
          }
        ]
      }
    ]
  },
  {
    id: 'french',
    name: { fr: 'Français', ar: 'الفرنسية' },
    icon: '📖',
    color: 'from-red-500 to-red-700',
    lessons: [
      {
        id: 'fr-1',
        title: { fr: 'Les types de textes', ar: 'أنواع النصوص' },
        duration: 20,
        content: {
          fr: "**Les types de textes:**\n\n• **Narratif**: raconte une histoire (roman, nouvelle)\n• **Descriptif**: décrit un lieu, une personne, un objet\n• **Argumentatif**: défend une opinion avec des arguments\n• **Explicatif**: explique un phénomène, un concept\n• **Injonctif**: donne des ordres, des conseils\n\n**Repérer le type:**\n→ Chercher le but de l'auteur\n→ Observer les temps verbaux utilisés\n→ Identifier les connecteurs logiques",
          ar: "**أنواع النصوص:**\n\n• **سردي**: يروي قصة (رواية، قصة قصيرة)\n• **وصفي**: يصف مكاناً، شخصاً، شيئاً\n• **حجاجي**: يدافع عن رأي بحجج\n• **تفسيري**: يفسر ظاهرة أو مفهوماً\n• **أوامي**: يعطي أوامر أو نصائح\n\n**تحديد النوع:**\n→ البحث عن هدف الكاتب\n→ ملاحظة الأزمنة الفعلية المستخدمة\n→ تحديد الروابط المنطقية"
        },
        examples: { fr: ["\"Il faisait beau ce jour-là...\" → Narratif", "\"Je pense que... car...\" → Argumentatif"], ar: ["\"Il faisait beau ce jour-là...\" ← سردي", "\"Je pense que... car...\" ← حجاجي"] },
        exercises: [
          {
            id: 'fr-1-ex1',
            question: { fr: 'Un texte qui donne des instructions de montage est de type:', ar: 'نص يعطي تعليمات التركيب هو من نوع:' },
            options: { fr: ['Narratif', 'Descriptif', 'Injonctif', 'Argumentatif'], ar: ['سردي', 'وصفي', 'أوامي', 'حجاجي'] },
            correctIndex: 2,
            explanation: { fr: 'Un texte qui donne des ordres ou des instructions est de type injonctif (impératif, conseils).', ar: 'النص الذي يعطي أوامر أو تعليمات هو من النوع الأوامي (صيغة الأمر، نصائح).' }
          }
        ]
      }
    ]
  },
  {
    id: 'arabic',
    name: { fr: 'Langue Arabe', ar: 'اللغة العربية' },
    icon: '📝',
    color: 'from-amber-500 to-amber-700',
    lessons: [
      {
        id: 'ar-1',
        title: { fr: 'النحو: المبتدأ والخبر', ar: 'النحو: المبتدأ والخبر' },
        duration: 25,
        content: {
          fr: "**La phrase nominale en arabe:**\n\nالمبتدأ: le sujet (ce dont on parle) - مرفوع\nالخبر: le prédicat (ce qu'on dit du sujet) - مرفوع\n\n**Exemples:**\n• العلمُ نورٌ (Le savoir est lumière)\n• الطالبُ مجتهدٌ (L'élève est studieux)\n\n**Types de خبر:**\n- مفرد: كلمة واحدة\n- جملة فعلية: فعل + فاعل\n- جملة اسمية: مبتدأ + خبر\n- شبه جملة: جار ومجرور أو ظرف",
          ar: "**الجملة الاسمية:**\n\nالمبتدأ: ما نتحدث عنه - مرفوع\nالخبر: ما نخبره عن المبتدأ - مرفوع\n\n**أمثلة:**\n• العلمُ نورٌ\n• الطالبُ مجتهدٌ\n\n**أنواع الخبر:**\n- مفرد: كلمة واحدة\n- جملة فعلية: فعل + فاعل\n- جملة اسمية: مبتدأ + خبر\n- شبه جملة: جار ومجرور أو ظرف"
        },
        examples: { fr: ["العلمُ نورٌ → المبتدأ: العلمُ / الخبر: نورٌ"], ar: ["العلمُ نورٌ → المبتدأ: العلمُ / الخبر: نورٌ"] },
        exercises: [
          {
            id: 'ar-1-ex1',
            question: { fr: 'Dans "الكتابُ مفيدٌ", le moubtada est:', ar: 'في "الكتابُ مفيدٌ"، المبتدأ هو:' },
            options: { fr: ['مفيدٌ', 'الكتابُ', 'كلاهما مبتدأ', 'لا يوجد مبتدأ'], ar: ['مفيدٌ', 'الكتابُ', 'كلاهما مبتدأ', 'لا يوجد مبتدأ'] },
            correctIndex: 1,
            explanation: { fr: 'الكتابُ est le moubtada (sujet) car c\'est ce dont on parle. مفيدٌ est le khabar.', ar: 'الكتابُ هو المبتدأ لأنه ما نتحدث عنه. مفيدٌ هو الخبر.' }
          }
        ]
      }
    ]
  },
  {
    id: 'islamic',
    name: { fr: 'Éducation Islamique', ar: 'التربية الإسلامية' },
    icon: '🕌',
    color: 'from-teal-500 to-teal-700',
    lessons: [
      {
        id: 'isl-1',
        title: { fr: 'Les piliers de l\'Islam', ar: 'أركان الإسلام' },
        duration: 20,
        content: {
          fr: "**Les cinq piliers de l'Islam:**\n\n1. **الشهادة** (Chahada): Attester qu'il n'y a de dieu qu'Allah\n2. **الصلاة** (Salat): Les cinq prières quotidiennes\n3. **الزكاة** (Zakat): L'aumône obligatoire\n4. **الصوم** (Sawm): Le jeûne du Ramadan\n5. **الحج** (Hajj): Le pèlerinage à La Mecque",
          ar: "**أركان الإسلام الخمسة:**\n\n1. **الشهادة**: شهادة أن لا إله إلا الله\n2. **الصلاة**: الصلوات الخمس\n3. **الزكاة**: إخراج الزكاة\n4. **الصوم**: صيام رمضان\n5. **الحج**: حج البيت لمن استطاع"
        },
        examples: { fr: ["La prière est obligatoire 5 fois par jour: Fajr, Dhuhr, Asr, Maghrib, Isha"], ar: ["الصلاة واجبة 5 مرات في اليوم: الفجر، الظهر، العصر، المغرب، العشاء"] },
        exercises: [
          {
            id: 'isl-1-ex1',
            question: { fr: 'Combien de piliers a l\'Islam?', ar: 'كم عدد أركان الإسلام؟' },
            options: { fr: ['3', '4', '5', '6'], ar: ['3', '4', '5', '6'] },
            correctIndex: 2,
            explanation: { fr: 'L\'Islam a 5 piliers: la Chahada, la Salat, la Zakat, le Sawm et le Hajj.', ar: 'للإسلام 5 أركان: الشهادة، الصلاة، الزكاة، الصوم، والحج.' }
          }
        ]
      }
    ]
  }
];

export const diagnosticQuestions = [
  {
    id: 'diag-1',
    subject: 'math',
    question: { fr: 'Résoudre: 2x + 6 = 14', ar: 'حل المعادلة: 2x + 6 = 14' },
    options: { fr: ['x = 2', 'x = 4', 'x = 8', 'x = 10'], ar: ['x = 2', 'x = 4', 'x = 8', 'x = 10'] },
    correctIndex: 1,
  },
  {
    id: 'diag-2',
    subject: 'math',
    question: { fr: 'Quelle est la factorisation de x² - 9?', ar: 'ما هو تحليل x² - 9؟' },
    options: { fr: ['(x-3)²', '(x+3)(x-3)', '(x-9)(x+1)', '(x+9)(x-1)'], ar: ['(x-3)²', '(x+3)(x-3)', '(x-9)(x+1)', '(x+9)(x-1)'] },
    correctIndex: 1,
  },
  {
    id: 'diag-3',
    subject: 'physics',
    question: { fr: 'L\'unité de la force dans le SI est:', ar: 'وحدة القوة في النظام الدولي هي:' },
    options: { fr: ['Watt', 'Joule', 'Newton', 'Pascal'], ar: ['واط', 'جول', 'نيوتن', 'باسكال'] },
    correctIndex: 2,
  },
  {
    id: 'diag-4',
    subject: 'svt',
    question: { fr: 'L\'organe principal de la respiration est:', ar: 'العضو الرئيسي للتنفس هو:' },
    options: { fr: ['Le cœur', 'Les poumons', 'Le foie', 'L\'estomac'], ar: ['القلب', 'الرئتان', 'الكبد', 'المعدة'] },
    correctIndex: 1,
  },
  {
    id: 'diag-5',
    subject: 'french',
    question: { fr: 'Quel est le synonyme de "néanmoins"?', ar: 'ما هو مرادف "néanmoins"؟' },
    options: { fr: ['Donc', 'Pourtant', 'Ensuite', 'Aussi'], ar: ['Donc', 'Pourtant', 'Ensuite', 'Aussi'] },
    correctIndex: 1,
  },
  {
    id: 'diag-6',
    subject: 'math',
    question: { fr: 'Simplifier: 15/25', ar: 'بسّط: 15/25' },
    options: { fr: ['3/5', '1/2', '5/3', '2/3'], ar: ['3/5', '1/2', '5/3', '2/3'] },
    correctIndex: 0,
  },
];
