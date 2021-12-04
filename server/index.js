const express  = require('express')
const dotenv = require('dotenv').config()
const mongoose  = require('mongoose')







// routes
const authRoute = require('./routes/auth')

// to connect with mongodb server we use mongoose



const app = express()


// it returns promises and this is the code for the connection of the mongo server
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("connected to mongo cloud");
  })
  .catch((err) => {
    console.log(err);
  });

    // middle ware
app.use(express.json())

app.use("/api/auth",authRoute)


app.listen(process.env.PORT,()=>{
    console.log(`server listing on the port ${process.env.PORT}`)
})

