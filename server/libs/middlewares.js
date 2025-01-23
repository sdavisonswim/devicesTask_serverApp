const bodyParser = require('body-parser');
const morgan = require('morgan');

module.exports = app => {
  app.set('port', process.env.PORT || 3000)
  app.set('json spaces', 4)

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(morgan('dev'))

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
  });
}