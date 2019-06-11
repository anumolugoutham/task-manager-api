
const express=require("express")
const auth=require("../middleware/auth")
const Task=require("../models/task.js")
const router=new express.Router()
//tasks?completed:true
router.get("/tasks",auth,async function(req,res){
const match={}
const sort={}


if(req.query.completed){
  match.completed=req.query.completed==="true"
}

if(req.query.sortBy){
  const parts=req.query.sortBy.split(":")
  sort[parts[0]] = parts[1]==="desc" ? -1 : 1
}

  try{
    await req.user.populate({
      path:"tasks",
      match,
      options:{
        limit:parseInt(req.query.limit),
        skip:parseInt(req.query.skip),//pagination
        sort
      }
  }).execPopulate()
    res.send(req.user.tasks)
  }
  catch(e){
    res.status(500).send(e)
  }

})

router.get("/tasks/:id",auth,async function(req,res){
  const _id=req.params.id
try{
  const tasks=await Task.findOne({_id,owner:req.user._id})
  if(!tasks){
    return res.status(404).send()
  }
  res.send(tasks)
}

catch(e){
  res.status(500).send(e)
}
})





router.post("/tasks",auth, async function(req,res){
  // const task=new Task(req.body)
  const task=new Task({
    ...req.body,
    owner:req.user._id
  })
try{
  await task.save()
  res.send(task)
}
catch(e){
  res.status(400).send(e)
}
})



router.patch("/Tasks/:id",auth,async function(req,res){
const updates=Object.keys(req.body)
const allowedUpdates=['description','completed']
const valid=updates.every((update)=>{
  return allowedUpdates.includes(update)
})
if(!valid){
  return res.status(400).send("invalid update name ")
}
try{
  const task=await Task.findOne({_id:req.params.id,owner:req.user._id})

  if(!task){
    return res.status(404).send()
  }
  updates.forEach((update)=>{
    user[update]=req.body[update]
  })
  await task.save()
  // const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidations:true})

  res.send(task)
}
catch(e){
  res.status(400).send(e)
}
})


router.delete('/tasks/:id',auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id)
        const task = await Task.findOneAndDelete({_id:req.params.id,owner:req.user._id})
        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})
module.exports=router
