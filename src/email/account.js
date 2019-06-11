const sgmail=require("@sendgrid/mail")

sgmail.setApiKey(process.env.SENDGRID_API_KEY)
const welcomemail=function(email,name){
sgmail.send({
  to:email,
  from:"anumolu.goutham@gmail.com",
  subject:"Welcome",
  text:`hai ${name}`

})
}

const cancelmail=function(email,name){
sgmail.send({
  to:email,
  from:"anumolu.goutham@gmail.com",
  subject:"Thanks for using our services",
  text:`${name}`

})
}


module.exports={welcomemail,cancelmail}
