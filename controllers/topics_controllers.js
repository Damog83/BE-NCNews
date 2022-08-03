const {fetchTopics} = require('../models/topics_models.js')

exports.getTopics = (req, res, next) => {
    const {sort, order} = req.query;  
     fetchTopics(sort, order).then((topics) => {
       res.status(200).send({topics});
     }).catch(next)
  }


