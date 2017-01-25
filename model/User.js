var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dot-socket');
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Please make sure MongoDB is running.');
  process.exit();
});
var userSchema = new mongoose.Schema({
  name: String,
  roomID: String
});
var roomSchema = new mongoose.Schema({
  roomID: String
});
var User = mongoose.model('users', userSchema);//collections 'users'
var Room = mongoose.model('rooms', roomSchema);
module.exports = {
  User : User,
  Room : Room
}
