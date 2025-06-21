import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home/Home'
import SignIn from './pages/SignIn/SignIn'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/log-in" element={<SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  )
}
