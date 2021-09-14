const bodyParser = require('body-parser')
const bot = require('./botRoute')


module.exports = app => {
    app.use(
        bodyParser.json({limit: '50mb', extended: true}),
        bodyParser.urlencoded({limit: '50mb', extended: true}),
        bot,
        )
    

}