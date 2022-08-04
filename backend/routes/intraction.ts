export {};
var express = require("express");
var router = express.Router();
const connectDB = require("../utils/connectDB");

router.post("/", async (req, res) => {
  await connectDB.setQuery(
    `
        UPDATE songs
        SET is_liked = $1
        WHERE song_id = $2;
    `,
    [req?.body.value, req.body.id]
  );
  res.send({ value: req.body.value });
});

module.exports = router;
