/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up(knex) {
    return knex.schema
        .createTable('award_movies', (table) => {
            table.bigInteger('awardCode').references('awardCode').inTable('award').onDelete('CASCADE');
            table.bigInteger('movieCode',).references('movieCode').inTable('movies').onDelete('CASCADE');
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function down(knex) {
  
};
