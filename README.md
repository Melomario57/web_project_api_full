# 🌐 PicGallery — Full Stack Web Application (MERN)

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)

Aplicación web interactiva _full stack_ que permite a los usuarios registrarse, iniciar sesión, compartir publicaciones con imágenes, interactuar dando "me gusta" y gestionar su información de perfil.

El proyecto integra un backend con arquitectura RESTful robusta, autenticación basada en tokens JWT, validación estricta de esquemas, registro estructurado de eventos (logging) y un cliente reactivo desarrollado con React y empaquetado mediante Vite.

---

## 🔗 Demo en Producción

- **Sitio Web Oficial:** [https://picgallery.duckdns.org](https://picgallery.duckdns.org)
- **Protocolo de Seguridad:** HTTPS / TLS (Certificado SSL emitido por Let's Encrypt / Certbot)

---

## 🚀 Características Principales

### 🔒 Autenticación y Seguridad

- **Registro e Inicio de Sesión:** Manejo seguro de contraseñas mediante hashing criptográfico con `bcryptjs`.
- **Protección de Rutas:** Middleware de autorización mediante `JSON Web Tokens (JWT)`.
- **Protección de Datos Sensibles:** Filtro explícito en consultas de MongoDB para prevenir la exposición de hashes de credenciales.
- **Seguridad de Red:** Gestión de cabeceras `CORS` parametrizadas por entorno para restringir orígenes no autorizados.

### 🛡️ Validación y Manejo de Errores

- **Validación de Solicitudes:** Integración de `celebrate` y `Joi` para validar payloads entrantes (`body`, `params`, `headers`) antes de alcanzar los controladores.
- **Validación de Esquemas:** Integración de `validator` en los modelos y esquemas de Mongoose.
- **Manejo Centralizado de Errores:** Respuestas HTTP semánticas y middleware central para la captura de excepciones.

### 📊 Registro y Monitoreo (Logging)

- **Auditoría de Tráfico:** Registro sistemático de solicitudes entrantes y excepciones no controladas mediante `Winston` almacenadas en archivos rotativos (`request.log` y `error.log`).

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

## ☁️ Evolución de la Infraestructura y Despliegue en la Nube

<p align="center">
  <img src="/images/cloud.png" alt="Arquitectura Cloud" width="70%" border="0" />
</p>

El ciclo de vida del despliegue se estructuró en dos etapas cronológicas orientadas a optimizar costos, unificar el acceso y mejorar la entrega de recursos:

### Fase 1: Despliegue Inicial en Google Cloud Platform (GCP)

- **Arquitectura desacoplada:** Despliegue inicial de la API y el frontend en instancias independientes dentro del ecosistema de Google Cloud Platform.
- **Separación de endpoints:** El consumo de servicios se realizaba mediante URLs separadas para el cliente y el servidor backend.
- **Gestión de tráfico cruzado:** Configuración manual y detallada de políticas CORS para enlazar ambos servicios a través de la red de GCP.

### Fase 2: Consolidación en Oracle Cloud Infrastructure (OCI) y Dominio Propio

- **Migración a OCI (Always Free Tier):** Traslado de la infraestructura hacia una máquina virtual dedicada (Ubuntu VPS) en Oracle Cloud, garantizando alta disponibilidad sin costos recurrentes.
- **Resolución de Dominio Dinámico:** Configuración y vinculación de las zonas DNS bajo el subdominio público `picgallery.duckdns.org` apuntando a la IP pública del servidor.
- **Cifrado y Seguridad HTTPS:** Automatización del aprovisionamiento y renovación de certificados TLS/SSL con **Certbot (Let's Encrypt)**, forzando la redirección del tráfico HTTP (puerto 80) al canal cifrado HTTPS (puerto 443).
- **Reverse Proxy con Nginx:** Configuración de Nginx como punto de entrada unificado bajo el mismo origen (_Same-Origin_):
  - Entrega directa y de baja latencia para los archivos estáticos empaquetados de React (`dist/`).
  - Redirección interna y transparente de rutas de la API REST (`/signin`, `/signup`, `/cards`, `/users`) hacia el servidor Node.js/Express en el puerto local `3000`.
- **Gestión de Procesos y Persistencia:** Supervisión del runtime con **PM2** para reinicios automáticos ante fallas y servicio de base de datos **MongoDB** local gestionado por `systemd`.

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

- **Frontend:** React, React Router, Vite, CSS3 / BEM, Fetch API.
- **Backend:** Node.js, Express.js, Mongoose ODM.
- **Bases de Datos:** MongoDB (`mongosh`).
- **Seguridad & Middleware:** JSON Web Tokens (`jsonwebtoken`), `bcryptjs`, `celebrate` (Joi), `validator`, `cors`.
- **Logging & Auditoría:** `winston`, `express-winston`.
- **Servidor & DevOps:** Ubuntu Linux, Nginx (Reverse Proxy), PM2, Certbot (SSL/TLS), DuckDNS.

---

## 💻 Guía de Instalación y Ejecución Local

Sigue estos pasos para ejecutar el proyecto en tu entorno local de desarrollo.

### 📋 Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 18 o superior recomendada)
- [MongoDB Community Server](https://www.mongodb.com/try/download/community) corriendo localmente en el puerto `27017` o una instancia en la nube (MongoDB Atlas).
- [Git](https://git-scm.com/)

---

### 1. Clonar el repositorio

```bash
git clone [https://github.com/Melomario57/web_project_api_full.git](https://github.com/Melomario57/web_project_api_full.git)
cd web_project_api_full
```

## 2. Configurar y levantar el Backend

Entrar a la carpeta backend e instalar dependencias:

```bash
cd backend
npm install
```

Crear archivo de variables de entorno. Crea un archivo llamado `.env` dentro de la carpeta `backend/`:

```env
PORT=3000
NODE_ENV=development
MONGO_URI=mongodb://127.0.0.1:27017/mariodb
ALLOWED_ORIGIN=http://localhost:5173
JWT_SECRET=tu_clave_secreta_de_desarrollo
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
# O mediante ejecución directa:
# node app.js
```

_El servidor backend quedará escuchando en `http://localhost:3000`._

---

## 3. Configurar y levantar el Frontend

Abre una nueva terminal en la raíz del proyecto.

Entrar a la carpeta frontend e instalar dependencias:

```bash
cd frontend
npm install
```

Crear archivo de variables de entorno. Crea un archivo llamado `.env` dentro de la carpeta `frontend/`:

```env
VITE_BASE_URL=http://localhost:3000
```

Iniciar el servidor cliente:

```bash
npm run dev
```

_La aplicación estará disponible en el navegador en `http://localhost:5173`._

---

## 📄 Scripts Disponibles

### Backend (`/backend`)

- `npm run dev`: Inicia el servidor con recarga automática ante cambios.
- `npm start`: Inicia la aplicación en modo producción.

### Frontend (`/frontend`)

- `npm run dev`: Arranca el entorno local con HMR de Vite.
- `npm run build`: Empaqueta y minifica el código para producción en la carpeta `/dist`.
- `npm run preview`: Previsualiza localmente el build generado.

---

## 👤 Autor

**Mario** — Desarrollador Web Full Stack

- **GitHub:** [@Melomario57](https://github.com)
