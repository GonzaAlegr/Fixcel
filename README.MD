# 📌 FIXCEL – Sistema de Login y Gestión

## Proyecto realizado en Node.js + React + SQLite3

Este es un proyecto áulico desarrollado para ejemplificar el uso de tokens de seguridad (JWT) junto a la encriptación de contraseñas, estructurado en Frontend + Backend con arquitectura modular.

## 🦋 Datos del curso
- Materia: Proyecto, diseño e implementación de sistemas computacionales
- Curso: 7mo 1ra
- Grupo de taller: 7.1
- Docente: Gareis Pablo

### 🍻 Subdivisión
- Frontend
- Backend
- Documentación
- Marketing

## 🏡 Tecnologías utilizadas
- Node.js
- React + Javascript
- Nodemon
- Dotenv
- SQLite3
- Express
- Axios

## 🌟 Arquitectura del sistema
```
FIXCEL
├─ Client
│  ├─ node_modules        
│  ├─ public            
│  ├─ src                 
│  │  ├─ Components       # Componentes reutilizables
│  │  ├─ Pages            # Páginas completas del sistema
│  │  ├─ Global           # Recursos globales 
│  │  └─ Layouts.css      # Archivo principal de estilos CSS 
│  ├─ index.html          # Archivo HTML raíz que monta la app de React
│  ├─ vite.config.js      # Configuración de Vite 
│  ├─ package-lock.json   # Versión exacta de dependencias instaladas
│  └─ package.json        # Información del proyecto y lista de dependencias
│
├─ Server
│  ├─ node_modules
│  ├─ app.js               # Archivo Raíz de BackEnd
│  ├─ src  
│  │  ├─ Controller        # Métodos de la Capa Lógica
│  │  ├─ DataBase          # Creación de Tabla y Base de Datos
│  │  ├─ Img               # Imagen del correo
│  │  ├─ Router            # Rutas de la API
│  │  └─ Utils             # Validación y Token
│  ├─ .env                 # Variables de Entorno
│  ├─ .gitignore           # Evita subir archivos sensibles
│  ├─ package-lock.json
│  └─ package.json
│
└─ README.md
```

## 🔐 Características principales
- Registro de usuarios con contraseña encriptada
- Inicio de sesión con generación de JWT
- Verificación de usuario mediante Token
- Conexión a base de datos SQLite3
- Consumo de API desde React mediante Axios
- Estructura modular Frontend + Backend

## 🚀 Cómo ejecutar el proyecto
```
Backend:
cd Server
npm install
npm start
```
```
Frontend:
cd Client
npm install
npm run dev
```

## 📌 Objetivo del proyecto
Implementar un flujo de autenticación educativo y funcional que permita comprender cómo se integran tecnologías modernas dentro de un entorno académico.

## 📝 Autores
Proyecto desarrollado por estudiantes de 7.1 para la materia Proyecto, diseño e implementación de sistemas computacionales.