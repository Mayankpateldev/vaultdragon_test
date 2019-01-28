var express = require('express');
var router = express.Router();
var couch = require('../couchdb');
const moment = require('moment');
const check = require('check');
var constant = require('../constant');
/* GET vaultdragon listing. */
router.get('/', function (req, res) {
  res.send('<b>VaultDragon Coding Test</b>');
});
/**
 * /api/find/{key}:
 *   get:
 *     tags:
 *       - VaultDragon
 *     description: Returns a single value
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: key
 *         description: Value's key
 *         in: path
 *         required: true
 *         type: string
 *       - name: timestamp
 *         description: Value's timestamp
 *         in: path
 *         required: false
 *         type: integer
 *     responses:
 *       200:
 *         description: A single VaultDragon
 */
router.get('/find/:key?', function (req, res, next) {
  //everything seems to be valid
  try {
    const key = req.params.key;
    const timestamp = req.query.timestamp;
    if (!key) {
      res.status(422).send(`Missing Key: ${key}`);
    }
    const mangoQuery = {
      selector: {
        $and: [{
          key
        }]
      },
      limit: 1,
      sort: [{
        "timestamp": "desc"
      }]
    };
    if (timestamp) {
      // timestamp is available
      const ts = moment.unix(timestamp).utc();
      if (ts.isValid()) {
        mangoQuery.selector.$and.push({
          timestamp: {
            $lte: ts
          }
        });
      } else {
       return res.status(422).send(`Provided timestamp is not valid`);
      }
    }
    const parameters = {};
    couch.mango(constant.DATABASE_NAME, mangoQuery, parameters).then(({
      data,
      headers,
      status
    }) => {
      if(data.docs.length > 0){
        res.status(200).send(data.docs);
      }
      else{
        res.status(204).send("No data found");
      }
    }, err => {
      // either request error occured
      res.status(500).send(err);
    });
  } catch (exception) {
    res.status(400).send(exception.message);
  }
});
/**
 * /api/create:
 *   post:
 *     tags:
 *       - Create
 *     description: Creates a new value
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: value
 *         description: value object
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         description: Successfully created with key
 */
router.post('/create', function (req, res) {
  try {
    validate(req.body);
    const key = Object.keys(req.body)[0];
    const value = req.body[key];
    couch.insert(constant.DATABASE_NAME, {
      key: key,
      timestamp: moment.utc(),
      value: value
    }).then(({
      data,
      headers,
      status
    }) => {
      res.status(200).send(data);
    }, err => {
      // either request error occured
      res.status(500).send(err);
    });
  } catch (exception) {
    res.status(400).send(exception.message);
  }
})

function validate(body) {
  if (Object.keys(body).length === 0) {
    throw new Error('Request contains no value');
  } else {
    const key = Object.keys(body)[0];
    if (!key.trim()) {
      throw new Error('Request contains no key');
    }
    const value = body[key];
    if (!value) {
      throw new Error('Value is empty!');
    } else {
      //Body parameter is a ok.
      return true;
    }
  }
}

module.exports = router;
