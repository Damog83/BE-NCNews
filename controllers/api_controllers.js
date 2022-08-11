const { fetchApi } = require('../models/api_models');

exports.getApi = (req, res, next) => {
	fetchApi()
		.then((endpoints) => {
			res.status(200).send({ endpoints });
		})
		.catch(next);
};
