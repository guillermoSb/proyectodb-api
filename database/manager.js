import knex from 'knex';
import development from './knexfile.js';

export const DatabaseManager = {
    // eslint-disable-next-line no-undef
    knex: knex(development)
}