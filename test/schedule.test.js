process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Schedule = require('../app/models/schedule.server.model');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

describe('/GET /api/v1/schedules', () => {
    it('it should get all scheduled shows', (done) => {
        chai.request(server)
            .get('/api/v1/schedules')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.schedules.should.be.a('array');
                //res.body.schedules.length.should.be.eql(0);
                done();
            });
    });
});

describe('POST /api/v1/schedules', () => {
    it('it should POST a scheduled show.', (done) => {
        let schedule = {
           'id': 7,
           'title':'Starsky & Hutch',
           'description':'Terry Nash confesses to assassinating a mob boss turned informant just before he was about to testify. Starsky and Hutch discover that everything Terry remembers is not real.',
           'startTime':'1501551000000',
           'endTime':'1501552800000',
           'genre': 'action'
        };

        chai.request(server)
            .post('/api/v1/schedules')
            .send(schedule)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('POST /api/v1/schedules', () => {
    it('it should NOT POST a scheduled show because of a duplicate Id', (done) => {
        let schedule = {
            'id': 7,
            'title': 'Big Smo',
            'description': 'For the past year, Smo has been haunted by a bad performance at the biggest mud park in the south. Now, Smo returns to the mud bog with his family in tow in order to reclaim his victory.',
            'startTime': '1501549200000',
            'endTime': '1501551000000',
            'genre': 'documentary'
        };

        chai.request(server)
            .post('/api/v1/schedules')
            .send(schedule)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});
describe('POST /api/v1/schedules', () => {
    it('it should NOT POST a scheduled show without a title.', (done) => {
        let schedule = {
           'id': 7,
           'description':'Terry Nash confesses to assassinating a mob boss turned informant just before he was about to testify. Starsky and Hutch discover that everything Terry remembers is not real.',
           'startTime':'1501551000000',
           'endTime':'1501552800000',
           'genre': 'action'
        };

        chai.request(server)
            .post('/api/v1/schedules')
            .send(schedule)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});
describe('POST /api/v1/schedules', () => {
    it('it should NOT POST a scheduled show without a description.', (done) => {
        let schedule = {
           'id': 7,
           'title':'Starsky & Hutch',
           'startTime':'1501551000000',
           'endTime':'1501552800000',
           'genre': 'action'
        };

        chai.request(server)
            .post('/api/v1/schedules')
            .send(schedule)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});
describe('POST /api/v1/schedules', () => {
    it('it should NOT POST a scheduled show without a genre.', (done) => {
        let schedule = {
           'id': 7,
           'title':'Starsky & Hutch',
           'description':'Terry Nash confesses to assassinating a mob boss turned informant just before he was about to testify. Starsky and Hutch discover that everything Terry remembers is not real.',
           'startTime':'1501551000000',
           'endTime':'1501552800000',
        };

        chai.request(server)
            .post('/api/v1/schedules')
            .send(schedule)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});
describe('POST /api/v1/schedules', () => {
    it('it should NOT POST a scheduled show without a start time.', (done) => {
        let schedule = {
           'id': 7,
           'title':'Starsky & Hutch',
           'description':'Terry Nash confesses to assassinating a mob boss turned informant just before he was about to testify. Starsky and Hutch discover that everything Terry remembers is not real.',
           'endTime':'1501552800000',
           'genre': 'action'
        };

        chai.request(server)
            .post('/api/v1/schedules')
            .send(schedule)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});
describe('POST /api/v1/schedules', () => {
    it('it should NOT POST a scheduled show without an end time.', (done) => {
        let schedule = {
           'id': 7,
           'title':'Starsky & Hutch',
           'description':'Terry Nash confesses to assassinating a mob boss turned informant just before he was about to testify. Starsky and Hutch discover that everything Terry remembers is not real.',
           'startTime':'1501551000000',
           'genre': 'action'
        };

        chai.request(server)
            .post('/api/v1/schedules')
            .send(schedule)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                done();
            });
    });
});