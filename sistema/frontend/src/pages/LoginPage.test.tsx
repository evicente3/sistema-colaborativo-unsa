import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const { mockSignInWithOAuth } = vi.hoisted(() => ({
  mockSignInWithOAuth: vi.fn(),
}))

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      signInWithOAuth: mockSignInWithOAuth,
    },
  },
}))

import { LoginPage } from './LoginPage'

describe('LoginPage', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    mockSignInWithOAuth.mockReset()
  })

  afterEach(async () => {
    await act(async () => {
      root.unmount()
    })
    container.remove()
  })

  it('renders the Spanish Google sign-in button', async () => {
    await act(async () => {
      root.render(<LoginPage />)
    })

    const button = container.querySelector('button')
    expect(button).not.toBeNull()
    expect(button?.textContent).toContain('Iniciar sesión con Google')
  })

  it('calls signInWithOAuth with google provider and stays silent when cancelled', async () => {
    mockSignInWithOAuth.mockResolvedValueOnce({
      data: { provider: 'google', url: null },
      error: { message: 'popup_closed_by_user' },
    })

    await act(async () => {
      root.render(<LoginPage />)
    })

    const button = container.querySelector('button')!
    await act(async () => {
      button.click()
    })

    expect(mockSignInWithOAuth).toHaveBeenCalledWith({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    })
    // Silent cancel: no error alert should be shown, button stays enabled.
    expect(container.querySelector('[role="alert"]')).toBeNull()
    expect(button.disabled).toBe(false)
  })

  it('shows a generic error message when signInWithOAuth fails with a network error', async () => {
    mockSignInWithOAuth.mockResolvedValueOnce({
      data: { provider: 'google', url: null },
      error: { message: 'Network request failed' },
    })

    await act(async () => {
      root.render(<LoginPage />)
    })

    const button = container.querySelector('button')!
    await act(async () => {
      button.click()
    })

    const alert = container.querySelector('[role="alert"]')
    expect(alert).not.toBeNull()
    expect(button.disabled).toBe(false)
  })
})
