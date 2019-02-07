require('dotenv').config();
const Promise = require('bluebird');
const express = require('express');
const app = express();
Promise.promisifyAll(app);
const db = require('../db/index.js')
const path = require('path');
const port = process.env.PORT || 3004;

app.use(express.json());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.post('/query', (req, res, next) => {
  db(req.body.table).insert(req.body.payload)
  .then(() => {
    db.select().from(req.body.table)
      .then((data) => {
        console.log(data);
        res.json(data);
      });
  })
})

app.get('/query/:id', (req, res, next) => {
  console.log(req.params.id);
  db('reviews')
    .join('users', 'reviews.poster_id', '=', 'users.id')
    .join('adventures', 'reviews.adventure_id', '=', 'adventures.id')
    .select({username: 'users.name', adventure: 'adventures.name'}, 'users.avatar', 'reviews.review_text', 'reviews.timestamp', 'reviews.stars', 'reviews.thumbs_up', 'reviews.thumbs_down')
    .where('reviews.adventure_id', req.params.id)
    .then((data) => {
      res.json(data);
    });

})

app.listen(port);