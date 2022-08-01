var express = require("express");
var router = express.Router();

/* GET songs listing. */
router.get("/", function (req, res, next) {
  res.send(
    JSON.stringify([
      {
        id: "f93b2ffd-cafe-11ec-ae5d-022ed69f96e6",
        name: "Xi based",
        artist_name: "Mr. X",
        likes: 2,
        cover_image:
          "https://dz2l6nhikl0ua.cloudfront.net/assets/cover_image/f92cea72-cafe-11ec-ae5d-022ed69f96e6.jpeg?cb=20220503183459",
        music_file:
          "https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/f6d7a1c6-cafe-11ec-ae5d-022ed69f96e6.m4a?cb=20220503183455",
      },
      {
        id: "e0ae2ad0-caee-11ec-ae5d-022ed69f96e6",
        name: "Xi based",
        artist_name: "Mr. X",
        likes: 2,
        cover_image:
          "https://dz2l6nhikl0ua.cloudfront.net/assets/cover_image/e0a7ed21-caee-11ec-ae5d-022ed69f96e6.jpeg?cb=20220503163946",
        music_file:
          "https://dz2l6nhikl0ua.cloudfront.net/assets/music_file/de502a55-caee-11ec-ae5d-022ed69f96e6.m4a?cb=20220503163942",
      },
    ])
  );
});

module.exports = router;
