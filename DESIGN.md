---
version: alpha
name: Tablero de grupos
description: App web para organizar trabajos en grupo. Amigable, clara y colorida, tema claro.
omitted: [motion]
colors:
  primary: "#2F6FED"
  on-primary: "#FFFFFF"
  surface: "#F5F8FF"
  surface-card: "#FFFFFF"
  border: "#E3E9F5"
  text: "#1E2A44"
  text-muted: "#5B6784"
  progress-track: "#E1EAFB"
  status-pending: "#7B8AA8"
  status-pending-soft: "#EEF1F7"
  status-pending-text: "#4A5873"
  status-progress: "#2F6FED"
  status-progress-soft: "#E6EEFF"
  status-progress-text: "#1F4FBF"
  status-blocked: "#F59E0B"
  status-blocked-soft: "#FEF3DC"
  status-blocked-text: "#8A5300"
  status-help: "#8B5CF6"
  status-help-soft: "#EFE8FE"
  status-help-text: "#5B34C7"
  status-done: "#22A06B"
  status-done-soft: "#E1F5EC"
  status-done-text: "#14663F"
  alert-late: "#E5484D"
  alert-late-soft: "#FDECEC"
  alert-late-text: "#B3282D"
typography:
  headline-lg: {fontFamily: Nunito, fontSize: 24px, fontWeight: 700, lineHeight: 1.25}
  headline-md: {fontFamily: Nunito, fontSize: 18px, fontWeight: 700, lineHeight: 1.3}
  body-md: {fontFamily: Nunito, fontSize: 15px, fontWeight: 400, lineHeight: 1.5}
  body-sm: {fontFamily: Nunito, fontSize: 13px, fontWeight: 400, lineHeight: 1.45}
  label-md: {fontFamily: Nunito, fontSize: 13px, fontWeight: 600, lineHeight: 1.2}
rounded:
  sm: 8px
  md: 12px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: 12px
  card-task:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text}"
    typography: "{typography.body-md}"
    rounded: "{rounded.md}"
    padding: 12px
  progress-bar:
    backgroundColor: "{colors.progress-track}"
    rounded: "{rounded.full}"
    height: 12px
  progress-bar-fill:
    backgroundColor: "{colors.status-done}"
    rounded: "{rounded.full}"
  chip-pending: {backgroundColor: "{colors.status-pending-soft}", textColor: "{colors.status-pending-text}", typography: "{typography.label-md}", rounded: "{rounded.full}", padding: 8px}
  chip-progress: {backgroundColor: "{colors.status-progress-soft}", textColor: "{colors.status-progress-text}", typography: "{typography.label-md}", rounded: "{rounded.full}", padding: 8px}
  chip-blocked: {backgroundColor: "{colors.status-blocked-soft}", textColor: "{colors.status-blocked-text}", typography: "{typography.label-md}", rounded: "{rounded.full}", padding: 8px}
  chip-help: {backgroundColor: "{colors.status-help-soft}", textColor: "{colors.status-help-text}", typography: "{typography.label-md}", rounded: "{rounded.full}", padding: 8px}
  chip-done: {backgroundColor: "{colors.status-done-soft}", textColor: "{colors.status-done-text}", typography: "{typography.label-md}", rounded: "{rounded.full}", padding: 8px}
  chip-late: {backgroundColor: "{colors.alert-late-soft}", textColor: "{colors.alert-late-text}", typography: "{typography.label-md}", rounded: "{rounded.full}", padding: 8px}
  chip-due-soon: {backgroundColor: "{colors.surface-card}", textColor: "{colors.alert-late-text}", typography: "{typography.label-md}", rounded: "{rounded.full}", padding: 8px}
  gantt-bar:
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    height: 28px
---

## Overview

Aplicación web para que grupos de cualquier tipo organicen un trabajo en común. Debe sentirse amigable, clara y motivadora, parecida a Trello en cercanía, sin verse infantil. Se usa en computadora y en pantallas de celular (diseño responsive, no una app nativa).

## Colors

Fondo azul casi blanco (`surface`), tarjetas blancas y un azul principal (`primary`) para acciones y elementos activos. Estrategia: base suave con acentos vivos.

Cada estado de tarea tiene tres colores: acento vivo (iconos, bordes, rellenos), fondo suave y texto oscuro. Pendiente: gris azulado. En progreso: azul. Bloqueada: ámbar. Necesito ayuda: violeta. Completada: verde. Las alertas de urgencia son una familia aparte, en coral: "por vencer" se muestra con contorno coral sobre fondo blanco y "retrasada" con relleno suave, de modo que la urgencia crece de menos a más sin añadir otro color.

El acento nunca se usa como color de texto sobre su fondo suave; el texto usa siempre la variante `-text` (contraste de al menos 5,6:1). Ningún estado depende solo del color: siempre lleva icono y texto.

## Typography

Una sola familia, **Nunito** (pesos 400, 600 y 700), redondeada y legible en pantallas pequeñas. Títulos en 700, etiquetas en 600, cuerpo en 400. El cuerpo no baja de 13px en celular.

## Layout

Escala de espaciado de 4px con pasos de 8px. Arriba, una franja de progreso y alertas; debajo, el tablero. En escritorio, tres columnas con ancho máximo del contenido de 1200px. En celular, las columnas se deslizan en horizontal (cada una ocupa casi todo el ancho) y las etiquetas de alerta se deslizan debajo de la barra de progreso.

## Elevation & Depth

Profundidad por capas de color: tarjetas blancas sobre fondo azul pálido. Solo las tarjetas llevan una sombra muy suave. Sin sombras fuertes.

## Shapes

Esquinas muy redondeadas: 12px en tarjetas, 8px en botones y campos, forma de píldora en etiquetas y barras.

## Voice & Content Strategy

- **Tono:** cercano, claro y alentador, sin exclamaciones excesivas. Español neutro, tratando al usuario de tú.
- **Mayúsculas:** solo la primera letra en títulos, botones y etiquetas.
- **Terminología:** proyecto, integrante, tarea, responsable. No mezclar con sinónimos.
- **Botones:** verbo que nombra el resultado ("Crear tarea", "Marcar como completada"), nunca "Aceptar" o "Enviar".
- **Estados vacíos y errores:** explican qué va ahí y qué hacer a continuación.
- **Fechas:** formato corto ("12 dic") y relativo en alertas ("vence mañana", "venció hace 2 días").

## Components

- **Franja superior:** barra de progreso con relleno verde (`progress-bar-fill`) sobre riel pálido y el texto "8 de 14 tareas completadas · 57%". Al lado, etiquetas de alerta tocables ("2 por vencer", "2 bloqueadas", "1 retrasada", "1 necesita ayuda"); al tocarlas filtran el tablero.
- **Tablero:** tres columnas: Pendiente, En progreso y Completada.
- **Tarjeta de tarea (`card-task`):** título en semibold de hasta dos líneas; abajo a la izquierda un círculo con las iniciales del responsable y a la derecha la fecha límite con icono de calendario. Si depende de otras tareas, un indicador de enlace ("Depende de 2").
- **Tarea propia:** borde azul y leve resplandor para distinguirla de las demás.
- **Bloqueada:** tarea pendiente que depende de otra. Se muestra atenuada, con candado y el texto "Espera a: [tarea]"; se desbloquea sola.
- **Necesito ayuda:** marca que pone el responsable de una tarea en progreso, con una línea de nota bajo el título.
- **Retrasada:** la fecha se tiñe de coral y aparece la etiqueta `chip-late` (relleno suave, icono de advertencia).
- **Por vencer:** la fecha se tiñe de coral y aparece la etiqueta `chip-due-soon`: contorno coral, fondo blanco e icono de reloj. Es la versión menos intensa de la alerta de retraso.
- **Vistas:** pestañas "Tablero | Cronograma" bajo la franja superior. El tablero es la vista principal.
- **Cronograma (mini Gantt):** función opcional; implementar solo si las funciones esenciales están terminadas. Vista de solo lectura que muestra únicamente las tareas con dependencias, con el aviso "Mostrando 6 de 14 tareas (las que tienen dependencias)". Una fila por tarea con una barra (`gantt-bar`) coloreada con los colores del estado de la tarea (fondo suave y borde en el acento vivo), líneas finas que conectan cada tarea con su predecesora y una línea vertical punteada azul con la etiqueta "Hoy". Una tarea retrasada se prolonga pasada esa línea con borde coral. Un interruptor "Resaltar ruta crítica" pone borde azul marino grueso (`text`) a las barras de la ruta crítica y atenúa las demás. Al tocar una barra se abre la misma ficha de la tarea. En celular, los nombres de las tareas quedan fijos a la izquierda, el gráfico se desliza en horizontal y se abre centrado en "Hoy". Sin tareas con dependencias se muestra: "Aún no hay tareas con dependencias. Cuando conectes tareas, verás aquí su cronograma."

## Do's and Don'ts

- Do usar el azul principal solo para la acción más importante de cada pantalla.
- Do acompañar siempre el color con icono y texto.
- Don't usar un acento vivo como color de texto sobre su fondo suave.
- Don't aclarar el azul principal: el botón con texto blanco queda justo sobre el contraste mínimo.
- Don't mezclar esquinas redondeadas y rectas en una misma vista.
- Don't usar más de dos pesos de letra en una misma pantalla.
