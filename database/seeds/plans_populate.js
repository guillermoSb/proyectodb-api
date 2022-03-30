/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('plans').del()
  await knex('plans').insert([
    { name: 'basic', price: 0, profileCount: 1, adFrequency: 15 },
    { name: 'standart', price: 8, profileCount: 4, adFrequency: 0 },
    { name: 'standart', price: 8, profileCount: 8, adFrequency: 0 },
  ]);
}
