import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export interface AppLayoutProps {
  children: ReactNode
  userEmail?: string | null
  onSignOut: () => void | Promise<void>
  isSigningOut?: boolean
  signOutError?: string | null
}

export function AppLayout({
  children,
  userEmail,
  onSignOut,
  isSigningOut = false,
  signOutError = null,
}: AppLayoutProps) {
  const location = useLocation()
  const isProjectRoute = location.pathname.startsWith('/projects/')

  return (
    <div className="min-h-screen bg-surface text-text-main">
      <header className="border-b border-border bg-surface-card">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-lg font-bold tracking-tight text-text-main hover:text-primary transition-colors"
            >
              <span
                aria-hidden="true"
                className="inline-flex h-8 w-8 items-center justify-center rounded-control bg-primary text-sm font-bold text-on-primary"
              >
                TG
              </span>
              <span>Tablero de grupos</span>
            </Link>

            {isProjectRoute && (
              <Link
                to="/dashboard"
                className="hidden sm:inline-flex items-center gap-1 rounded-control px-2.5 py-1 text-sm font-semibold text-text-muted hover:bg-surface hover:text-text-main transition-colors"
              >
                ← Panel
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            {userEmail && (
              <span className="hidden sm:inline-flex items-center rounded-full bg-surface px-3 py-1 text-xs font-semibold text-text-muted border border-border">
                {userEmail}
              </span>
            )}
            <button
              type="button"
              onClick={() => void onSignOut()}
              disabled={isSigningOut}
              className="rounded-control border border-border bg-surface-card px-3 py-1.5 text-sm font-semibold text-text-main hover:bg-surface disabled:opacity-60 transition-colors"
            >
              Cerrar sesión
            </button>
          </div>
        </div>

        {signOutError && (
          <div className="mx-auto max-w-[1200px] px-4 pb-3 sm:px-6">
            <p
              role="alert"
              className="rounded-control bg-alert-late-soft px-3 py-2 text-sm font-semibold text-alert-late-text"
            >
              {signOutError}
            </p>
          </div>
        )}
      </header>

      <div className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
        {children}
      </div>
    </div>
  )
}
