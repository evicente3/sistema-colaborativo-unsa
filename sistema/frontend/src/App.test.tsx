import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const { mockGetSession, mockOnAuthStateChange, mockUnsubscribe, mockSignOut } = vi.hoisted(() => ({
  mockGetSession: vi.fn(),
  mockOnAuthStateChange: vi.fn(),
  mockUnsubscribe: vi.fn(),
  mockSignOut: vi.fn(),
}))

vi.mock('./lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: mockGetSession,
      onAuthStateChange: mockOnAuthStateChange,
      signInWithOAuth: vi.fn(),
      signOut: mockSignOut,
    },
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: vi.fn().mockResolvedValue({ data: [], error: null }),
      })),
    })),
  },
}))

import { AppRoutes } from './App'

describe('AppRoutes auth guard', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    mockGetSession.mockReset()
    mockOnAuthStateChange.mockReset()
    mockUnsubscribe.mockReset()
    mockSignOut.mockReset()
    mockOnAuthStateChange.mockReturnValue({
      data: { subscription: { unsubscribe: mockUnsubscribe } },
    })
  })

  afterEach(async () => {
    await act(async () => {
      root.unmount()
    })
    container.remove()
  })

  it('redirects an unauthenticated user from a protected route to /login', async () => {
    mockGetSession.mockResolvedValueOnce({ data: { session: null } })

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppRoutes />
        </MemoryRouter>,
      )
    })

    expect(container.textContent).toContain('Iniciar sesión con Google')
  })

  it('redirects an authenticated user from / to /dashboard', async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: { id: 'user-1', email: 'ana@unsa.edu.pe' } } },
    })

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/']}>
          <AppRoutes />
        </MemoryRouter>,
      )
    })

    expect(container.querySelector('[data-testid="dashboard-page"]')).not.toBeNull()
  })

  it('redirects an authenticated user from /login to /dashboard', async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: { id: 'user-1', email: 'ana@unsa.edu.pe' } } },
    })

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/login']}>
          <AppRoutes />
        </MemoryRouter>,
      )
    })

    expect(container.querySelector('[data-testid="dashboard-page"]')).not.toBeNull()
  })

  it('signs out, clears session, and redirects to /login when clicking Cerrar sesión', async () => {
    let authCallback: ((event: string, session: unknown) => void) | undefined
    mockOnAuthStateChange.mockImplementation((cb: (event: string, session: unknown) => void) => {
      authCallback = cb
      return { data: { subscription: { unsubscribe: mockUnsubscribe } } }
    })
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: { id: 'user-1', email: 'ana@unsa.edu.pe' } } },
    })
    mockSignOut.mockImplementationOnce(async () => {
      authCallback?.('SIGNED_OUT', null)
      return { error: null }
    })

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppRoutes />
        </MemoryRouter>,
      )
    })

    const signOutButton = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent === 'Cerrar sesión',
    )
    expect(signOutButton).toBeDefined()

    await act(async () => {
      signOutButton!.click()
    })

    expect(mockSignOut).toHaveBeenCalledTimes(1)
    expect(container.textContent).toContain('Iniciar sesión con Google')
  })

  it('shows an error message if sign-out fails', async () => {
    mockGetSession.mockResolvedValueOnce({
      data: { session: { user: { id: 'user-1', email: 'ana@unsa.edu.pe' } } },
    })
    mockSignOut.mockResolvedValueOnce({ error: { message: 'Network error' } })

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppRoutes />
        </MemoryRouter>,
      )
    })

    const signOutButton = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent === 'Cerrar sesión',
    )
    expect(signOutButton).toBeDefined()

    await act(async () => {
      signOutButton!.click()
    })

    expect(mockSignOut).toHaveBeenCalledTimes(1)
    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      'No se pudo cerrar sesión',
    )
    expect(container.querySelector('[data-testid="dashboard-page"]')).not.toBeNull()
  })
})
