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
  let column,
    searchTerm;
  if (req.body.table === 'reviews') {
    column = 'adventure_id';
    searchTerm = req.body.payload.adventure_id;
  } else {
    column = 'name';
    searchTerm = req.body.payload.name;
  }
  db(req.body.table).insert(req.body.payload)
  .then(() => {
    db.select().from(req.body.table)
      .where(column, `${searchTerm}`)
      .then((data) => {
        res.json(data);
      });
  })
})

app.get('/query/user/:id', (req,res, next) => {
  db('users')
    .select('id')
    .where('name', `${req.params.id}`)
    .then((data) => {
      res.json(data);
    })
})

app.get('/query/:id', (req, res, next) => {
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
