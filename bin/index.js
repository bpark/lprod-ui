var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var http    = require('http');

app.get('/api/shipments/', function(req, res){
  fs.readFile('bin/shipments.json', function(err, data) {
    if (err) {
      throw err;
    } else {
      res.header('X-Total-Count' , 3);
      res.header('Content-Type' , "application/json");
      res.send(JSON.parse(data));
    }
  });
});

app.get('/api/gluelams/', function(req, res){
  fs.readFile('bin/gluelams.json', function(err, data) {
    if (err) {
      throw err;
    } else {
      res.header('X-Total-Count' , 13);
      res.header('Content-Type' , "application/json");
      res.send(JSON.parse(data));
    }
  });
});

var httpServer = http.createServer(app);
httpServer.listen(3000);
