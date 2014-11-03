var name = "";
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");
  client = redis.createClient();
var userCount=0;
var usernames = {};

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html')
});

app.get('/home', function(req, res){
  res.sendFile(__dirname + '/views/home.html')
});

app.get('/r', function(req, res){
  res.sendFile(__dirname + '/views/room.html')
});

app.get('/create', function(req, res){
  res.sendFile(__dirname + '/views/createRoom.html')
});

app.use("/style.css", express.static(__dirname + '/style.css'));

app.use("/script.js", express.static(__dirname + '/script.js'));

client.on("error", function (err) {
  console.log("Error " + err);
});

client.set("app name", "simple chat", redis.print);

io.on('connection', function(socket){
  userCount= userCount+1;
 console.log('a user connected','there are now',userCount,"users online");
  socket.on('person', function(msg){
    console.log('person: ' + msg);
    socket.broadcast.emit('person', msg);
    
  });

 client.get('app name', function(err, reply) {
    if(err) {console.log(err)};
    console.log('app name is', reply);
  });
  //redis gets array named history
  client.hgetall('history', function(err, replies) {
    if(err){console.log(err); return err; }; 
    socket.emit('gotHistory', replies);
  });

  socket.on('sentMessage', function(msg){
      console.log("message received",msg);
      client.incr('msg_id', function(err, msg_id) {
        console.log(msg_id,":",msg);
        client.hset('history', msg_id, msg,redis.print);
    });
      io.emit('gotMessage', msg);
  });

  socket.on('disconnect', function(){
    userCount = userCount-1;
    console.log('a user disconnected','there are now',userCount,"users online");
  });
});

http.listen(3008, function(){
  console.log('listening on *:3008');
});
