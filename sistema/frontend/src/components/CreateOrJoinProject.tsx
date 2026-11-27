import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabaseClient'

export function CreateOrJoinProject() {
  const navigate = useNavigate()
  const [projectName, setProjectName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

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

  return (
    <section aria-label="Crear o unirse a un proyecto">
      <div>
        <h2>Crear un proyecto</h2>
        <form onSubmit={handleCreateSubmit} noValidate>
          <label htmlFor="projectName">Nombre del proyecto</label>
          <input
            id="projectName"
            name="projectName"
            type="text"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
            placeholder="Ej. Trabajo de Investigación"
            disabled={isCreating}
          />
          <button type="submit" disabled={isCreating}>
            {isCreating ? 'Creando...' : 'Crear proyecto'}
          </button>
          {createError && <p role="alert">{createError}</p>}
        </form>
      </div>

      <div>
        <h2>Unirse a un proyecto</h2>
      </div>
    </section>
  )
}
