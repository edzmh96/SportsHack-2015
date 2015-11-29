var api = require('CFL.database');

api.return_object_by_name("someplace", function(err, data)
{
	console.log(data);
});