/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('profiles', (table) => {
            table.bigIncrements('profileCode', { primaryKey: true });
            table.bigInteger('userCode').references('userCode').inTable('users').onDelete('SET NULL');
            table.string('name').notNullable();
            table.string('photo');
            table.boolean('active').defaultTo(true, { constraintName: 'df_users_active' }).notNullable();

        })

}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('profiles');
}
