const db = require("../db/connection");

exports.fetchCommentsByArticleId = (article_id) => {
	return db
		.query(
			`SELECT * FROM comments
                     WHERE comments.article_id = $1;`,
			[article_id]
		)
		.then((results) => {
			return results.rows;
		});
};

exports.insertCommentByArticleId = (article_id, author, body) => {
	if (
		author === undefined ||
		body === undefined ||
		typeof body !== "string" ||
		typeof author !== "string"
	) {
		return Promise.reject({ status: 404, msg: "Bad request - invalid input" });
	}
	return db
		.query(
			`INSERT INTO comments(article_id, author, body)
                         VALUES($1, $2, $3)
                         RETURNING *;`,
			[article_id, author, body]
		)
		.then((results) => {
			return results.rows[0];
		});
};
