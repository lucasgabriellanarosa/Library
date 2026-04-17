import { Route, Routes } from 'react-router'

// Pages 
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import BookPage from './pages/BookPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import LibraryPage from './pages/LibraryPage'
import NotFound from './pages/NotFound'

// Auth Component
import { AuthGuard } from './components/auth/AuthGuard'
import AuthPage from './components/auth/AuthPage'

// Auth
import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import PageLayout from './components/layout/PageLayout'
import ProfilePage from './pages/ProfilePage'


function App() {

  const { initializeAuth } = useAuth()

  useEffect(() => {
    initializeAuth();
  }, [])

  return (
    <Routes>
      <Route index path='/' element={<HomePage />} />

      <Route element={<PageLayout />}>
        <Route path='/search' element={<SearchPage />} />
        <Route path='/book/:workId/:isbn?' element={<BookPage />} />


        <Route element={<AuthGuard />}>
          <Route path='/library' element={<LibraryPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Route>

      </Route>

      <Route element={<AuthPage />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

      {/* 404 - Not Found */}
      <Route path='*' element={<NotFound />} />

    </Routes>

  )
}

export default App
