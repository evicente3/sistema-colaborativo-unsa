# VISION — Sistema de Gestión y Seguimiento de Tareas para Trabajos Colaborativos

> Documento de referencia personal y contexto para agentes. No forma parte del flujo oficial SDD: la constitución toma de aquí solo lo que le corresponde (principios, restricciones, stack). Nombre comercial de la app: pendiente.
> Fuente: `secciones_articulo_corregidas.md`. Fecha límite del proyecto: **7 de diciembre de 2026, 23:59 (hora de Perú)**.
> Identidad visual y componentes de interfaz: ver `DESIGN.md`.

## 1. Resumen

Aplicación web flexible, usable tanto en escritorio como en pantallas de celular, para organizar y dar seguimiento al trabajo de un grupo pequeño. Cada tarea tiene responsable, plazo, estado y dependencias; el sistema bloquea las tareas que dependen de otras no terminadas y avisa cuando un retraso puede afectar al resto del trabajo.

## 2. Problema

La coordinación grupal se debilita cuando no hay estructura formal ni visibilidad de prioridades y compromisos: roles ambiguos, conflictos de prioridad y retrasos que nadie mitiga. Si además se coordina por mensajería informal, la información crítica se dispersa y las instrucciones ambiguas generan malentendidos.

## 3. Público objetivo

Cualquier grupo pequeño que comparte un objetivo y coordina actividades: equipos de estudio, voluntariado, organización de eventos, emprendimiento, trabajo profesional.

- La app es **general**: no se especializa en ningún dominio (ni educativo ni legal ni otro).
- La evidencia proviene del ámbito universitario; la aplicabilidad a otros dominios es una **hipótesis de diseño**, no se evalúa por separado.

## 4. Diferenciador frente a Trello / Jira

- Kanban **integrado con precedencia**: una tarea con predecesoras sin terminar queda **bloqueada** automáticamente.
- Alertas de retraso calculadas según su **impacto en las tareas dependientes**.
- **Arranque guiado** con un flujo de 15 actividades como guía opcional (cada grupo omite lo que no necesite).
- Simple y sin costo: no requiere conocimientos técnicos.

## 5. Principios de producto

- Simplicidad sobre completitud; lenguaje neutral y general.
- Transparencia y equidad en el reparto de la carga.
- El flujo guiado orienta, no obliga.
- El reporte de aportes es solo para el grupo (no se comparte con docentes ni terceros) para no afectar la cohesión.

## 6. Funciones del MVP y prioridad

Prioridades propuestas (ajustables): **Esencial** = sin esto no hay prototipo; **Deseable** = entra si el tiempo lo permite; **Opcional** = primero en recortarse.

| Función | Prioridad |
|---|---|
| Acceso con cuenta de Google | Esencial |
| Crear proyecto y unirse por código o enlace de invitación | Esencial |
| Tareas con responsable, plazo y estado | Esencial |
| Precedencia entre tareas, detección de ciclos y bloqueo automático | Esencial |
| Tablero Kanban (vista principal, usable en celular) | Esencial |
| Alertas al ingresar: tareas por vencer/vencidas y retrasadas que bloquean a otras | Esencial |
| Notas de estado al pedir apoyo o modificar un plazo | Deseable |
| Ruta crítica | Deseable |
| Objetivo del proyecto; cierre del proyecto con resumen de aportes (solo para el grupo) | Deseable |
| Alerta de acumulación excesiva en una columna | Deseable |
| Alerta de desbalance de carga entre integrantes | Opcional |
| Cronograma (mini Gantt) resumido, solo lectura, para tareas con precedencia (barras calculadas a partir de los plazos; ver §11) | Opcional |

## 7. Fuera de alcance

Mensajería o comentarios libres, archivos adjuntos, notificaciones externas o programadas, videoconferencia, integración con plataformas de mensajería, aplicación móvil nativa y funciones específicas de un dominio profesional.

## 8. Reglas de dominio

- Una tarea con predecesoras no terminadas está **bloqueada**.
- No se permiten dependencias que formen **ciclos**.
- Las tareas con precedencia determinan una **ruta crítica** (secuencia cuyo retraso retrasa todo el trabajo).
- Las alertas se **calculan al ingresar** y se muestran **dentro de la app** (sin tareas programadas). Tipos: por vencer o vencidas; retrasadas que bloquean a otras; acumulación en una columna; desbalance de carga.
- El **estado** guardado de una tarea es uno de tres: pendiente, en progreso o completada. "Bloqueada" **no es un estado guardado**: se calcula a partir de las predecesoras no terminadas.
- "Necesito ayuda" es una **marca** sobre una tarea en progreso, con una nota breve del responsable (la nota entra con "Notas de estado", función Deseable).

## 9. Flujo guía de 15 actividades

- **Planificación (1–8):** inicio formal, creación e invitación, registro de integrantes, acuerdos y objetivos, división en tareas, asignación de responsables, plazos, dependencias y organización en el tablero.
- **Ejecución y seguimiento (9–11):** ejecución, actualización de estado, revisión continua con alertas y solicitud de apoyo.
- **Control y cierre (12–15):** evaluación de retrasos, reorganización y reasignación, revisión final, cierre con resumen de aportes.

**Cobertura del MVP:** completas 2, 3 y 5 a 13. Soporte básico en 1, 4, 14 y 15 (campo de objetivo del proyecto, cierre del proyecto, resumen de tareas completadas por integrante).

## 9.1 Stack y arquitectura (decidido)

- **Interfaz:** React con TypeScript, web adaptable a celular y escritorio.
- **Backend y datos:** Supabase (PostgreSQL, autenticación con Google, reglas de acceso por fila).
- **Lógica de dominio:** módulo **independiente de la interfaz y de la base de datos** que calcula bloqueos, ruta crítica y alertas; con pruebas unitarias.
- **Herramientas:** Git/GitHub, Draw.io para modelado, agentes de IA bajo SDD.

## 10. Criterios de éxito y plazos

- Prototipo funcional con el alcance de la sección 6.
- Evaluación con **al menos 10 usuarios** mediante **SUS**, contrastando contra la referencia de **68 puntos**.
- Casos de prueba funcionales y pruebas unitarias de la lógica de dominio.
- Resultados exploratorios: la muestra es pequeña y no permite afirmar un efecto estadístico sobre la reducción de retrasos.

| Hito | Plazo |
|---|---|
| Requisitos, modelo funcional y arquitectura (Etapa I) | 25–26 de noviembre |
| Implementación del prototipo (Etapa II) | 27 de noviembre – 3 de diciembre |
| Pruebas y evaluación con usuarios (SUS) | 4–5 de diciembre |
| Análisis de resultados, redacción final y entrega | 5–7 de diciembre |

## 11. Preguntas abiertas (resolver en las specs)

- **Roles y permisos:** ¿quién puede crear tareas, reasignarlas o cambiar plazos: todos los integrantes o solo quien creó el proyecto?
- **Dónde corre la lógica de dominio:** cliente, Edge Functions de Supabase o base de datos.
- **Alcance real de las alertas:** cuántas entran en el MVP dado el plazo de una semana de implementación.
- **Reglas de reasignación y de cambio de plazo:** ¿requieren nota obligatoria?
- **Resumen de aportes:** qué métricas incluye exactamente (por ahora, tareas completadas por integrante).
- **Fechas del cronograma:** las tareas solo tienen plazo, pero un Gantt necesita inicio y fin. Propuesta: calcular el inicio como el plazo de la predecesora más tardía (o la fecha de creación si no tiene predecesoras). ¿Se acepta o se agrega un campo de fecha de inicio?
- **Alerta "por vencer":** ¿con cuántos días de anticipación una tarea se considera por vencer?
