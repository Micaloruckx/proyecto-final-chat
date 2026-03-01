# WhatStark

Trabajo Integrador Final de Frontend (1er llamado)

Aplicación web de mensajería inspirada en WhatsApp, desarrollada en React, con login personalizado, listado de chats, vista de conversación, perfil de usuario, tema claro/oscuro y diseño responsive.

Como propuesta diferencial, el proyecto adapta esa base a una temática inspirada en Game of Thrones, con una narrativa alternativa orientada al entretenimiento. Se incorporó una lógica de interacción donde la persona usuaria participa como un personaje “infiltrado” dentro de la trama del chat. Para estos resultados se optó por la generación + selección de personajes, diseño de historias y personalización visual del entorno (por ejemplo, fondo del chat).

---

> Demo y repositorio

- Deploy: https://proyecto-final-feutn-whatstark.vercel.app/
- GitHub: https://github.com/Micaloruckx/proyecto-final-chat

---

> Desafío elegido

Se eligió construir una app de mensajería tipo WhatsApp ("WhatStark") para aplicar lo aprendido:

- Componentización en React
- Manejo de estado global y local
- Navegación con rutas
- Formularios
- Responsive design y accesibilidad

---

> Tecnologías y librerías usadas

- React 19
- Vite
- React Router DOM
- React Icons
- PropTypes
- CSS modular por componente

---

> Extensiones de VS Code útiles

Durante el desarrollo se utilizaron (y/o se recomiendan) las siguientes extensiones para mejorar productividad, calidad y mantenimiento del código:

- **GitHub Copilot** (`GitHub.copilot`) y **GitHub Copilot Chat** (`GitHub.copilot-chat`): asistencia en implementación, refactor y resolución de errores.
- **ESLint** (`dbaeumer.vscode-eslint`): detección temprana de problemas de estilo y calidad directamente en el editor.
- **Formateador nativo de VS Code** (Format Document): se utilizó el formateo integrado del editor para mantener legibilidad y uniformidad, sin depender de Prettier (no me resultó de mi estilo).
- **GitLens** (`eamodio.gitlens`): trazabilidad de cambios, historial y contexto de autoría sobre archivos y líneas.

Estas herramientas complementan el flujo de trabajo local y reducen fricción entre iteraciones de desarrollo y deploy.

---

> Funcionalidades principales

- Login con nickname + selección de avatar
- Pantalla principal de chats
- Vista de conversación con burbujas de mensajes
- Perfil de usuario
- Tema claro/oscuro
- Búsqueda de chats con colapso de no coincidentes
- Menú lateral con acciones de perfil/cierre de sesión
- Comportamiento responsive mobile/tablet/desktop

---

> Cumplimiento de requisitos del TP

- [x] Deploy funcional (Vercel)
- [x] Código subido a GitHub
- [x] README con descripción y stack
- [x] Aplicación responsive (320px a 2000px)
- [x] Estilos accesibles (contrastes y legibilidad)
- [x] Desarrollo en React
- [x] Uso de estados
- [x] Uso de Context API
- [x] Routing con `react-router-dom`
- [x] Uso de al menos 1 formulario (login)
- [x] Uso de componentes reutilizables
- [x] Flujo con 2+ páginas (`/login`, `/`, `/profile/:userId`)
- [x] Uso de parámetros de ruta con `useParams`
- [x] Criterios de código (KISS/DRY en estructura y helpers)

---

> Estructura general

- `src/screens/LoginScreen` → login y acceso
- `src/screens/ChatScreen` → layout principal de mensajería
- `src/screens/ProfileScreen` → perfil de usuario
- `src/components` → nav, sidebar, chat, inputs, burbujas
- `src/context/ContactContext.jsx` → estado global de la app
- `src/data/contactData.js` → datos mock de usuarios/chats/mensajes

---

> Cómo correr el proyecto en local

```bash/PowerShell
npm install
npm run dev
```

Build de producción:

```bash/PowerShell
npm run build
```

---

> Decisiones y dificultades

Durante el desarrollo se trabajó especialmente en:

- Ajustes finos de responsive para mobile
- Consistencia visual de estados hover/selección
- Manejo de rutas de assets para evitar errores por mayúsculas/minúsculas en deploy (Windows vs Linux/Vercel)
- Iteraciones de UX para que la app se sienta similar a un flujo real de mensajería
- Se evaluó integrar una API de IA para respuestas del chat, pero no se llegó a implementar en esta entrega por tiempos y por priorizar que el flujo principal funcionara estable.
- Queda como mejora futura del proyecto: sumar esa integración de IA en una próxima versión.

---

> Aprendizajes

Durante el desarrollo del proyecto, los principales aprendizajes fueron:

0. **React y reutilización de componentes/comportamientos**
	- Diseñar componentes reutilizables permitió mantener consistencia visual y lógica entre distintas screens/pages.
	- Reaprovechar estructura y comportamiento redujo duplicación y facilitó iterar más rápido.

1. **Case-sensitive entre Local vs Vercel (Linux)**
	- Un aprendizaje clave fue que Vercel/Linux diferencia mayúsculas y minúsculas en rutas, mientras que Windows suele ser más permisivo.
	- Esto impacta directamente en assets (imágenes, logos, avatares): conviene definir una nomenclatura estandarizada desde el inicio.

2. **Uso de Vercel para deploy continuo**
	- Se trabajó con deploys de Preview/Production para validar cambios de forma incremental sin romper la versión pública.
	- También se entendió mejor la relación entre deploy, dominio y configuración del proyecto.

3. **Uso de ESLint como red de seguridad**
	- ESLint ayudó a detectar errores y mantener una base de código consistente.
	- Configurar correctamente qué carpetas analizar (por ejemplo evitar `dist/`) fue clave para no obtener falsos errores.

4. **Pruebas continuas entre deploys**
	- Probar en cada iteración (local + build + deploy) evitó acumular errores y facilitó aislar causas reales.
	- La validación frecuente mejoró estabilidad y confianza antes de publicar cambios.

5. **Trabajo colaborativo con IA (Copilot)**
	- Aprendí a traducir problemas de UX y bugs técnicos en pedidos concretos, para iterar más rápido y con menos fricción.
	- Aprendí a validar cada cambio con evidencia (estado de Git, lint, build, deploy) y a priorizar soluciones de raíz en lugar de parches rápidos.

6. **Posibilidades de uso de audio en UX**
	- Integrar audio en 2 pantallas puntuales (login/loading) ayuda a reforzar identidad temática de la app.
	- También aprendí que se puede controlar volumen máximo, delays de inicio y fallback por interacción del usuario para cumplir políticas de autoplay en navegadores.

---

> Guía de consistencia visual (inputs y botones)

Para mantener una UI consistente entre navegadores (especialmente en mobile), el proyecto define estas reglas:

- **Sin estilos por defecto del sistema en taps/clicks:** se desactiva el tap highlight nativo (`-webkit-tap-highlight-color: transparent`) en elementos interactivos.
- **Focus controlado por componente:** los inputs principales (`Login`, `Search`, `MessageInput`) usan estilos de `:focus-visible` propios (borde/acento del tema), evitando anillos inesperados del navegador.
- **Autofill normalizado:** se overridea `-webkit-autofill` para que el fondo y color de texto respeten tokens de tema y no aparezca el fondo celeste/amarillo del navegador.
- **Tokens de tema obligatorios:** fondos, bordes y texto deben usar variables CSS (`--color-bg-surface`, `--color-border-strong`, `--color-accent`, etc.), evitando hardcodeo de colores.
- **Compatibilidad de assets en deploy Linux:** rutas y extensiones de imágenes deben respetar exactamente mayúsculas/minúsculas reales de `public/`.

---

> Autoría

Proyecto realizado por **Mica Loruckx** para el Trabajo Integrador Final de Frontend.
