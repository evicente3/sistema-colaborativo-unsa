import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

const UUID_REGEX =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

type JoinProjectResult = {
  status: 'joined' | 'already_member' | 'not_found'
  project_id: string | null
}

export function CreateOrJoinProject() {
  const navigate = useNavigate()
  const [projectName, setProjectName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  const [inviteCode, setInviteCode] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [joinError, setJoinError] = useState<string | null>(null)
  const [joinInfo, setJoinInfo] = useState<string | null>(null)

  async function handleCreateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedName = projectName.trim()
    if (!trimmedName) {
      setCreateError('Ingresa un nombre para el proyecto.')
      return
    }

    setIsCreating(true)
    setCreateError(null)

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setCreateError('No se pudo verificar tu sesión. Intenta de nuevo.')
        return
      }

      // Generate the project UUID client-side so we don't need INSERT ... RETURNING,
      // which would trigger the SELECT RLS policy before the creator is in project_members.
      const projectId = crypto.randomUUID()

      const { error: projectError } = await supabase
        .from('projects')
        .insert({ id: projectId, name: trimmedName })

      if (projectError) {
        setCreateError('No se pudo crear el proyecto. Intenta de nuevo.')
        return
      }

      const { error: memberError } = await supabase
        .from('project_members')
        .insert({ project_id: projectId, user_id: user.id })

      if (memberError) {
        setCreateError('No se pudo crear el proyecto. Intenta de nuevo.')
        return
      }

      navigate(`/projects/${projectId}`)
    } catch {
      setCreateError('No se pudo crear el proyecto. Intenta de nuevo.')
    } finally {
      setIsCreating(false)
    }
  }

  async function handleJoinSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedCode = inviteCode.trim()
    setJoinError(null)
    setJoinInfo(null)

    if (!UUID_REGEX.test(trimmedCode)) {
      setJoinError('Código de invitación no válido.')
      return
    }

    setIsJoining(true)

    try {
      const { data, error } = await supabase.rpc('join_project_by_invite', {
        invite: trimmedCode,
      })

      if (error) {
        setJoinError('No se pudo unir al proyecto. Intenta de nuevo.')
        return
      }

      const result = data as JoinProjectResult | null

      if (!result || result.status === 'not_found' || !result.project_id) {
        setJoinError('Código de invitación no válido.')
        return
      }

      if (result.status === 'already_member') {
        setJoinInfo('Ya eres miembro de este proyecto.')
        return
      }

      navigate(`/projects/${result.project_id}`)
    } catch {
      setJoinError('No se pudo unir al proyecto. Intenta de nuevo.')
    } finally {
      setIsJoining(false)
    }
  }

  return (
    <section
      aria-label="Crear o unirse a un proyecto"
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
    >
      <div className="rounded-card border border-border bg-surface-card p-6 shadow-card">
        <h2 className="text-lg font-bold text-text-main">Crear un proyecto</h2>
        <p className="mt-1 text-sm text-text-muted">
          Inicia un nuevo espacio y comparte el código con tu grupo.
        </p>
        <form onSubmit={handleCreateSubmit} noValidate className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="projectName"
              className="block text-sm font-semibold text-text-main"
            >
              Nombre del proyecto
            </label>
            <input
              id="projectName"
              name="projectName"
              type="text"
              value={projectName}
              onChange={(event) => setProjectName(event.target.value)}
              placeholder="Ej. Trabajo de Investigación"
              disabled={isCreating}
              className="w-full rounded-control border border-border bg-surface-card px-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={isCreating}
            className="w-full rounded-control bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary transition-opacity hover:opacity-95 disabled:opacity-60 sm:w-auto"
          >
            {isCreating ? 'Creando...' : 'Crear proyecto'}
          </button>
          {createError && (
            <p
              role="alert"
              className="rounded-control bg-alert-late-soft px-3 py-2 text-sm font-semibold text-alert-late-text"
            >
              {createError}
            </p>
          )}
        </form>
      </div>

      <div className="rounded-card border border-border bg-surface-card p-6 shadow-card">
        <h2 className="text-lg font-bold text-text-main">Unirse a un proyecto</h2>
        <p className="mt-1 text-sm text-text-muted">
          Ingresa el código de invitación que te compartió tu equipo.
        </p>
        <form onSubmit={handleJoinSubmit} noValidate className="mt-4 space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="inviteCode"
              className="block text-sm font-semibold text-text-main"
            >
              Código de invitación
            </label>
            <input
              id="inviteCode"
              name="inviteCode"
              type="text"
              value={inviteCode}
              onChange={(event) => setInviteCode(event.target.value)}
              placeholder="Ej. 550e8400-e29b-41d4-a716-446655440000"
              disabled={isJoining}
              className="w-full rounded-control border border-border bg-surface-card px-3 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-60"
            />
          </div>
          <button
            type="submit"
            disabled={isJoining}
            className="w-full rounded-control border border-primary/30 bg-status-progress-soft px-4 py-2.5 text-sm font-semibold text-status-progress-text transition-colors hover:bg-primary hover:text-on-primary disabled:opacity-60 sm:w-auto"
          >
            {isJoining ? 'Uniéndose...' : 'Unirse al proyecto'}
          </button>
          {joinError && (
            <p
              role="alert"
              className="rounded-control bg-alert-late-soft px-3 py-2 text-sm font-semibold text-alert-late-text"
            >
              {joinError}
            </p>
          )}
          {joinInfo && (
            <p
              role="status"
              className="rounded-control bg-status-progress-soft px-3 py-2 text-sm font-semibold text-status-progress-text"
            >
              {joinInfo}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
