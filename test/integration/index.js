import assert from 'assert';
import request from 'supertest';
import app from '../../index.js';

describe('Testing Base Routes - api/v1', () => {
    it('Should test base route', done => {
        request(app)
            .get('/api/v1')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                assert.equal(res.body.status, 'API version 1');
                assert.equal(res.body.ok, true);
                assert.equal(res.body.message, 'Welcome to OnePercentLab');
                done();
            })
    });
});


describe('Testing Signup Route - api/v1/signup ', () => {
    it('it should not attempt to save a new user if any or all fields are empty ', done => {
        let body = {
            firstname: "T",
            lastname: "",
            gender: "male",
            date_of_birth: "07/05/1996",
            phone_number: "09090908094",
            image_url: "",
            password: "tomiwa5259",
            oauth_type: "signup",
            oauth_id: "223",
            state_code: "3333",
            city_code: "idfg453",
            country_code: "kdk4",
            address: "13 Hughes Avenue Sabo Yaba",
            email: "sannimichaellels@gmail.com"
        }
        request(app)
            .post('/api/v1/signup')
            .send(body)
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, res) => {
                assert.equal(res.body.responseCode, '01');
                assert.equal(res.body.responseMessage, 'Please fill all fields');
                done();
            })
    });
})
