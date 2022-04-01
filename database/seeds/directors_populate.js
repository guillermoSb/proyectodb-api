/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('directors').del()
  await knex('directors').insert([
    {name: '', lastName: ''},
    {name: '', lastName: ''},
    {name: '', lastName: ''},
  ]);
};
