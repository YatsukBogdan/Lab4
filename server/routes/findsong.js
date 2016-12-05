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

  if (req.body.word == '') {
    res.json({status: 'empty string'});
    return;
  }
  console.log(req.body.word);
  song.find({
    title: {
      $regex: new RegExp('^' + req.body.word, "i")
    }
  }, (err, songs) => {
    if (err) {
      res.json({error: err});
      return;
    }
    if (songs) {
      console.log(songs);
      res.json(songs)
    }
  });
});

module.exports = router;
