const express = require("express");
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express();
const Router = require('./routes/router')
const expressValidator = require('express-validator')

const db = require('./db')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())
app.use(expressValidator());

 

app.use('/api', Router)

var port = process.env.port || 3001;

app.listen(port,()=>{
    console.log("Server started on ",port)
})