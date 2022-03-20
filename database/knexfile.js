import config from '../config.js';
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: 'postgresql',
  connection: {
    host: config.databaseHost,
    database: config.databaseName,
    user: config.databaseUser,
    port: 5432

  },
};

