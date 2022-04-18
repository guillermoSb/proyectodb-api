/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .alterTable('users', (table) => {
            table.dateTime('createdAt').defaultTo(knex.fn.now())
            table.string('role').defaultTo('user')
        });

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

}
