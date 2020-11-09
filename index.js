const express = require('express')
const cors = require('cors')
const path = require('path')
const helmet = require("helmet");
require('./src/db/mongoose')
const User = require ('./src/models/user')
const Task = require('./src/models/task')
const userRouter = require('./src/routes/user')
const taskRouter = require('./src/routes/task')

const app = express()
const port = process.env.PORT 

app.use(cors())
app.use(helmet())
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

// Set up static directory to serve in express

app.use(express.static(path.join(__dirname, '/client/build')))

app.get('*', (req,res) => {
    res.sendFile()
}) 

app.listen(port, () => {
    console.log(`Server is starting on port ${port}`)
})







