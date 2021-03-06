// Placeholder file for Node.js game server
var router = require('express').Router();

var server = require('http').createServer(app);

var User = require('./model/User');
var io = require('socket.io');
var Player = require('./Player').Player;
var socket, players;
var assert = require('assert');
var user;
function init() {
	players = [];
	//app.use(express.static(__dirname + '/public'));
	router.get('/',function(req,res){
    user = req.session_dot.user;
		res.sendFile(__dirname + 'index.html');
	})
	socket = io.listen(server);
	setEventHandlers();
};

var setEventHandlers =function(){
	socket.sockets.on('connection',onSocketConnection);
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

	players.splice(players.indexOf(removePlayer), 1);
	this.broadcast.emit("remove player", {id: this.id});
};

function onNewPlayer(data) {
	var newPlayer = new Player(data.x,data.y);
	newPlayer.id = this.id;
	this.broadcast.emit("new player", {id: newPlayer.id, x: newPlayer.getX(), y: newPlayer.getY()});
	var i,existingPlayer;
	for( i=0;i<players.length;i++){
		existingPlayer = players[i];
		this.emit("new player", {id: existingPlayer.id, x: existingPlayer.getX(), y: existingPlayer.getY()});
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
