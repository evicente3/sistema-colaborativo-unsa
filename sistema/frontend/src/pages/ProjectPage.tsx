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

  if (isLoading) {
    return (
      <main data-testid="project-page">
        <p>Cargando proyecto...</p>
      </main>
    )
  }

  if (errorMessage) {
    return (
      <main data-testid="project-page">
        <div role="alert">
          <p>{errorMessage}</p>
          <button type="button" onClick={() => void loadProject()}>
            Reintentar
          </button>
        </div>
        <Link to="/dashboard">Volver al panel</Link>
      </main>
    )
  }

  if (!project) {
    return (
      <main data-testid="project-page">
        <p>Proyecto no encontrado.</p>
        <Link to="/dashboard">Volver al panel</Link>
      </main>
    )
  }

  return (
    <main data-testid="project-page">
      <nav>
        <Link to="/dashboard">Volver al panel</Link>
      </nav>

      <h1>{project.name}</h1>
      <p>
        Código de invitación: <code>{project.invite_code}</code>
      </p>

      <section aria-label="Miembros del proyecto">
        <h2>Miembros</h2>
        <ul>
          {members.map((member) => {
            const displayName = member.full_name ?? member.email ?? 'Miembro'
            return (
              <li key={member.user_id}>
                {member.avatar_url && (
                  <img
                    src={member.avatar_url}
                    alt={displayName}
                    width={32}
                    height={32}
                  />
                )}
                <span>{displayName}</span>
                {member.full_name && member.email && <span> ({member.email})</span>}
              </li>
            )
          })}
        </ul>
      </section>
    </main>
  )
}
