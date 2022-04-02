/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('studios').del()
  await knex('studios').insert([
    { name: 'Walt Disney Pictures', country: 'EEUU' },
    { name: 'Pixar Animation Studios', country: 'EEUU' },
    { name: 'Warner Bros Pictures', country: 'EEUU' },
    { name: 'Paramount Pictures', country: 'EEUU' },
    { name: 'Universal Pictures', country: 'EEUU' },
    { name: '20th Century Studios', country: 'EEUU' },
    { name: 'Summit Entretainment', country: 'EEUU' },
    { name: 'Lions Gate', country: 'EEUU' },
  ]);
};
