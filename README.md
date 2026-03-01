# WhatStark 💬

Trabajo Integrador Final de Frontend (1er llamado)

Aplicación web de mensajería inspirada en WhatsApp, desarrollada en React, con login personalizado, listado de chats, vista de conversación, perfil de usuario, tema claro/oscuro y diseño responsive.

---

## 🌐 Demo y repositorio

- Deploy: https://proyecto-final-feutn-whatstark.vercel.app/
- GitHub: https://github.com/Micaloruckx/proyecto-final-chat

---

## 🧩 Desafío elegido

Se eligió construir una app de mensajería tipo WhatsApp ("WhatStark") para aplicar:

- Componentización en React
- Manejo de estado global y local
- Navegación con rutas
- Formularios
- Responsive design y accesibilidad

---

## 🛠️ Tecnologías y librerías usadas

- React 19
- Vite
- React Router DOM
- React Icons
- PropTypes
- CSS modular por componente

---

## ✨ Funcionalidades principales

- Login con nickname + selección de avatar
- Pantalla principal de chats
- Vista de conversación con burbujas de mensajes
- Perfil de usuario
- Tema claro/oscuro
- Búsqueda de chats con colapso de no coincidentes
- Menú lateral con acciones de perfil/cierre de sesión
- Comportamiento responsive mobile/tablet/desktop

---

## ✅ Cumplimiento de requisitos del TP

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

## 📄 Estructura general

- `src/screens/LoginScreen` → login y acceso
- `src/screens/ChatScreen` → layout principal de mensajería
- `src/screens/ProfileScreen` → perfil de usuario
- `src/components` → nav, sidebar, chat, inputs, burbujas
- `src/context/ContactContext.jsx` → estado global de la app
- `src/data/contactData.js` → datos mock de usuarios/chats/mensajes

---

## 🚀 Cómo correr el proyecto en local

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

---

## 🧠 Decisiones y dificultades (opcional)

Durante el desarrollo se trabajó especialmente en:

- Ajustes finos de responsive para mobile
- Consistencia visual de estados hover/selección
- Manejo de rutas de assets para evitar errores por mayúsculas/minúsculas en deploy (Windows vs Linux/Vercel)
- Iteraciones de UX para que la app se sienta similar a un flujo real de mensajería

---

## 🙌 Autoría

Proyecto realizado por **Mica Loruckx** para el Trabajo Integrador Final de Frontend.
