/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('userMovieActivities', (table) => {
            table.bigInteger('profileCode').references('profileCode').inTable('profiles').onDelete('CASCADE');
            table.bigInteger('movieCode',).references('movieCode').inTable('movies').onDelete('CASCADE');
            table.dateTime('startedAt');
            table.datetime('endedAt');
            table.boolean('finished').defaultTo(false);
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('userMovieActivities')
};