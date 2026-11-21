# ESTADO DEL ARTE Y ESTRATEGIA DE BÚSQUEDA BIBLIOGRÁFICA

**UNIVERSIDAD NACIONAL DE SAN AGUSTÍN DE AREQUIPA**  
**FACULTAD DE INGENIERÍA DE PRODUCCIÓN Y SERVICIOS**  
**ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS**  

* **Evento:** Feria de Proyectos 2026 -- Categoría I (Nivel Básico)  
* **Proyecto:** *Sistema de Gestión y Seguimiento de Tareas para Mitigar Retrasos en Trabajos Colaborativos*  
* **Documento Solicitado:** Informe del Estado del Arte y Estrategia de Búsqueda Bibliográfica  

---

### Equipo de Desarrollo

| N.° | Apellidos y Nombres | Correo Institucional |
| :---: | :--- | :--- |
| 1 | **Mamani Huayhua, Denny Joaquin** | `dmamanihuayh@unsa.edu.pe` |
| 2 | **Vicente Medina, Eder Lucio** | `evicentem@unsa.edu.pe` |
| 3 | **Salas Zegarra, Marco Antonio** | `msalasze@unsa.edu.pe` |
| 4 | **Neyra Chambilla, Rodrigo Enrique** | `rneyra@unsa.edu.pe` |
| 5 | **Jala Paricanaza, Ronald David** | `rjala@unsa.edu.pe` |

* **Docente Asesor:** **Mg. William Milton Bornas Rios** (`wbornas@unsa.edu.pe`)

---

## 1. Estrategia de Búsqueda Bibliográfica

### 1.1. Pregunta Orientadora de Investigación
> *¿Cuáles son los factores determinantes del fracaso y retraso en equipos de trabajo colaborativo estudiantil y qué mecanismos de software (sistemas web, tableros Kanban y cronogramas) se han propuesto recientemente para mitigar esta problemática?*

### 1.2. Palabras Clave (Keywords)
* **Español:** trabajo colaborativo, gestión de tareas, aprendizaje basado en proyectos (PBL), retrasos académicos, tableros Kanban, cronograma Gantt, usabilidad SUS.
* **Inglés:** collaborative learning, task management, project-based learning, delay mitigation, Kanban board, Gantt chart, group assignment, student usability.

### 1.3. Cadenas Booleanas de Búsqueda
1. **Cadena 1 (Problemática y PBL):**  
   `("collaborative learning" OR "group work") AND ("task management" OR "assignment") AND ("delay" OR "challenges")`
2. **Cadena 2 (Canales Informales vs. Plataformas):**  
   `("WhatsApp" OR "Microsoft Teams") AND ("higher education" OR "university students") AND ("collaboration" OR "communication limitations")`
3. **Cadena 3 (Sistemas y Usabilidad):**  
   `("web-based task management" OR "group decision support") AND ("usability" OR "SUS")`

### 1.4. Fuentes y Bases de Datos Científicas Consultadas
* **MDPI** (*Education Sciences*, *Sustainability*) -- Revistas de acceso abierto indexadas en Scopus/WoS.
* **Elsevier / ScienceDirect** (*Decision Support Systems*) -- Acceso vía suscripción institucional.
* **RIED** (*Revista Iberoamericana de Educación a Distancia* - UNED, España) -- Acceso abierto.
* **HRMARS / IJARPED** (*International Journal of Academic Research*) -- Acceso abierto.
* **EAST-J** (*Engineering, Agriculture, Science and Technology Journal* - UCYP) -- Acceso abierto.
* **ERIC** (*Education Resources Information Center*).
* **Google Scholar y ResearchGate** para contraste de citas y métricas.

### 1.5. Criterios de Selección
* **Inclusión:** Publicaciones entre 2018 y 2024; estudios cuantitativos o cualitativos con muestras reales de estudiantes universitarios; artículos que propongan o evalúen prototipos de software colaborativo; identificador DOI verificable.
* **Exclusión:** Artículos de opinión sin datos empíricos; manuales de usuario de herramientas comerciales sin rigor de investigación; documentos duplicados o sin revisión por pares.

---

## 2. Fichas Técnicas de los Artículos Analizados

### Artículo 1: Hussein (2021) -- Retos de Colaboración en PBL
* **Título:** *Addressing Collaboration Challenges in Project-Based Learning: The Student's Perspective*
* **Autor:** Bassam Hussein (Norwegian University of Science and Technology - NTNU)
* **Revista:** *Education Sciences* (MDPI), Vol. 11, N.° 8, Art. 434, 2021.
* **DOI:** [10.3390/educsci11080434](https://doi.org/10.3390/educsci11080434)
* **Aporte Principal:** Análisis de 67 informes de reflexión estudiantil en ingeniería. Concluye que la ambigüedad en la asignación de roles y la incertidumbre en prioridades son las causas raíz del fracaso grupal.
* **Relación con la Propuesta:** Fundamenta la necesidad de formalizar un acuerdo inicial de reglas y roles en la Fase 1 del sistema.

### Artículo 2: Sobaih et al. (2021) -- MS Teams vs. Redes Sociales
* **Título:** *Responses to COVID-19 in Higher Education: Students' Learning Experience Using Microsoft Teams versus Social Network Sites*
* **Autores:** Abu Elnasr E. Sobaih, Ahmed E. Salem, Ahmed Mohamed Hasanein, Ahmed E. Abu Elnasr
* **Revista:** *Sustainability* (MDPI), Vol. 13, N.° 18, Art. 10036, 2021.
* **DOI:** [10.3390/su131810036](https://doi.org/10.3390/su131810036)
* **Aporte Principal:** Demuestra que las plataformas corporativas como MS Teams presentan sobrecarga funcional y curvas de aprendizaje lentas para proyectos breves.
* **Relación con la Propuesta:** Justifica el diseño de una interfaz ligera y enfocada (Kanban + Gantt) sin funciones empresariales innecesarias.

### Artículo 3: Vilches Vilela & Reche Urbano (2019) -- Fallas en WhatsApp
* **Título:** *Limitaciones de WhatsApp para la realización de actividades colaborativas en la universidad*
* **Autoras:** María Josefa Vilches Vilela y Eloísa Reche Urbano (Universidad de Córdoba)
* **Revista:** *RIED. Revista Iberoamericana de Educación a Distancia*, Vol. 22, N.° 2, págs. 57-77, 2019.
* **DOI:** [10.5944/ried.22.2.23741](https://doi.org/10.5944/ried.22.2.23741)
* **Aporte Principal:** Estudio cuantitativo con 1709 universitarios. Evidencia pérdida recurrente de archivos e información clave ($\mu=4.12/5.00$) y malentendidos por instrucciones ambiguas ($\mu=4.16/5.00$).
* **Relación con la Propuesta:** Diagnóstico empírico clave que justifica sustituir los chats informales por un espacio formal de seguimiento.

### Artículo 4: Akram et al. (2024) -- Sistema GAMS
* **Título:** *Group Assignment Management System (GAMS) for University Students*
* **Autores:** Muhammad Lokman Hakim Akram, Raihah Aminuddin, Zurah Abu, Nur Syuhada Muhammat Pazil
* **Revista:** *International Journal of Academic Research in Progressive Education and Development*, Vol. 13, N.° 1, págs. 527-539, 2024.
* **DOI:** [10.6007/IJARPED/v13-i1/19125](https://doi.org/10.6007/IJARPED/v13-i1/19125)
* **Aporte Principal:** Sistema web en PHP/MySQL para asignación de tareas con perfiles (admin, líder, miembro) y recordatorios SMS. Registra que el 100% de los alumnos sufre sobrecarga en chats, 76% confusión de roles y 64% omisión de plazos. Usabilidad SUS: 70.44 puntos.
* **Relación con la Propuesta:** GAMS trabaja con listas tabulares planas. Nuestra solución la supera incorporando un tablero Kanban interactivo y sincronización con cronograma Gantt.

### Artículo 5: Nurzi & Ab Wahab (2022) -- Seguimiento Web de Tareas
* **Título:** *Web-Based Student Task Management System*
* **Autores:** Farhan Ahmad Nurzi y Kasmawahida Ab Wahab
* **Revista:** *Engineering, Agriculture, Science and Technology Journal (EAST-J)*, Vol. 1, N.° 1, págs. 50-56, 2022.
* **DOI:** [10.37698/eastj.v1i1.119](https://doi.org/10.37698/eastj.v1i1.119)
* **Aporte Principal:** Sistema web para el control de tareas basado en fechas de vencimiento para evitar olvidos.
* **Relación con la Propuesta:** Al ser monousuario, nuestro proyecto escala el concepto hacia la coordinación colaborativa multiusuario.

### Artículo 6: Siddiqui et al. (2018) -- Automatización de Cronogramas GDSS
* **Título:** *A Web-Based Group Decision Support System for Academic Term Preparation*
* **Autores:** A. W. Siddiqui, S. A. Raza, Z. M. Tariq
* **Revista:** *Decision Support Systems* (Elsevier), Vol. 114, págs. 1-17, 2018.
* **DOI:** [10.1016/j.dss.2018.08.005](https://doi.org/10.1016/j.dss.2018.08.005)
* **Aporte Principal:** Valida que automatizar la calendarización con bases de datos elimina errores de coordinación humana y optimiza tiempos.
* **Relación con la Propuesta:** Sustenta técnicamente el cálculo automatizado de fechas y la detección de retrasos en el Diagrama de Gantt.

### Artículo 7: Brooke (1996) -- Escala de Usabilidad SUS
* **Título:** *SUS: A 'Quick and Dirty' Usability Scale*
* **Autor:** John Brooke
* **Libro:** *Usability Evaluation in Industry* (Taylor & Francis), págs. 189-194, 1996.
* **DOI:** [10.1201/9781498710411-35](https://doi.org/10.1201/9781498710411-35)
* **Aporte Principal:** Escala psicométrica de 10 ítems universalmente aceptada para evaluar la facilidad de uso de software.
* **Relación con la Propuesta:** Instrumento con el que se evaluará el prototipo funcional con estudiantes de prueba en la Fase 4.

---

## 3. Matriz Comparativa del Estado del Arte

| Solución / Referencia | Enfoque Tecnológico | Aporte Principal | Limitación Detectada |
| :--- | :--- | :--- | :--- |
| **WhatsApp** [3] | Mensajería instantánea | Comunicación inmediata y adopción total | Mensajes caóticos, pérdida de archivos y nula evidencia de aportes. |
| **MS Teams / Asana** [2] | Suites corporativas | Estructura formal para empresas | Demasiado complejas y pesadas para proyectos universitarios cortos. |
| **GAMS (Akram et al.)** [4] | Web PHP / MySQL | Perfiles de rol y notificaciones SMS | Tareas en listas planas sin flujo visual ni alertas en calendario. |
| **Nurzi & Ab Wahab** [5] | Web / Base de datos | Seguimiento por fecha de vencimiento | Exclusivamente monousuario (no sirve para trabajo en grupo). |
| **Google Drive / Docs** | Ofimática en la nube | Edición simultánea de texto | Solo abarca el documento final, no la gestión de tareas ni plazos. |
| **Siddiqui et al.** [6] | Sistemas de decisión (GDSS) | Automatización de calendarios | Orientado a nivel macro administrativo, no para estudiantes. |
| **Nuestra Propuesta** | **Fullstack (FastAPI + Web)** | **Entorno dual Kanban + Gantt con reporte de aportes** | **Combina agilidad operativa con control riguroso de fechas y transparencia de roles.** |

---

## 4. Brecha Detectada y Justificación de la Propuesta

A partir de la revisión de la literatura, se confirma que las alternativas actuales se polarizan entre dos extremos inconvenientes:
1. **Canales informales (WhatsApp):** Alta adopción pero nula trazabilidad, desorden masivo y 64% de entregas fuera de plazo.
2. **Plataformas corporativas pesadas (Teams, Jira):** Alta funcionalidad pero sobrecargadas de opciones que desincentivan su uso en trabajos universitarios.

**Nuestra propuesta** cubre este vacío intermedio: ofrece una herramienta web accesible, ligera y pensada desde cero para el trabajo colaborativo, articulando un **Tablero Kanban operativo**, un **Diagrama de Gantt preventivo** y un **reporte transparente de aportes individuales**.

---
*Documento disponible en formato Word editable en:* `docs/estado-del-arte/Estado_del_Arte_Estrategia_de_Busqueda.docx`
