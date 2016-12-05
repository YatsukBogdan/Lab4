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

  song.findOne({
    id: req.body.id
  }, (err, _song) => {
    if (err) {
      res.json({error: err});
      return;
    }
    if (_song) {
      _song.artist = req.body.artist;
      _song.title = req.body.title;

      _song.save((err) => {
        if (err) {
          res.json({
            error: err
          });
          return;
        }
        res.json({
          status: 'success'
        })
      });
    }
  });
});

module.exports = router;
