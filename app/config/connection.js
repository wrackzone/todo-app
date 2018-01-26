var mysql = require('mysql');

function Connection() {
  this.pool = null;

  this.init = function() {

    // use bound settings
    var vcs = process.env.VCAP_SERVICES ? JSON.parse(process.env.VCAP_SERVICES) 
      : { "cleardb" : [{
        "credentials" : {
          hostname : "bmullan-mbr",
          username : "root",
          password : "",
          name : "todo"
        }
      }]};

    console.log("vcs",vcs);

    this.pool = mysql.createPool({
      connectionLimit: 10,
      host: vcs.cleardb[0].credentials.hostname, //'bmullan-mbr',
      user: vcs.cleardb[0].credentials.username,
      password: vcs.cleardb[0].credentials.password,
      database: vcs.cleardb[0].credentials.name
    });
  };

  this.acquire = function(callback) {
    this.pool.getConnection(function(err, connection) {
      callback(err, connection);
    });
  };
}

module.exports = new Connection();
