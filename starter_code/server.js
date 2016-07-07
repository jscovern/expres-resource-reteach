'use strict'
var express = require('express');
var app = express();
var nextID = 4;
const bodyParser = require('body-parser');
app.use(bodyParser.json());

var candies = [
  {
    "id": 1,
    "name": "Chewing Gum",
    "color": "Red"
  },
  {
    "id": 2,
    "name": "Pez",
    "color": "Green"
  },
  {
    "id": 3,
    "name": "Marshmallow",
    "color": "Pink"
  }
];

app.listen(3000);
console.log("Server listening on port 3000");

app.get("/candies", function(req,res) {
  res.send(candies);
});

app.get("/candies/:id", function(req, res) {
  var searchID = parseInt(req.params.id);
  for(var i=0; i<candies.length; i++) {
    if(candies[i].id===searchID) {
      res.send(candies[i]);
    }
  }
});

app.post('/candies', function(req, res) {
  var newCandy = req.body;
  if(newCandy.id === undefined) {
    newCandy.id = nextID;
    nextID++;
  }
  candies.push(newCandy);
  res.send(newCandy);
});

app.put("/candies/:id", function(req,res) {
  var newCandy = req.body;
  var searchID = parseInt(req.params.id);
  for (var i=0; i<candies.length; i++) {
    if(searchID === candies[i].id) {
      candies[i]=newCandy;
      res.send(newCandy);
    }
  }
  console.log(candies);
});

app.delete("/candies/:id", function(req, res) {
  var searchID = parseInt(req.params.id);
  for (var i=0; i<candies.length; i++) {
    if(searchID === candies[i].id) {
      var deletedCandy = candies[i];
      res.send(deletedCandy);
      candies.splice(i,1);
    }
  }
  console.log(candies);
});