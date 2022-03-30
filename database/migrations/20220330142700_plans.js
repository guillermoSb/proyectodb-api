/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('plans', (table) => {
            table.string('name', { primaryKey: true });
            table.double('price').notNullable();
            table.integer('profileCount').notNullable();
            table.integer('adFrequency').notNullable();
        })

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('plans');
}
