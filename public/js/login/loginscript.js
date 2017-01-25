var person = {
  user: $('#user').val(),
  roomId: $('#roomId').val()
}
var x;
function joinGame(){
  //console.log('join');
  $.post("/", { user: $('#user').val(), roomId: $('#roomId').val() }, function(data){
      window.location = data.path;
  },"json");
  // $.ajax({
  //   type: 'POST',
  //   //contentType: 'application/json',
  //   url: 'http://localhost:3000/',
  //   dataType: "json",
  //   data: person,
  //   success: function(){
  //     console.log('join successfully. Redirecting to gamescreen');
  //   }
  // })

}

function createNewRoom(){
  //console.log("I did created game");
  $.post("/createNewRoom", { user: $('#user').val() }, function(data){
      window.location = data.path;
  },"json");
  // $.ajax({
  //   type: 'POST',
  //   //contentType: 'application/json',
  //   url: 'http://localhost:3000/createNewRoom',
  //   dataType: "json",
  //   data: person,
  //   success: function(){
  //     console.log('create new room successfully. Redirecting to gamescreen');
  //   }
  // })
}
