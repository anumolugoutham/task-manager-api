const express=require('express')
const app=express()
require("./db/mongoose.js")
const userrout=require("./routers/user")
const taskrout=require("./routers/task")

const port=process.env.Port
//middleware
//req -- middleware --routers

app.use(express.json())
app.use(userrout)
app.use(taskrout)

app.listen(port,function(){
  console.log("server is on port "+port)
})

// const multer=require("multer")
//
// const upload=multer({
//   dest:"images"
// })
//
//
// app.post("/upload",upload.single("upload"),(req,res)=>{
//   res.send()
// },(error,req,res,next)=>{
//   res.status(400).send({"error":error.message})
// })

// const jwt = require('jsonwebtoken')
//
// const myFunction = async () => {
//     const token = jwt.sign({ _id: 'abc123' }, 'thisismynewcourse', { expiresIn: '7 days' })
//     console.log(token)
//
//     const data = jwt.verify(token, 'thisismynewcourse')
//     console.log(data)
// }
//
// myFunction()

// const Task=require("./models/task")
// const User=require("./models/user")
// const main=async ()=>{
//   // const task=await Task.findById("5cf9016ccf889a32a4246b3a")
//   // await task.populate('owner').execPopulate()
//   // console.log(task.owner)
//   const user=await User.findById("5cf8fe9d9aba8f1ff890f647")
//   await user.populate('tasks').execPopulate()
//   console.log(user.tasks)
//
// }
// main()
