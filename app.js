const express =require('express');
const app = express();
const {handleServerErrors} = require('./errors/index')

const {getTopics} = require('./controllers')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api/*', (req, res) => {
    res.status(404).send('Path not found')
})

app.use(handleServerErrors);

module.exports = app;