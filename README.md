# 🏥 MediCalma

<div align="center">

![License](https://img.shields.io/badge/License-MIT-green.svg)
![React](https://img.shields.io/badge/React-19.1-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-11.7-FFCA28?logo=firebase&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?logo=tailwind-css&logoColor=white)

**Una aplicación de bienestar mental diseñada para mejorar la salud emocional a través de ejercicios de respiración y meditación.**

[Demo en vivo](https://medicalma-iuva.web.app) | [Reportar un problema](https://github.com/MiloAgudelo/medicalma/issues)

</div>

## 📋 Tabla de Contenidos

- [Visión general](#-visión-general)
- [Características](#-características)
- [Tecnologías](#-tecnologías)
- [Comenzando](#-comenzando)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Despliegue](#-despliegue)
- [Contribuir](#-contribuir)
- [Licencia](#-licencia)

## 🔍 Visión general

MediCalma es una aplicación web enfocada en el bienestar mental que ofrece ejercicios de respiración guiada, meditación y seguimiento del progreso. La plataforma está diseñada para ayudar a los usuarios a reducir el estrés, mejorar su concentración y aumentar su bienestar general a través de módulos interactivos y ejercicios prácticos.

## ✨ Características

- 🔐 **Autenticación segura** - Sistema de login/registro con Firebase Auth y Google
- 🧘 **Ejercicios de bienestar** - Acceso a ejercicios de respiración y meditación guiada
- 📊 **Seguimiento de progreso** - Monitoreo de los módulos y ejercicios completados
- 📝 **Diario de reflexión** - Funcionalidad para registrar pensamientos y emociones
- 🎓 **Módulos educativos** - Contenido organizado en módulos de aprendizaje sobre bienestar mental
- 🌟 **Plan premium** - Acceso a funcionalidades avanzadas mediante suscripción
- 📱 **Diseño responsivo** - Experiencia óptima en cualquier dispositivo

## 🛠 Tecnologías

- **Frontend**: React 19, TypeScript, Tailwind CSS 4
- **Backend**: Firebase (Autenticación, Firestore, Hosting)
- **Herramientas**: Vite, ESLint, PWA

## 🚀 Comenzando

### Prerrequisitos

- Node.js (versión 18 o superior)
- pnpm

### Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/MiloAgudelo/medicalma.git
   cd medicalma
   ```

2. Instala las dependencias:
   ```bash
   pnpm install
   ```

3. Configura variables de entorno:
   Crea un archivo `.env` basado en `.env.example` con tus credenciales de Firebase.

4. Inicia el servidor de desarrollo:
   ```bash
   pnpm dev
   ```

## 📁 Estructura del proyecto

```
medicalma/
├── public/          # Archivos estáticos
├── src/
│   ├── assets/      # Recursos estáticos (imágenes, etc.)
│   ├── components/  # Componentes reutilizables
│   ├── context/     # Contextos de React
│   ├── firebase/    # Configuración y servicios de Firebase
│   ├── hooks/       # Custom React hooks
│   ├── pages/       # Componentes de página
│   ├── routes/      # Configuración de rutas
│   ├── types/       # Definiciones de TypeScript
│   ├── utils/       # Funciones de utilidad
│   ├── App.tsx      # Componente principal
│   ├── App.css      # Estilos principales
│   ├── index.css    # Estilos globales
│   └── main.tsx     # Punto de entrada
├── firestore.rules  # Reglas de seguridad de Firestore
├── firebase.json    # Configuración de Firebase
└── LICENSE          # Archivo de licencia MIT
```

## 🌩 Despliegue

Para desplegar la aplicación en Firebase:

```bash
pnpm firebase:deploy
```

Esto construirá el proyecto y lo desplegará a Firebase Hosting y aplicará las reglas de seguridad de Firestore.

## 👥 Contribuir

¡Las contribuciones son bienvenidas! Si quieres contribuir:

1. Haz fork del proyecto
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Haz push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

Por favor, asegúrate de seguir nuestro código de conducta y de probar tus cambios antes de enviarlos.

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT de Camilo Agudelo Jaramillo - ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  Hecho con ❤️ por el equipo de MediCalma
</div>
