# 🌐 Around The US — Full Stack Web Application (MERN)

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

Aplicación web interactiva _full stack_ que permite a los usuarios registrarse, iniciar sesión, compartir publicaciones con imágenes, dar "me gusta" y gestionar su información de perfil.

Este proyecto integra un backend con arquitectura RESTful robusta, autenticación basada en tokens JWT, validación estricta de esquemas, registro estructurado de eventos (logging) y un cliente frontend reactivo desarrollado con React y Vite.

---

## 🔗 Demo en Producción

- **Sitio Web:** [https://myweb.centralpto.com](https://myweb.centralpto.com)

---

## 🚀 Características Principales

### 🔒 Autenticación y Seguridad

- **Registro e Inicio de Sesión:** Manejo seguro de contraseñas mediante hashing con `bcryptjs`.
- **Protección de Rutas:** Middleware de autorización con `JSON Web Tokens (JWT)`.
- **Protección de Datos Sensibles:** Filtro en consultas de MongoDB para evitar la exposición de hashes de contraseñas.
- **Seguridad de Red:** Configuración de `CORS` con listas blancas de orígenes permitidos.

### 🛡️ Validación y Manejo de Errores

- **Validación de Solicitudes:** Integración de `celebrate` y `Joi` para validar payloads (`body`, `params`, `headers`) antes de alcanzar los controladores.
- **Validación de Esquemas:** Integración de `validator` en esquemas de Mongoose.
- **Manejo Centralizado de Errores:** Clases de error personalizadas (`BadRequestError`, `UnauthorizedError`, `NotFoundError`, `ConflictError`, etc.) con respuestas HTTP semánticas.

### 📊 Registro y Monitoreo (Logging)

- **Auditoría de Tráfico:** Registro de solicitudes entrantes y excepciones no controladas mediante `Winston` almacenadas en archivos rotativos (`request.log` y `error.log`).

---

## 📸 Capturas del Proyecto

### 1. Pruebas de Endpoints y Autenticación

<p align="center">
  <img src="/images/Captura de pantalla 2024-12-20 174728.png" alt="Pruebas de autenticación y endpoints" width="85%" border="0" />
</p>

### 2. Configuración de Seguridad y CORS

<p align="center">
  <img src="/images/cors.png" alt="Configuración de CORS" width="85%" border="0" />
</p>

### 3. Configuración de Dominios y DNS

<p align="center">
  <img src="/images/domains.png" alt="Configuración de Dominios" width="85%" border="0" />
</p>

### 4. Flujo de Respuestas y Logs

<p align="center">
  <img src="/images/Captura de pantalla 2024-12-20 174912.png" alt="Logs y Respuestas de la API" width="85%" border="0" />
</p>

---

## ☁️ Infraestructura y Despliegue en la Nube

<p align="center">
  <img src="/images/cloud.png" alt="Arquitectura Cloud" width="70%" border="0" />
</p>

> **Nota sobre el entorno de despliegue:**  
> Inicialmente, el proyecto fue desplegado en una instancia virtual de **Google Cloud Platform (GCP)** durante la etapa de pruebas y configuración de certificados SSL. Actualmente, la arquitectura de producción se migró a **Oracle Cloud Infrastructure (OCI)** en su modalidad _Always Free Tier_, garantizando disponibilidad continua del servidor backend con Node/Express y la base de datos MongoDB.

---

## 🛠️ Tecnologías Utilizadas

<p align="left">
  <img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-original-wordmark.svg" title="Node.js" alt="Node" width="45" height="45"/>&nbsp;&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" title="Express" alt="Express" width="45" height="45"/>&nbsp;&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/mongodb/mongodb-original.svg" title="MongoDB" alt="MongoDB" width="45" height="45"/>&nbsp;&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/javascript/javascript-plain.svg" title="JavaScript" alt="JavaScript" width="45" height="45"/>&nbsp;&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="React" alt="React" width="45" height="45"/>&nbsp;&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/vite/vite-original.svg" title="Vite" alt="Vite" width="45" height="45"/>&nbsp;&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/googlecloud/googlecloud-original.svg" title="Google Cloud" alt="GCP" width="45" height="45"/>&nbsp;&nbsp;
  <img src="https://github.com/devicons/devicon/blob/master/icons/oracle/oracle-original.svg" title="Oracle Cloud" alt="OCI" width="45" height="45"/>
</p>

- **Frontend:** React 18, React Router v7, Vite, CSS3/BEM, Fetch API.
- **Backend:** Node.js, Express.js, Mongoose ODM.
- **Seguridad & Middleware:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `celebrate` (Joi), `validator`, `cors`.
- **Logging:** `winston`, `express-winston`.

---

## 💻 Guía de Instalación y Ejecución Local

Sigue estos pasos para ejecutar el proyecto completo en tu máquina local.

### 📋 Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [MongoDB](https://www.mongodb.com/try/download/community) corriendo localmente en el puerto `27017` o una URI de MongoDB Atlas.
- [Git](https://git-scm.com/)

---

### 1. Clonar el repositorio

```bash
git clone https://github.com/Melomario57/web_project_api_full.git
cd web_project_api_full
```

### 2. Configurar y levantar el Backend

#### Entrar a la carpeta backend

```bash
cd backend
```

#### Instalar dependencias

```bash
npm install
```

#### Crear archivo de variables de entorno

- **En Windows (Git Bash):** `touch .env`
- **En CMD / PowerShell:** Crea manualmente un archivo llamado `.env`

Configura tu archivo `backend/.env` con las siguientes variables:

```env
PORT=3000
NODE_ENV=development
JWT_SECRET=tu_clave_secreta_de_desarrollo
MONGODB_URI=mongodb://localhost:27017/aroundb
```

#### Iniciar el servidor de desarrollo

```bash
npm run dev
# El backend estará escuchando en http://localhost:3000
```

---

### 3. Configurar y levantar el Frontend

Abre una nueva terminal en la raíz del proyecto:

#### Entrar a la carpeta frontend e instalar dependencias

```bash
cd frontend
npm install
```

_(Opcional)_ Si tu frontend requiere configurar la URL base de la API, crea un archivo `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

#### Iniciar el servidor cliente

```bash
npm run dev
# El frontend estará disponible en http://localhost:5173 (o el puerto asignado por Vite)
```

---

### 📄 Scripts Disponibles

#### Backend (`/backend`)

- `npm run dev`: Inicia el servidor con recarga automática usando nodemon.
- `npm start`: Inicia el servidor en modo producción.

#### Frontend (`/frontend`)

- `npm run dev`: Inicia el servidor de desarrollo de Vite.
- `npm run build`: Compila los archivos optimizados para producción en la carpeta `/dist`.
- `npm run preview`: Previsualiza la compilación localmente.

---

### 👤 Autor

**Mario** — Desarrollador Web Full Stack

- **GitHub:** [@Melomario57](https://github.com/Melomario57)
