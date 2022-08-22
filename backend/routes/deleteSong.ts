export {};
var express = require("express");
var router = express.Router();
const connectDB = require("../utils/connectDB");

router.delete("/", async (req, res) => {
  await connectDB.setQuery(
    `
        DELETE FROM songs
        WHERE song_id = $1;
    `,
    [req.body.id]
  );
  res.send({ id: req.body.id });
});

module.exports = router;
