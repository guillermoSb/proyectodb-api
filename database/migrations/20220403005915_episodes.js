/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('episodes', (table) => {
            table.bigIncrements('episodeCode', { primaryKey: true });
            table.string('name').notNullable();
            table.string('season').notNullable();
            table.bigint('seriesCode').notNullable().references('seriesCode').inTable('series').onDelete('SET NULL');
            table.text('description');
            table.text('url').notNullable();
            table.integer('duration').notNullable();
            table.date('datePublished').notNullable();
        });
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('episodes');
};


