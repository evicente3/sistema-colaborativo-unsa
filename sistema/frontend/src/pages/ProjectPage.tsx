import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

interface ProjectDetails {
  id: string
  name: string
  invite_code: string
}

interface ProjectMember {
  user_id: string
  email: string | null
  full_name: string | null
  avatar_url: string | null
  joined_at: string
}

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>()
  const [project, setProject] = useState<ProjectDetails | null>(null)
  const [members, setMembers] = useState<ProjectMember[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [copiedCode, setCopiedCode] = useState(false)

  const loadProject = useCallback(async () => {
    if (!projectId) {
      setIsLoading(false)
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    try {
      const [projectResult, membersResult] = await Promise.all([
        supabase
          .from('projects')
          .select('id, name, invite_code')
          .eq('id', projectId)
          .maybeSingle(),
        supabase.rpc('get_project_members', { p_project_id: projectId }),
      ])

      if (projectResult.error) {
        setErrorMessage('No se pudo cargar el proyecto. Intenta de nuevo.')
        return
      }

      if (!projectResult.data) {
        setProject(null)
        setMembers([])
        return
      }

      if (membersResult.error) {
        setErrorMessage('No se pudo cargar el proyecto. Intenta de nuevo.')
        return
      }

      setProject(projectResult.data)
      setMembers((membersResult.data as ProjectMember[] | null) ?? [])
    } catch {
      setErrorMessage('No se pudo cargar el proyecto. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }, [projectId])

  useEffect(() => {
    void loadProject()
  }, [loadProject])

  const handleCopyInviteCode = async () => {
    if (!project) return
    try {
      await navigator.clipboard?.writeText(project.invite_code)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2000)
    } catch {
      setCopiedCode(false)
    }
  }

  if (isLoading) {
    return (
      <main data-testid="project-page">
        <div className="rounded-card border border-border bg-surface-card p-6 text-sm font-semibold text-text-muted shadow-card">
          Cargando proyecto...
        </div>
      </main>
    )
  }

  if (errorMessage) {
    return (
      <main data-testid="project-page" className="space-y-4">
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-alert-late/25 bg-alert-late-soft p-4 text-alert-late-text"
        >
          <p className="text-sm font-semibold">{errorMessage}</p>
          <button
            type="button"
            onClick={() => void loadProject()}
            className="rounded-control border border-alert-late/30 bg-surface-card px-3 py-1.5 text-sm font-semibold text-alert-late-text hover:bg-white transition-colors"
          >
            Reintentar
          </button>
        </div>
        <Link
          to="/dashboard"
          className="inline-flex items-center text-sm font-semibold text-primary hover:underline"
        >
          ← Volver al panel
        </Link>
      </main>
    )
  }

  if (!project) {
    return (
      <main data-testid="project-page" className="space-y-4">
        <div className="rounded-card border border-border bg-surface-card p-6 shadow-card">
          <p className="text-base font-semibold text-text-main">
            Proyecto no encontrado.
          </p>
          <Link
            to="/dashboard"
            className="mt-3 inline-flex items-center text-sm font-semibold text-primary hover:underline"
          >
            ← Volver al panel
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main data-testid="project-page" className="space-y-6">
      <nav aria-label="Navegación del proyecto">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-text-muted hover:text-primary transition-colors"
        >
          ← Volver al panel
        </Link>
      </nav>

      <header className="rounded-card border border-border bg-surface-card p-6 shadow-card space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <h1 className="break-words text-2xl font-bold text-text-main">
            {project.name}
          </h1>

          <div className="flex flex-wrap items-center gap-2 rounded-control border border-border bg-surface px-3 py-2">
            <span className="text-xs font-semibold text-text-muted">
              Código de invitación:
            </span>
            <code className="break-all text-xs font-semibold text-text-main">
              {project.invite_code}
            </code>
            <button
              type="button"
              onClick={() => void handleCopyInviteCode()}
              className="rounded-control bg-status-progress-soft px-2.5 py-1 text-xs font-semibold text-status-progress-text hover:bg-primary hover:text-on-primary transition-colors"
            >
              {copiedCode ? '¡Copiado!' : 'Copiar'}
            </button>
          </div>
        </div>

        <section aria-label="Miembros del proyecto" className="border-t border-border pt-4">
          <h2 className="mb-3 text-sm font-bold text-text-main">
            Miembros ({members.length})
          </h2>
          <ul className="flex flex-wrap gap-2.5">
            {members.map((member) => {
              const displayName = member.full_name ?? member.email ?? 'Miembro'
              const initial = displayName.charAt(0).toUpperCase()
              return (
                <li
                  key={member.user_id}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-main"
                >
                  {member.avatar_url ? (
                    <img
                      src={member.avatar_url}
                      alt={displayName}
                      width={24}
                      height={24}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-status-progress-soft text-xs font-bold text-status-progress-text"
                    >
                      {initial}
                    </span>
                  )}
                  <span>{displayName}</span>
                  {member.full_name && member.email && (
                    <span className="hidden sm:inline text-text-muted font-normal">
                      ({member.email})
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </section>
      </header>

      <section
        aria-label="Tablero de tareas"
        className="rounded-card border border-dashed border-border bg-surface-card p-6 text-center shadow-card sm:p-10"
      >
        <p className="text-base font-bold text-text-main">
          Tablero del proyecto
        </p>
        <p className="mt-1 text-sm text-text-muted">
          Aquí aparecerán las tareas del grupo organizadas por columnas.
        </p>
      </section>
    </main>
  )
}
