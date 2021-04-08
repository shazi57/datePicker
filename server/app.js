const express = require('express');
const bodyParser = require('body-parser');
const [deleteAll, getRecent, setRecent] = require('../database/db');

const app = express();

const port = process.env.PORT || 8000;

app.use(express.static('public'));

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

const server = app.listen(port);

process.on('SIGINT', () => {
  deleteAll()
    .then((success) => {
      console.log(`successfully deleted all data in db ${success}`);
      server.close(() => {
        console.log('HTTP server closed');
      });
    });
});
