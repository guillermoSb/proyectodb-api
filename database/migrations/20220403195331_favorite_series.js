/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('favorite_series', (table) => {
            table.bigInteger('profileCode').references('profileCode').inTable('profiles').onDelete('CASCADE');
            table.bigInteger('seriesCode',).references('seriesCode').inTable('series').onDelete('CASCADE')
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('favorite_series')
};