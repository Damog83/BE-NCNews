

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send('Invalid id');
    } else next(err);
  };