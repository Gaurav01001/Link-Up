import { Routes, Route } from 'react-router-dom'
import LandingPage from '../pages/Home/Landing_page'
import Register from '../pages/Auth/Register'
import Login from '../pages/Auth/Login'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}
