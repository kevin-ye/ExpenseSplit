'use strict';

const MongoClient = require('mongodb').MongoClient;
const express = require('express');
const bodyParser = require('body-parser');

const url = 'mongodb://localhost:27017/';
const serverPort = 9091;
var dataCollection = {};

const app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// event
app.get('/ExpenseSplit/event', function(req, res) {
  try {
    dataCollection.aggregate(
      [{
          $match: {}
        },
        {
          $group: {
            _id: { id: '$eventID', name: '$eventName' }
          }
        },
        {
          $sort: {
            eventID: 1
          }
        }
      ]
    ).toArray(function(err, data) {
      if (err) {
        throw err;
      }
      else {
        let ans = {
          error: null,
          events: []
        }
        data.array.forEach(element => {
          var item = {
            id: element._id.id,
            name: element._id.name
          };
          ans.events.push(item);
        });
        res.send(ans);
      }
    });
  }
  catch (error) {
    res.send({
      error: error
    });
  }
});

app.post('/ExpenseSplit/event', function(req, res) {
  try {
    let newData = req.body.newData;
    dataCollection.insert(newData);
  }
  catch (error) {
    res.send({
      error: error
    });
  }
});

// transaction
app.get('/ExpenseSplit/transaction/:eventid', function(req, res) {
  try {
    let eventid = req.params.eventid;
    dataCollection.aggregate(
      [{
          $match: { '$evenID': eventid }
        },
        {
          $group: {
            _id: { id: '$transactionID', name: '$transactionName' }
          }
        },
        {
          $sort: {
            transactionID: 1
          }
        }
      ]
    ).toArray(function(err, data) {
      if (err) {
        throw err;
      }
      else {
        let ans = {
          error: null,
          transactions: []
        }
        data.array.forEach(element => {
          var item = {
            id: element._id.id,
            name: element._id.name
          };
          ans.transactions.push(item);
        });
        res.send(ans);
      }
    });
  }
  catch (error) {
    res.send({
      error: error
    });
  }
});

app.post('/ExpenseSplit/transaction', function(req, res) {
  try {
    let newData = req.body.newData;
    dataCollection.insert(newData);
  }
  catch (error) {
    res.send({
      error: error
    });
  }
});

MongoClient.connect((url), (err, _db) => {
  if (err) {
    console.log(err);
  }
  else {
    dataCollection = _db.db('ExpenseSplit').collection('expenses');
    console.log('Connected to MongoDB.');
    app.listen(serverPort, () => {
      console.log('ExpenseSplit back-end listening at %s', serverPort);
    });
  }
});