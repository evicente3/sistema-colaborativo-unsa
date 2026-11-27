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
    <main>
      <h1>Sistema Colaborativo UNSA</h1>
      <p>Inicia sesión para organizar y seguir el trabajo de tu grupo.</p>

      <button
        type="button"
        onClick={handleGoogleSignIn}
        disabled={isLoading}
      >
        {isLoading ? 'Conectando...' : 'Iniciar sesión con Google'}
      </button>

      {errorMessage && <p role="alert">{errorMessage}</p>}
    </main>
  )
}
