Universidad del Valle de Guatemala

# Proyecto 02 - Bases de Datos 1

Integrantes

- Sara Maria Paguaga
- Juan Carlos Baján
- Guillermo Santos

## Instalacion

- Instalar dependencias con `npm install`
- Instalar nodemon con `npm install -g nodemon`
- Asegurarse de tener un archivo `.env` en el folder root.
- Ejecutar las migraciones con el comando de abajo.
- Iniciar el servidor en localhost con `npm run dev`

## Comandos

- Crear migracion `npx knex migrate:make <migration_name> --esm --knexfile "database/knexfile.js"`
- Correr migracion `npx knex migrate:latest --esm --knexfile "database/knexfile.js"`
