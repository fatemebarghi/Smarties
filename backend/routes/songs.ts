export {};
var express = require("express");
var router = express.Router();
const connectDB = require("../utils/connectDB");

/* GET songs list. */
router.get("/", async (req, res) => {
  const data = await connectDB.setQuery(
    "SELECT song_id, song_name, artist_name, cover_image, music_file, is_liked FROM songs"
  );
  res.send(JSON.stringify(data?.rows));
});

module.exports = router;
