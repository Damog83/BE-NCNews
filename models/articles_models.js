const db = require("../db/connection");
const { checkExists } = require("../utils.js/checkExists");

exports.fetchArticles = (topic, sort = "created_at", order = "desc") => {
	const validInputs = [
		"title",
		"topic",
		"author",
		"created_at",
		"votes",
		"comment_count",
	];
	if(!validInputs.includes(sort)) {
		return Promise.reject({
			status: 400,
			msg: "Invalid sort query"
		});
	}
	if(!["asc", "desc"].includes(order)) {
		return Promise.reject({
			status: 400,
			msg: "Invalid order query",
		});
	}

	const queryValues = [];
	let queryStr = `SELECT	articles.title, 
	articles.topic, 
	articles.author, 
	articles.created_at, 
	articles.votes,
	articles.article_id,
	COUNT(comments.comment_id)::int AS comment_count
	FROM articles
	LEFT JOIN comments ON articles.article_id = comments.article_id `;

	if (topic) {
		queryValues.push(topic);
		queryStr += `WHERE topic = $1 `;
	}

	queryStr += `GROUP BY articles.article_id
	ORDER BY ${sort} ${order};`;
	return db.query(queryStr, [...queryValues]).then((results) => {
		 if(!results.rows.length) {
			return checkExists('topics', 'slug', topic).then(() => {return results.rows})
		}
		return results.rows;
	});
};

exports.fetchArticleById = (article) => {
	return db
		.query(
			`SELECT articles.*, COUNT(comments.comment_id)::int AS comment_count
                    FROM articles
                    JOIN comments ON comments.article_id = articles.article_id
                    WHERE articles.article_id = $1
                    GROUP BY articles.article_id;`,
			[article]
		)
		.then((result) => {
			if (!result.rows.length) {
				return Promise.reject({ status: 404, msg: 'Resource not found from fetch article by article id' });
			}
			const articleObject = { ...result.rows[0] };
			return articleObject;
		});
};

exports.updateArticleById = (article, votes) => {
	return db
		.query(
			`UPDATE articles
                     SET votes = votes + $1
                     WHERE article_id = $2
                     RETURNING *;`,
			[votes, article]
		)
		.then((result) => {
			if (!result.rows.length) {
				return Promise.reject({ status: 404, msg: 'Resource not found' });
			}
			return result.rows;
		});
};
