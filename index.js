require('dotenv').config()

const express = require('express')
const logger =require("morgan")
const cors = require('cors')
const mainRouter = require("./src/routes/index")

const app = express()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is running at port ${process.env.PORT}`)
})
app.use(express.static("public"))
app.use(cors())
app.use(logger("dev"))
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use("/", mainRouter)

module.exports = app;