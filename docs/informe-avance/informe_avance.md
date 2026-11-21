# INFORME DE AVANCE DE PROYECTO

**UNIVERSIDAD NACIONAL DE SAN AGUSTÍN DE AREQUIPA**  
**FACULTAD DE INGENIERÍA DE PRODUCCIÓN Y SERVICIOS**  
**ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS**  

---

* **Evento:** Feria de Proyectos 2026 – EPIS UNSA
* **Categoría:** Categoría I (Nivel Básico – 1.° y 2.° año)
* **Proyecto:** *Sistema de Gestión y Seguimiento de Tareas para Mitigar Retrasos en Trabajos Colaborativos*

---

### Equipo de Trabajo

| N.° | Apellidos y Nombres | Correo Institucional | Área Principal |
| :---: | :--- | :--- | :--- |
| 1 | **Mamani Huayhua, Denny Joaquin** | `dmamanihuayh@unsa.edu.pe` | Servidor en FastAPI y modelos de datos |
| 2 | **Vicente Medina, Eder Lucio** | `evicentem@unsa.edu.pe` | Coordinación y desarrollo del Tablero Kanban |
| 3 | **Salas Zegarra, Marco Antonio** | `msalasze@unsa.edu.pe` | Calendario Gantt y cálculo de retrasos |
| 4 | **Neyra Chambilla, Rodrigo Enrique** | `rneyra@unsa.edu.pe` | Pruebas y encuestas de usabilidad (SUS) |
| 5 | **Jala Paricanaza, Ronald David** | `rjala@unsa.edu.pe` | Diseño visual (Tailwind CSS) y diapositivas |

* **Docente Asesor:** **Mg. William Milton Bornas Rios** (`wbornas@unsa.edu.pe`)

---

## 1. ¿De qué trata este proyecto?

Cuando nos toca hacer trabajos en grupo en la universidad o en cualquier equipo de estudio, casi siempre nos organizamos por grupos de WhatsApp. Aunque es fácil de usar, la realidad es que genera mucho desorden: los archivos importantes se pierden entre decenas de mensajes, no queda claro qué le toca hacer a cada compañero y la mayoría de veces terminamos avanzando a última hora con entregas apresuradas.

Este proyecto propone una solución práctica: una aplicación web sencilla e intuitiva diseñada para que los equipos puedan coordinar sus proyectos sin estrés. La aplicación combina dos herramientas visuales muy conocidas:

1. **Un Tablero Kanban:** para ver en qué está trabajando cada integrante en el día a día (*Por hacer*, *En progreso*, *Necesito ayuda*, *Completado*).
2. **Un Diagrama de Gantt:** para visualizar el calendario de fechas, plazos de entrega y saber con anticipación si una tarea se está retrasando antes del día final.

Además, la aplicación ayuda al grupo a establecer reglas claras desde el inicio (acuerdo de equipo) y genera al final un resumen transparente de los aportes de cada integrante.

---

## 2. El problema real que queremos resolver

### 2.1. Lo que ocurre en la práctica
El desorden en los trabajos grupales no es una percepción aislada; diversos estudios recientes lo confirman con datos:
* **Saturación de mensajes:** El **100%** de los estudiantes reporta que los grupos de chat se llenan de mensajes desordenados donde es fácil perder datos o acuerdos importantes (Vilches y Reche, 2019; Akram et al., 2024).
* **Confusión en los roles:** El **76%** manifiesta dudas sobre qué tarea le corresponde exactamente a cada integrante.
* **Entregas de último minuto:** El **64%** reconoce haber omitido fechas límite de entrega por falta de seguimiento a tiempo.

### 2.2. Impacto social del proyecto
Aunque empezamos pensando en nuestras clases de la universidad (UNSA), este problema ocurre en muchos otros espacios:
* **En la universidad e institutos:** Ayuda a que los estudiantes no se sobrecarguen, reduciendo las discusiones y el estrés de fin de semestre.
* **En semilleros y grupos de investigación:** Facilita que estudiantes de distintas carreras puedan coordinar proyectos juntos sin perder tiempo configurando herramientas complicadas.
* **En equipos de trabajo juvenil:** Fomenta una cultura de trabajo responsable, transparente y con un reparto justo de tareas.

---

## 3. Objetivos del proyecto

### 3.1. Objetivo General
Construir un prototipo de sistema web que ayude a equipos de trabajo a organizarse mejor mediante tableros Kanban y calendarios tipo Gantt, evitando retrasos y haciendo transparente el trabajo de cada integrante.

### 3.2. Objetivos Específicos
* **OE1:** Identificar los problemas más frecuentes al coordinar trabajos grupales y definir las funciones que realmente necesita un equipo.
* **OE2:** Diseñar una interfaz limpia y estructurar los datos del sistema para sincronizar el tablero Kanban con el cronograma Gantt.
* **OE3:** Programar el prototipo web usando tecnologías modernas y ligeras (FastAPI en Python para el servidor, y HTML con Tailwind CSS para la interfaz).
* **OE4:** Probar la aplicación con compañeros de estudio mediante pruebas prácticas y una encuesta estándar de usabilidad (SUS) para confirmar que sea fácil de usar.

---

## 4. ¿Cómo funciona la aplicación?

El trabajo de un equipo dentro del sistema sigue un camino claro de **15 pasos organizados en tres etapas**:

### Etapa 1: Planificación (Pasos 1 al 8)
1. **Inicio:** Se inicia la sesión en la plataforma.
2. **Proyecto:** Se registra el título y la meta general del trabajo.
3. **Integrantes:** Se agregan los miembros del equipo.
4. **Acuerdo y objetivos:** El grupo define sus normas básicas de trabajo y objetivos.
5. **División de tareas:** Se descompone el trabajo en tareas puntuales.
6. **Responsables:** Se asigna quién o quiénes se harán cargo de cada tarea.
7. **Plazos:** Se definen las fechas de inicio y entrega para cada actividad.
8. **Organización:** Las tareas se ordenan en el tablero Kanban y en el calendario Gantt.

### Etapa 2: Ejecución y Seguimiento (Pasos 9 al 11)
9. **Ejecución:** Cada integrante avanza sus tareas de forma independiente.
10. **Registro de avances:** Cada miembro actualiza su porcentaje de progreso (0% a 100%).
11. **Revisión continua:** Todo el equipo ve el avance general. Si alguien se traba, puede activar la opción **"Necesito ayuda"** para que sus compañeros lo apoyen a tiempo.

### Etapa 3: Control y Cierre (Pasos 12 al 15)
12. **Detección de retrasos:** Si una tarea supera su fecha límite sin completarse, el sistema la resalta en rojo en el calendario Gantt.
13. **Reorganización:** El equipo puede reasignar tareas o ajustar fechas si surgen imprevistos.
14. **Revisión final:** Se comprueba que todos los entregables estén listos.
15. **Finalización y reporte:** Se cierra el proyecto y el sistema genera un resumen claro de los aportes y tareas completadas por cada integrante.

---

## 5. ¿En qué se diferencia de otras herramientas?

| Herramienta | Lo que hace bien | Lo que le falta para equipos de estudio |
| :--- | :--- | :--- |
| **WhatsApp** | Rápido y todos lo tienen en el celular. | Mensajes desordenados, tareas que se olvidan y no hay evidencia de quién trabajó. |
| **Trello / Asana** | Muy completas para empresas. | Demasiadas opciones que confunden y requieren mucha configuración para trabajos cortos. |
| **Google Docs** | Excelente para escribir juntos. | Solo sirve para redactar el documento final, no para coordinar la investigación ni los plazos. |
| **Nuestra Solución** | **Simple, visual y pensada para estudiantes.** | **Une Kanban + Gantt, incluye botón de ayuda, acuerdo inicial y reporte de aportes.** |

---

## 6. Tecnologías que estamos utilizando

Para que el sistema sea rápido, liviano y fácil de abrir desde cualquier navegador, elegimos:
* **Python y FastAPI:** Para el servidor web. Es rápido, moderno y maneja las peticiones de datos de forma limpia y segura.
* **HTML5 y Tailwind CSS:** Para una interfaz limpia, bonita y adaptable tanto a pantallas de computadora como a celulares.
* **JavaScript estándar:** Para que el tablero Kanban y el calendario Gantt se muevan de forma fluida sin recargar la página.
* **Git y GitHub:** Para trabajar en equipo sobre el mismo código sin pisar el trabajo de los demás.

---

## 7. Plan de trabajo y responsabilidades

### 7.1. Cronograma de avance (Sprints)
* **Sprint 1 (Completado):** Diagnóstico del problema, revisión de antecedentes y justificación del proyecto.
* **Sprint 2 (Completado):** Definición de la vista dual (Kanban + Gantt), flujo de 15 pasos y redacción de este informe.
* **Sprint 3 (En curso):** Diseño de pantallas (bocetos de interfaz) y estructura de la base de datos.
* **Sprint 4 (Siguiente paso):** Programación del prototipo funcional en FastAPI y pruebas locales.
* **Sprint 5 (Final):** Pruebas de usabilidad con estudiantes compañeros y preparación de la presentación para la feria.

### 7.2. Tareas asignadas en el equipo

| Integrante | Área principal de trabajo |
| :--- | :--- |
| **Mamani Huayhua, Denny Joaquin** | Estructura del servidor en FastAPI y modelos de datos. |
| **Vicente Medina, Eder Lucio** | Coordinación general y programación de la interfaz del tablero Kanban. |
| **Salas Zegarra, Marco Antonio** | Lógica del calendario Gantt y detección de fechas vencidas. |
| **Neyra Chambilla, Rodrigo Enrique** | Preparación de casos de prueba y encuestas de usabilidad SUS. |
| **Jala Paricanaza, Ronald David** | Diseño visual con Tailwind CSS, flujo de usuario y diapositivas. |

---

## 8. Conclusión del avance actual
Hasta este punto, el equipo tiene claramente definido el problema, la solución técnica y la arquitectura de la aplicación. Haber optado por un modelo combinado de **Tablero Kanban + Diagrama de Gantt** permite ofrecer una herramienta amigable para los usuarios pero con el rigor técnico y formal necesario para ser evaluada favorablemente en la Feria de Proyectos 2026.
