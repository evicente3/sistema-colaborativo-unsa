import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

import { AppLayout } from './AppLayout'

describe('AppLayout', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
  })

  afterEach(async () => {
    await act(async () => {
      root.unmount()
    })
    container.remove()
  })

  it('renders brand title, children, and sign-out button', async () => {
    const onSignOut = vi.fn().mockResolvedValue(undefined)

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppLayout onSignOut={onSignOut} userEmail="ana@unsa.edu.pe">
            <div data-testid="child-content">Contenido</div>
          </AppLayout>
        </MemoryRouter>,
      )
    })

    expect(container.textContent).toContain('Tablero de grupos')
    expect(container.textContent).toContain('ana@unsa.edu.pe')
    expect(container.querySelector('[data-testid="child-content"]')).not.toBeNull()

    const signOutBtn = Array.from(container.querySelectorAll('button')).find(
      (btn) => btn.textContent === 'Cerrar sesión',
    )
    expect(signOutBtn).toBeDefined()

    await act(async () => {
      signOutBtn!.click()
    })
    expect(onSignOut).toHaveBeenCalledTimes(1)
  })

  it('shows sign-out error alert when signOutError is provided', async () => {
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AppLayout
            onSignOut={vi.fn()}
            signOutError="No se pudo cerrar sesión. Intenta de nuevo."
          >
            <div>Contenido</div>
          </AppLayout>
        </MemoryRouter>,
      )
    })

    const alert = container.querySelector('[role="alert"]')
    expect(alert?.textContent).toContain('No se pudo cerrar sesión. Intenta de nuevo.')
  })

  it('shows back-to-dashboard link in header when on a project route', async () => {
    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/projects/123']}>
          <AppLayout onSignOut={vi.fn()}>
            <div>Proyecto</div>
          </AppLayout>
        </MemoryRouter>,
      )
    })

    const backLink = container.querySelector('a[href="/dashboard"]')
    expect(backLink).not.toBeNull()
  })
})
