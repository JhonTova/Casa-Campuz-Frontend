# Casa Campuz — Frontend

[![build](https://github.com/JhonTova/Casa-Campuz-Frontend/actions/workflows/build.yml/badge.svg)](https://github.com/JhonTova/Casa-Campuz-Frontend/actions/workflows/build.yml)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss&logoColor=white)

Sitio web de una inmobiliaria: catálogo de propiedades con filtros, ficha de cada
propiedad, formularios de contacto y reserva, y un panel de administración para gestionar
propiedades y solicitudes. Consume la API de
[Casa-Campus-Backend](https://github.com/JhonTova/Casa-Campus-Backend).

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Portada con buscador y propiedades destacadas |
| `/propiedades` | Catálogo con filtros |
| `/propiedades/:id` | Ficha de la propiedad y formulario de reserva |
| `/contacto` | Formulario de contacto |
| `/admin/login` | Acceso al panel |
| `/admin` | Panel: resumen, propiedades y solicitudes (ruta protegida) |

## Stack

React 18 · React Router 6 · Vite 5 · Tailwind CSS 3 · Axios · React Toastify · Lucide

## Desarrollo local

Requiere Node.js 20+ y el backend corriendo.

```bash
cp .env.example .env     # ajusta VITE_API_URL si la API no está en localhost:5000
npm install
npm run dev              # http://localhost:3000
```

## Build de producción

```bash
npm run build            # genera dist/
npm run preview          # sirve dist/ en local para revisarlo
```

`VITE_API_URL` se lee en tiempo de build: define su valor de producción antes de
`npm run build`.
