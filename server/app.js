const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const [deleteAll, getRecent, setRecent] = require('../database/db');

const app = express();

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/recent', (req, res) => {
  getRecent()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

app.post('/recent', (req, res) => {
  setRecent(req.body)
    .then(() => {
      console.log('data is successfully stored in db');
      res.send(req.body);
    })
    .catch((err) => {
      console.log('problem with storing data');
      res.send(err);
    });
});

const server = app.listen(port, () => {
  console.log(`listening to the port ${port}`);
});

process.on('SIGINT', () => {
  //  cleanup when server is closed
  deleteAll()
    .then(() => {
      console.log('successfully deleted all data in db');
      server.close(() => {
        process.exit();
      });
    });
});
