/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {title: '', description: '', duration: '',genre: '', category: '',studioCode: '', directorCode: '',
    publishedAt: '', rating: '', ratingCount: '', coverUrl: '' },
    {title: '', description: '', duration: '',genre: '', category: '',studioCode: '', directorCode: '',
    publishedAt: '', rating: '', ratingCount: '', coverUrl: '' },
    {title: '', description: '', duration: '',genre: '', category: '',studioCode: '', directorCode: '',
    publishedAt: '', rating: '', ratingCount: '', coverUrl: '' },
  ]);
};
