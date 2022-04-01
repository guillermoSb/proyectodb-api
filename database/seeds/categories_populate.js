/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('categories').del()
  await knex('categories').insert([
    { name: 'g', description: 'General Audiences' },
    { name: 'pg', description: 'Parental Guidance Suggested' },
    { name: 'pg-13', description: 'Parents Strongly Cautioned' },
    { name: 'r', description: 'Restricted' },
    { name: 'nc-17', description: 'Adults Only' },
  ]);
};
