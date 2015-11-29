/**
 * Created by jlvidal on 2015-11-29.
 */

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/looking', function(req, res, next) {
    res.send("OK");
});

module.exports = router;