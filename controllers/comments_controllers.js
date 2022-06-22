const {fetchCommentsByArticleId, insertCommentByArticleId, removeCommentByCommentId} = require('../models/comments_models');
const {checkArticleExists} = require('../models/articles_models');

// exports.getCommentsByArticleId = (req, res, next) => {
//     const {article_id} = req.params;
//     return Promise.all([fetchCommentsByArticleId(article_id), checkArticleExists(article_id)]).then((comments) => {
//       const commentsObj = comments[0]
//       res.status(200).send({comments: commentsObj})
//     }).catch(next)
//   }

exports.getCommentsByArticleId = (req, res, next) => {
  const {article_id} = req.params;
  fetchCommentsByArticleId(article_id).then((comments) => {
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