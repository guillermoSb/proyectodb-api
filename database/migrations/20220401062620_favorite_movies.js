/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up(knex) {
    return knex.schema
    .createTable('favorites_movies', (table) => {
        table.bigInteger('profileCode').references('profileCode').inTable('profiles').onDelete('CASCADE');
        table.bigInteger('movieCode',).references('movieCode').inTable('movies').onDelete('CASCADE')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function down(knex) {
  
};