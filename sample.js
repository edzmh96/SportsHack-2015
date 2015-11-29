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
//obj = {long: -79.833333, lat: 43.25, distance: 700, gameId: 1};
//api.getEventsAroundByLocationAndGameId(obj, function (err, data) {
//
//    if (err) {
//        console.log(err);
//    }
//    else {
//        console.log(data);
//    }
//
//});

api.return_object_by_id("565adbfd04ebae014c795792", function (err,data)
{
    console.log("return_object_by_id")
console.log(data);
});

api.get_events_by_game_id(1, function (err,data)
{
    console.log("get_events_by_game_id")
    console.log(data);
});

api.get_first_event_by_game_id(1,function(err, data)
{
    console.log("get_first_event_by_game_id")
   console.log(data);
});