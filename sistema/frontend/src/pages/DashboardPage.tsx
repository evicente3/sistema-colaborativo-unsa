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
    <main data-testid="dashboard-page">
      <h1>Mis proyectos</h1>

      {isLoading && <p>Cargando proyectos...</p>}

      {!isLoading && errorMessage && (
        <div role="alert">
          <p>{errorMessage}</p>
          <button type="button" onClick={() => void loadProjects()}>
            Reintentar
          </button>
        </div>
      )}

      {!isLoading && !errorMessage && projects.length === 0 && (
        <p>Aún no perteneces a ningún proyecto.</p>
      )}

      {!isLoading && !errorMessage && projects.length > 0 && (
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              <Link to={`/projects/${project.id}`}>{project.name}</Link>
            </li>
          ))}
        </ul>
      )}

      <CreateOrJoinProject />
    </main>
  )
}
