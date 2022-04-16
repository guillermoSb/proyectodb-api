/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('ad_movie_relationships', (table) => {
            table.bigInteger('adCode').notNullable().references('adCode').inTable('ads').onDelete('cascade');
            table.bigInteger('movieCode').notNullable().references('movieCode').inTable('movies').onDelete('cascade');
        })
        .createTable('ad_series_relationships', (table) => {
            table.bigInteger('adCode').notNullable().references('adCode').inTable('ads').onDelete('cascade');
            table.bigInteger('seriesCode').notNullable().references('seriesCode').inTable('series').onDelete('cascade');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema
        .dropTable('ad_movie_relationships')
        .dropTable('ad_series_relationships')
};
