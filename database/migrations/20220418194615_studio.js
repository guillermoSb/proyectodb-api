/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .alterTable('movies', (table) => {
            table.dropColumn('studioCode')
            table.string('studio')
        })
        .alterTable('series', (table) => {
            table.dropColumn('studioCode')
            table.string('studio')
        });

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

}
