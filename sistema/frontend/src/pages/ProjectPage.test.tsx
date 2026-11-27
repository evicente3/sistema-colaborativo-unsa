import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const { mockProjectMaybeSingle, mockRpc } = vi.hoisted(() => ({
  mockProjectMaybeSingle: vi.fn(),
  mockRpc: vi.fn(),
}))

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    from: vi.fn((table: string) => {
      if (table === 'projects') {
        return {
          select: vi.fn(() => ({
            eq: vi.fn(() => ({
              maybeSingle: mockProjectMaybeSingle,
            })),
          })),
        }
      }
      return {}
    }),
    rpc: mockRpc,
  },
}))

import { ProjectPage } from './ProjectPage'

describe('ProjectPage', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    mockProjectMaybeSingle.mockReset()
    mockRpc.mockReset()
  })

  afterEach(async () => {
    await act(async () => {
      root.unmount()
    })
    container.remove()
  })

  it('renders project name, invite code, and member list (R7)', async () => {
    mockProjectMaybeSingle.mockResolvedValueOnce({
      data: {
        id: 'proj-1',
        name: 'Tesis UNSA',
        invite_code: '550e8400-e29b-41d4-a716-446655440000',
      },
      error: null,
    })
    mockRpc.mockResolvedValueOnce({
      data: [
        {
          user_id: 'user-1',
          email: 'ana@unsa.edu.pe',
          full_name: 'Ana Quispe',
          avatar_url: 'https://example.com/ana.png',
          joined_at: '2026-11-26T00:00:00Z',
        },
        {
          user_id: 'user-2',
          email: 'luis@unsa.edu.pe',
          full_name: null,
          avatar_url: null,
          joined_at: '2026-11-26T01:00:00Z',
        },
      ],
      error: null,
    })

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/projects/proj-1']}>
          <Routes>
            <Route path="/projects/:projectId" element={<ProjectPage />} />
          </Routes>
        </MemoryRouter>,
      )
    })

    expect(container.querySelector('h1')?.textContent).toBe('Tesis UNSA')
    expect(container.textContent).toContain('550e8400-e29b-41d4-a716-446655440000')
    expect(container.textContent).toContain('Ana Quispe')
    expect(container.textContent).toContain('ana@unsa.edu.pe')
    expect(container.textContent).toContain('luis@unsa.edu.pe')

    const avatar = container.querySelector('img') as HTMLImageElement | null
    expect(avatar?.src).toBe('https://example.com/ana.png')
    expect(mockRpc).toHaveBeenCalledWith('get_project_members', {
      p_project_id: 'proj-1',
    })
  })

  it('shows an error message when loading project fails (E5)', async () => {
    mockProjectMaybeSingle.mockResolvedValueOnce({
      data: null,
      error: { message: 'Network error' },
    })
    mockRpc.mockResolvedValueOnce({ data: [], error: null })

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/projects/proj-1']}>
          <Routes>
            <Route path="/projects/:projectId" element={<ProjectPage />} />
          </Routes>
        </MemoryRouter>,
      )
    })

    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      'No se pudo cargar el proyecto',
    )
  })

  it('shows a not-found message when project does not exist or user lacks access', async () => {
    mockProjectMaybeSingle.mockResolvedValueOnce({
      data: null,
      error: null,
    })
    mockRpc.mockResolvedValueOnce({ data: [], error: null })

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/projects/missing']}>
          <Routes>
            <Route path="/projects/:projectId" element={<ProjectPage />} />
          </Routes>
        </MemoryRouter>,
      )
    })

    expect(container.textContent).toContain('Proyecto no encontrado')
  })
})
