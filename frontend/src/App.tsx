import { Route, Routes } from 'react-router-dom'
import './App.css'
import Dashboard from './components/dashboardPage'
import ProtectedRoute from './components/protectedRouter'
import SignIn from './components/SignIn'
import PageNotFound from './components/pageNotFound'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Toaster } from 'react-hot-toast'
import PublicDashboard from './components/PublicDashboard'
import LandingPage from './components/LandingPage'
import { useTheme } from './context/ThemeContext'

function App() {
  const { isDarkMode } = useTheme();
  const GoogleAuthWrapper = () => {
    return (
      <GoogleOAuthProvider clientId='684299130992-jni8up3co12ieai9pgs5u5g5k669aat0.apps.googleusercontent.com'>
        < SignIn />
      </GoogleOAuthProvider>
    )
  }
  return (
    <div>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: isDarkMode ? "#0F172A" : "#FFFFFF",
            color: isDarkMode ? "#F8FAFC" : "#0F172A",
            border: "0",
            outline: "0",
            boxShadow: "none",
            borderRadius: "12px",
            backgroundClip: "padding-box",
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<GoogleAuthWrapper />} />

        <Route path="/share/:hash" element={<PublicDashboard />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App
