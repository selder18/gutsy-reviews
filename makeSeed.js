const faker = require('faker');

const makeSeed = {
  
  makeUsers: () => {
    const users = [];
    for (let i = 0; i < 100; i += 1) { // make 100 random users each with a random avatar
      const obj = {
        name: faker.internet.userName(),
        avatar: faker.image.avatar()
      };
      users.push(obj);
    }
    return users;
  },
  
  makeAdventures: () => {
    const adventures = [];
    for (let i = 0; i < 100; i += 1) { // make 100 random adventures
      const obj = {
        name: faker.random.locale()
      };
      adventures.push(obj);
    }
    return adventures;
  },
  
  makeReviews: () => {
    const comments = [];
    for (let i = 1; i <= 100; i += 1) {
      const randomNumber = Math.floor(Math.random() * 8) + 2; // make a random number of comments between 2-10 for each adventure
      for (let j = 0; j < randomNumber; j += 1) {
        const randomSentences = faker.random.number({min: 1, max: 3});
        const timestamp = faker.date.between('2015-01-01', '2019-02-07'); // create the random date
        const obj = {
          adventure_id: i,
          poster_id: faker.random.number({min: 1, max: 100}),
          review_text: faker.lorem.lines(randomSentences),
          timestamp: timestamp.toISOString(), // convert the date to YYYY-MM-DD format as string
          stars: faker.random.number({min: 1, max: 5}),
          thumbs_up: faker.random.number({min: 0, max: 20}),
          thumbs_down: faker.random.number({min: 0, max: 20})
        };
        comments.push(obj);
      }
    }
    return comments;
  }
};

module.exports = makeSeed;