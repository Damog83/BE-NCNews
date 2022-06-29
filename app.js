const express =require('express');
const app = express();
const cors = require('cors');


const {getApi} = require('./controllers/api_controllers');
const {getTopics} = require('./controllers/topics_controllers');
const {getUsers} = require('./controllers/users_controllers');
const {getCommentsByArticleId, addCommentByArticleId, deleteCommentByCommentId} = require('./controllers/comments_controllers');
const {getArticleById, getArticles, patchArticleById} = require('./controllers/article_controllers');
const {handleServerErrors} = require('./errors/servererrors');
const {handlePsqlErrors} = require('./errors/PGSQLerrors');
const {handleCustomErrors} = require('./errors/customerrors');

app.use(cors());
app.use(express.json());

app.get('/api', getApi);

app.get('/api/topics', getTopics);

app.get('/api/users', getUsers);

app.get('/api/articles', getArticles);

app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchArticleById);

app.get('/api/articles/:article_id/comments', getCommentsByArticleId);
app.post('/api/articles/:article_id/comments', addCommentByArticleId);

app.delete('/api/comments/:comment_id', deleteCommentByCommentId);

app.get('/api/*', (req, res) => {
    res.status(404).send({msg: {msg: 'Path not found'}});
})

app.post('/api/*', (req, res) => {
    res.status(404).send({msg: {msg: 'Path not found'}});
})

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

module.exports = app;