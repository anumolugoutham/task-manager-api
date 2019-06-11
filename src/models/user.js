const mongoose=require('mongoose')
const validator=require('validator')
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
const Task=require("./task")

const userschema=new mongoose.Schema({
  name:{
    type:String,
    required:true,
    trim:true
  },
  email:{
    type:String,
    unique:true,
    required:true,
    validate:function(value){
    if(!validator.isEmail(value)){
      throw new Error("email is notvalid")
    }
  }
},
password:{
  type:String,
  required:true,
  minlength:6,
  validate:function(value){
    if(value.toLowerCase().includes("password")){
      throw new Error("password cannot include password ")
    }
  }
},
  age:{
    type:Number,
    default:0,
    validate:function(value){
      if(value<0){
        throw new Error("age should be positive")
      }
    }
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }],
avatar:{
  type:Buffer
}
},
{timestamps:true
})
userschema.virtual('tasks',{
  ref:"Task",
  localField:"_id",
  foreignField:"owner"
})


userschema.methods.toJSON=function(){
  const user=this
  // console.log(this)
  const userobject=user.toObject()
  // console.log(userobject)
  delete userobject.password
  delete userobject.tokens
  delete userobject.avatar
  // await user.save()
  return userobject
}





userschema.methods.generateAuthTokens=async function(){
  const user=this
  const token=jwt.sign({_id : user._id.toString()},process.env.JWT_SECRET)
user.tokens=user.tokens.concat({token})
await user.save()
  return token
}
userschema.statics.findByCredentials=async function(email,password){
  const user=await User.findOne({email:email})
  if(!user){
    throw new Error("unable to login")
  }
  const mismatch=await bcrypt.compare(password,user.password)
if(!mismatch){
  throw new Error("unable to login")
}
return user
}

userschema.pre("remove",async function(next){
  const user=this
  await Task.deleteMany({owner:user._id})
  next()
})

userschema.pre("save",async function(next){
  const user=this
  if(user.isModified("password")){
    user.password=await bcrypt.hash(user.password,8)
  }
    //this contains all user elemetns ready  to get executed
next()
})
const User=mongoose.model('User',userschema)


module.exports=User
