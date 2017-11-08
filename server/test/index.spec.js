require('dotenv').config();

const assert = require('chai').assert;
const request = require('supertest');

const app = require('../index');

describe('API Test Suite', () => {
    describe('GET /api/v1', () => {
        it('should respond with JSON message', (done) => {
            request(app)
            .get('/api/v1')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, result) => {
                let json = result.body;
                assert.equal(json.message, 'API version: 1' );
                done();
            });
        });
    });
    describe('POST /api/v1/upload', () => {
        it('fail to upload a file with an error message saying a file is required', (done) => {
            request(app)
            .post('/api/v1/upload')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, result) => {
                let json = result.body;
                assert.equal(json.error, 'A file with the extension .jpeg,.jpg,.png must be sent in multipart/form-data key \'file\'' );
                done();
            });
        });

        it('fail to upload a file with an error message saying the file has the wrong extension', (done) => {
            request(app)
            .post('/api/v1/upload')
            .attach('file', 'test/upload.txt')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(400)
            .end((err, result) => {
                let json = result.body;
                assert.equal(json.error, 'File must have extension .jpeg,.jpg,.png' );
                done();
            });
        });

        it('should correctly upload a file', (done) => {
            request(app)
            .post('/api/v1/upload')
            .attach('file', 'test/colorwheel.png')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, result) => {
                let json = result.body;
                assert.typeOf(json.key, 'string' );
                assert.typeOf(json.inserted, 'boolean' );
                done();
            });
        });
    });
});
