import { Route, Routes } from 'react-router'
import { lazy, Suspense, useEffect } from 'react';
import { useAuth } from './hooks/useAuth'

// Layouts & Auth Guard
import PageLayout from './components/layout/PageLayout';
import { AuthGuard } from './components/auth/AuthGuard';
import AuthPage from './components/auth/AuthPage';
import LoadingSpinner from './components/ui/LoadingSpinner';

import HomePage from './pages/HomePage';

// Lazy Loading Page
const SearchPage = lazy(() => import('./pages/SearchPage'));
const BookPage = lazy(() => import('./pages/BookPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const LibraryPage = lazy(() => import('./pages/LibraryPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Vercel Insights
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"

function App() {

  const { initializeAuth } = useAuth()

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth])

  return (
    <>
      <Routes>

        <Route index path='/' element={<HomePage />} />

        <Route element={<PageLayout />}>
          <Route path='/search' element={<SearchPage />} />
          <Route path='/book/:workId/:isbn?' element={<BookPage />} />
          <Route element={<AuthGuard />}>
            <Route path='/library' element={<LibraryPage />} />
          </Route>
        </Route>

        <Route
          element={
            <Suspense fallback={<LoadingSpinner loading />}>
              <AuthPage />
            </Suspense>
          }>

          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

        </Route>

        <Route path='*' element={
          <Suspense fallback={<LoadingSpinner loading />}>
            <NotFound />
          </Suspense>
        } />

      </Routes>

      <SpeedInsights />
      <Analytics />

    </>



  )
}

export default App
