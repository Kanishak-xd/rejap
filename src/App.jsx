import React, { Suspense, lazy } from 'react';
import './App.css';
 
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
 
const Home = lazy(() => import('./pages/Home/Home.jsx'));
const SignIn = lazy(() => import('./pages/SignIn/SignIn.jsx'));
const Levels = lazy(() => import('./pages/Levels/Levels.jsx'));
const LevelIntro = lazy(() => import('./pages/LevelIntro/LevelIntro.jsx'));
const QuizPage = lazy(() => import('./pages/Quiz/QuizPage.jsx'));
const Profile = lazy(() => import('./pages/Profile/Profile.jsx'));
const Leaderboard = lazy(() => import('./pages/Rankings/Leaderboard.jsx'));
const AdminDashboard = lazy(() => import('./pages/Admin/AdminDashboard.jsx'));
const SupportInfo = lazy(() => import('./pages/Info/SupportInfo.jsx'));

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import AdminRoute from './context/AdminRoute.jsx';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/sign-in" element={<SignIn />} />
            <Route path="/log-in" element={<Navigate to="/sign-in" />} />
            <Route path="/sign-up" element={<Navigate to="/sign-in" />} />
            <Route path="/levels" element={<Levels />} />
            <Route path="/rankings" element={<Leaderboard />} />
            <Route path="/SupportInfo/*" element={<SupportInfo />} />
            {/* Protected Routes */}
            <Route path="/levels/:chapterId/:levelId" element={
              <ProtectedRoute>
                <LevelIntro />
              </ProtectedRoute>
            } />
            <Route path="/levels/:chapter/:level/quiz" element={
              <ProtectedRoute>
                <QuizPage />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            {/* Admin Routes */}
            <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
          </Routes>
        </Suspense>
        <Footer />
      </BrowserRouter>
    </AuthProvider>
  );
}
