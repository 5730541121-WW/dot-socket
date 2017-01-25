var Player = function(startX, startY, _roomId) {
    var x = startX,
        y = startY,
        roomId = _roomId,
        id;

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

    var getRoomId = function(){
        return roomId;
    }

    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        id: id,
        getRoomId: getRoomId
    }
};

exports.Player = Player;
