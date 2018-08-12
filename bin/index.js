var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();
var http    = require('http');
const cors = require('cors');

app.use(cors());


app.get('/api/shipments/', function(req, res){
  fs.readFile('bin/shipments.json', function(err, data) {
    if (err) {
      throw err;
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.get('/api/shipments/:id', function(req, res){
  fs.readFile('bin/shipments.json', function(err, data) {
    if (err) {
      throw err;
    } else {
      let shipments = JSON.parse(data);
      const id = parseInt(req.params.id);
      const dataItem = shipments.items[id - 1];
      res.send(dataItem);
    }
  });
});

app.get('/api/gluelams/', function(req, res){
  fs.readFile('bin/gluelams.json', function(err, data) {
    if (err) {
      throw err;
    } else {
      res.send(JSON.parse(data));
    }
  });
});

var httpServer = http.createServer(app);
httpServer.listen(3000);
