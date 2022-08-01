var express = require("express");
var router = express.Router();

/* POST like status */
router.post("/", function (req, res) {
    res.end(JSON.stringify({ status: 200 }));
});

module.exports = router;
