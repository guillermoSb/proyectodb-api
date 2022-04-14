/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up(knex) {
    return knex.schema
        .createTable('casting_movies', (table) => {
            table.bigInteger('actorCode').references('actorCode').inTable('actors').onDelete('CASCADE');
            table.bigInteger('movieCode',).references('movieCode').inTable('movies').onDelete('CASCADE');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function down(knex) {
  
};
