const db = require("../db/connection");
const request = require("supertest");
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());


describe('/api/topics', () => {
    describe('GET', () => {
        test('should return an object with an array of objects', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                expect(response.body.results).toHaveLength(3)
                expect(Array.isArray(response.body.results)).toBe(true)
                response.body.results.forEach((slug) => 
                expect(slug).toEqual(
                    expect.objectContaining({
                        description: expect.any(String),
                        slug: expect.any(String)
                    })
                ))
            })
        })

    })
})

describe('/api/articles/:article_id', () => {
    describe('GET', () => {
        test('should return an object containing a single object', () => {
            return request(app)
            .get('/api/articles/:article_id')
            .expect(200)
            .then((response) => {
                response.body.results.forEach((article) =>
                expect(article).toEqual(
                    expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        body: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number)
                    })
                ))
            })
        })
    })
})


describe('invalid path', () => {
    test('returns 404 error message when path not found', () => {
        return request(app)
        .get('/api/invalid')
        .expect(404)
        .then((response) => {
            expect(response.error.text).toBe('Path not found')
        })
    })
})

