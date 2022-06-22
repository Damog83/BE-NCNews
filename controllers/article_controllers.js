const {fetchArticles,
       fetchArticleById,
       updateArticleById} = require('../models/articles_models')

exports.getArticles = (req, res, next) => {
  const {topic, sort, order} = req.query;
   fetchArticles(topic, sort, order).then((articles) => {
    res.status(200).send({articles});
  }).catch(next)
}

exports.getArticleById = (req, res, next) => {  
  const {article_id} = req.params; 
 fetchArticleById(article_id).then((article) => {
   res.status(200).send({article})
 }).catch(next) 
}

exports.patchArticleById = (req, res, next) => {
  const {article_id} = req.params;
  const {inc_votes} = req.body;
   updateArticleById(article_id, inc_votes).then((updatedArticle) => {
     const [article] = updatedArticle;
       res.status(200).send({article})
     }).catch(next)
}