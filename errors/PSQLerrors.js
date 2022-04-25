

exports.handlePsqlErrors = (err, req, res, next) => {
    if (err.code === '22P02') {
      res.status(400).send({msg: {msg: 'Invalid id'}});
    } else if (err.code === '23502')  {
      res.status(400).send({msg: {msg: 'Not Null Violations'}})
    } else next(err);
  };