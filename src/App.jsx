import './App.css';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home/Home.jsx';
import SignIn from './pages/SignIn/SignIn.jsx';
import Levels from './pages/Levels/Levels.jsx';
import LevelIntro from './pages/LevelIntro/LevelIntro.jsx';
import QuizPage from './pages/Quiz/QuizPage.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Leaderboard from './pages/Rankings/Leaderboard.jsx'
import AdminDashboard from './pages/Admin/AdminDashboard.jsx'

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ProtectedRoute from './context/ProtectedRoute.jsx';
import AdminRoute from './context/AdminRoute.jsx';

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
          <Route path="/rankings" element={<Leaderboard />} />

          {/* Protected Routes */}
          <Route path="/levels/:chapterId/:levelId" element={<ProtectedRoute> <LevelIntro /> </ProtectedRoute>} />
          <Route path="/levels/:chapter/:level/quiz" element={<ProtectedRoute> <QuizPage /> </ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute> <Profile /> </ProtectedRoute>} />

          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
