(function(){

	var displayChats = function(dataObject){
		var $chats = $('#chats');

		for( var i = 0; i < dataObject.results.length; i++ ){
			var text = "<div class='msg'>'" + dataObject.results[i].username 
			+ "' says, '" + dataObject.results[i].text + "'</div>";
			$chats.append(text);
		}
	};

	$.ajax({
		url: 'https://api.parse.com/1/classes/chatterbox',
		type: 'GET',
		dataType: 'JSON',
		data: 'data',
		success: function(data){
			// console.log(data);  // data.results[i].text username roomname updatedAt createdAt
			setInterval(function(){ 
				$('#chats').empty();
				displayChats(data);
			}, 2000);
		},
		error: function(data){
			console.log("ERROR: ", data);
		}
	});	

})();