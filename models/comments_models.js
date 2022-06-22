const db = require("../db/connection");
const { checkExists } = require("../utils.js/checkExists");

exports.fetchCommentsByArticleId = (article_id) => {
	return db
		.query(
			`SELECT * FROM comments
                     WHERE comments.article_id = $1;`,
			[article_id]
		)
		.then((results) => {
			if (!results.rows.length) {
				return checkExists("articles", "article_id", article_id).then(() => {
					return results.rows;
				});
			}
			return results.rows;
		});
};

exports.insertCommentByArticleId = (article_id, author, body) => {
	return checkExists("articles", "article_id", article_id).then(() => {
		return db.query(
			`INSERT INTO comments(article_id, author, body)
                         VALUES($1, $2, $3)
                         RETURNING *;`,
			[article_id, author, body]
		).then((results) => {
			return results.rows[0];
		});
	});
};

exports.removeCommentByCommentId = (comment_id) => {
	return db
		.query(
			`DELETE FROM comments
		 WHERE comment_id = $1;`,
			[comment_id]
		)
		.then((results) => {
			if (results.rowCount === 0) {
				return checkExists("comments", "comment_id", comment_id);
			}
		});
};
