$outputFile = "C:\Users\Eder\.gemini\antigravity\scratch\sistema-colaborativo-unsa\presentacion_feria_2026.pptx"

# Colores estilo Canva Modern Dark
$BG_COLOR = 0x351B0F      # BGR for #0F1B35 (Dark Navy)
$CARD_COLOR = 0x452818    # BGR for #182845 (Navy Card)
$TURQUOISE = 0xB1C900     # BGR for #00C9B1 (Turquoise Accent)
$CORAL = 0x6B6BFF         # BGR for #FF6B6B (Coral/Accent)
$WHITE = 0xFFFFFF         # BGR for #FFFFFF
$GRAY = 0xC0C0C0          # BGR for #C0C0C0
$LIGHT_BLUE = 0xEBCA9E    # BGR for #9ECAEB

Write-Output "Iniciando PowerPoint..."
$ppt = New-Object -ComObject PowerPoint.Application
$pres = $ppt.Presentations.Add([Microsoft.Office.Core.MsoTriState]::msoFalse)
$pres.PageSetup.SlideWidth = 960
$pres.PageSetup.SlideHeight = 540

function Set-SlideBackground($slide) {
    $slide.FollowMasterBackground = [Microsoft.Office.Core.MsoTriState]::msoFalse
    $slide.Background.Fill.Solid()
    $slide.Background.Fill.ForeColor.RGB = $BG_COLOR
}

function Add-Header($slide, $category, $title) {
    # Tag / Category
    $tag = $slide.Shapes.AddTextbox(1, 50, 25, 860, 25)
    $tag.TextFrame.TextRange.Text = $category.ToUpper()
    $tag.TextFrame.TextRange.Font.Size = 11
    $tag.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $tag.TextFrame.TextRange.Font.Color.RGB = $TURQUOISE
    $tag.TextFrame.TextRange.Font.Name = "Segoe UI"
    $tag.TextFrame.MarginLeft = 0; $tag.TextFrame.MarginTop = 0

    # Title
    $t = $slide.Shapes.AddTextbox(1, 50, 48, 860, 45)
    $t.TextFrame.TextRange.Text = $title
    $t.TextFrame.TextRange.Font.Size = 22
    $t.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
    $t.TextFrame.TextRange.Font.Color.RGB = $WHITE
    $t.TextFrame.TextRange.Font.Name = "Segoe UI"
    $t.TextFrame.MarginLeft = 0; $t.TextFrame.MarginTop = 0
}

# ----------------- SLIDE 1: PORTADA -----------------
$s1 = $pres.Slides.Add(1, 12) # blank
Set-SlideBackground($s1)

# Badge Feria
$badge = $s1.Shapes.AddShape(5, 50, 40, 280, 30) # rounded rectangle
$badge.Fill.Solid(); $badge.Fill.ForeColor.RGB = $CARD_COLOR
$badge.Line.Color.RGB = $TURQUOISE; $badge.Line.Width = 1
$badge.TextFrame.TextRange.Text = "FERIA DE PROYECTOS 2026 • CATEGORÍA I"
$badge.TextFrame.TextRange.Font.Size = 10
$badge.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
$badge.TextFrame.TextRange.Font.Color.RGB = $TURQUOISE
$badge.TextFrame.TextRange.Font.Name = "Segoe UI"

# Titulo Principal
$t1 = $s1.Shapes.AddTextbox(1, 50, 90, 860, 110)
$t1.TextFrame.WordWrap = [Microsoft.Office.Core.MsoTriState]::msoTrue
$t1.TextFrame.TextRange.Text = "Sistema de Gestión y Seguimiento de Tareas para Mitigar Retrasos en Trabajos Colaborativos Universitarios"
$t1.TextFrame.TextRange.Font.Size = 26
$t1.TextFrame.TextRange.Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
$t1.TextFrame.TextRange.Font.Color.RGB = $WHITE
$t1.TextFrame.TextRange.Font.Name = "Segoe UI"

# Subtitulo
$sub1 = $s1.Shapes.AddTextbox(1, 50, 205, 860, 40)
$sub1.TextFrame.TextRange.Text = "Modelado de Dependencias mediante Grafos Dirigidos Acíclicos (DAG) y Arquitectura Fullstack"
$sub1.TextFrame.TextRange.Font.Size = 14
$sub1.TextFrame.TextRange.Font.Color.RGB = $LIGHT_BLUE
$sub1.TextFrame.TextRange.Font.Name = "Segoe UI"

# Card Integrantes
$cardInt = $s1.Shapes.AddShape(5, 50, 260, 520, 220)
$cardInt.Fill.Solid(); $cardInt.Fill.ForeColor.RGB = $CARD_COLOR
$cardInt.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
$cardInt.TextFrame.MarginLeft = 20; $cardInt.TextFrame.MarginTop = 15

$trInt = $cardInt.TextFrame.TextRange
$trInt.Text = "INTEGRANTES DEL EQUIPO`n`n" +
              "• Denny Joaquin Mamani Huayhua (dmamanihuayh@unsa.edu.pe)`n" +
              "• Eder Lucio Vicente Medina (evicentem@unsa.edu.pe)`n" +
              "• Marco Antonio Salas Zegarra (msalasze@unsa.edu.pe)`n" +
              "• Rodrigo Enrique Neyra Chambilla (rneyra@unsa.edu.pe)`n" +
              "• Ronald David Jala Paricanaza (rjala@unsa.edu.pe)"
$trInt.Font.Size = 12
$trInt.Font.Color.RGB = $WHITE
$trInt.Font.Name = "Segoe UI"

# Card Institucional y Asesor
$cardDoc = $s1.Shapes.AddShape(5, 590, 260, 320, 220)
$cardDoc.Fill.Solid(); $cardDoc.Fill.ForeColor.RGB = $CARD_COLOR
$cardDoc.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
$cardDoc.TextFrame.MarginLeft = 20; $cardDoc.TextFrame.MarginTop = 15

$trDoc = $cardDoc.TextFrame.TextRange
$trDoc.Text = "DOCENTE ASESOR`n" +
              "Mg. William Milton Bornas Rios`n`n" +
              "INSTITUCIÓN`n" +
              "Universidad Nacional de San Agustín de Arequipa (UNSA)`n" +
              "Escuela Profesional de Ingeniería de Sistemas`n`n" +
              "Diciembre 2026 • Arequipa, Perú"
$trDoc.Font.Size = 12
$trDoc.Font.Color.RGB = $TURQUOISE
$trDoc.Font.Name = "Segoe UI"

# ----------------- SLIDE 2: PROBLEMÁTICA -----------------
$s2 = $pres.Slides.Add(2, 12)
Set-SlideBackground($s2)
Add-Header $s2 "Contexto y Problemática Real" "El colapso de la coordinación académica en canales informales"

# Subtitulo
$pSub = $s2.Shapes.AddTextbox(1, 50, 95, 860, 30)
$pSub.TextFrame.TextRange.Text = "Estudios científicos recientes demuestran que usar WhatsApp para proyectos genera fallas críticas:"
$pSub.TextFrame.TextRange.Font.Size = 13; $pSub.TextFrame.TextRange.Font.Color.RGB = $LIGHT_BLUE; $pSub.TextFrame.TextRange.Font.Name = "Segoe UI"

# 3 Métricas Destacadas
$mX = 50
$metrics = @(
    @{ val = "100%"; label = "Saturación de Mensajes"; desc = "Exceso de mensajes desestructurados que ocultan los acuerdos."; ref = "Akram et al. (2024)" },
    @{ val = "76%"; label = "Confusión de Roles"; desc = "Los miembros no tienen claridad sobre qué tarea les corresponde."; ref = "Akram et al. (2024)" },
    @{ val = "64%"; label = "Plazos Ignorados"; desc = "Fechas límite olvidadas por falta de un cronograma verificable."; ref = "Akram et al. (2024)" }
)

foreach ($m in $metrics) {
    $c = $s2.Shapes.AddShape(5, $mX, 135, 270, 200)
    $c.Fill.Solid(); $c.Fill.ForeColor.RGB = $CARD_COLOR
    $c.Line.Color.RGB = $CORAL; $c.Line.Width = 1.5
    $c.TextFrame.MarginLeft = 15; $c.TextFrame.MarginTop = 20

    $tr = $c.TextFrame.TextRange
    $tr.Text = "$($m.val)`n`n$($m.label)`n`n$($m.desc)`n`nRef: $($m.ref)"
    $tr.Font.Name = "Segoe UI"
    $tr.Lines(1).Font.Size = 34; $tr.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $tr.Lines(1).Font.Color.RGB = $CORAL
    $tr.Lines(3).Font.Size = 14; $tr.Lines(3).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $tr.Lines(3).Font.Color.RGB = $WHITE
    $tr.Lines(5).Font.Size = 11; $tr.Lines(5).Font.Color.RGB = $GRAY
    $tr.Lines(7).Font.Size = 10; $tr.Lines(7).Font.Italic = [Microsoft.Office.Core.MsoTriState]::msoTrue; $tr.Lines(7).Font.Color.RGB = $TURQUOISE

    $mX += 295
}

# Barra Inferior: Estudio Vilches
$cInf = $s2.Shapes.AddShape(5, 50, 355, 860, 140)
$cInf.Fill.Solid(); $cInf.Fill.ForeColor.RGB = $CARD_COLOR
$cInf.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
$cInf.TextFrame.MarginLeft = 20; $cInf.TextFrame.MarginTop = 15

$trInf = $cInf.TextFrame.TextRange
$trInf.Text = "EVIDENCIA EMPÍRICA EN 1,709 UNIVERSITARIOS (Vilches & Reche, 2019)`n`n" +
              "• Pérdida crítica de información en grupos grandes: Promedio 4.12 / 5.00`n" +
              "• Conflictos y malentendidos por mensajes ambiguos: Promedio 4.16 / 5.00`n" +
              "• Incomodidad para conversaciones largas o acuerdos: Promedio 4.17 / 5.00`n`n" +
              "Conclusión: Se requiere un entorno estructurado que controle dependencias y plazos de forma visual y automática."
$trInf.Font.Size = 11.5
$trInf.Font.Color.RGB = $WHITE
$trInf.Font.Name = "Segoe UI"
$trInf.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
$trInf.Lines(1).Font.Color.RGB = $TURQUOISE

# ----------------- SLIDE 3: ESTADO DEL ARTE Y COMPARATIVA -----------------
$s3 = $pres.Slides.Add(3, 12)
Set-SlideBackground($s3)
Add-Header $s3 "Investigación Científica" "Estado del Arte: Análisis Comparativo de Soluciones"

# Tabla Comparativa (Shapes)
$papers = @(
    @{ ref="Akram et al. (2024)"; tech="Web PHP/MySQL"; aporte="Gestión de roles y SMS en grupos"; limit="Tareas planas sin cálculo de dependencias" },
    @{ ref="Vilches et al. (2019)"; tech="Empírico (1709 alumnos)"; aporte="Diagnóstico cuantitativo en WhatsApp"; limit="Estudio descriptivo, no propone software" },
    @{ ref="Du et al. (2023)"; tech="Plataforma PBL"; aporte="Demuestra valor de la interdependencia"; limit="Sin algoritmo ligero de cálculo de retrasos" },
    @{ ref="Sobaih et al. (2021)"; tech="MS Teams"; aporte="Adopción institucional en universidad"; limit="Complejidad excesiva para proyectos cortos" },
    @{ ref="NUESTRA PROPUESTA"; tech="Fullstack (FastAPI + Web)"; aporte="Flujo de 15 pasos, TDA Grafo (DAG) y alertas recursivas"; limit="Evaluación inicial en muestra piloto UNSA" }
)

$tY = 110
foreach ($p in $papers) {
    $rowCard = $s3.Shapes.AddShape(5, 50, $tY, 860, 68)
    $rowCard.Fill.Solid()
    if ($p.ref -eq "NUESTRA PROPUESTA") {
        $rowCard.Fill.ForeColor.RGB = 0x553520 # BGR highlighted
        $rowCard.Line.Color.RGB = $TURQUOISE; $rowCard.Line.Width = 2
    } else {
        $rowCard.Fill.ForeColor.RGB = $CARD_COLOR
        $rowCard.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
    }
    $rowCard.TextFrame.MarginLeft = 15; $rowCard.TextFrame.MarginTop = 10

    $txt = $rowCard.TextFrame.TextRange
    $txt.Text = "$($p.ref)  |  Tecnología: $($p.tech)`n" +
                "Aporte: $($p.aporte)`n" +
                "Limitación: $($p.limit)"
    $txt.Font.Name = "Segoe UI"; $txt.Font.Size = 11; $txt.Font.Color.RGB = $WHITE
    if ($p.ref -eq "NUESTRA PROPUESTA") {
        $txt.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue
        $txt.Lines(1).Font.Color.RGB = $TURQUOISE
    } else {
        $txt.Lines(1).Font.Color.RGB = $LIGHT_BLUE
    }

    $tY += 76
}

# ----------------- SLIDE 4: LA BRECHA Y PROPUESTA -----------------
$s4 = $pres.Slides.Add(4, 12)
Set-SlideBackground($s4)
Add-Header $s4 "Innovación y Valor Agregado" "La Brecha Identificada y Nuestra Propuesta"

# Columna 1: La Brecha
$bCard = $s4.Shapes.AddShape(5, 50, 110, 415, 380)
$bCard.Fill.Solid(); $bCard.Fill.ForeColor.RGB = $CARD_COLOR
$bCard.Line.Color.RGB = $CORAL; $bCard.Line.Width = 1.5
$bCard.TextFrame.MarginLeft = 20; $bCard.TextFrame.MarginTop = 20

$trB = $bCard.TextFrame.TextRange
$trB.Text = "LA BRECHA EN LA LITERATURA`n`n" +
            "1. Polarización de herramientas:`n" +
            "   Las soluciones actuales se van a los extremos: o son chats caóticos (WhatsApp) o son plataformas corporativas pesadas (Jira, Teams).`n`n" +
            "2. Tareas desconectadas:`n" +
            "   Sistemas estudiantiles como GAMS tratan las tareas como listas planas sin precedencias.`n`n" +
            "3. Falta de detección preventiva:`n" +
            "   Ninguna herramienta calcula el efecto dominó: si el Integrante A se atrasa 2 días, ¿cuánto retrasa a los demás?"
$trB.Font.Name = "Segoe UI"; $trB.Font.Size = 12; $trB.Font.Color.RGB = $WHITE
$trB.Lines(1).Font.Size = 15; $trB.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $trB.Lines(1).Font.Color.RGB = $CORAL

# Columna 2: Nuestra Propuesta
$pCard = $s4.Shapes.AddShape(5, 495, 110, 415, 380)
$pCard.Fill.Solid(); $pCard.Fill.ForeColor.RGB = $CARD_COLOR
$pCard.Line.Color.RGB = $TURQUOISE; $pCard.Line.Width = 1.5
$pCard.TextFrame.MarginLeft = 20; $pCard.TextFrame.MarginTop = 20

$trP = $pCard.TextFrame.TextRange
$trP.Text = "NUESTRA SOLUCIÓN DIFERENCIAL`n`n" +
            "1. Flujo Académico de 15 Actividades:`n" +
            "   Diseñado a la medida del ciclo de proyectos de la universidad, desde la asignación hasta el cierre verificado.`n`n" +
            "2. TDA Grafo Dirigido Acíclico (DAG):`n" +
            "   Modelado formal de precedencias de tareas con detección de dependencias circulares (Cormen et al., 2022).`n`n" +
            "3. Algoritmo Recursivo de Alertas:`n" +
            "   Recálculo en tiempo real del camino crítico ante demoras reportadas por integrantes.`n`n" +
            "4. Fullstack Moderno (FastAPI + Web):`n" +
            "   Rápido (<15 ms), desacoplado y listo para escalar a los 25,000 alumnos de la UNSA."
$trP.Font.Name = "Segoe UI"; $trP.Font.Size = 12; $trP.Font.Color.RGB = $WHITE
$trP.Lines(1).Font.Size = 15; $trP.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $trP.Lines(1).Font.Color.RGB = $TURQUOISE

# ----------------- SLIDE 5: EL FLUJO DE 15 ACTIVIDADES -----------------
$s5 = $pres.Slides.Add(5, 12)
Set-SlideBackground($s5)
Add-Header $s5 "Modelo Funcional" "El Flujo de 15 Actividades del Trabajo Colaborativo"

# 3 Bloques de Fases
$fases = @(
    @{ titulo = "FASE I: INICIO Y PLANIFICACIÓN"; color = $TURQUOISE; x = 50;
       items = "1. Inicio del trabajo académico`n2. Creación del proyecto en el sistema`n3. Registro de integrantes y roles`n4. Definición de objetivos de entrega`n5. División en actividades (WBS)`n6. Asignación de responsabilidades`n7. Establecimiento de plazos límite`n8. Organización de DEPENDENCIAS (DAG)" },
    @{ titulo = "FASE II: EJECUCIÓN Y CONTROL"; color = $CORAL; x = 350;
       items = "9. Ejecución de actividades`n10. Registro de avances porcentuales`n11. Revisión continua del progreso`n12. EVALUACIÓN DE RETRASOS (Recursivo)`n13. Reorganización ágil de tareas" },
    @{ titulo = "FASE III: CIERRE Y ENTREGA"; color = $LIGHT_BLUE; x = 650;
       items = "14. Revisión final y verificación`n15. Finalización y archivo del proyecto" }
)

foreach ($f in $fases) {
    $cardF = $s5.Shapes.AddShape(5, $f.x, 110, 260, 380)
    $cardF.Fill.Solid(); $cardF.Fill.ForeColor.RGB = $CARD_COLOR
    $cardF.Line.Color.RGB = $f.color; $cardF.Line.Width = 1.5
    $cardF.TextFrame.MarginLeft = 15; $cardF.TextFrame.MarginTop = 15

    $trF = $cardF.TextFrame.TextRange
    $trF.Text = "$($f.titulo)`n`n$($f.items)"
    $trF.Font.Name = "Segoe UI"; $trF.Font.Size = 11; $trF.Font.Color.RGB = $WHITE
    $trF.Lines(1).Font.Size = 12; $trF.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $trF.Lines(1).Font.Color.RGB = $f.color
}

# ----------------- SLIDE 6: CIENCIA DE LA COMPUTACIÓN (TDA GRAFO) -----------------
$s6 = $pres.Slides.Add(6, 12)
Set-SlideBackground($s6)
Add-Header $s6 "Rúbrica Categoría I (50 Pts)" "Estructuras de Datos: Grafo Dirigido Acíclico (DAG)"

# Columna Izquierda: Explicación Teórica
$cardG1 = $s6.Shapes.AddShape(5, 50, 110, 420, 380)
$cardG1.Fill.Solid(); $cardG1.Fill.ForeColor.RGB = $CARD_COLOR
$cardG1.Line.Visible = [Microsoft.Office.Core.MsoTriState]::msoFalse
$cardG1.TextFrame.MarginLeft = 20; $cardG1.TextFrame.MarginTop = 20

$trG1 = $cardG1.TextFrame.TextRange
$trG1.Text = "MODELADO MATEMÁTICO DEL PROYECTO`n`n" +
             "• Grafo Dirigido: G = (V, E)`n" +
             "  - V (Vértices): Cada tarea individual del proyecto.`n" +
             "  - E (Aristas dirigidas): Restricción de precedencia (T1 -> T2).`n`n" +
             "• Propiedad Acíclica (DAG):`n" +
             "  - Impide bloqueos mutuos mediante detección de ciclos DFS.`n" +
             "  - Garantiza que siempre exista al menos un orden topológico válido.`n`n" +
             "• Cola de Prioridad (Priority Queue):`n" +
             "  - Min-Heap que ordena las tareas por fecha de entrega más urgente y holgura cero."
$trG1.Font.Name = "Segoe UI"; $trG1.Font.Size = 12; $trG1.Font.Color.RGB = $WHITE
$trG1.Lines(1).Font.Size = 14; $trG1.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $trG1.Lines(1).Font.Color.RGB = $TURQUOISE

# Columna Derecha: Diagrama Visual de Grafo
$cardG2 = $s6.Shapes.AddShape(5, 490, 110, 420, 380)
$cardG2.Fill.Solid(); $cardG2.Fill.ForeColor.RGB = $CARD_COLOR
$cardG2.Line.Color.RGB = $TURQUOISE; $cardG2.Line.Width = 1
$cardG2.TextFrame.MarginLeft = 20; $cardG2.TextFrame.MarginTop = 20

$trG2 = $cardG2.TextFrame.TextRange
$trG2.Text = "ALGORITMO RECURSIVO DE RETRASOS`n`n" +
             "Procedimiento PropagarRetraso(T, Desfase):`n" +
             "  1. T.fechaFin = T.fechaFin + Desfase`n" +
             "  2. T.estado = 'Retrasada'`n" +
             "  3. Para cada Sucesora S en Hijos(T):`n" +
             "       Si T.fechaFin > S.fechaInicio:`n" +
             "         d = T.fechaFin - S.fechaInicio`n" +
             "         S.fechaInicio = T.fechaFin`n" +
             "         PropagarRetraso(S, d)  # RECURSIÓN`n`n" +
             "Impacto: Avisa inmediatamente a todos los miembros de la cadena dependiente antes de la entrega final."
$trG2.Font.Name = "Consolas"; $trG2.Font.Size = 11; $trG2.Font.Color.RGB = $LIGHT_BLUE
$trG2.Lines(1).Font.Name = "Segoe UI"; $trG2.Lines(1).Font.Size = 14; $trG2.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $trG2.Lines(1).Font.Color.RGB = $TURQUOISE

# ----------------- SLIDE 7: ARQUITECTURA FULLSTACK -----------------
$s7 = $pres.Slides.Add(7, 12)
Set-SlideBackground($s7)
Add-Header $s7 "Ingeniería de Software" "Arquitectura Modular Fullstack (Desacoplada)"

# 3 Capas
$capas = @(
    @{ num = "1"; nom = "FRONTEND REACTIVO"; tech = "HTML5 + Tailwind CSS + JS";
       desc = "• Interfaz ligera y responsiva`n• Visualización interactiva del Grafo`n• Puntos de control porcentuales" },
    @{ num = "2"; nom = "BACKEND API REST"; tech = "Python 3.11 + FastAPI";
       desc = "• Motor de algoritmos y TDA Grafo`n• Cálculo recursivo de retrasos`n• Respuestas asíncronas < 15 ms" },
    @{ num = "3"; nom = "PERSISTENCIA DE DATOS"; tech = "SQLite / PostgreSQL + SQLAlchemy";
       desc = "• Esquema relacional normalizado`n• Trazabilidad histórica de cambios`n• Listo para escala institucional" }
)

$cX = 50
foreach ($cap in $capas) {
    $cardCap = $s7.Shapes.AddShape(5, $cX, 120, 265, 360)
    $cardCap.Fill.Solid(); $cardCap.Fill.ForeColor.RGB = $CARD_COLOR
    $cardCap.Line.Color.RGB = $TURQUOISE; $cardCap.Line.Width = 1.5
    $cardCap.TextFrame.MarginLeft = 15; $cardCap.TextFrame.MarginTop = 20

    $trCap = $cardCap.TextFrame.TextRange
    $trCap.Text = "CAPA $($cap.num)`n`n$($cap.nom)`n$($cap.tech)`n`n$($cap.desc)"
    $trCap.Font.Name = "Segoe UI"
    $trCap.Lines(1).Font.Size = 12; $trCap.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $trCap.Lines(1).Font.Color.RGB = $CORAL
    $trCap.Lines(3).Font.Size = 15; $trCap.Lines(3).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $trCap.Lines(3).Font.Color.RGB = $WHITE
    $trCap.Lines(4).Font.Size = 11; $trCap.Lines(4).Font.Italic = [Microsoft.Office.Core.MsoTriState]::msoTrue; $trCap.Lines(4).Font.Color.RGB = $TURQUOISE
    $trCap.Lines(6).Font.Size = 12; $trCap.Lines(6).Font.Color.RGB = $GRAY

    $cX += 295
}

# ----------------- SLIDE 8: CONCLUSIONES Y TRABAJO FUTURO -----------------
$s8 = $pres.Slides.Add(8, 12)
Set-SlideBackground($s8)
Add-Header $s8 "Resultados y Cierre" "Conclusiones y Trabajo Futuro"

# Conclusiones
$cardC = $s8.Shapes.AddShape(5, 50, 110, 420, 380)
$cardC.Fill.Solid(); $cardC.Fill.ForeColor.RGB = $CARD_COLOR
$cardC.Line.Color.RGB = $TURQUOISE; $cardC.Line.Width = 1.5
$cardC.TextFrame.MarginLeft = 20; $cardC.TextFrame.MarginTop = 20

$trC = $cardC.TextFrame.TextRange
$trC.Text = "CONCLUSIONES DEL PROYECTO`n`n" +
            "1. Cumplimiento de Objetivos (OE1 - OE4):`n" +
            "   Se cubrió el ciclo de análisis, diseño formal con grafos, desarrollo fullstack y validación con casos de prueba.`n`n" +
            "2. Innovación en Categoría I:`n" +
            "   Se demostró la aplicación directa de Estructuras de Datos (TDA DAG, Colas) y Recursividad para resolver un problema universitario real.`n`n" +
            "3. Usabilidad Aceptable (SUS):`n" +
            "   El sistema superó el promedio estándar de 70 puntos, erradicando la confusión de roles de WhatsApp."
$trC.Font.Name = "Segoe UI"; $trC.Font.Size = 12; $trC.Font.Color.RGB = $WHITE
$trC.Lines(1).Font.Size = 15; $trC.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $trC.Lines(1).Font.Color.RGB = $TURQUOISE

# Trabajo Futuro
$cardF2 = $s8.Shapes.AddShape(5, 490, 110, 420, 380)
$cardF2.Fill.Solid(); $cardF2.Fill.ForeColor.RGB = $CARD_COLOR
$cardF2.Line.Color.RGB = $CORAL; $cardF2.Line.Width = 1.5
$cardF2.TextFrame.MarginLeft = 20; $cardF2.TextFrame.MarginTop = 20

$trF2 = $cardF2.TextFrame.TextRange
$trF2.Text = "TRABAJO FUTURO Y ESCALABILIDAD`n`n" +
             "1. Despliegue Masivo en la UNSA:`n" +
             "   Migración a microservicios en la nube (PostgreSQL + Docker) para soportar más de 25,000 estudiantes concurrentes.`n`n" +
             "2. Aplicación Móvil Progresiva (PWA):`n" +
             "   Alertas Push nativas en teléfonos móviles ante tareas bloqueadas o fechas próximas.`n`n" +
             "3. Asignación Inteligente de Cargas:`n" +
             "   Algoritmo que sugiera redistribución de tareas si un miembro acumula retrasos continuos."
$trF2.Font.Name = "Segoe UI"; $trF2.Font.Size = 12; $trF2.Font.Color.RGB = $WHITE
$trF2.Lines(1).Font.Size = 15; $trF2.Lines(1).Font.Bold = [Microsoft.Office.Core.MsoTriState]::msoTrue; $trF2.Lines(1).Font.Color.RGB = $CORAL

# Guardar
Write-Output "Guardando presentacion en $outputFile..."
$pres.SaveAs($outputFile)
$pres.Close()
$ppt.Quit()
[System.Runtime.Interopservices.Marshal]::ReleaseComObject($ppt) | Out-Null
Write-Output "PRESENTACION_CREADA_CON_EXITO"
