const NodeCouchDb = require('node-couchdb');
var constant = require('./constant');
// node-couchdb instance with default options
const couch = new NodeCouchDb();

// node-couchdb instance with Memcached
const MemcacheNode = require('node-couchdb-plugin-memcached');
const couchWithMemcache = new NodeCouchDb({
    cache: new MemcacheNode
});

// node-couchdb instance talking to external service
const couchExternal = new NodeCouchDb({
    host: constant.COUCHDB_HOST,
    protocol: constant.COUCHDB_PROTOCOL,
    port: constant.COUCHDB_PORT
});

// not admin party
// const couchAuth = new NodeCouchDb({
//     auth: {
//         user: 'login',
//         pass: 'secret'
//     }
// });
module.exports = couch;