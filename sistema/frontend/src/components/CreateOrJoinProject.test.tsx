import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const { mockGetUser, mockProjectInsert, mockMemberInsert } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
  mockProjectInsert: vi.fn(),
  mockMemberInsert: vi.fn(),
}))

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: mockGetUser,
    },
    from: vi.fn((table: string) => {
      if (table === 'projects') {
        return { insert: mockProjectInsert }
      }
      if (table === 'project_members') {
        return { insert: mockMemberInsert }
      }
      return {}
    }),
  },
}))

import { CreateOrJoinProject } from './CreateOrJoinProject'

function setInputValue(input: HTMLInputElement, value: string) {
  const nativeSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value',
  )?.set
  nativeSetter?.call(input, value)
  input.dispatchEvent(new Event('input', { bubbles: true }))
}

describe('CreateOrJoinProject (Create)', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    mockGetUser.mockReset()
    mockProjectInsert.mockReset()
    mockMemberInsert.mockReset()
  })

  afterEach(async () => {
    await act(async () => {
      root.unmount()
    })
    container.remove()
  })

  it('rejects empty or whitespace-only project name before calling Supabase (E3)', async () => {
    await act(async () => {
      root.render(
        <MemoryRouter>
          <CreateOrJoinProject />
        </MemoryRouter>,
      )
    })

    const input = container.querySelector('input[name="projectName"]') as HTMLInputElement
    const form = input.closest('form')!

    setInputValue(input, '   ')
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })

    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      'Ingresa un nombre para el proyecto',
    )
    expect(mockProjectInsert).not.toHaveBeenCalled()
  })

  it('creates a project, adds creator as member, and navigates to /projects/:id (R5)', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user-1' } } })
    mockProjectInsert.mockResolvedValueOnce({ error: null })
    mockMemberInsert.mockResolvedValueOnce({ error: null })

    await act(async () => {
      root.render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <Routes>
            <Route path="/dashboard" element={<CreateOrJoinProject />} />
            <Route
              path="/projects/:projectId"
              element={<div data-testid="project-route">Project Page</div>}
            />
          </Routes>
        </MemoryRouter>,
      )
    })

    const input = container.querySelector('input[name="projectName"]') as HTMLInputElement
    const form = input.closest('form')!

    await act(async () => {
      setInputValue(input, 'Proyecto Nuevo')
    })
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })

    expect(mockProjectInsert).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'Proyecto Nuevo' }),
    )
    expect(mockMemberInsert).toHaveBeenCalledWith(
      expect.objectContaining({ user_id: 'user-1' }),
    )
    expect(container.querySelector('[data-testid="project-route"]')).not.toBeNull()
  })

  it('shows a generic error message when Supabase insert fails (E5)', async () => {
    mockGetUser.mockResolvedValueOnce({ data: { user: { id: 'user-1' } } })
    mockProjectInsert.mockResolvedValueOnce({ error: { message: 'Network error' } })

    await act(async () => {
      root.render(
        <MemoryRouter>
          <CreateOrJoinProject />
        </MemoryRouter>,
      )
    })

    const input = container.querySelector('input[name="projectName"]') as HTMLInputElement
    const form = input.closest('form')!

    await act(async () => {
      setInputValue(input, 'Proyecto Fallido')
    })
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })

    expect(container.querySelector('[role="alert"]')).not.toBeNull()
    expect(mockMemberInsert).not.toHaveBeenCalled()
  })
})
