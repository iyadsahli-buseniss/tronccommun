import { useState } from 'react';
import { AppProvider, useApp } from './contexts/AppContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import SubjectsPage from './pages/SubjectsPage';
import SubjectDetailPage from './pages/SubjectDetailPage';
import LessonPage from './pages/LessonPage';
import DiagnosticPage from './pages/DiagnosticPage';
import TutorPage from './pages/TutorPage';
import StudyPlanPage from './pages/StudyPlanPage';

type PageState = 
  | { page: 'login' }
  | { page: 'dashboard' }
  | { page: 'subjects' }
  | { page: 'subject-detail'; subjectId: string }
  | { page: 'lesson'; subjectId: string; lessonId: string }
  | { page: 'diagnostic' }
  | { page: 'tutor' }
  | { page: 'study-plan' };

function AppContent() {
  const { isAuthenticated } = useApp();
  const [pageState, setPageState] = useState<PageState>({ page: 'dashboard' });

  const navigate = (page: string, data?: any) => {
    switch (page) {
      case 'dashboard':
        setPageState({ page: 'dashboard' });
        break;
      case 'subjects':
        setPageState({ page: 'subjects' });
        break;
      case 'subject-detail':
        setPageState({ page: 'subject-detail', subjectId: data?.subjectId });
        break;
      case 'lesson':
        setPageState({ page: 'lesson', subjectId: data?.subjectId, lessonId: data?.lessonId });
        break;
      case 'diagnostic':
        setPageState({ page: 'diagnostic' });
        break;
      case 'tutor':
        setPageState({ page: 'tutor' });
        break;
      case 'study-plan':
        setPageState({ page: 'study-plan' });
        break;
      default:
        setPageState({ page: 'dashboard' });
    }
  };

  // Not authenticated - show login
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Determine current page for nav highlighting
  const currentPage = pageState.page === 'subject-detail' || pageState.page === 'lesson' 
    ? 'subjects' 
    : pageState.page === 'diagnostic' 
      ? 'dashboard' 
      : pageState.page;

  const renderPage = () => {
    switch (pageState.page) {
      case 'dashboard':
        return <DashboardPage onNavigate={navigate} />;
      case 'subjects':
        return <SubjectsPage onNavigate={navigate} />;
      case 'subject-detail':
        return <SubjectDetailPage subjectId={pageState.subjectId} onNavigate={navigate} />;
      case 'lesson':
        return <LessonPage subjectId={pageState.subjectId} lessonId={pageState.lessonId} onNavigate={navigate} />;
      case 'diagnostic':
        return <DiagnosticPage onNavigate={navigate} />;
      case 'tutor':
        return <TutorPage />;
      case 'study-plan':
        return <StudyPlanPage onNavigate={navigate} />;
      default:
        return <DashboardPage onNavigate={navigate} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={navigate}>
      {renderPage()}
    </Layout>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
