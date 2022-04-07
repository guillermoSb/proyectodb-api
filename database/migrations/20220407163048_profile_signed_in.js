/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .alterTable('profiles', (table) => {
            table.boolean('signedIn').defaultTo(false).notNullable()
        });

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

}
