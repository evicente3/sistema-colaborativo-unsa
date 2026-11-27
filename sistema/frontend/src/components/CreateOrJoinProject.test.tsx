import { act } from 'react'
import { createRoot, type Root } from 'react-dom/client'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

;(globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true

const { mockGetUser, mockProjectInsert, mockMemberInsert, mockRpc } = vi.hoisted(() => ({
  mockGetUser: vi.fn(),
  mockProjectInsert: vi.fn(),
  mockMemberInsert: vi.fn(),
  mockRpc: vi.fn(),
}))

vi.mock('../lib/supabaseClient', () => ({
  supabase: {
    auth: {
      getUser: mockGetUser,
    },
    rpc: mockRpc,
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
    mockRpc.mockReset()
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

describe('CreateOrJoinProject (Join)', () => {
  let container: HTMLDivElement
  let root: Root

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
    root = createRoot(container)
    mockRpc.mockReset()
  })

  afterEach(async () => {
    await act(async () => {
      root.unmount()
    })
    container.remove()
  })

  it('shows inline error for invalid UUID format before calling Supabase (E1)', async () => {
    await act(async () => {
      root.render(
        <MemoryRouter>
          <CreateOrJoinProject />
        </MemoryRouter>,
      )
    })

    const input = container.querySelector('input[name="inviteCode"]') as HTMLInputElement
    const form = input.closest('form')!

    await act(async () => {
      setInputValue(input, 'not-a-uuid')
    })
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })

    expect(container.querySelector('[role="alert"]')?.textContent).toBe(
      'Código de invitación no válido.',
    )
    expect(mockRpc).not.toHaveBeenCalled()
  })

  it('shows inline error when invite code does not exist (E1)', async () => {
    mockRpc.mockResolvedValueOnce({
      data: { status: 'not_found', project_id: null },
      error: null,
    })

    await act(async () => {
      root.render(
        <MemoryRouter>
          <CreateOrJoinProject />
        </MemoryRouter>,
      )
    })

    const input = container.querySelector('input[name="inviteCode"]') as HTMLInputElement
    const form = input.closest('form')!

    await act(async () => {
      setInputValue(input, '11111111-1111-4111-8111-111111111111')
    })
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })

    expect(mockRpc).toHaveBeenCalledWith('join_project_by_invite', {
      invite: '11111111-1111-4111-8111-111111111111',
    })
    expect(container.querySelector('[role="alert"]')?.textContent).toBe(
      'Código de invitación no válido.',
    )
  })

  it('shows an informative message on duplicate join without navigating (E2)', async () => {
    mockRpc.mockResolvedValueOnce({
      data: { status: 'already_member', project_id: 'proj-1' },
      error: null,
    })

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

    const input = container.querySelector('input[name="inviteCode"]') as HTMLInputElement
    const form = input.closest('form')!

    await act(async () => {
      setInputValue(input, '22222222-2222-4222-8222-222222222222')
    })
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })

    expect(container.querySelector('[role="status"]')?.textContent).toContain(
      'Ya eres miembro de este proyecto',
    )
    expect(container.querySelector('[data-testid="project-route"]')).toBeNull()
  })

  it('joins a project with valid invite code and navigates to /projects/:id (R6)', async () => {
    mockRpc.mockResolvedValueOnce({
      data: { status: 'joined', project_id: 'proj-123' },
      error: null,
    })

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

    const input = container.querySelector('input[name="inviteCode"]') as HTMLInputElement
    const form = input.closest('form')!

    await act(async () => {
      setInputValue(input, '33333333-3333-4333-8333-333333333333')
    })
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })

    expect(container.querySelector('[data-testid="project-route"]')).not.toBeNull()
  })

  it('shows a generic error message when RPC fails (E5)', async () => {
    mockRpc.mockResolvedValueOnce({
      data: null,
      error: { message: 'Network error' },
    })

    await act(async () => {
      root.render(
        <MemoryRouter>
          <CreateOrJoinProject />
        </MemoryRouter>,
      )
    })

    const input = container.querySelector('input[name="inviteCode"]') as HTMLInputElement
    const form = input.closest('form')!

    await act(async () => {
      setInputValue(input, '44444444-4444-4444-8444-444444444444')
    })
    await act(async () => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))
    })

    expect(container.querySelector('[role="alert"]')?.textContent).toContain(
      'No se pudo unir al proyecto',
    )
  })
})
