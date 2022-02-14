const {fetchTopics} = require('./models')

exports.getTopics = (req, res, next) => {
   
   fetchTopics().then((result) => {
     res.status(200).send(result);
   }).catch((err) => {
       next(err)
   })
}