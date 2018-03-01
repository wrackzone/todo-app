var express = require('express');
var bodyParser = require('body-parser');

var connection = require('./app/config/connection');
var routes = require('./app/controllers/routes');

var app = express();
app.use(bodyParser.text({ }));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// var vcap_services = JSON.parse(process.env.VCAP_SERVICES)
console.log("vcs",process.env.VCAP_SERVICES);
// var vcap_services = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) : {};
// console.log(vcap_services);

console.log("process.env.PORT",process.env.PORT);

// connection.acquire(function(err,con) {
//   con.query('select * from todo_list'), null, function(err,result) {
//     con.release(); 
//     console.log("Query Result:",result);
//   };
// });

connection.init();
routes.configure(app);
var port = process.env.PORT || 3000
var server = app.listen(port, function(){
  console.log('Server listening on port ' + server.address().port);
});
