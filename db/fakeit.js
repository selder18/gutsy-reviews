const faker = require('faker');
const fs = require('fs');

const fakeIt = {
  makeUsers: () => {
    const users = [];
    for (let i = 0; i < 1000000; i++) {
      const userArray = [
        faker.internet.userName(),
        faker.image.avatar()
      ];
      users.push(userArray);
    }
    return users;
  },

  makeAdventures: () => {
    const adventures = [];
    for (let i = 0; i < 1000000; i++) {
      const adventuresArray = [
        faker.company.catchPhrase()
      ];
      adventures.push(adventuresArray);
    }
    return adventures;
  },

  makeReviews: () => {
    const reviews = [];
    for (let i = 0; i < 3333333; i++) {
      const reviewObj = [
        faker.date.past(3000),
        faker.random.number({min:0, max:5}),
        faker.lorem.sentences(Math.ceil(Math.random() * 3)),
        Math.ceil(Math.random() * 1000000), //Must be .ceil to avoid problems trying to assign to 0
        Math.ceil(Math.random() * 1000000) //Must be .ceil to avoid problems trying to assign to 0
      ]
    reviews.push(reviewObj);
    }
    return reviews;
  }
}

const csvPreparation = (array) => {
  let csvCoercion = '';
  array.forEach(function(rowArray){
    let row = rowArray.join(",");
    csvCoercion += row + "\r\n";
  }); 
  return csvCoercion;
};

// const csvContentsUsers = csvPreparation(fakeIt.makeUsers());
// const csvContentsAdventures = csvPreparation(fakeIt.makeAdventures());
const csvContentsReviews = csvPreparation(fakeIt.makeReviews());

const writeUsers = (bigString) => {
  const stream = fs.createWriteStream('./db/users.csv');
  stream.write(bigString); 
}

const writeAdventures = (bigString) => {
  const stream = fs.createWriteStream('./db/adventures.csv');
  stream.write(bigString);
}

const writeReviews = (bigString) => {
  const stream = fs.createWriteStream('./db/reviews.csv', {flags:'a'});
  stream.write(bigString);
}

// writeUsers(csvContentsUsers);
// writeAdventures(csvContentsAdventures);
writeReviews(csvContentsReviews);

module.exports = fakeIt;