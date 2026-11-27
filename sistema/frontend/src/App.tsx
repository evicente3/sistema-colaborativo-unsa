import { useEffect, useState, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { AppLayout } from './components/AppLayout'
import { supabase } from './lib/supabaseClient'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'
import { ProjectPage } from './pages/ProjectPage'

function useAuthSession() {
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    supabase.auth.getSession().then(({ data }) => {
      if (!isMounted) return
      setSession(data.session)
      setIsLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession)
      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [])

  return { session, isLoading }
}

interface RouteGuardProps {
  session: Session | null
  isLoading: boolean
  children: ReactNode
}

function LoadingState() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-surface px-4">
      <p className="rounded-card bg-surface-card px-5 py-3 text-sm font-semibold text-text-muted shadow-card border border-border">
        Cargando...
      </p>
    </div>
  )
}

function RequireAuth({ session, isLoading, children }: RouteGuardProps) {
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [signOutError, setSignOutError] = useState<string | null>(null)

  const handleSignOut = async () => {
    setIsSigningOut(true)
    setSignOutError(null)

    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        setSignOutError('No se pudo cerrar sesión. Intenta de nuevo.')
      }
    } catch {
      setSignOutError('No se pudo cerrar sesión. Intenta de nuevo.')
    } finally {
      setIsSigningOut(false)
    }
  }

  if (isLoading) return <LoadingState />
  if (!session) return <Navigate to="/login" replace />
  return (
    <AppLayout
      userEmail={session.user.email}
      onSignOut={handleSignOut}
      isSigningOut={isSigningOut}
      signOutError={signOutError}
    >
      {children}
    </AppLayout>
  )
}

function PublicOnlyRoute({ session, isLoading, children }: RouteGuardProps) {
  if (isLoading) return <LoadingState />
  if (session) return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

export function AppRoutes() {
  const { session, isLoading } = useAuthSession()

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicOnlyRoute session={session} isLoading={isLoading}>
            <LoginPage />
          </PublicOnlyRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <RequireAuth session={session} isLoading={isLoading}>
            <DashboardPage />
          </RequireAuth>
        }
      />
      <Route
        path="/projects/:projectId"
        element={
          <RequireAuth session={session} isLoading={isLoading}>
            <ProjectPage />
          </RequireAuth>
        }
      />
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}
