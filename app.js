const express =require('express');
const app = express();

const {getTopics} = require('./controllers')

app.use(express.json())

app.get('/api/topics', getTopics)

app.get('/api/*', (req, res) => {
    res.status(404).send('Path not found')
})

module.exports = app;