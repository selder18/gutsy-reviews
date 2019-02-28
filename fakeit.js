const faker = require('faker');

const fakeIt = {
  makeUsers: () => {
    const users = [];
    const userObj = {};
    for (let i = 0; i < 10000; i++) {
      userObj.username = faker.internet.userName();
      userObj.avatar = faker.image.avatar();
      users.push(userObj);
    }
    return users;
  },

  makeAdventures: () => {
    const adventures = [];
    const adventureObj = {};
    for (let i = 0; i < 10000; i++) {
      adventureObj.title = faker.company.catchPhrase();
      adventures.push(adventureObj);
    }
    return adventures;
  },

  makeReviews: () => {
    const reviews = [];
    const reviewObj = {};
    for (let i = 0; i < 10000; i++) {
      reviewObj.timeStamp = faker.date.past(3000);
      reviewObj.comment = faker.lorem.sentences(3);
      reviewObj.stars = faker.random.number({min:0, max:5});
      reviews.push(reviewObj);
    }
    return reviews;
  }
}

module.exports = fakeIt;