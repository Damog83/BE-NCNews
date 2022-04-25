const {fetchTopics} = require('../models/topics_models.js')

exports.getTopics = (req, res, next) => {
    const {sort_by, order} = req.query;  
     fetchTopics(sort_by, order).then((topics) => {
       res.status(200).send({topics});
     }).catch(next)
  }


