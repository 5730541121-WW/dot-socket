var router = require('express').Router();
var count = 0;
var collections = require('../../model/User');
router.get('/', (req, res) => {
  res.render('login');
})

// press join game button
router.post('/', (req,res) => {
  var user = req.body.user;
  var roomId = req.body.roomId;
  console.log(user);
  console.log(roomId);
  req.dot_session.user = user;
  req.dot_session.roomId = roomId;
  console.log('before Re');
  var _path = 'gamescreen';
  res.json({ status: 'success', path: _path });
  console.log(_path);
})

// press create room button
router.post('/createNewRoom', (req, res) => {
  var user = req.body.user;
  var roomId = (Math.floor(Math.random()*10000)).toString();
  console.log('RoomID = '+roomId);
  var roomnum = new collections.Room();
  roomnum.save((error,newroom) => {
    if(error){
      res.status(500).send();
    }
      req.dot_session.user = user;
      req.dot_session.roomId = roomId;
      res.json({ status: 'success', path: '/gamescreen' });
  })

})

module.exports = router;
