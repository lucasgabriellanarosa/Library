import { Route, Routes } from 'react-router'
import './App.css'

// Pages 
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import BookPage from './pages/BookPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LibraryPage from './pages/LibraryPage'
import NotFound from './pages/NotFound'
import Logout from './pages/Logout'

// Auth Component
import { AuthGuard } from './components/auth/AuthGuard'
import AuthPage from './components/auth/AuthPage'

// Auth
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'


function App() {

    const { initializeAuth } = useAuth()
  
    useEffect(() => {
      initializeAuth();
    }, [])
    
  return (
    <Routes>
      <Route index path='/' element={<HomePage />} />
      <Route path='/search' element={<SearchPage />} />
      <Route path='/book/:id' element={<BookPage />} />

      <Route element={<AuthPage />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

      <Route path='/logout' element={<Logout />} />



      <Route element={<AuthGuard />}>
        <Route path='/library' element={<LibraryPage />} />
      </Route>

      {/* 404 - Not Found */}
      <Route path='*' element={<NotFound />} />

    </Routes>

  )
}

export default App
