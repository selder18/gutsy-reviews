const faker = require('faker');
const fs = require('fs');

const fakeIt = {
  makeUsers: () => {
    const users = [];
    for (let i = 0; i < 100; i++) {
    const userObj = {
      username: faker.internet.userName(),
      avatar: faker.image.avatar()
    }
      users.push(userObj);
    }
    return users;
  },
  
  makeUsersArray: () => {
    const users = [];
    for (let i = 0; i < 1000; i++) {
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
    for (let i = 0; i < 1000; i++) {
      const adventureObj = {
        title: faker.company.catchPhrase()
      }
      adventures.push(adventureObj);
      }
    return adventures;
  },
  
  makeAdventuresArray: () => {
    const adventures = [];
    for (let i = 0; i < 1000; i++) {
      const adventuresArray = [
        faker.company.catchPhrase()
      ];
      adventures.push(adventuresArray);
    }
    return adventures;
  },

  makeReviews: () => {
    const reviews = [];
    for (let i = 0; i < 1000; i++) {
      const reviewObj = {
        timestamp: faker.date.past(3000),
        stars: faker.random.number({min:0, max:5}),
        comment: faker.lorem.sentences(Math.ceil(Math.random() * 3)),
        user_id: Math.ceil(Math.random() * 100), //Must be .ceil to avoid problems trying to assign to 0
        adventure_id: Math.ceil(Math.random() * 100) //Must be .ceil to avoid problems trying to assign to 0
    }
    reviews.push(reviewObj);
    }
    return reviews;
  },
  makeReviewsArray: () => {
    const reviews = [];
    for (let i = 0; i < 1000; i++) {
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
  let csvCoercion = "username,avatar\r\n";
  array.forEach(function(rowArray){
    let row = rowArray.join(",");
    csvCoercion += row + "\r\n";
  }); 
  return csvCoercion;
};

const csvContentsUsers = csvPreparation(fakeIt.makeUsersArray());
const csvContentsAdventures = csvPreparation(fakeIt.makeAdventuresArray());
const csvContentsReviews = csvPreparation(fakeIt.makeReviewsArray());

const writeUsers = (bigString) => {
  const stream = fs.createWriteStream('./users.csv');
  for (let i = 0; i < 1000; i++) {
    stream.write(bigString.substring(17)); //this is to cut out the first 'formatting' line of the CSV
  }
}

const writeAdventures = (bigString) => {
  const stream = fs.createWriteStream('./adventures.csv');
  for (let i = 0; i < 1000; i++) {
    stream.write(bigString.substring(17)) //this is to cut out the first 'formatting' line of the CSV
  }
}

const writeReviews = (bigString) => {
  const stream = fs.createWriteStream('./reviews.csv');
  for (let i = 0; i < 10000; i++) {
    stream.write(bigString.substring(17))
  }
}

writeUsers(csvContentsUsers);
writeAdventures(csvContentsAdventures);
writeReviews(csvContentsReviews);


module.exports = fakeIt;