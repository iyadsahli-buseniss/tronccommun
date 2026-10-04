export type Lang = 'fr' | 'ar';

export const translations = {
  // Auth
  appName: { fr: 'Darsy', ar: 'دَرْسي' },
  tagline: { fr: 'Ton compagnon d\'apprentissage', ar: 'رفيقك في التعلم' },
  login: { fr: 'Se connecter', ar: 'تسجيل الدخول' },
  register: { fr: 'Créer un compte', ar: 'إنشاء حساب' },
  email: { fr: 'Adresse e-mail', ar: 'البريد الإلكتروني' },
  password: { fr: 'Mot de passe', ar: 'كلمة المرور' },
  confirmPassword: { fr: 'Confirmer le mot de passe', ar: 'تأكيد كلمة المرور' },
  fullName: { fr: 'Nom complet', ar: 'الاسم الكامل' },
  noAccount: { fr: 'Pas de compte?', ar: 'ليس لديك حساب؟' },
  hasAccount: { fr: 'Déjà un compte?', ar: 'لديك حساب؟' },
  createAccount: { fr: 'Créer mon compte', ar: 'إنشاء حسابي' },
  signIn: { fr: 'Connexion', ar: 'دخول' },
  logout: { fr: 'Déconnexion', ar: 'تسجيل الخروج' },
  
  // Navigation
  dashboard: { fr: 'Tableau de bord', ar: 'لوحة القيادة' },
  subjects: { fr: 'Matières', ar: 'المواد' },
  tutor: { fr: 'Tuteur IA', ar: 'المعلم الذكي' },
  studyPlan: { fr: 'Plan d\'étude', ar: 'خطة الدراسة' },
  progress: { fr: 'Progression', ar: 'التقدم' },
  
  // Dashboard
  welcome: { fr: 'Bienvenue', ar: 'مرحباً' },
  continueLearning: { fr: 'Continuer l\'apprentissage', ar: 'متابعة التعلم' },
  startDiagnostic: { fr: 'Commencer le diagnostic', ar: 'بدء التشخيص' },
  diagnosticDesc: { fr: 'Évalue ton niveau pour personnaliser ton parcours', ar: 'قيّم مستواك لتخصيص مسارك' },
  todayGoal: { fr: 'Objectif du jour', ar: 'هدف اليوم' },
  streak: { fr: 'jours consécutifs', ar: 'أيام متتالية' },
  completedLessons: { fr: 'leçons terminées', ar: 'دروس مكتملة' },
  exercisesDone: { fr: 'exercices faits', ar: 'تمرين منجز' },
  
  // Subjects
  lesson: { fr: 'Leçon', ar: 'درس' },
  lessons: { fr: 'Leçons', ar: 'دروس' },
  exercises: { fr: 'Exercices', ar: 'تمارين' },
  minutes: { fr: 'min', ar: 'دقيقة' },
  start: { fr: 'Commencer', ar: 'ابدأ' },
  completed: { fr: 'Terminé', ar: 'مكتمل' },
  notStarted: { fr: 'Non commencé', ar: 'لم يبدأ' },
  
  // Lesson
  examples: { fr: 'Exemples', ar: 'أمثلة' },
  practice: { fr: 'S\'entraîner', ar: 'التدريب' },
  nextLesson: { fr: 'Leçon suivante', ar: 'الدرس التالي' },
  previousLesson: { fr: 'Leçon précédente', ar: 'الدرس السابق' },
  backToSubject: { fr: 'Retour aux matières', ar: 'العودة للمواد' },
  
  // Practice
  checkAnswer: { fr: 'Vérifier', ar: 'تحقق' },
  nextQuestion: { fr: 'Question suivante', ar: 'السؤال التالي' },
  correct: { fr: 'Correct !', ar: 'صحيح!' },
  incorrect: { fr: 'Incorrect', ar: 'خطأ' },
  explanation: { fr: 'Explication', ar: 'التوضيح' },
  score: { fr: 'Score', ar: 'النتيجة' },
  tryAgain: { fr: 'Réessayer', ar: 'حاول مرة أخرى' },
  finish: { fr: 'Terminer', ar: 'إنهاء' },
  
  // Tutor
  tutorWelcome: { fr: 'Bonjour ! Je suis ton tuteur IA.', ar: 'مرحباً! أنا معلمك الذكي.' },
  tutorDesc: { fr: 'Pose-moi une question sur tes cours et je t\'aiderai étape par étape.', ar: 'اطرح سؤالاً عن دروسك وسأساعدك خطوة بخطوة.' },
  typeMessage: { fr: 'Écris ta question...', ar: 'اكتب سؤالك...' },
  send: { fr: 'Envoyer', ar: 'إرسال' },
  thinking: { fr: 'Réflexion...', ar: 'تفكير...' },
  offlineNotice: { fr: 'Le tuteur IA nécessite une connexion internet. Les cours téléchargés restent disponibles hors ligne.', ar: 'المعلم الذكي يحتاج اتصال بالإنترنت. الدروس المحملة تبقى متاحة بدون إنترنت.' },
  
  // Study Plan
  yourPlan: { fr: 'Ton plan d\'étude personnalisé', ar: 'خطة دراستك المخصصة' },
  recommended: { fr: 'Recommandé pour toi', ar: 'موصى به لك' },
  weakAreas: { fr: 'Points à améliorer', ar: 'نقاط للتحسين' },
  strongAreas: { fr: 'Points forts', ar: 'نقاط القوة' },
  weeklyGoal: { fr: 'Objectif hebdomadaire', ar: 'الهدف الأسبوعي' },
  
  // Diagnostic
  diagnosticTitle: { fr: 'Test de positionnement', ar: 'اختبار تحديد المستوى' },
  diagnosticIntro: { fr: 'Ce test nous aide à comprendre ton niveau actuel pour adapter ton parcours.', ar: 'هذا الاختبار يساعدنا على فهم مستواك الحالي لتكييف مسارك.' },
  question: { fr: 'Question', ar: 'سؤال' },
  of: { fr: 'sur', ar: 'من' },
  results: { fr: 'Résultats', ar: 'النتائج' },
  yourScore: { fr: 'Ton score', ar: 'نتيجتك' },
  restartDiagnostic: { fr: 'Refaire le test', ar: 'إعادة الاختبار' },
  
  // General
  loading: { fr: 'Chargement...', ar: 'جاري التحميل...' },
  error: { fr: 'Erreur', ar: 'خطأ' },
  retry: { fr: 'Réessayer', ar: 'حاول مرة أخرى' },
  save: { fr: 'Enregistrer', ar: 'حفظ' },
  cancel: { fr: 'Annuler', ar: 'إلغاء' },
  download: { fr: 'Télécharger', ar: 'تحميل' },
  offline: { fr: 'Hors ligne', ar: 'بدون إنترنت' },
  online: { fr: 'En ligne', ar: 'متصل' },
  language: { fr: 'Langue', ar: 'اللغة' },
  french: { fr: 'Français', ar: 'الفرنسية' },
  arabic: { fr: 'Arabe', ar: 'العربية' },
};

export function t(key: keyof typeof translations, lang: Lang): string {
  return translations[key][lang];
}
