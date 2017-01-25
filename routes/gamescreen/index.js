// gamescreen index
module.exports = function(io){
  var router = require('express').Router();
  var Player = require('./Player').Player;
  var socket, players;
  var _user, _roomId;

  function init(server) {
    players = [];
    router.get('/',function(req,res){
      console.log('I am here :)')
      if(req.dot_session.user) {
        _user = req.dot_session.user;
      } else {
        _user = "wasin";
      }
      if(req.dot_session.roomId){
        _roomId = req.dot_session.roomId;
      } else {
        _roomId = "undefined"
      }
      res.render('gamescreen', { user : _user, roomId : _roomId });
    })
    //socket = io.listen(server);
    setEventHandlers();

  };

  var setEventHandlers =function(){
    //socket.sockets.on('connection',onSocketConnection);
    io.on('connection',onSocketConnection);
  };

  function onSocketConnection(client){
    console.log("New player has connected :" +client.id);
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer);
    client.on("move player", onMovePlayer);
  };

  function onClientDisconnect() {
    console.log("Player has disconnected: "+this.id);
    //onRemovePlayer();
    var removePlayer = playerById(this.id);

    if (!removePlayer) {
      util.log("Player not found: "+this.id);
      return;
    };
    // remove player from players array
    players.splice(players.indexOf(removePlayer), 1);
    this.broadcast.emit("remove player", {id: this.id});
  };

  function onNewPlayer(data) {
    // create new Player
    var newPlayer = new Player(data.x,data.y,data.roomId);
    newPlayer.id = this.id;
    // emit to other Players' server about this new player
    this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY(), roomId: newPlayer.getRoomId()});
    var i,existingPlayer;
    for( i=0;i<players.length;i++){
      existingPlayer = players[i];
      // emit to one's server to add existing players
      this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY(), roomId: existingPlayer.getRoomId()});
    }
    players.push(newPlayer);
  };

  function onMovePlayer(data) {
    var movePlayer = playerById(this.id);

    if (!movePlayer) {
      util.log("Player not found: "+this.id);
      return;
    };

    movePlayer.setX(data.x);
    movePlayer.setY(data.y);

    this.broadcast.emit("move player", {id: movePlayer.id, x: movePlayer.getX(), y: movePlayer.getY()});
  };
  function onRemovePlayer() {

  }
  function playerById(id) {
    var i;
    for (i = 0; i < players.length; i++) {
      if (players[i].id == id)
      return players[i];
    };

    return false;
  };

  init();

  return router;
}
