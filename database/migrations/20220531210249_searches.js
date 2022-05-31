/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('searches', (table) => {
            table.dateTime('date').defaultTo(knex.fn.now());
            table.text('search').notNullable()
        })

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema
        .dropTable('searches')
}
