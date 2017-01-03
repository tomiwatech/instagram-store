import assert from 'assert';
import request from 'supertest';
import app from '../../index.js';

describe('Integration test', function() {
    it('Test routes', function(done) {
        request(app)
            .get('/api/')
            .set('Content-Type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res) {
                assert.equal(res.body.message, 'Get Service');
                done();
            })
    });
});
