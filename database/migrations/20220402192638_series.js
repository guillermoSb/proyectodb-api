/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema
        .createTable('series', (table) => {
            table.bigIncrements('seriesCode', { primaryKey: true });
            table.string('genre').notNullable().references('name').inTable('genres').onDelete('SET NULL');
            table.string('categories').notNullable().references('name').inTable('categories').onDelete('SET NULL');
            table.integer('studioCode').notNullable().references('studioCode').inTable('studios').onDelete('SET NULL');
            table.integer('directorCode').notNullable().references('directorCode').inTable('directors').onDelete('SET NULL');
            table.string('title', 50).notNullable();
            table.integer('episodeCount').notNullable();
            table.date('publishedAt').notNullable();
            table.decimal('rating', 3, 1).notNullable();
            table.integer('ratingCount').notNullable().defaultTo(0);
            table.integer('seasonCount').notNullable().defaultTo(0);
            table.text('description');
            table.text('coverUrl');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable('series');
};


genre	category	studioId	directorId	title	episodeCount	publishedAt	rating	ratingCount	description	coverUrl	seasonCount