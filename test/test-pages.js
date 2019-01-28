var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var server = require("../bin/www");
console.log(server);
chai.use(chaiHttp);
const serverURL = require("../constant").SERVER_URL;

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

    it('should list latest records on /api/find GET', function (done) {
        chai.request(serverURL)
            .get('/api/find/123')
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    });

    it('cannot GET /api/find with invalid key', function (done) {
        chai.request(serverURL)
            .get('/api/find')
            .end(function (err, res) {
                res.should.have.status(422);
                done();
            });
    });

    it('cannot GET /api/find with an invalid timestamp', function (done) {
        chai.request(serverURL)
            .get('/api/find/abc?timestamp=adadad')
            .end(function (err, res) {
                res.should.have.status(422);
                done();
            });
    })

    it('can GET /api/find with valid timestamp', function (done) {
        const timestamp = '1548670784';
        chai.request(serverURL)
            .get(`/api/find/123?timestamp=${timestamp}`)
            .end(function (err, res) {
                res.should.have.status(200);
                done();
            });
    })

    it('cannot GET /api/find with valid but older timestamp', function (done) {
        const timestamp = '1517134781';
        chai.request(serverURL)
            .get(`/api/find/123?timestamp=${timestamp}`)
            .end(function (err, res) {
                res.should.have.status(204);
                done();
            })

    });
})
describe('404 Test Case', function () {
    it("should return 404 not found", function (done) {
        chai.request(serverURL)
            .get('/test')
            .end(function (err, res) {
                res.should.have.status(404);
                done();
            });
    })
})
