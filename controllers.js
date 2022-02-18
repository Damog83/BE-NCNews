
const {fetchTopics, fetchUsers, fetchArticles, fetchArticleById, updateArticleById} = require('./models')

exports.getTopics = (req, res, next) => {
  const {sort_by, order} = req.query;  
   fetchTopics(sort_by, order).then((topics) => {
     res.status(200).send({topics});
   }).catch((err) => {
       next(err)
   })
}

exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
   res.status(200).send({users});
 }).catch((err) => {
     next(err)
})
}

exports.getArticles = (req, res, next) => {
  const {sort_by, order} = req.query;
   fetchArticles(sort_by, order).then((articles) => {
    res.status(200).send({articles});
  }).catch((err) => {
      next(err)
  })
}

exports.getArticleById = (req, res, next) => {  
  const {article_id} = req.params  
   fetchArticleById(article_id).then((articleArray) => { 
    const [articleObj] = articleArray
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