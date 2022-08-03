var express = require("express");
const connectDB = require("../utils/connectDB");
var router = express.Router();

router.post("/", async (req, res) => {
  await connectDB(
    `
        UPDATE songs
        SET is_liked = $1
        WHERE song_id = $2;
    `,
    [req.body.value, req.body.id]
  );
  res.status(200).send({ value: req.body.value });
});

module.exports = router;
