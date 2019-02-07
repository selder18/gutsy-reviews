const express = require('express');
const app = express();
const db = require('../db/index.js')
const path = require('path');

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, '/../client/dist')));

app.listen(3000);