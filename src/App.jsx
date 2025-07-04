import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home/Home';
import SignIn from './pages/SignIn/SignIn';
import Levels from './pages/Levels/Levels';
import LevelIntro from './pages/LevelIntro/LevelIntro';
import QuizPage from './pages/Quiz/QuizPage';
import Profile from './pages/Profile/Profile';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './context/ProtectedRoute';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/log-in" element={<Navigate to="/sign-in" />} />
          <Route path="/sign-up" element={<Navigate to="/sign-in" />} />
          <Route path="/levels" element={<Levels />} />

          {/* Protected Routes */}
          <Route path="/levels/:chapterId/:levelId" element={<ProtectedRoute> <LevelIntro /> </ProtectedRoute>} />
          <Route path="/levels/:chapter/:level/quiz" element={<ProtectedRoute> <QuizPage /> </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
