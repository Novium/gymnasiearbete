/* Copyright (C) Alexander 'novium' Troshin - All Rights Reserved
 * Unless otherwise stated via written permission from the author all
 * unauthorized copying and/or use of the content in this file via any medium is
 * strictly prohibited. The content of this file is proprietary and confidential.
 */

/*
  // TODO
  collect rotation data + send it in the same packet as the acceleration data
  work on filtering the data recieved >>
      filter data using function "filter" pipe it to the compute function
*/

var app       = require('express')();
var server    = require('http').createServer(app);
var io        = require('socket.io')(server);
var hbs       = require('hbs');
var chalk     = require('chalk');

var debug     = {sensor: false, compute: true};

// Data filtering
function filter(acc, rot) {
  return data;
}

// Main code
function compute(acc, rot) {
  filtered = filter(acc, rot);
  if(debug.compute)
        console.log(chalk.green('status:    received data', chalk.grey('x: %s y: %s z: %s')), filtered.x, filtered.y, filtered.z);
}



// Backend dev code
app.set('view engine', 'hbs');

app.get('/', function(req, res) {
  res.send('hello world');
});

app.get('/data', function(req, res) {
  res.render('data');
});

io.on('connection', function(socket){
  socket.emit('status', {status: "socket.io: connected"});

  // Eat the sensor data, eat all of it.
  socket.on('data', function(data) {
    //console.log("x: %s\ny: %s\nz: %s", data.x, data.y, data.z);
    if(debug.sensor)
      console.log(chalk.green('status:    received data', chalk.grey('x: %s y: %s z: %s')), data.x, data.y, data.z);
    //compute(data);
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
