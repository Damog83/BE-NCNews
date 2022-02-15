const express =require('express');
const app = express();

const {getTopics, getArticleById} = require('./controllers');
const {handleServerErrors} = require('./errors/index');

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api/articles/:article_id', getArticleById);

app.get('/api/*', (req, res) => {
    res.status(404).send('Path not found');
})

app.use(handleServerErrors);

module.exports = app;