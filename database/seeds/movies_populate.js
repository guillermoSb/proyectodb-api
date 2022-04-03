/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {
      title: 'Toy Story 3',
      description: 'In the film, Andy Davis, now 17, is leaving for college. Woody, Buzz Lightyear, and the other toys are accidentally donated to a daycare center by Andys mother, and the toys must decide where their loyalties lie.',
      duration: 103,
      genre: 'family',
      categories: 'g',
      studioCode: 1,
      directorCode: 32,
      publishedAt: '06/18/2010',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

    {
      title: 'Alice in Wonderland',
      description: 'Alice, now 19 years old, follows a rabbit in a blue coat to a magical wonderland from her dreams where she is reunited with her friends who make her realise her true destiny.',
      duration: '108',
      genre: 'fantasy',
      categories: 'pg',
      studioCode: 1,
      directorCode: 33,
      publishedAt: '02/25/2010',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

    {
      title: 'Harry Potter and the Deathly Hallows Part 1',
      description: 'After Voldemort takes over the Ministry of Magic, Harry, Ron and Hermione are forced into hiding. They try to decipher the clues left to them by Dumbledore to find and destroy Voldemorts Horcruxes.',
      duration: '146',
      genre: 'fantasy',
      categories: 'pg',
      studioCode: 3,
      directorCode: 34,
      publishedAt: '05/21/2010',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

    {
      title: 'Shrek Firever After',
      description: 'When Shrek realises that no one fears him, Rumpel offers him a shady deal. Thereafter, Shrek gets cast in an alternate reality where everybody is afraid of him but Fiona does not remember him.',
      duration: '93',
      genre: 'comedy',
      categories: 'g',
      studioCode: 4,
      directorCode: 81,
      publishedAt: '11/19/2010',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

    {
      title: 'Transformers: Dark of the Moon',
      description: 'Sam Witwicky and the Autobots must unravel the secrets of a Cybertronian spacecraft hidden on the Moon before the Decepticons can use it for their own evil schemes.',
      duration: '154',
      genre: 'action',
      categories: 'pg-13',
      studioCode: 4,
      directorCode: 82,
      publishedAt: '06/28/2011',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

    {
      title: 'Pirates of the Caribbean: On Stranger Tides',
      description: 'Captain Jack Sparrow sets sail in search of the legendary fountain of youth. His mission puts him up against a mysterious woman from his past, an old enemy Barbossa and the feared pirate, Blackbeard.',
      duration: '137',
      genre: 'adventure',
      categories: 'pg-13',
      studioCode: 1,
      directorCode: 83,
      publishedAt: '05/07/2011',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

    {
      title: 'Kung Fu Panda 2',
      description: 'Dragon Warrior Po takes it upon himself to foil the plans of murderous peacock Shen who intends to conquer China and destroy kung fu. For this, Po has to unveil the mystery of his own past.',
      duration: '90',
      genre: 'family',
      categories: 'g',
      studioCode: 4,
      directorCode: 84,
      publishedAt: '05/26/2011',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

    {
      title: 'Fast Five',
      description: 'Dom and Brian travel from one country to another, trying to throw the authorities off their scent. Now they have to bring their team together one more time while being chased by a federal agent.',
      duration: '130',
      genre: 'action',
      categories: 'r',
      studioCode: 5,
      directorCode: 85,
      publishedAt: '04/29/2011',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

    {
      title: 'Ice Age: Continental Drift',
      description: 'Scrat causes a monumental disaster when his nut chasing leads to a continental drift. Once again, Manny, Diego and Sid experience an adventure while trying to return home.',
      duration: '88',
      genre: 'comedy',
      categories: 'g',
      studioCode: 6,
      directorCode: 86,
      publishedAt: '06/28/2012',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

    {
      title: 'The Twilight Saga: Breaking Dawn – Part 2',
      description: 'Bella is now a vampire and lives happily with Edward and her daughter, Renesmee. When someone misinforms the Volturi that Renesmee is immortal, they set out to kill the child and the culprit.',
      duration: '115',
      genre: 'romance',
      categories: 'pg-13',
      studioCode: 7,
      directorCode: 87,
      publishedAt: '11/12/2012',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

    {
      title: 'The Hunger Games',
      description: 'Katniss volunteers to replace her sister in a tournament that ends only when one participant remains. Pitted against contestants who have trained for this all their life, she has little to rely on.',
      duration: '142',
      genre: 'sci-fy',
      categories: 'pg-13',
      studioCode: 8,
      directorCode: 88,
      publishedAt: '03/23/2012',
      rating: 5,
      ratingCount: 0,
      coverUrl: ''
    },

  ]);
};
