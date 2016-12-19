var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SongSchema = new Schema({
  id: Number,
  url: String,
  img: String,
  album: String,
  name: String,
  artist: String,
  year: String
});

var connection = mongoose.createConnection('mongodb://localhost:27017/songs');

var song = connection.model('song', SongSchema);

module.exports = {
  song: song
};
