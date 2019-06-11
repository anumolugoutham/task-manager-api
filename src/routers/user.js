const express=require("express")
const User=require("../models/user.js")
const router=new express.Router()
const {sendmail,cancelmail}=require("../email/account")
const auth=require("../middleware/auth")
const multer=require("multer")
const sharp=require("sharp")

const upload=multer({
  // dest:"avatars",
  limits:{
    filessize:1000000
  },
  fileFilter(req,file,cb){
    if(!file.originalname.match(/\.(doc|docx|jpg|jpeg|png)$/))
    {
      return cb(new Error("please provide a word file"))
    }
    return cb(undefined,true)
  }
  })



router.post("/Users/me/avatar",auth,upload.single("avatar"),async (req,res)=>{

  const buffer=await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
  req.user.avatar=buffer
  // req.user.avatar=req.file.buffer
  await req.user.save()
  res.send()
},(error,req,res,next)=>{
  res.status(400).send({error:error.message})
})

router.delete("/Users/me/avatar",auth,async (req,res)=>{
  req.user.avatar=undefined
  await req.user.save()
  res.send()
},(error,req,res,next)=>{
  res.status(400).send({error:error.message})
})

router.get("/Users/:id/avatar",async (req,res)=>{

try{
  const user=await User.findById(req.params.id)
  if(!user || !user.avatar){
    throw new Error()
  }
res.set("Content-type","image/png")
res.send(user.avatar)

}
catch(e){
  res.status(500).send(e)
}

})


router.post("/Users",async function(req,res){
  const user=new User(req.body)
try{
  await user.save()
  // sendmail(user.email,user.name)
  const token=await user.generateAuthTokens()
res.status(201).send({user,token})
}
catch(e){
  res.status(400).send(e)
}
})


router.post("/Users/login",async function(req,res){
try{
  const user=await User.findByCredentials(req.body.email,req.body.password)
  const token=await user.generateAuthTokens()
  res.send({user,token})
}
  catch(e){
    res.status(400).send()
  }
})


router.post("/Users/logout",auth,async (req,res)=>{
try{
  req.user.tokens =req.user.tokens.filter(function(token){
    return token.token === req.token
  })
  await req.user.save()
  res.send()
  // res.status(200)
}
catch(e){
  res.status(500).send()
}
})


router.post("/Users/logoutall",auth,async (req,res)=>{
try{
  req.user.tokens =[]
  await req.user.save()
  res.send()
  // res.status(200)
}
catch(e){
  res.status(500).send()
}
})


router.get("/Users/me",auth,async function(req,res){
res.send(req.user)
})


router.get("/Users/:id",async function(req,res){
  const _id=req.params.id
  try{
    const result=await User.find({_id})
    if(!result){
      return res.status(404).send()
      res.send(result)
    }
  }
  catch(e){
    res.status(500).send(e)
  }
})


router.patch("/Users/me",auth,async function(req,res){
const updates=Object.keys(req.body)
const allowedUpdates=['name','email','address','password']
const valid=updates.every((update)=>{
  return allowedUpdates.includes(update)
})
if(!valid){
  return res.status(400).send("invalid update name ")
}
try{
  const user=await User.findById(req.user._id)
  updates.forEach((update)=>{
    user[update]=req.body[update]
  })
  await user.save()
  // const user=await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidations:true})
  if(!user){
    return res.status(404).send()
  }
  res.send(user)
}
catch(e){
  res.status(400).send(e)
}
})


router.delete('/users/me',auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.params.id)
        // const user = await User.findByIdAndDelete(req.user._id)
        // if (!user) {
        //     return res.status(404).send()
        // }
        await req.user.remove()
        // cancelmail(req.user.email,req.user.name)
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports=router
