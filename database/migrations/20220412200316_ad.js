/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('ads', (table) => {
            table.bigIncrements('adCode', { primaryKey: true });
            table.string('title').notNullable();
            table.text('url').notNullable();
            table.dateTime('publishedAt').defaultTo(knex.fn.now())
            table.bigInteger('advertiserCode').references('advertiserCode').inTable('advertisers')
        });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('ads')
};