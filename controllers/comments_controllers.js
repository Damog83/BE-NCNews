const {fetchCommentsByArticleId, insertCommentByArticleId, removeCommentByCommentId} = require('../models/comments_models');

exports.getCommentsByArticleId = (req, res, next) => {
  const {article_id} = req.params;
  const {sort, order} = req.query;
  fetchCommentsByArticleId(article_id, sort, order).then((comments) => {
    res.status(200).send({comments: comments})
  }).catch(next)
}

  exports.addCommentByArticleId = (req, res, next) => {
    const {article_id} = req.params;
    const {body, username} = req.body;
    insertCommentByArticleId(article_id, username, body).then((comment) => {
      res.status(201).send({comment})
    }).catch(next)
  }

  exports.deleteCommentByCommentId = (req, res, next) => {
    const {comment_id} = req.params
    removeCommentByCommentId(comment_id).then(() => {
      res.status(204).send()
    }).catch(next)
  }