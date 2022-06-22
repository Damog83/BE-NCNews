const db = require("../db/connection");

exports.fetchTopics = (sort_by = "slug", order = "asc") => {
	const validInputs = ["description", "slug"];
	if (!validInputs.includes(sort_by)) {
		return Promise.reject({ status: 400, msg: "Invalid sort query" });
	}
	if (!["asc", "desc"].includes(order)) {
		return Promise.reject({ status: 400, msg: "Invalid order query" });
	}
	return db.query("SELECT * FROM topics;").then((results) => {
		return results.rows;
	});
};
