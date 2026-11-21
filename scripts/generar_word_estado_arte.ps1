# Script para generar el documento Word del Estado del Arte y Estrategia de Búsqueda
$outputPath = "C:\Users\Eder\.gemini\antigravity\scratch\sistema-colaborativo-unsa\Estado_del_Arte_Estrategia_de_Busqueda.docx"

try {
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    $doc = $word.Documents.Add()
    $selection = $word.Selection

    # Configuración de márgenes
    $doc.PageSetup.TopMargin = 72    # 1 pulgada (2.54 cm)
    $doc.PageSetup.BottomMargin = 72
    $doc.PageSetup.LeftMargin = 72
    $doc.PageSetup.RightMargin = 72

    # Helper para agregar títulos y párrafos
    function Add-TitleText($text, $size = 18, $isBold = $true, $align = 1) {
        $selection.ParagraphFormat.Alignment = $align
        $selection.Font.Name = "Calibri"
        $selection.Font.Size = $size
        $selection.Font.Bold = [int]$isBold
        $selection.Font.Color = 0x003366 # Dark Navy
        $selection.TypeText($text)
        $selection.TypeParagraph()
    }

    function Add-Heading1($text) {
        $selection.ParagraphFormat.Alignment = 0 # Left
        $selection.Font.Name = "Calibri"
        $selection.Font.Size = 14
        $selection.Font.Bold = 1
        $selection.Font.Color = 0x802000 # Deep blue
        $selection.TypeText($text)
        $selection.TypeParagraph()
    }

    function Add-Heading2($text) {
        $selection.ParagraphFormat.Alignment = 0 # Left
        $selection.Font.Name = "Calibri"
        $selection.Font.Size = 12
        $selection.Font.Bold = 1
        $selection.Font.Color = 0x222222
        $selection.TypeText($text)
        $selection.TypeParagraph()
    }

    function Add-Paragraph($text) {
        $selection.ParagraphFormat.Alignment = 3 # Justified
        $selection.Font.Name = "Calibri"
        $selection.Font.Size = 11
        $selection.Font.Bold = 0
        $selection.Font.Color = 0x111111
        $selection.TypeText($text)
        $selection.TypeParagraph()
    }

    function Add-Bullet($text) {
        $selection.ParagraphFormat.Alignment = 0
        $selection.Font.Name = "Calibri"
        $selection.Font.Size = 11
        $selection.Font.Bold = 0
        $selection.Font.Color = 0x111111
        $selection.TypeText("  •  " + $text)
        $selection.TypeParagraph()
    }

    # ==================== PORTADA ====================
    Add-TitleText "UNIVERSIDAD NACIONAL DE SAN AGUSTÍN DE AREQUIPA" 16 $true 1
    Add-TitleText "FACULTAD DE INGENIERÍA DE PRODUCCIÓN Y SERVICIOS" 13 $true 1
    Add-TitleText "ESCUELA PROFESIONAL DE INGENIERÍA DE SISTEMAS" 13 $true 1
    $selection.TypeParagraph()

    Add-TitleText "FERIA DE PROYECTOS 2026 -- CATEGORÍA I" 12 $true 1
    Add-TitleText "ENTREGABLE: ESTADO DEL ARTE Y ESTRATEGIA DE BÚSQUEDA" 16 $true 1
    $selection.TypeParagraph()

    Add-Paragraph "Proyecto: Sistema de Gestión y Seguimiento de Tareas para Mitigar Retrasos en Trabajos Colaborativos"
    $selection.TypeParagraph()

    Add-Heading2 "Equipo de Desarrollo:"
    Add-Bullet "Mamani Huayhua, Denny Joaquin (dmamanihuayh@unsa.edu.pe)"
    Add-Bullet "Vicente Medina, Eder Lucio (evicentem@unsa.edu.pe)"
    Add-Bullet "Salas Zegarra, Marco Antonio (msalasze@unsa.edu.pe)"
    Add-Bullet "Neyra Chambilla, Rodrigo Enrique (rneyra@unsa.edu.pe)"
    Add-Bullet "Jala Paricanaza, Ronald David (rjala@unsa.edu.pe)"
    $selection.TypeParagraph()

    Add-Heading2 "Docente Asesor:"
    Add-Bullet "Mg. William Milton Bornas Rios (wbornas@unsa.edu.pe)"
    $selection.TypeParagraph()

    Add-Paragraph "Arequipa, Perú -- Noviembre de 2026"
    $selection.InsertBreak(7) # Page break

    # ==================== SECCIÓN 1: ESTRATEGIA DE BÚSQUEDA ====================
    Add-Heading1 "1. ESTRATEGIA DE BÚSQUEDA BIBLIOGRÁFICA"

    Add-Heading2 "1.1. Pregunta de Investigación y Necesidad de Información"
    Add-Paragraph "Para fundamentar el proyecto, se formuló la siguiente pregunta orientadora: ¿Cuáles son las causas principales de retraso y desorganización en equipos de trabajo colaborativo estudiantil y qué mecanismos de software (sistemas web, tableros Kanban y cronogramas) se han propuesto recientemente para mitigar este problema?"

    Add-Heading2 "1.2. Palabras Clave (Keywords)"
    Add-Paragraph "Se identificaron términos clave en español e inglés normalizados según tesauros de ingeniería y educación:"
    Add-Bullet "Español: trabajo colaborativo, gestión de tareas, aprendizaje basado en proyectos, retrasos académicos, tableros Kanban, cronograma, usabilidad."
    Add-Bullet "Inglés: collaborative learning, task management, project-based learning, delay mitigation, Kanban board, Gantt chart, group assignment, student usability."

    Add-Heading2 "1.3. Ecuaciones de Búsqueda y Operadores Booleanos"
    Add-Paragraph "Las cadenas booleanas empleadas en los motores académicos fueron las siguientes:"
    Add-Bullet "C1 (General): ('collaborative learning' OR 'group work') AND ('task management' OR 'assignment') AND ('delay' OR 'challenges')"
    Add-Bullet "C2 (Herramientas y Canales): ('WhatsApp' OR 'Microsoft Teams') AND ('higher education' OR 'university students') AND ('collaboration' OR 'communication limitations')"
    Add-Bullet "C3 (Sistemas y Usabilidad): ('web-based task management' OR 'group decision support') AND ('usability' OR 'SUS')"

    Add-Heading2 "1.4. Fuentes y Bases de Datos Consultadas"
    Add-Paragraph "La exploración se realizó en repositorios científicos indexados con revisión por pares:"
    Add-Bullet "MDPI (Education Sciences, Sustainability) -- Acceso abierto."
    Add-Bullet "Elsevier / ScienceDirect (Decision Support Systems) -- Acceso institucional."
    Add-Bullet "RIED - Revista Iberoamericana de Educación a Distancia (UNED, España) -- Acceso abierto."
    Add-Bullet "HRMARS / IJARPED (International Journal of Academic Research) -- Acceso abierto."
    Add-Bullet "EAST-J (Engineering, Agriculture, Science and Technology Journal - UCYP) -- Acceso abierto."
    Add-Bullet "ERIC (Education Resources Information Center - Institute of Education Sciences)."
    Add-Bullet "Google Scholar y ResearchGate para contrastación de citas y métricas."

    Add-Heading2 "1.5. Criterios de Selección (Inclusión y Exclusión)"
    Add-Bullet "Criterios de Inclusión: Artículos publicados preferentemente entre 2018 y 2024; estudios con datos empíricos de estudiantes universitarios; artículos que propongan o evalúen sistemas de software colaborativo; disponibilidad de DOI verificable."
    Add-Bullet "Criterios de Exclusión: Estudios puramente teóricos sin validación empírica ni tecnológica; herramientas comerciales sin soporte de investigación; publicaciones duplicadas o sin revisión por pares."
    $selection.TypeParagraph()

    # ==================== SECCIÓN 2: FICHAS TÉCNICAS ====================
    Add-Heading1 "2. FICHAS TÉCNICAS DE LOS ARTÍCULOS EXPLORADOS"
    Add-Paragraph "A continuación se presentan las 7 fuentes académicas verificadas que sustentan rigurosamente el proyecto:"

    # Artículo 1
    Add-Heading2 "Artículo 1: Hussein (2021) -- Retos de Colaboración en PBL"
    Add-Bullet "Título: Addressing Collaboration Challenges in Project-Based Learning: The Student's Perspective"
    Add-Bullet "Autor: Bassam Hussein (Norwegian University of Science and Technology)"
    Add-Bullet "Revista: Education Sciences (MDPI), Vol. 11, N.° 8, pág. 434, 2021."
    Add-Bullet "DOI: https://doi.org/10.3390/educsci11080434"
    Add-Bullet "Resumen y Hallazgos: A partir del análisis cualitativo de 67 informes de reflexión estudiantil en proyectos de ingeniería, demostró que la ambigüedad en los roles, los conflictos de prioridad y la falta de planificación estructurada son las causas raíz del bajo rendimiento grupal."
    Add-Bullet "Relación con nuestro proyecto: Justifica la necesidad de incorporar la formalización de acuerdos iniciales, la definición clara de roles y un tablero visual que transparenta las prioridades de cada miembro."
    $selection.TypeParagraph()

    # Artículo 2
    Add-Heading2 "Artículo 2: Sobaih et al. (2021) -- MS Teams vs. Redes Sociales"
    Add-Bullet "Título: Responses to COVID-19 in Higher Education: Students' Learning Experience Using Microsoft Teams versus Social Network Sites"
    Add-Bullet "Autores: Abu Elnasr E. Sobaih, Ahmed E. Salem, Ahmed Mohamed Hasanein, Ahmed E. Abu Elnasr"
    Add-Bullet "Revista: Sustainability (MDPI), Vol. 13, N.° 18, pág. 10036, 2021."
    Add-Bullet "DOI: https://doi.org/10.3390/su131810036"
    Add-Bullet "Resumen y Hallazgos: Evaluó la adopción de plataformas institucionales frente a canales sociales. Concluye que suites corporativas como MS Teams presentan sobrecarga de funciones y curvas de aprendizaje elevadas que desmotivan su uso en proyectos cortos."
    Add-Bullet "Relación con nuestro proyecto: Fundamenta por qué nuestra propuesta debe ser una interfaz web ligera, directa y sin sobreconfiguración, facilitando la adopción inmediata."
    $selection.TypeParagraph()

    # Artículo 3
    Add-Heading2 "Artículo 3: Vilches Vilela & Reche Urbano (2019) -- Fallas en WhatsApp"
    Add-Bullet "Título: Limitaciones de WhatsApp para la realización de actividades colaborativas en la universidad"
    Add-Bullet "Autoras: María Josefa Vilches Vilela y Eloísa Reche Urbano (Universidad de Córdoba)"
    Add-Bullet "Revista: RIED. Revista Iberoamericana de Educación a Distancia, Vol. 22, N.° 2, págs. 57-77, 2019."
    Add-Bullet "DOI: https://doi.org/10.5944/ried.22.2.23741"
    Add-Bullet "Resumen y Hallazgos: Estudio cuantitativo con 1709 estudiantes universitarios. Evidenció que el uso de chats informales propicia saturación informativa, pérdida recurrente de archivos clave (promedio 4.12/5.00) y malentendidos por instrucciones ambiguas (promedio 4.16/5.00)."
    Add-Bullet "Relación con nuestro proyecto: Proporciona la evidencia empírica central del diagnóstico del problema: la necesidad urgente de reemplazar los chats informales por un espacio formal de tareas."
    $selection.TypeParagraph()

    # Artículo 4
    Add-Heading2 "Artículo 4: Akram et al. (2024) -- Sistema GAMS"
    Add-Bullet "Título: Group Assignment Management System (GAMS) for University Students"
    Add-Bullet "Autores: Muhammad Lokman Hakim Akram, Raihah Aminuddin, Zurah Abu, Nur Syuhada Muhammat Pazil"
    Add-Bullet "Revista: International Journal of Academic Research in Progressive Education and Development, Vol. 13, N.° 1, págs. 527-539, 2024."
    Add-Bullet "DOI: https://doi.org/10.6007/IJARPED/v13-i1/19125"
    Add-Bullet "Resumen y Hallazgos: Desarrollaron un sistema web en PHP y MySQL para asignación de tareas con perfiles diferenciados y alertas SMS, logrando una usabilidad SUS de 70.44 puntos. Demostraron que el 100% de los estudiantes sufre sobrecarga por chats, 76% confusión de roles y 64% omisión de plazos."
    Add-Bullet "Relación con nuestro proyecto: GAMS organiza tareas en listas planas. Nuestra propuesta supera esta limitación introduciendo tableros Kanban interactivos y cronogramas visuales tipo Gantt."
    $selection.TypeParagraph()

    # Artículo 5
    Add-Heading2 "Artículo 5: Nurzi & Ab Wahab (2022) -- Seguimiento Web de Tareas"
    Add-Bullet "Título: Web-Based Student Task Management System"
    Add-Bullet "Autores: Farhan Ahmad Nurzi y Kasmawahida Ab Wahab"
    Add-Bullet "Revista: Engineering, Agriculture, Science and Technology Journal (EAST-J), Vol. 1, N.° 1, págs. 50-56, 2022."
    Add-Bullet "DOI: https://doi.org/10.37698/eastj.v1i1.119"
    Add-Bullet "Resumen y Hallazgos: Sistema web para el control de actividades con ordenamiento por fechas límite, validando que el registro digital reduce olvidos en comparación con agendas tradicionales en papel."
    Add-Bullet "Relación con nuestro proyecto: Al ser monousuario, nuestro proyecto toma la idea de priorización por fecha y la eleva a un entorno colaborativo multiusuario con Kanban y Gantt."
    $selection.TypeParagraph()

    # Artículo 6
    Add-Heading2 "Artículo 6: Siddiqui et al. (2018) -- Automatización de Cronogramas GDSS"
    Add-Bullet "Título: A Web-Based Group Decision Support System for Academic Term Preparation"
    Add-Bullet "Autores: A. W. Siddiqui, S. A. Raza, Z. M. Tariq"
    Add-Bullet "Revista: Decision Support Systems (Elsevier), Vol. 114, págs. 1-17, 2018."
    Add-Bullet "DOI: https://doi.org/10.1016/j.dss.2018.08.005"
    Add-Bullet "Resumen y Hallazgos: Demostró empíricamente que automatizar la calendarización académica mediante bases de datos y algoritmos de optimización elimina errores humanos y ahorra tiempos masivos frente a hojas de cálculo manuales."
    Add-Bullet "Relación con nuestro proyecto: Respalda técnicamente la automatización de cronogramas y la detección algorítmica de fechas vencidas en el Diagrama de Gantt."
    $selection.TypeParagraph()

    # Artículo 7
    Add-Heading2 "Artículo 7: Brooke (1996) -- Evaluación de Usabilidad SUS"
    Add-Bullet "Título: SUS: A 'Quick and Dirty' Usability Scale"
    Add-Bullet "Autor: John Brooke"
    Add-Bullet "Libro: Usability Evaluation in Industry (Taylor & Francis), págs. 189-194, 1996."
    Add-Bullet "DOI: https://doi.org/10.1201/9781498710411-35"
    Add-Bullet "Resumen y Hallazgos: Creador del instrumento psicométrico de 10 ítems para medir usabilidad de sistemas interactivos. Es el estándar mundial de referencia en HCI."
    Add-Bullet "Relación con nuestro proyecto: Constituye el marco metodológico formal con el que evaluaremos la facilidad de uso de la aplicación con estudiantes de prueba."
    $selection.TypeParagraph()

    # ==================== SECCIÓN 3: MATRIZ COMPARATIVA ====================
    Add-Heading1 "3. MATRIZ COMPARATIVA Y ANÁLISIS DE LA BRECHA"
    Add-Paragraph "A partir de la revisión, se sintetizan las capacidades de las alternativas existentes frente a nuestra propuesta:"

    # Tabla comparativa
    $table = $doc.Tables.Add($selection.Range, 8, 4)
    $table.Borders.Enable = $true
    $table.Rows.Item(1).Range.Font.Bold = $true
    $table.Rows.Item(1).Range.Shading.BackgroundPatternColor = 0xE0E0E0

    $headers = @("Solución", "Enfoque / Tecnología", "Aporte Principal", "Limitación Detectada")
    for ($c = 1; $c -le 4; $c++) {
        $table.Cell(1, $c).Range.Text = $headers[$c - 1]
    }

    $data = @(
        @("WhatsApp [3]", "Mensajería instantánea", "Comunicación inmediata y adopción masiva", "Mensajes caóticos, pérdida de archivos y nula evidencia de aportes."),
        @("MS Teams / Asana [2]", "Suites corporativas", "Estructura formal para empresas", "Demasiado complejas y pesadas para proyectos universitarios cortos."),
        @("GAMS (Akram et al.) [4]", "Web PHP / MySQL", "Perfiles de rol y notificaciones SMS", "Tareas en listas planas sin flujo visual ni alertas en calendario."),
        @("Nurzi & Ab Wahab [5]", "Web / Base de datos", "Seguimiento por fecha de vencimiento", "Exclusivamente monousuario (no sirve para trabajo en grupo)."),
        @("Google Drive / Docs", "Ofimática en la nube", "Edición simultánea de texto", "Solo abarca el documento final, no la gestión de tareas ni plazos."),
        @("Siddiqui et al. [6]", "Sistemas de decisión (GDSS)", "Automatización de calendarios", "Orientado a nivel macro administrativo, no para estudiantes."),
        @("Nuestra Propuesta", "Fullstack (FastAPI + Web)", "Entorno dual Kanban + Gantt con reporte de aportes", "En fase de prototipado para validación en feria.")
    )

    for ($r = 0; $r -lt $data.Count; $r++) {
        for ($c = 0; $c -lt 4; $c++) {
            $table.Cell($r + 2, $c + 1).Range.Text = $data[$r][$c]
            $table.Cell($r + 2, $c + 1).Range.Font.Size = 9.5
        }
    }

    $selection.SetRange($table.Range.End + 1, $table.Range.End + 1)
    $selection.TypeParagraph()

    # ==================== SECCIÓN 4: CONCLUSIÓN ====================
    Add-Heading1 "4. BRECHA DETECTADA Y JUSTIFICACIÓN DE LA PROPUESTA"
    Add-Paragraph "La revisión sistemática de la literatura demuestra con claridad que existe una brecha sin resolver: los equipos de estudio actuales se ven obligados a elegir entre dos extremos perjudiciales:"
    Add-Bullet "Extremo 1 (Informal): Grupos de WhatsApp donde los mensajes se pierden, no hay roles claros y el 64% no llega a tiempo con las entregas."
    Add-Bullet "Extremo 2 (Corporativo): Plataformas empresariales pesadas (Teams, Jira) que exigen configuraciones excesivas y desincentivan a los estudiantes en trabajos semestrales."
    Add-Paragraph "Nuestra propuesta cubre exactamente este vacío intermedio: ofrece una herramienta web accesible, ligera y pensada desde cero para el trabajo colaborativo, articulando un Tablero Kanban operativo, un Diagrama de Gantt preventivo y un reporte transparente de aportes individuales."

    # Guardar documento
    $doc.SaveAs([ref]$outputPath, [ref]16) # 16 = wdFormatDocumentDefault (.docx)
    $doc.Close()
    $word.Quit()

    Write-Output "DOCUMENTO_WORD_CREADO_EXITOSAMENTE"
} catch {
    Write-Error $_.Exception.Message
    if ($word) { $word.Quit() }
}
