exports.handlePsqlErrors = (err, req, res, next) => {
	if (err.code === '22P02' || err.code === '23502' || err.code === '23503') {
		res.status(400).send({ msg: 'Bad request' });
	} else next(err);
};
