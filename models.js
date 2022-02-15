const db = require('./db/connection')

exports.fetchTopics = () => {
    return db.query("SELECT * FROM topics;")
    .then((results) => {
        return results.rows;
    })
    
}

exports.fetchArticleById = (article) => {

    return db.query("SELECT * FROM articles WHERE article_id = $1;", [article])
    .then((result) => {
        
        if(result.rows.length === 0) {
            return Promise.reject({status: 404, msg:'Article not found'})
        }

       return result.rows;
    })
}