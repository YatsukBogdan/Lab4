var express = require('express');
var router = express.Router();
var song = require('../databaseutils').song;

const LOG_PREFIX = 'ADD_SONG ROUTE';
function getCurrentTime() {
    return new Date().toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
}
function logMessage(msg) {
  console.log(getCurrentTime() + '     ' + LOG_PREFIX + '     ' + msg);
}

router.post('/', (req, res) => {
  song.find({}, (err, songs) => {
    if (err) {
      res.json({error: err});
      return;
    }
    var songs_count = songs.length;

    var new_song = new song({
      id: songs_count,
      url: req.body.url,
      img: req.body.img,
      album: req.body.album,
      name: req.body.name,
      artist: req.body.artist,
      year: req.body.year
    });

    new_song.save((err) => {
      if (err) {
        logMessage(err);
        res.json({
          error: err
        });
        return;
      } else {
        res.json({
          res: 'success'
        });
      }
    });
  });
});

module.exports = router;
