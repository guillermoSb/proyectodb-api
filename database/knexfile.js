// Update with your config settings.
import config from '../config.js';
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
const development = {
  client: 'postgresql',
  connection: {
    host: config.databaseHost,
    database: config.databaseName,
    user: config.databaseUser,
    password: config.databasePassword,
    port: config.databasePort,
  },
  migrations: {
    tableName: 'migrations',
    migrations: {
      tableName: 'migrations'
    }
  }
};

export default development;

