var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require("../bin/www");
chai.use(chaiHttp);
const serverURL = "http://localhost:3001";

describe('vaultDragon', function () {
    it("should add a SINGLE value on /api/create POST", function (done) {
        chai.request(serverURL)
            .post('/api/create')
            .send({
                'abc': 'xyz'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('ok');
                res.body.should.have.property('id');
                done();
            });
    })

    it('should add a SINGLE value on /api/create POST', function (done) {
        chai.request(serverURL)
            .post('/api/create')
            .send({
                '123': '321'
            })
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('ok');
                res.body.should.have.property('id');
                done();
            });
    });

    it('should reject POST /api/create with invalid value', function (done) {
        chai.request(serverURL)
            .post('/api/create')
            .end(function (err, res) {
                res.should.have.status(400);
                done();
            });
    });

    it('should list latest records on /api/find GET', function(done) {
        chai.request(serverURL)
          .get('/api/find/123')
          .end(function(err, res){
            res.should.have.status(200);
            done();
          });
    });

    it('cannot GET /api/find with invalid key', function(done) {
        chai.request(serverURL)
          .get('/api/find')
          .end(function(err, res){
            res.should.have.status(500);
            done();
          });
    });

});

describe('404 Test Case', function(){
    it("should return 404 not found", function (done) {
        chai.request(serverURL)
            .get('/test')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            });
    })
    it('should return 404', async ()=>{
      await request(serverURL).get('/test').expect(404);
    })
  })
