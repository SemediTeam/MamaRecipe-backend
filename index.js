require('dotenv').config()

const express = require('express')
const logger =require("morgan")
const cors = require('cors')
const bodyParser = require('body-parser');

const mainRouter = require("./src/routes/index")

const app = express()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at port ${process.env.PORT}`)
})

app.use(express.static("public"))
app.use(cors())
app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use("/", mainRouter)

module.exports = app;