const db = require('./db/connection');



exports.fetchTopics = (sort_by = 'slug', order = 'asc') => {

    const validInputs = ['description', 'slug'];
    if(!validInputs.includes(sort_by)) {
        return Promise.reject({status: 400, msg: 'Bad request - invalid sort value'});
    }
    if(!['asc', 'desc'].includes(order)) {
        return Promise.reject({status: 400, msg: 'Bad request - invalid order value'});
    }
    return db.query("SELECT * FROM topics;")
    .then((results) => {
        return results.rows;
    })
}

exports.fetchUsers = () => {
    return db.query("SELECT username FROM users;")
    .then((results) => {
        return results.rows;
    })
}
exports.fetchArticles = (sort_by = 'created_at', order = 'desc') => {
    const validInputs = ['title' , 'topic' , 'author', 'created_at', 'votes'];
      if(!validInputs.includes(sort_by)) {
        return Promise.reject({status: 400, msg: 'Bad request - invalid sort value'});
  }
  if (!['asc', 'desc'].includes(order)) {
    return Promise.reject({ status: 400, msg: 'Bad request - invalid order value' });
  }
          return db.query('SELECT title, topic, author, created_at, votes FROM articles;')
           .then((results) => {
             return results.rows;
    })
}

exports.fetchArticleById = (article) => {
    return db.query(`SELECT articles.*, COUNT(comments.comment_id) AS comment_count
                    FROM articles
                    LEFT JOIN comments ON comments.article_id = articles.article_id
                    WHERE articles.article_id = $1
                    GROUP BY articles.article_id;`, [article])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg:'Article not found'})
        }
        const articleObject = {...result.rows[0]}
        articleObject.comment_count = Number(articleObject.comment_count)
              return articleObject;
    })
}

exports.updateArticleById = (article, votes) => {
    if(votes === undefined || typeof(votes) !== 'number') {
        return Promise.reject({status: 404, msg:'Bad request - invalid input'})
    }
    return db.query(`UPDATE articles
                     SET votes = votes + $1
                     WHERE article_id = $2
                     RETURNING *;`, [votes, article] )
    .then((results) => {
        return results.rows;
    })               
}