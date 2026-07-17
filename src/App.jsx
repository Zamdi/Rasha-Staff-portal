import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { StaffProvider, useStaff } from './context/StaffContext'
import Toast from './components/Toast'
import ScrollToTop from './components/ScrollToTop'
import StaffLogin from './pages/StaffLogin'
import StaffDashboard from './pages/StaffDashboard'

function ProtectedRoute({ children }) {
  const { staffToken } = useStaff()
  return staffToken ? children : <Navigate to="/" replace />
}

function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Toast />
      <Routes>
        <Route path="/" element={<StaffLogin />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><StaffDashboard /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default function App() {
  return (
    <StaffProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </StaffProvider>
  )
}
