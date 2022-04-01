/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('movies', (table) => {
        table.bigIncrements('moviesCode', { primaryKey: true });
        table.string('genre').notNullable();
        table.string('category').notNullable();
        table.integer('studioCode').notNullable();
        table.string('directorCode').notNullable();
        table.string('title',50).notNullable();
        table.text('description');
        table.decimal('duration',5,2).notNullable();
        table.date('publishedAt').notNullable();
        table.text('description');
        table.smallint('rating');
        table.integer('ratingCount');
        table.text('coverUrl');
        })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
