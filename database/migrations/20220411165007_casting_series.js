/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up(knex) {
    return knex.schema
        .createTable('casting_series', (table) => {
            table.bigInteger('actorCode').references('actorCode').inTable('actors').onDelete('CASCADE');
            table.bigInteger('seriesCode',).references('seriesCode').inTable('series').onDelete('CASCADE');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function down(knex) {
  
};
