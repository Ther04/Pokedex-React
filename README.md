# Pokedex App

El proyecto esta construido con las siguientes herramientas

* **Core:** React + TypeScript
* **BuildTool:** Vite
* **UI:** Material UI + CSS
* **Enrutado:** React Router 
* **Estado Global:** Context + LocalStorage
* **Peticiones HTTP:** Axios
* **Graficos y Datos** Recharts y Data Grid 

## Arquitectura del Proyecto

El proyecto sigue una Arquitectura Basada en Componentes, la idea es tener una clara separacion de las responsabilidades de cada uno de los Archivos o Componentes.

### Estructura de Carpetas

* **api:** Se encarga de la gestion de la PokeApi dentro de la web
* **components** Componentes Reutilizables
* **pages** Componentes que representan pantallas completas ('home', 'favorites', 'details')
* **context** Maneja el estado global de la web, Se utiliza FavoriteContext para acceder a la lista de pokemon favoritos desde cual lugar de la web
* **types** Se definen las interfaces para no tener problemas de tipado
* **utils** Distintas Utilidades que se usan a lo largo de la web para distintos procesos como tipar los nombres con la primera letra en mayuscula
* **theme** Configuracion personalizada que se muestra en el tema y en los componentes de MUI

## Proceso de Instalacion y Ejecucion

1. **Instalar Dependencias:** 
Puedes instalar todas las dependencias del proyecto usando el comando 
```bash
npm install
```
*(este comando leera el archivo package.json el cual tiene las dependencias correspondientes del proyecto)

2. **Ejecutar**
```bash
npm run dev
```
Con este comando se ejecuta el proyecto de manera local

