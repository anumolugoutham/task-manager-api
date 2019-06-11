const express=require('express')
const app=express()
require("./db/mongoose.js")
const User=require("./models/user.js")
const Task=require("./models/task.js")

const port=process.env.Port||3000
app.use(express.json())

app.post("/Users",async function(req,res){
  const user=new User(req.body)
try{
  const user=await user.save()
res.send(user)
}
catch(e){
  res.status(400).send(e)
}
  // user.save().then(function(user){
  //   res.send(user)
  // }).catch(function(e){
  //   res.status(400).send(e)
  // })
})

app.get("/Users",function(req,res){
  User.find({}).then((result)=>{
    res.send(result)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})
app.get("/Users/:id",function(req,res){
  const _id=req.params.id
  User.find({_id}).then((result)=>{
    if(!result){
      return res.status(404).send()
    }
    res.send(result)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})



app.get("/tasks",function(req,res){
  Task.find({}).then((result)=>{
    res.send(result)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})
app.get("/tasks/:id",function(req,res){
  const _id=req.params.id
  Task.find({_id}).then((tasks)=>{
    if(!tasks){
      return res.status(404).send()
    }
    res.send(tasks)
  }).catch((e)=>{
    res.status(500).send(e)
  })
})





app.post("/tasks",function(req,res){
  const task=new Task(req.body)

  task.save().then(function(task){
    res.send(task)
  }).catch(function(e){
    res.status(400).send(e)
  })
})



app.listen(port,function(){
  console.log("server is on port "+port)
})
