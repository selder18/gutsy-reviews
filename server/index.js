require('dotenv').config();
const Promise = require('bluebird');
const compression = require('compression');
const express = require('express');
const cors = require('cors');
const path = require('path');
const db = require('../db/index.js');

const app = express();
Promise.promisifyAll(app);

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use(compression());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.get('*.js', function callback(req, res, next) {
  req.url += '.gz';
  res.set('Content-Encoding', 'gzip');
  next();
});

app.post('/query', (req, res) => {
  const {table} = req.body;
  const {payload} = req.body;
  const column = (table === 'reviews') ? 'adventure_id' : 'name'; // setting the column name depending on whether we're asking for reviews (adventure_id), or users/adventures (name)
  const searchTerm = (table === 'reviews') ? payload.adventure_id : payload.name; // same as above but for th conditional term
  db(table).insert(payload)
    .then(() => {
      db.select().from(table) // returns the table so that when we insert a user, we can retrieve the id
        .where(column, `${searchTerm}`) // search for the terms and column designated on lines 14/15
        .then((data) => {
          res.json(data);
        });
    });
});

app.get('/query/user/:id', (req, res) => {
  db('users')
    .select('id')
    .where('name', `${req.params.id}`)
    .then((data) => {
      res.json(data);
    });
});

app.get('/query/reviews/:id', (req, res) => {
  db('reviews')
    .join('users', 'reviews.poster_id', '=', 'users.id') // join table for users
    .join('adventures', 'reviews.adventure_id', '=', 'adventures.id') // join table for adventures
    .select({username: 'users.name', adventure: 'adventures.name'}, 'reviews.id', 'users.avatar', 'reviews.review_text', 'reviews.timestamp', 'reviews.stars', 'reviews.thumbs_up', 'reviews.thumbs_down') // changes users.name to username and adventures.name to adventure, selects all required fields
    .where('reviews.adventure_id', req.params.id)
    .then((data) => {
      res.json(data);
    });
});

app.listen(port);
