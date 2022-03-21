/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('users', function (table) {
            table.bigIncrements('userCode', { primaryKey: true });
            table.string('name', 255).notNullable();
            table.string('user', 20).notNullable().unique();
            table.string('email').notNullable().unique();
            table.string('password').notNullable();
            table.string('name');
            table.string('name');
            table.boolean('active').defaultTo(true, { constraintName: 'df_users_active' })
        })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {

}
