/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up(knex) {
    return knex.schema
    .createTable('studios', (table) => {
        table.bigIncrements('studioCode', { primaryKey: true });
        table.string('name',50).notNullable();
        table.string('country',50).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function down(knex) {
  
};
