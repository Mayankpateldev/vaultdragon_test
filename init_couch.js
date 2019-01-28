var async = require('async');
var constant = require('./constant');
var couch = require('./couchdb');
var databases = [constant.DATABASE_NAME];
var createInde = require('couchdb-create-index');

module.exports = initCouch;

function initCouch(cb) {
  createDatabases(cb);
}

function createDatabases(cb) {
  async.each(databases, createDatabase, cb);
}
function createDatabase(db, cb) {
  try {
    couch.createDatabase(db).then(() => {}, err => {
      if (err && err.statusCode == 412) {
        err = null;
      }
      createIndex(db);
      cb();
    });
  } catch (error) {
    createIndex(db);
    // Nothing
  }
}

function createIndex(db, callback) {
  var index = {
    "index": {
      "fields": [
        "timestamp"
      ]
    },
    "name": "timestamp-json-index",
    "type": "json"
  };
  createInde(constant.COUCHDB_PROTOCOL+'://'+constant.COUCHDB_HOST+':'+constant.COUCHDB_PORT+'/'+constant.DATABASE_NAME, index, function (error, response) {
    // here we go
  })
}