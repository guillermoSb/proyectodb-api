/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('genres').del()
  await knex('genres').insert([
    {name: 'action'},
    {name: 'comedy'},
    {name: 'drama'},
    {name: 'fantasy'},
    {name: 'horror'},
    {name: 'mystery'},
    {name: 'romance'},
    {name: 'thriller'},
    {name: 'western'},
    {name: 'family'},
    {name: 'sci-fy'},
    {name: 'adventure'},
  ]);
};
