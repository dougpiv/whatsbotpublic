const express = require('express')
const routes = require('./routes')

const app = express()
const port = 3000
var cors = require('cors')

app.use(cors())
app.use(express.static('public'));

routes(app)

app.get("/", (req, res) => {
    res.json("ok")
})

app.listen(port, () => console.log(`servidor rodando na porta ${port} `))

module.exports = app