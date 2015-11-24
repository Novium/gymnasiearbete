/* Copyright (C) Alexander 'novium' Troshin - All Rights Reserved */

var app       = require('express')();
var server    = require('http').createServer(app);
var io        = require('socket.io')(server);
var hbs       = require('hbs');
var chalk     = require('chalk');
var fs        = require('fs');

var filter    = require('./compute.js');

var debug     = {sensor: true, compute: false};
var data      = {acc: []};

// Main code
function compute(acc) {
  if(debug.compute)
    console.log(chalk.green('status:    received data', chalk.grey('x: %s y: %s z: %s')), filtered.x, filtered.y, filtered.z);

  data.acc.push(acc);
}

// Save the last 21 datapoints
function save() {
  var a = data.acc.slice(data.length - 21, data.length);

  var x = [], y = [], z = [];

  // Takes the xyz object and puts it in 3 arrays
  for (var i = 0; i < a.length; i++) {
    x.push(a[i].x);
    y.push(a[i].y);
    z.push(a[i].z);
  }

  // Filters arrays with a screen median filter
  x = filter.median(x, 3);
  y = filter.median(y, 3);
  z = filter.median(z, 3);

  for (var i = 0; i < a.length; i++) {
    // Secondary filtering
    x[i] = Math.floor(x[i]);
    y[i] = Math.floor(y[i]);
    z[i] = Math.floor(z[i]);

    // High/low filter where highs are set to 1 and lows to 0
    var breakp = 4;

    if(x[i] <= breakp) {
      x[i] = 0;
    } else if(x[i] > breakp) {
      x[i] = 1;
    }

    if(y[i] <= breakp) {
      y[i] = 0;
    } else if(y[i] > breakp) {
      y[i] = 1;
    }

    if(z[i] <= breakp) {
      z[i] = 0;
    } else if(z[i] > breakp) {
      z[i] = 1;
    }
  }

  /*for (var i = 0; i < x.length; i++) {
    if(x.length > (i + 1) && x[i + 1] == x[i]) {
      x.splice(i + 1, 1);
    }
  }

  for (var i = 0; i < y.length; i++) {
    if(y.length > (i + 1) && y[i + 1] == y[i]) {
      y.splice(i + 1, 1);
    }
  }

  for (var i = 0; i < z.length; i++) {
    if(z.length > (i + 1) && y[i + 1] == y[i]) {
      z.splice(i + 1, 1);
    }
  }*/

  // Save arrays as a JSON file
  var d = JSON.stringify({x: x, y: y, z: z}, null, 4);
  fs.writeFile('data.json', d, function() {
    console.log(chalk.red('status:    saved'));
  });
}

// Backend dev code
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/data', function(req, res) {
  res.render('data');
});

app.get('/a/:name', function (req, res, next) {
  var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
  };

  var fileName = req.params.name;
  res.sendFile(fileName + ".html", options, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
  });

})

// SOCKETIO

io.on('connection', function(socket){
  socket.emit('status', {status: "socket.io: connected"});

  // Eat the sensor data, eat all of it.
  socket.on('data', function(data) {
    //console.log("x: %s\ny: %s\nz: %s", data.x, data.y, data.z);
    if(debug.sensor)
      console.log(chalk.green('status:    received data', chalk.grey('x: %s y: %s z: %s')), data.x, data.y, data.z);

    compute(data);
  });

  socket.on('save', function() {
    save();
  });

  // If something horrible happens.
  socket.on('data.error', function(data) {
    console.log(chalk.red('ERROR:   %s'), data.e);
  });
});

setInterval(function() {
  if(debug.sensor)
    console.log(chalk.bold.green("status:    -------------------------------------------------- 5000ms"))
}, 5000)

io.on('event', function() { });
server.listen(80);
