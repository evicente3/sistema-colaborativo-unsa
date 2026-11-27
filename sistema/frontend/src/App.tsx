import { useEffect, useState, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supabaseClient'
import { DashboardPage } from './pages/DashboardPage'
import { LoginPage } from './pages/LoginPage'

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

function RequireAuth({ session, isLoading, children }: RouteGuardProps) {
  if (isLoading) return <p>Cargando...</p>
  if (!session) return <Navigate to="/login" replace />
  return <>{children}</>
}

function PublicOnlyRoute({ session, isLoading, children }: RouteGuardProps) {
  if (isLoading) return <p>Cargando...</p>
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
