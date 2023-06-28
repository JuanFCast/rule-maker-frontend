﻿# rule-maker-frontend
# Cómo ejecutar este proyecto

Para ejecutar este proyecto en tu computadora local, sigue los siguientes pasos:

## Pre-requisitos

- Node.js y npm. Si no los tienes instalados, puedes descargar Node.js (que viene con npm) desde [aquí](https://nodejs.org/en/download/).
- Git. Si no lo tienes instalado, puedes descargarlo desde [aquí](https://git-scm.com/downloads).

## Pasos

1. Clona el repositorio en tu computadora local. Para hacerlo, abre una terminal y ejecuta el siguiente comando:

   ```bash
   git clone https://github.com/JuanFCast/rule-maker-frontend.git
Navega al directorio del proyecto:

bash
Copy code
cd rule-maker-frontend/frontend
Instala las dependencias del proyecto:

bash
Copy code
npm install
Instala las dependencias adicionales del proyecto:

bash
Copy code
npm i react-router-dom sass  
npm install axios
Inicia el servidor de desarrollo:

bash
Copy code
npm start
Este comando iniciará la aplicación en modo de desarrollo. Abre http://localhost:3000 para ver la aplicación en tu navegador. La página se recargará si haces modificaciones en el código fuente.

Para ejecutar las pruebas del proyecto, utiliza el siguiente comando:

bash
Copy code
npm test
Este comando lanzará el corredor de pruebas en el modo interactivo de observación.

Para crear una versión de producción de la aplicación, utiliza el siguiente comando:

bash
Copy code
npm run build
Este comando construirá la aplicación para producción en la carpeta build. Agrupará correctamente React en modo de producción y optimizará la construcción para obtener el mejor rendimiento.

Para personalizar la configuración de construcción, utiliza el siguiente comando:

bash
Copy code
npm run eject
Este comando copiará todos los archivos de configuración y las dependencias transitivas (webpack, Babel, ESLint, etc.) directamente en tu proyecto para que tengas un control total sobre ellos.

r
