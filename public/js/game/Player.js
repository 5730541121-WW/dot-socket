/**************************************************
** GAME PLAYER CLASS
**************************************************/
var Player = function(startX, startY, _roomId) {
	var x = startX,
	y = startY,
	id,
	roomId = _roomId,
	moveAmount = 2;
	var getRoomId = function(){
			return roomId;
	}

	var getX = function() {
		return x;
	};

	var getY = function() {
		return y;
	};

	var setX = function(newX) {
		x = newX;
	};

	var setY = function(newY) {
		y = newY;
	};

	var update = function(keys) {
		// Up key takes priority over down
		var prevX = x, prevY = y;
		if (keys.up) {
			y -= moveAmount;
		} else if (keys.down) {
			y += moveAmount;
		};

		// Left key takes priority over right
		if (keys.left) {
			x -= moveAmount;
		} else if (keys.right) {
			x += moveAmount;
		};
		return (prevX !=x || prevY !=y) ? true : false;
	};

	var draw = function(ctx) {
		ctx.fillRect(x-5, y-5, 10, 10);
	};

	return {
		update: update,
		getRoomId: getRoomId,
		draw: draw,
		getX: getX,
		getY: getY,
		setX: setX,
		setY: setY,
		id: id
	}
};
