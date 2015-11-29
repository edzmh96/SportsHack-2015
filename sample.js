/**
 * Created by jlvidal on 2015-11-28.
 */
var api = require('./CFLdatabase');
var obj;
obj = {long: -79.833333, lat: 43.25, distance: 700};
//api.getNumberOfUsersAround(obj, function (err, data) {
//    if (err) {
//        console.log(err)
//    } else {
//        console.log(data)
//    }
//});
obj = {long: -79.833333, lat: 43.25, distance: 700, gameId: 1};
api.getEventsAroundByLocationAndGameId(obj, function (err, data) {

    if (err) {
        console.log(err);
    }
    else {
        console.log(data);
    }

});