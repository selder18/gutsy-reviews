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
  console.log(req.body);
  db(req.body.table).insert(req.body.payload)
  .then(() => {
    db.select().from(req.body.table)
      .then((data) => {
        console.log(data);
        res.json(data);
      });
  })
})
app.get('/query', (req, res, next) => {
  
})

app.listen(port);