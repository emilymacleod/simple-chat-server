var person = "";

 function enterName() {
     person = prompt("Please enter your name ", "");
    
    if (person != null) {
        document.getElementById("name").innerHTML =
        "Hello " + person + "! How are you today?";
  };
};

/*function addMessage() {
  var newMsg = document.getElementById('newMsg');
  var TextArea = document.getElementById('TextArea');
  var msg = newMsg.value;
  var content = document.createElement('div');
  content.innerText = msg;
  msgs.appendChild(content);
}*/

function addEmbed() {
var embedInput = document.getElementById('embedInput');
var iframe = document.createElement('iframe');
/*
var iframeUnique  = {};
iframeUnique.height=iframe.height;
iframeUnique.width=iframe.width;
iframeUnique.src=iframe.src;
*/
var embedded = embedInput.value;
console.log("embedded for server is",embedded);
console.log("room title for server is","non-existent")


  document.getElementById('activeEmbed').innerHTML=embedded;
}


var socket = io();


socket.on('gotHistory', function(replies){
  console.log('history is',replies)
  for (var i in replies) {
      var msg = replies[i];
      $('#TextArea').innerHTML=$('<div>').text(msg);
    };
})

  $('form').submit(function(){

    var msg = person + " " + "said: " + $('#m').val();
    console.log("message to be sent is",msg)
    socket.emit('sentMessage',msg);
    $('#m').val('');
    return false;
  });

  socket.on('gotMessage', function(msg){
    $('#TextArea').append($('<p>').text(msg));
  });
