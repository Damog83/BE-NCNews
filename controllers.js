const {fetchTopics} = require('./models')

exports.getTopics = (req, res, next) => {
   
   fetchTopics().then((results) => {
     res.status(200).send({results});
   }).catch((err) => {
       next(err)
   })
}