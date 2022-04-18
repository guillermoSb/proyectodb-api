/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .alterTable('movies', (table) => {
            table.dropColumn('directorCode')
            table.string('director')
        })
        .alterTable('series', (table) => {
            table.dropColumn('directorCode')
            table.string('director')
        });

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

}
