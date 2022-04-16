/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up(knex) {
    return knex.schema
    .createTable('actors', (table) => {
        table.bigIncrements('actorCode', { primaryKey: true });
        table.string('name',50).notNullable();
        table.string('lastName',50).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function down(knex) {
  
};
