import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const CANCELLED_ERROR_CODES = ['popup_closed_by_user', 'access_denied', 'cancelled']

function isCancelledAuthError(message: string): boolean {
  const normalized = message.toLowerCase()
  return CANCELLED_ERROR_CODES.some((code) => normalized.includes(code))
}

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleGoogleSignIn() {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      })

      if (error && !isCancelledAuthError(error.message)) {
        setErrorMessage('No se pudo iniciar sesión. Intenta de nuevo.')
      }
    } catch {
      setErrorMessage('No se pudo iniciar sesión. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-surface px-4 py-12">
      <div className="w-full max-w-md rounded-card border border-border bg-surface-card p-6 shadow-card sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 items-center justify-center rounded-control bg-primary text-base font-bold text-on-primary"
          >
            TG
          </span>
          <div>
            <h1 className="text-2xl font-bold leading-tight text-text-main">
              Tablero de grupos
            </h1>
            <p className="text-xs font-semibold text-text-muted">
              Sistema Colaborativo UNSA
            </p>
          </div>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-text-muted">
          Inicia sesión para organizar y seguir el trabajo de tu grupo.
        </p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          className="flex w-full items-center justify-center gap-2.5 rounded-control bg-primary px-4 py-3 text-sm font-semibold text-on-primary transition-opacity hover:opacity-95 disabled:opacity-60"
        >
          <svg
            aria-hidden="true"
            className="h-4 w-4 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10 5.35 0 9.25-3.67 9.25-9.09 0-1.15-.15-1.81-.15-1.81Z" />
          </svg>
          <span>{isLoading ? 'Conectando...' : 'Iniciar sesión con Google'}</span>
        </button>

        {errorMessage && (
          <p
            role="alert"
            className="mt-4 rounded-control bg-alert-late-soft px-3 py-2 text-sm font-semibold text-alert-late-text"
          >
            {errorMessage}
          </p>
        )}
      </div>
    </main>
  )
}
