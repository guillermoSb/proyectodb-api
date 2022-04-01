/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('studios').del()
  await knex('studios').insert([
    {name: '', country: ''},
    {name: '', country: ''},
    {name: '', country: ''},
  ]);
};
