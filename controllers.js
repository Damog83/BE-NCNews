
const {fetchTopics,
       fetchUsers,
       fetchArticles,
       fetchArticleById,
       updateArticleById,
       fetchCommentCountByArticleId} = require('./models')

exports.getTopics = (req, res, next) => {
  const {sort_by, order} = req.query;  
   fetchTopics(sort_by, order).then((topics) => {
     res.status(200).send({topics});
   }).catch(next)
}

exports.getUsers = (req, res, next) => {
  fetchUsers().then((users) => {
   res.status(200).send({users});
 }).catch(next)
}

exports.getArticles = (req, res, next) => {
  const {sort_by, order} = req.query;
   fetchArticles(sort_by, order).then((articles) => {
    res.status(200).send({articles});
  }).catch(next)
}

exports.getArticleById = (req, res, next) => {  
  const {article_id} = req.params  
 fetchArticleById(article_id).then((article) => {
   res.status(200).send({article})
 }).catch(next) 
}

exports.patchArticleById = (req, res, next) => {
  const {article_id} = req.params;
  const {inc_votes} = req.body;
   updateArticleById(article_id, inc_votes).then((updatedArticle) => {
     const [articleObj] = updatedArticle;
       res.status(200).send({articleObj})
     }).catch(next)
}