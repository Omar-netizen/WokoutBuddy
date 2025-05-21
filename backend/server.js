require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const chatRoutes = require('./routes/chatRoutes')

// express app
const app = express()

//middleware
app.use(express.json())

app.use((req,res,next) =>{
    console.log(req.path,req.method)
    next()
})

//routes
app.use('/api/workouts',workoutRoutes)
app.use('/api/chat', chatRoutes)


//connect to db
mongoose.connect(process.env.MONG_URI)
   .then(() =>{
    app.listen(process.env.PORT, () =>{
        console.log('connected to db and listening on port',process.env.PORT)
    })

   }) 
   .catch((error) => {
    console.log(error)
   })



