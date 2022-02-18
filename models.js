const db = require('./db/connection');
const articles = require('./db/data/test-data/articles');


exports.fetchTopics = () => {
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
    
    const validInputs = ['' , 'title' , 'topic' , 'author', 'body', 'created_at', 'votes']
      if(!validInputs.includes(sort_by)){
        return Promise.reject({status: 400, msg: 'Bad request - invalid sort/order value'});
  }
  if (!['asc', 'desc'].includes(order)) {
    return Promise.reject({ status: 400, msg: 'Bad request - invalid sort/order value' });
  }
          return db.query("SELECT * FROM articles;")
           .then((results) => {
             return results.rows;
    })
}

exports.fetchArticleById = (article) => {
    return db.query(`SELECT *
                    FROM articles 
                    WHERE article_id = $1;`, [article])
    .then((result) => {
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg:'Article not found'})
        }
              return result.rows;
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