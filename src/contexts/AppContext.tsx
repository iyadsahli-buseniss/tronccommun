import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Lang } from '../data/translations';
import { subjects } from '../data/curriculum';

interface User {
  email: string;
  name: string;
}

interface ProgressData {
  completedLessons: string[];
  exerciseResults: Record<string, { score: number; total: number; date: string }>;
  diagnosticScore: number | null;
  diagnosticDate: string | null;
  streak: number;
  lastActiveDate: string;
  totalExercisesDone: number;
}

interface QueuedSync {
  type: 'lesson' | 'exercise' | 'diagnostic';
  data: any;
  timestamp: string;
}

interface AppContextType {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  
  // Language
  lang: Lang;
  setLang: (lang: Lang) => void;
  
  // Progress
  progress: ProgressData;
  markLessonComplete: (lessonId: string) => void;
  saveExerciseResult: (lessonId: string, score: number, total: number) => void;
  saveDiagnosticResult: (score: number) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  
  // Offline
  isOnline: boolean;
  queuedSyncs: QueuedSync[];
}

const defaultProgress: ProgressData = {
  completedLessons: [],
  exerciseResults: {},
  diagnosticScore: null,
  diagnosticDate: null,
  streak: 0,
  lastActiveDate: '',
  totalExercisesDone: 0,
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('darsy_user');
    return saved ? JSON.parse(saved) : null;
  });
  
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem('darsy_lang');
    return (saved as Lang) || 'fr';
  });
  
  const [progress, setProgress] = useState<ProgressData>(() => {
    const saved = localStorage.getItem('darsy_progress');
    return saved ? JSON.parse(saved) : defaultProgress;
  });
  
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [queuedSyncs, setQueuedSyncs] = useState<QueuedSync[]>(() => {
    const saved = localStorage.getItem('darsy_sync_queue');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('darsy_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('darsy_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('darsy_sync_queue', JSON.stringify(queuedSyncs));
  }, [queuedSyncs]);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulated auth - in production this would call an API
    const savedUsers = JSON.parse(localStorage.getItem('darsy_users') || '[]');
    const found = savedUsers.find((u: any) => u.email === email);
    if (found) {
      setUser({ email: found.email, name: found.name });
      localStorage.setItem('darsy_user', JSON.stringify({ email: found.email, name: found.name }));
      // Load progress
      const savedProgress = localStorage.getItem(`darsy_progress_${email}`);
      if (savedProgress) setProgress(JSON.parse(savedProgress));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, _password: string): Promise<boolean> => {
    const savedUsers = JSON.parse(localStorage.getItem('darsy_users') || '[]');
    if (savedUsers.find((u: any) => u.email === email)) return false;
    savedUsers.push({ name, email });
    localStorage.setItem('darsy_users', JSON.stringify(savedUsers));
    setUser({ email, name });
    localStorage.setItem('darsy_user', JSON.stringify({ email, name }));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('darsy_user');
    setProgress(defaultProgress);
  };

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
  };

  const updateStreak = useCallback((currentProgress: ProgressData): ProgressData => {
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    if (currentProgress.lastActiveDate === today) return currentProgress;
    
    let newStreak = currentProgress.streak;
    if (currentProgress.lastActiveDate === yesterday) {
      newStreak += 1;
    } else if (currentProgress.lastActiveDate !== today) {
      newStreak = 1;
    }
    
    return { ...currentProgress, streak: newStreak, lastActiveDate: today };
  }, []);

  const markLessonComplete = (lessonId: string) => {
    setProgress(prev => {
      const updated = { ...prev };
      if (!updated.completedLessons.includes(lessonId)) {
        updated.completedLessons = [...updated.completedLessons, lessonId];
      }
      return updateStreak(updated);
    });
    
    if (!isOnline) {
      setQueuedSyncs(prev => [...prev, { type: 'lesson', data: { lessonId }, timestamp: new Date().toISOString() }]);
    }
  };

  const saveExerciseResult = (lessonId: string, score: number, total: number) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        exerciseResults: { ...prev.exerciseResults, [lessonId]: { score, total, date: new Date().toISOString() } },
        totalExercisesDone: prev.totalExercisesDone + total,
      };
      return updateStreak(updated);
    });
  };

  const saveDiagnosticResult = (score: number) => {
    setProgress(prev => updateStreak({
      ...prev,
      diagnosticScore: score,
      diagnosticDate: new Date().toISOString(),
    }));
  };

  const isLessonCompleted = (lessonId: string): boolean => {
    return progress.completedLessons.includes(lessonId);
  };

  return (
    <AppContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      register,
      logout,
      lang,
      setLang,
      progress,
      markLessonComplete,
      saveExerciseResult,
      saveDiagnosticResult,
      isLessonCompleted,
      isOnline,
      queuedSyncs,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
