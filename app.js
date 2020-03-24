const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3009;
const book = require('./src/route/book')
const user = require('./src/route/user')
const logger = require('morgan')

app.use(
    bodyParser.urlencoded({
        extended : true
    })
)

app.use(bodyParser.json())
app.use(logger('dev'))
app.listen(port,()=>{
    console.log("Server running on port ",port)
})

app.use('/api/v1',book)
app.use('/api/v1/user',user)
// app.use('/api/v1/admin',admin)

module.exports = app


