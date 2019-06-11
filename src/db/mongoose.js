const mongoose=require('mongoose')
const validator=require('validator')
mongoose.connect(process.env.MONGO,{
  useNewUrlParser:true,
  useCreateIndex:true
})




// const task=new Task({
//   description:"mongoose library",
//   completed:false
// })
// task.save().then(function(task){
//   console.log(task)
// }).catch(function(error){
//   console.log("error")
// })

// const me=new User({
//   name:"Goutham",
//   email:"a@gmail.com",
//   password:"aabvSDJBJKfaf",
//   age:10
// })
// me.save().then(function(me){
//   console.log(me)
// }).catch(function(error){
//   console.log("error",error)
// })
