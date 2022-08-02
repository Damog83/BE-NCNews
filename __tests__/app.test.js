const db = require("../db/connection");
const request = require("supertest");
const seed = require('../db/seeds/seed');
const testData = require('../db/data/test-data');
const app = require('../app');


beforeEach(() => seed(testData));
afterAll(() => db.end());


describe('/api/topics', () => {
    describe('GET', () => {
        test('should return status 200 and an object with an array of objects', () => {
            return request(app)
            .get('/api/topics')
            .expect(200)
            .then((response) => {
                expect(response.body.topics).toHaveLength(3)
                expect(Array.isArray(response.body.topics)).toBe(true)
                response.body.topics.forEach((slug) => 
                expect(slug).toEqual(
                    expect.objectContaining({
                        description: expect.any(String),
                        slug: expect.any(String)
                    })
                ))
            })
        })

    })
    describe('invalid sort query', () => {
        test('returns status 400 and message "Invalid sort query"', () => {
            return request(app)
            .get('/api/topics?sort_by=invalid')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Invalid sort query'})
            })
        })
    })
    describe('invalid order query', () => {
        test('returns status 400 and message "Invalid order query"', () => {
            return request(app)
            .get('/api/topics?order=invalid')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Invalid order query'})
            })
        })
    })
})

describe('/api/users', () => {
    describe('GET', () => {
        test('should return status 200 and an object with an array of objects', () => {
            return request(app)
            .get('/api/users')
            .expect(200)
            .then((response) => {
                expect(response.body.users).toHaveLength(4)
                expect(Array.isArray(response.body.users)).toBe(true)
                response.body.users.forEach((user) => 
                expect(user).toEqual(
                    expect.objectContaining({
                        username: expect.any(String)
                    })
                ))
            })
        })

    })
})

describe('/api/articles', () => {
    describe('GET', () => {
        test('should return status 200 and an object containing an array of article objects in descending created_at value', () => {
            return request(app)
            .get('/api/articles')
            .expect(200)
            .then((response) => {
                expect(response.body.articles).toHaveLength(12)
                expect(Array.isArray(response.body.articles)).toBe(true)
                expect(response.body.articles).toBeSortedBy('created_at', {descending:true})
                response.body.articles.forEach((article) => 
                expect(article).toEqual(
                    expect.objectContaining({
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comment_count: expect.any(Number),
                        article_id: expect.any(Number)
                    })
                ))
            })
        })
    })
    describe('sort by', () => {
        test('returns articles sorted by author', () => {
            return request(app)
            .get('/api/articles?sort=author')
            .expect(200)
            .then((response) => {
                expect(response.body.articles).toHaveLength(12)
                expect(Array.isArray(response.body.articles)).toBe(true)
                expect(response.body.articles).toBeSortedBy('author', {descending:true})
                response.body.articles.forEach((article) => {
                expect(article).toEqual(
                    expect.objectContaining({
                        title: expect.any(String),
                        topic: expect.any(String),
                        author: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comment_count: expect.any(Number)
                    })
                    )
                })
            })
        })
    })
    describe('invalid sort query', () => {
        test('returns status 400 and message "Invalid sort query"', () => {
            return request(app)
            .get('/api/articles?sort=invalid')
            .expect(400)
            .then((response) => {
                console.log(response.body)
                expect(response.body.msg).toEqual({msg: 'Invalid sort query'})
             })
         })
     })    
    describe('ascending order', () => {
        test('return articles sorted by title in ascending order', () => {
            return request(app)
            .get('/api/articles?sort=title&order=asc')
            .expect(200)
            .then((response) => {
                expect(response.body.articles).toHaveLength(12)
                expect(Array.isArray(response.body.articles)).toBe(true)
                expect(response.body.articles).toBeSortedBy('title', {ascending:true})
                response.body.articles.forEach((article) => {
                    expect(article).toEqual(
                        expect.objectContaining({
                            title: expect.any(String),
                            topic: expect.any(String),
                            author: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(Number)
                        })
                    )
                })
            })
        })
    })
    describe('invalid order query', () => {
        test('returns status 400 and message "Invalid order query"', () => {
            return request(app)
            .get('/api/articles?order=invalid')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Invalid order query'})
            })
        })
    })
    describe('return articles by topic', () => {
        test('return articles with topic of mitch sorted by comment_count in ascending order', () => {
            return request(app)
            .get('/api/articles?topic=mitch&sort=comment_count&order=asc')
            .expect(200)
            .then((response) => {
                expect(response.body.articles).toHaveLength(11)
                expect(Array.isArray(response.body.articles)).toBe(true)
                response.body.articles.forEach((article) => {
                    expect(article).toEqual(
                        expect.objectContaining({
                            title: expect.any(String),
                            topic: 'mitch',
                            author: expect.any(String),
                            created_at: expect.any(String),
                            votes: expect.any(Number),
                            comment_count: expect.any(Number)
                        })
                    )
                })
            })
        })
    })
    describe('topic does not exist', () => {
        test('returns 404 "No articles found on topic"', () => {
            return request(app)
            .get('/api/articles?topic=dogs')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Resource not found'})
            })
        })
    })
    describe('topic exists but no articles on topic', () => {
        test('returns 200 and an empty array', () => {
            return request(app)
            .get('/api/articles?topic=paper')
            .expect(200)
            .then((response) => {
                expect(response.body.articles).toHaveLength(0)
                expect(Array.isArray(response.body.articles)).toBe(true)
            })
        })
    })
})

describe('/api/articles/:article_id', () => {
    describe('GET', () => {
        test('should return status 200 and an object containing requested article', () => {            
            return request(app)
            .get(`/api/articles/1`)
            .expect(200)
            .then((response) => {
                expect(response.body.article).toEqual(
                    expect.objectContaining({
                        author: expect.any(String),
                        title: expect.any(String),
                        article_id: expect.any(Number),
                        body: expect.any(String),
                        topic: expect.any(String),
                        created_at: expect.any(String),
                        votes: expect.any(Number),
                        comment_count: expect.any(Number)
                    })
                )
            })
        })
    })
    describe('bad request invalid article id', () => {
        test('returns status 400 and message "Invalid id"', () => {
            return request(app)
            .get('/api/articles/invalidId')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Bad request'})
            })
        })
    })
    describe('article does not exist', () => {
        test('returns status 404 and message "Resource not found"', () => {
            return request(app)
            .get('/api/articles/999')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Resource not found'})
            })
        })
    })
    describe('PATCH', () => {
        test('should return status 200 and an object containing updated article', () => {
            const incVotes = { inc_votes: 10 };
            return request(app)
            .patch('/api/articles/1')
            .send(incVotes)
            .expect(200)
            .then((response) => {
                expect(response.body.article).toEqual(
                    expect.objectContaining({
                            author: expect.any(String),
                            title: expect.any(String),
                            article_id: expect.any(Number),
                            body: expect.any(String),
                            topic: expect.any(String),
                            created_at: expect.any(String),
                            votes: 110
                    })
                )
            })
        })
    })       
    describe('body missing required fields', () => {
        test('returns status 400 and message "Bad request"', () => {
            const inc_votes = {};
            return request(app)
            .patch('/api/articles/1')
            .send(inc_votes)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Bad request'})
            })

        })
    })
    describe('input incorrect type', () => {
        test('returns status 400 and message "Bad request"', () => {
            const inc_votes = { inc_votes: 'A string' };
            return request(app)
            .patch('/api/articles/1')
            .send(inc_votes)
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Bad request'})
            })
        })
    })
    describe('article does not exist', () => {
        test('returns status 404 and message "resource not found" if article does not exist', () => {
            const inc_votes = {inc_votes: 10}
            return request(app)
            .patch('/api/articles/9999')
            .send(inc_votes)
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Resource not found'})
            })
        })
    })
})


describe('/api/articles/:article_id/comments', () => {
    describe('GET', () => {
        test('returns status 200 and a comments array of comment objects', () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then((response) => {
                expect(response.body.comments).toHaveLength(11)
                expect(Array.isArray(response.body.comments)).toBe(true)
                response.body.comments.forEach((comment) => 
                expect(comment).toEqual(
                    expect.objectContaining({
                        comment_id: expect.any(Number),
                        votes: expect.any(Number),
                        created_at: expect.any(String),
                        author: expect.any(String),
                        body: expect.any(String)
                    })
                ))
            })
        })
        test('returns status 200 empty array if article exists but has no comments', () => {
            return request(app)
            .get('/api/articles/4/comments')
            .expect(200)
            .then((response) => {
                expect(response.body.comments).toEqual([]);
            })            
        })
        test('returns 404 and message "Resource not found" if article does not exist', () => {
            return request(app)
            .get('/api/articles/999999999/comments')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Resource not found'})
            })
        })
    }) 
    describe('sort by', () => {
        test('returns comments sorted by created_at in descending order by default', () => {
            return request(app)
            .get('/api/articles/1/comments')
            .expect(200)
            .then((response) => {
                expect(response.body.comments).toHaveLength(11)
                expect(Array.isArray(response.body.comments)).toBe(true)
                expect(response.body.comments).toBeSortedBy('created_at', {descending:true})
                response.body.comments.forEach((comment) => {
                    expect(comment).toEqual(
                        expect.objectContaining({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String)
                        })
                    )
                })
            })
        })
    })
    describe('sort by and order by', () => {
        test('returns comments sorted by created_at in ascending order', () => {
            return request(app)
            .get('/api/articles/1/comments?sort=created_at&order=asc')
            .expect(200)
            .then((response) => {
                expect(response.body.comments).toHaveLength(11)
                expect(Array.isArray(response.body.comments)).toBe(true)
                expect(response.body.comments).toBeSortedBy('created_at', {ascending:true})
                response.body.comments.forEach((comment) => {
                    expect(comment).toEqual(
                        expect.objectContaining({
                            comment_id: expect.any(Number),
                            votes: expect.any(Number),
                            created_at: expect.any(String),
                            author: expect.any(String),
                            body: expect.any(String)
                        })
                    )
                })
            })
        })
    })
    describe('invalid sort query', () => {
        test('returns status 400 and message "Invalid sort query"', () => {
            return request(app)
            .get('/api/articles/1/comments?sort=invalid')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Invalid sort query'})
            })
        })
    })
    describe('invalid order query', () => {
        test('returns status 400 and message "Invalid order query', () => {
            return request(app)
            .get('/api/articles/1/comments?sort=created_at&order=invalid')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Invalid order query'})
            })
        })
    })       
    describe('POST', () => {
        test('should return status 201 and an object with the posted comment', () => {
            const comment = { username: 'butter_bridge', body: 'I highly recommend reading this article but not this comment' };
            return request(app)
            .post('/api/articles/1/comments')
            .send(comment)
            .expect(201)
            .then((response) => {             
                 expect(response.body.comment).toEqual(
                     
                    expect.objectContaining({
                        comment_id: 19,
                        body: 'I highly recommend reading this article but not this comment',
                        article_id: 1,
                        author: 'butter_bridge',
                        votes: 0,
                        created_at: expect.any(String)
                    })
                )
            })
        })
        describe('body missing required fields', () => {
            test('returns status 400 and message "Bad request"', () => {
                const comment = {};
                return request(app)
                .post('/api/articles/1/comments')
                .send(comment)
                .expect(400)
                .then(response => {
                    expect(response.body.msg).toEqual({msg: 'Bad request'})
                })
            })
            test('returns status 400 and message "Bad request"', () => {
                const comment = {username: 'butter_bridge'};
                return request(app)
                .post('/api/articles/1/comments')
                .send(comment)
                .expect(400)
                .then(response => {
                    expect(response.body.msg).toEqual({msg: 'Bad request'})
                })
            })
            test('returns status 400 and message "Bad request"', () => {
                const comment = {body : 'I highly recommend reading this article but not this comment'};
                return request(app)
                .post('/api/articles/1/comments')
                .send(comment)
                .expect(400)
                .then(response => {
                    expect(response.body.msg).toEqual({msg: 'Bad request'})
                })
            })
        })
        describe('input incorrect type', () => {
            test('returns status 400 and message "Bad request" if invalid username is given', () => {
                const comment = {username: 22222, body : 'I highly recommend reading this article but not this comment'};
                return request(app)
                .post('/api/articles/1/comments')
                .send(comment)
                .expect(400)
                .then(response => {
                    expect(response.body.msg).toEqual({msg: 'Bad request'})
                })
            })
        })
        describe('article does not exist', () => {
            test('returns 404 and message "Resource not found" if article does not exist', () => {
                const comment = { username: 'butter_bridge', body: 'I highly recommend reading this article but not this comment' };
                return request(app)
                .post('/api/articles/999/comments')
                .send(comment)
                .expect(404)
                .then(response => {
                    expect(response.body.msg).toEqual({msg: 'Resource not found'})
                })
            })
        })
    })
})
describe('invalid path', () => {
    test('returns status 404 error message when path not found', () => {
        return request(app)
        .get('/api/invalid')
        .expect(404)
        .then((response) => {
            expect(response.body.msg).toEqual({msg: 'Path not found'})
        })
    })
})

describe('/api/comments/:comment_id', () => {
    describe('DELETE', () => {
        test('deletes comment by comment_id', () => {
            return request(app)
            .delete('/api/comments/1')
            .expect(204)
            })
        })
    describe('comment_id does not exist', () => {
        test('returns msg: "comment does not exist" if attempt to delete comment by non existing id is made', () => {
            return request(app)
            .delete('/api/comments/9999')
            .expect(404)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Resource not found'})
            })
        })
    })
    describe('invalid comment_id', () => {
        test('returns msg: "invalid comment id" if delete request is made with invalid comment_id', () => {
            return request(app)
            .delete('/api/comments/invalidCommentId')
            .expect(400)
            .then((response) => {
                expect(response.body.msg).toEqual({msg: 'Bad request'})
            })
        })
    })
})

describe('GET /api', () => {
    test('returns JSON with all available endpoints of API', () => {
        return request(app)
        .get('/api')
        .then((response) => {
            expect(typeof response.body.endpoints).toBe('string')
        })
    })
})