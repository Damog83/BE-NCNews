const {fetchCommentsByArticleId, insertCommentByArticleId} = require('../models/comments_models');
const {checkArticleExists} = require('../models/articles_models');

exports.getCommentsByArticleId = (req, res, next) => {
  console.log('within controller')
    const {article_id} = req.params;
    return Promise.all([fetchCommentsByArticleId(article_id), checkArticleExists(article_id)]).then((comments) => {
      const commentsObj = comments[0]
      res.status(200).send({comments: commentsObj})
    }).catch(next)
  }

  exports.addCommentByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    const {body, username} = req.body;
    insertCommentByArticleId(article_id, username, body).then((comment) => {
      res.status(201).send({comment})
    }).catch(next)
  }