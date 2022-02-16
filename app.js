const express =require('express');
const app = express();

const {getTopics, getArticleById, patchArticleById} = require('./controllers');
const {handleServerErrors} = require('./errors/servererrors');
const {handlePsqlErrors} = require('./errors/PSQLerrors');
const {handleCustomErrors} = require('./errors/customerrors');

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);
app.patch('/api/articles/:article_id', patchArticleById)

app.get('/api/*', (req, res) => {
    res.status(404).send('Path not found');
})

app.use(handleCustomErrors);

app.use(handlePsqlErrors);

app.use(handleServerErrors);

module.exports = app;