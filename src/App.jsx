import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/log-in" element={<Navigate to="/sign-in" />} />
        <Route path="/sign-up" element={<Navigate to="/sign-in" />} />
      </Routes>
    </BrowserRouter>
  )
}
