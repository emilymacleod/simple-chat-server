var person = "";

 function enterName() {
     person = prompt("Please enter your name ", "");
    
    if (person != null) {
        document.getElementById("name").innerHTML =
        "Hello " + person + "! How are you today?";
  };
};

var socket = io();
  $('form').submit(function(){
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });

  socket.on('chat message', function(msg){
    $('#TextArea').append($('<p>').text(msg));
  });