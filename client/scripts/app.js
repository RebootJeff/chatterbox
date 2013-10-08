$(function(){

  var displayChats = function(dataObject){
    var $chats = $('#chats');

    console.log(dataObject);

    for( var i = 0; i < dataObject.results.length; i++ ){
      var username = JSON.stringify(dataObject.results[i].username);
      var message = JSON.stringify(dataObject.results[i].text);
      // var text = "<div class='msg'>" + username + " says, " + message + "</div>";
      // console.log(text);
      var $newHTML = $('<div>').addClass('msg').text(username + " says, " + message);
      $chats.append($newHTML);
    }
  };

  var getChats = function(){
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'GET',
      dataType: 'JSON',
      data: 'data',
      success: function(data){
        // console.log(data);  // data.results[i].text username roomname updatedAt createdAt
        $('#chats').empty();
        displayChats(data);
        console.log("chatterbox: Messages received");
      },
      error: function(data){
        console.log("ERROR: ", data);
      }
    });
  };

  var usernameIndex = window.location.href.indexOf("?username=");
  var username = window.location.href.slice(usernameIndex + 10);

  $('#submitButton').on('click', function(){
    console.log('clicked');
    var messageText = $('#textField').val();
    var message = { 'text': messageText, 'username': username, 'roomname': '' };
    $('#textField').val('');
    $.ajax({
      // always use this url
      url: 'https://api.parse.com/1/classes/chatterbox',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message');
      }
    });
  });

  setInterval(function(){
        getChats();
      }, 4000);
});
