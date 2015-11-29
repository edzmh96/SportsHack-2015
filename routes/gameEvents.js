/**
 * Created by jlvidal on 2015-11-29.
 */

var express = require('express');
var router = express.Router();
var api = require('../CFLdatabase');

/* GET home page. */
router.post('/getFiltered', function(req, res, next) {

    var obj = { lat : req.body.lat, long : req.body.long, distance : 700 }
    api.getNumberOfUsersAround(obj, function (err, data){

        if (err)
        {
            res.status(404);
            res.end();
            return;
        }
        obj.gameId = req.body.gameId;
        obj.distance = 3000;
        var toReturn = { peopleQtd : data}
        api.getEventsAroundByLocationAndGameId(obj, function(err2,data2)
        {

            if (err2)
            {
                res.status(404);
                res.end();
                return;
            }
            toReturn.eventData = data2;
            res.send(toReturn);
        });
    });
});

module.exports = router;