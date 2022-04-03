/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 export function up(knex) {
    return knex.schema
    .createTable('movies', (table) => {
        table.bigIncrements('movieCode', { primaryKey: true });
        table.string('genre').notNullable().references('name').inTable('genres').onDelete('SET NULL');
        table.string('categories').notNullable().references('name').inTable('categories').onDelete('SET NULL');
        table.integer('studioCode').notNullable().references('studioCode').inTable('studios').onDelete('SET NULL');
        table.integer('directorCode').notNullable().references('directorCode').inTable('directors').onDelete('SET NULL');
        table.string('title',50).notNullable();
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
 export function down(knex) {
  
};
