//importing modules
const express  = require('express')
const mongoose = require('mongoose')  
const app = express()
var cors = require('cors') 
var morgan = require('morgan')

//adding dotenv
require('dotenv').config();

//getting environmental variables from .env
const port = process.env.PORT || 5000
const mongoURI = process.env.MONGO_URI
 
//bodyParser middleware
app.use(express.json())

//added morgan to log requests 
app.use(morgan('dev'));

//use CORS
app.use(cors())
 

// Connect DB to mongo
mongoose.connect(mongoURI ,  { useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=> console.log("Database connected"))
.catch(err=> console.log(err))
 
 
const users  = require('./routes/users')
 
app.use('/users' , users)


app.listen(port,()=>{ console.log(`Server started on port ${port}`)})