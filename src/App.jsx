import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import DashboardLayout from './components/DashboardLayout';
import PageTransition from './components/PageTransition';
import { ThemeProvider } from './context/ThemeContext';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SkillsPage = lazy(() => import('./pages/SkillsPage'));
const RoadmapPage = lazy(() => import('./pages/RoadmapPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-slate-900 text-white"><div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div></div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
          <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
          <Route path="/register" element={<PageTransition><RegisterPage /></PageTransition>} />
          
          <Route path="/dashboard" element={<DashboardLayout><PageTransition><Dashboard /></PageTransition></DashboardLayout>} />
          <Route path="/skills" element={<DashboardLayout><PageTransition><SkillsPage /></PageTransition></DashboardLayout>} />
          <Route path="/roadmap/:skillName" element={<DashboardLayout><PageTransition><RoadmapPage /></PageTransition></DashboardLayout>} />
          <Route path="/projects" element={<DashboardLayout><PageTransition><ProjectsPage /></PageTransition></DashboardLayout>} />
          <Route path="/quiz/:skillName" element={<DashboardLayout><PageTransition><QuizPage /></PageTransition></DashboardLayout>} />
          <Route path="/settings" element={<DashboardLayout><PageTransition><SettingsPage /></PageTransition></DashboardLayout>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
};

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AnimatedRoutes />
      </Router>
    </ThemeProvider>
  );
}

export default App;
