// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
export const development = {
  client: 'postgresql',
  connection: {
    host: 'localhost',
    database: 'proyecto02',
    user: 'postgres',
    port: 5432

  },
};

