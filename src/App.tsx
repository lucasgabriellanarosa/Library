import { Route, Routes } from 'react-router'
import { lazy, Suspense, useEffect } from 'react';
import { useAuth } from './hooks/useAuth'

// Layouts & Auth Guard
import PageLayout from './components/layout/PageLayout';
import { AuthGuard } from './components/auth/AuthGuard';
import AuthPage from './components/auth/AuthPage';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy Loading Page
const HomePage = lazy(() => import('./pages/HomePage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const BookPage = lazy(() => import('./pages/BookPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const NotFound = lazy(() => import('./pages/NotFound'));


function App() {

  const { initializeAuth } = useAuth()

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth])

  return (
    <Routes>
      <Route index path='/' element={
        <Suspense fallback={
          <div className='w-dvw h-screen bg-indigo-100'>
            <LoadingSpinner loading text='Searching books...' />
          </div>
        }>
          <HomePage />
        </Suspense>
      } />

      <Route element={<PageLayout />}>
        <Route path='/search' element={<SearchPage />} />
        <Route path='/book/:workId/:isbn?' element={<BookPage />} />
        <Route element={<AuthGuard />}>
          <Route path='/library' element={<LibraryPage />} />
        </Route>
      </Route>

      <Route element={<AuthPage />}>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>

      {/* 404 - Not Found */}
      <Route path='*' element={<NotFound />} />

    </Routes >


  )
}

export default App
