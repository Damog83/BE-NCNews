const {fetchTopics, fetchArticleById} = require('./models')

exports.getTopics = (req, res, next) => {
   
   fetchTopics().then((results) => {
     res.status(200).send({results});
   }).catch((err) => {
       next(err)
   })
}

exports.getArticleById = (req, res, next) => {
  console.log(req)
  //fetchArticleById()
}