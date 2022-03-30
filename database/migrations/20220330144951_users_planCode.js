/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .alterTable('users', (table) => {
            table.string('plan').references('name').inTable('plans').onDelete('SET NULL').defaultTo('basic');
        });

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

}
