/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up(knex) {
    return knex.schema
    .createTable('award_series', (table) => {
        table.bigInteger('awardCode').references('awardCode').inTable('award').onDelete('CASCADE');
        table.bigInteger('seriesCode',).references('seriesCode').inTable('series').onDelete('CASCADE');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function down(knex) {
  
};
