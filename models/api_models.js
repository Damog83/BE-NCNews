const { readFile } = require('fs');

exports.fetchApi = () => {
	return new Promise((resolve, reject) => {
		readFile('./endpoints.json', 'utf8', (err, endpoints) => {
			if (err) reject(err);
			resolve(endpoints);
		});
	});
};
