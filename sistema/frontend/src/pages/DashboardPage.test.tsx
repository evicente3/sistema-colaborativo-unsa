import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const { mockOrder } = vi.hoisted(() => ({
  mockOrder: vi.fn(),
}))

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        order: mockOrder,
      })),
    })),
  },
}))

import { DashboardPage } from './DashboardPage'

describe('DashboardPage', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    mockOrder.mockReset()
  })

  afterEach(async () => {
    await act(async () => {
      root.unmount()
    })
    container.remove()
  })

  it('shows the empty state and combined prompt when the user has no projects', async () => {
    mockOrder.mockResolvedValueOnce({ data: [], error: null })

    await act(async () => {
      root.render(
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>,
      )
    })

    expect(container.textContent).toContain('Aún no perteneces a ningún proyecto')
    expect(container.textContent).toContain('Crear un proyecto')
    expect(container.textContent).toContain('Unirse a un proyecto')
  })

  it('renders the list of projects and combined prompt when projects exist', async () => {
    mockOrder.mockResolvedValueOnce({
      data: [
        { id: 'proj-1', name: 'Proyecto Alfa', invite_code: 'code-1', created_at: '2026-11-26T00:00:00Z' },
        { id: 'proj-2', name: 'Grupo Cálculo', invite_code: 'code-2', created_at: '2026-11-25T00:00:00Z' },
      ],
      error: null,
    })

    await act(async () => {
      root.render(
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>,
      )
    })

    expect(container.textContent).toContain('Proyecto Alfa')
    expect(container.textContent).toContain('Grupo Cálculo')
    expect(container.textContent).toContain('Crear un proyecto')
    expect(container.textContent).toContain('Unirse a un proyecto')
  })

  it('shows an error message and retry button when loading projects fails', async () => {
    mockOrder.mockResolvedValueOnce({
      data: null,
      error: { message: 'Network error' },
    })

    await act(async () => {
      root.render(
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>,
      )
    })

    expect(container.querySelector('[role="alert"]')).not.toBeNull()
    expect(container.textContent).toContain('Reintentar')
  })
})
