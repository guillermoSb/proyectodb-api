/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('userSeriesActivities', (table) => {
            table.bigInteger('profileCode').references('profileCode').inTable('profiles').onDelete('CASCADE');
            table.bigInteger('episodeCode',).references('episodeCode').inTable('episodes').onDelete('CASCADE');
            table.dateTime('startedAt').defaultTo(knex.fn.now())
            table.datetime('endedAt');
            table.boolean('finished').defaultTo(false);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('userSeriesActivities')
};