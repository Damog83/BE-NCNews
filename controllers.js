const {fetchTopics, fetchArticleById, updateArticleById} = require('./models')

exports.getTopics = (req, res, next) => {
   
   fetchTopics().then((results) => {
     res.status(200).send({results});
   }).catch((err) => {
       next(err)
   })
}

exports.getArticleById = (req, res, next) => {  
  
  const {article_id} = req.params  
   
  fetchArticleById(article_id).then((article) => { 
    const [articleObj] = article
     res.status(200).send({articleObj})
   }).catch((err) => {
     next(err)
  })
}

exports.patchArticleById = (req, res, next) => {

  
  const {article_id} = req.params;
  const {inc_votes} = req.body;
  
  updateArticleById(article_id, inc_votes).then((updatedArticle) => {
     const [articleObj] = updatedArticle;
       res.status(200).send({articleObj})
  }).catch((err) => {
    next(err)
  })
}