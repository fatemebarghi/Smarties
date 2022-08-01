var express = require("express");
var router = express.Router();
const connectDB = require("../utils/connectDB");

/* GET songs list. */
router.get("/", async (req, res) => {
  const data = await connectDB(
    "SELECT song_id, song_name, artist_name, cover_image, music_file FROM songs"
  );
  res.send(JSON.stringify(data));
});

module.exports = router;
