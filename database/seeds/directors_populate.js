/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
 export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('directors').del()
  await knex('directors').insert([
    {name: 'Lee', lastName: 'Unkrich'},
    {name: 'Tim', lastName: 'Burton'},
    {name: 'David', lastName: 'Yates'},
    {name: 'Mike', lastName: 'Mitchell'},
    {name: 'Michael', lastName: 'Bay'},
    {name: 'Rob', lastName: 'Marshall'},
    {name: 'Jennifer', lastName: 'Nelson'},
    {name: 'John', lastName: 'Powell'},
    {name: 'Justin', lastName: 'Lin'},
    {name: 'Bill', lastName: 'Condon'},
    {name: 'James', lastName: 'Howard'},
  ]);
};
