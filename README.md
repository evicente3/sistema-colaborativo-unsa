# Sistema de Gestión y Seguimiento de Tareas para Mitigar Retrasos en Trabajos Colaborativos

**Universidad Nacional de San Agustín de Arequipa (UNSA)**  
**Facultad de Ingeniería de Producción y Servicios (FIPS)**  
**Escuela Profesional de Ingeniería de Sistemas (EPIS)**  
*Feria de Proyectos 2026 -- Categoría I (Nivel Básico)*

---

## 👥 Equipo de Trabajo e Integrantes

| N.° | Apellidos y Nombres | Correo Institucional | Área Principal |
| :---: | :--- | :--- | :--- |
| 1 | **Mamani Huayhua, Denny Joaquin** | `dmamanihuayh@unsa.edu.pe` | Arquitectura Backend y Modelos de Datos |
| 2 | **Vicente Medina, Eder Lucio** | `evicentem@unsa.edu.pe` | Coordinación del Proyecto y Desarrollo Frontend |
| 3 | **Salas Zegarra, Marco Antonio** | `msalasze@unsa.edu.pe` | Calendario Gantt y Lógica de Retrasos |
| 4 | **Neyra Chambilla, Rodrigo Enrique** | `rneyra@unsa.edu.pe` | Pruebas Unitarias y Evaluación SUS |
| 5 | **Jala Paricanaza, Ronald David** | `rjala@unsa.edu.pe` | Diseño UI/UX (Tailwind CSS) y Documentación |

* **Docente Asesor:** **Mg. William Milton Bornas Rios** (`wbornas@unsa.edu.pe`)

---

## 📁 Estructura del Proyecto

El directorio está organizado en la documentación completa de lo realizado y las carpetas de trabajo del sistema:

```text
sistema-colaborativo-unsa/
│
├── AGENTS.md                                    # Reglas de trabajo y flujo SDD para agentes
├── README.md                                    # Ficha formal del proyecto e integrantes
│
├── specs/                                       # Constitución y especificaciones (SDD)
│   ├── mission.md                               # Propósito, alcance y reglas del producto
│   ├── tech-stack.md                            # Stack, arquitectura y convenciones
│   └── roadmap.md                               # Backlog de historias de usuario por fases
│
├── docs/                                        # Documentación completa y entregables
│   ├── articulo-ieee/                           # Artículo de 3 páginas en formato IEEE
│   │   ├── main.tex                             # Código fuente LaTeX del artículo
│   │   ├── main.pdf                             # PDF compilado del artículo
│   │   ├── referencias.bib                      # 7 Referencias académicas oficiales (DOI)
│   │   └── proyecto_overleaf.zip                # Paquete listo para importar en Overleaf
│   │
│   ├── estado-del-arte/                         # Entregable solicitado por el docente
│   │   ├── Estado_del_Arte_Estrategia_de_Busqueda.docx  # Documento Word oficial
│   │   └── referencias-pdf/                     # PDFs de los 7 artículos analizados
│   │
│   └── informe-avance/                          # Informe de avance del equipo (tono humano y formal)
│       ├── informe_avance.tex                   # Versión LaTeX con portada formal UNSA
│       └── informe_avance.md                    # Versión Markdown para vista rápida
│
├── sistema/                                     # Carpeta donde se desarrollará el software
│   └── frontend/                                # Aplicación web (React + TypeScript + Tailwind + Supabase)
│
└── presentacion/                                # Material de exposición para la feria
    └── presentacion_feria_2026.pptx             # Diapositivas oficiales
```

---

## 🛠️ Stack Tecnológico

- **Frontend:** React con TypeScript y Tailwind CSS (diseño adaptable a escritorio y celular).
- **Backend y Base de Datos:** Supabase (PostgreSQL, autenticación con Google y Row-Level Security).
- **Lógica de Dominio:** Módulo independiente de la interfaz y de la base de datos (precedencia, bloqueo automático, ruta crítica y alertas), con pruebas unitarias.

---

## 📄 Resumen de Entregables Completados

1. **Artículo IEEE (LaTeX y PDF):** En `docs/articulo-ieee/main.tex` y `docs/articulo-ieee/proyecto_overleaf.zip`.
2. **Estado del Arte y Estrategia de Búsqueda (Word .docx):** En `docs/estado-del-arte/Estado_del_Arte_Estrategia_de_Busqueda.docx`.
3. **Informe de Avance del Equipo (LaTeX y Markdown):** En `docs/informe-avance/informe_avance.tex`.
4. **Artículos Científicos de Respaldo (PDFs):** En `docs/estado-del-arte/referencias-pdf/`.
5. **Presentación de Diapositivas:** En `presentacion/presentacion_feria_2026.pptx`.
