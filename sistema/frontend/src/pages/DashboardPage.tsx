import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CreateOrJoinProject } from '../components/CreateOrJoinProject'
import { supabase } from '../lib/supabaseClient'

export interface ProjectSummary {
  id: string
  name: string
  invite_code: string
  created_at: string
}

export function DashboardPage() {
  const [projects, setProjects] = useState<ProjectSummary[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const loadProjects = useCallback(async () => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, invite_code, created_at')
        .order('created_at', { ascending: false })

      if (error) {
        setErrorMessage('No se pudieron cargar tus proyectos. Intenta de nuevo.')
        return
      }

      setProjects(data ?? [])
    } catch {
      setErrorMessage('No se pudieron cargar tus proyectos. Intenta de nuevo.')
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void loadProjects()
  }, [loadProjects])

  return (
    <main data-testid="dashboard-page" className="space-y-8">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold text-text-main">Mis proyectos</h1>
        <p className="text-sm text-text-muted">
          Entra a un espacio compartido o crea uno nuevo para tu grupo.
        </p>
      </div>

      {isLoading && (
        <div className="rounded-card border border-border bg-surface-card p-6 text-sm font-semibold text-text-muted shadow-card">
          Cargando proyectos...
        </div>
      )}

      {!isLoading && errorMessage && (
        <div
          role="alert"
          className="flex flex-wrap items-center justify-between gap-3 rounded-card border border-alert-late/25 bg-alert-late-soft p-4 text-alert-late-text"
        >
          <p className="text-sm font-semibold">{errorMessage}</p>
          <button
            type="button"
            onClick={() => void loadProjects()}
            className="rounded-control bg-surface-card px-3 py-1.5 text-sm font-semibold text-alert-late-text border border-alert-late/30 hover:bg-white transition-colors"
          >
            Reintentar
          </button>
        </div>
      )}

      {!isLoading && !errorMessage && projects.length === 0 && (
        <div className="rounded-card border border-dashed border-border bg-surface-card p-6 text-center shadow-card sm:p-8">
          <p className="text-base font-semibold text-text-main">
            Aún no perteneces a ningún proyecto.
          </p>
          <p className="mt-1 text-sm text-text-muted">
            Crea un proyecto nuevo o únete con un código de invitación abajo.
          </p>
        </div>
      )}

      {!isLoading && !errorMessage && projects.length > 0 && (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <li key={project.id}>
              <Link
                to={`/projects/${project.id}`}
                className="group flex h-full flex-col justify-between rounded-card border border-border bg-surface-card p-5 shadow-card transition-colors hover:border-primary"
              >
                <span className="break-words text-lg font-bold text-text-main group-hover:text-primary transition-colors">
                  {project.name}
                </span>
                <span className="mt-4 inline-flex items-center text-xs font-semibold text-primary">
                  Abrir tablero →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <CreateOrJoinProject />
    </main>
  )
}
