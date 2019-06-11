const mongodb=require('mongodb')
// const MongoClient=mongodb.MongoClient
// const ObjectId=mongodb.ObjectId()

const {MongoClient,ObjectId}=require("mongodb")


const url="mongodb://127.0.0.1:27017"
const databasename="task-manager"


console.log(ObjectId().getTimestamp())


MongoClient.connect(url,{useNewUrlParser: true},function(error,client){
  if(error){
    return console.log("unable to connect")
  }
  const db=client.db(databasename)

    db.collection("users").deleteOne({_id:new ObjectId("5cee5a4d384dd5387cd88b2f")}
    ).then(function(result){
      console.log(result)
    }).catch(function(error){
      console.log("error")
    })

  //
  // db.collection("users").updateOne({_id:new ObjectId("5cee5a4d384dd5387cd88b2f")},{
  //   $set:{
  //     age:29
  //   }
  // }).then(function(result){
  //   console.log(result)
  // }).catch(function(error){
  //   console.log("error")
  // })

  // db.collection("users").findOne({age:21},function(error,user){
  //   if(error){
  //     console.log(error)
  //   }
  //   console.log(user)
  //
  //
  // })
  //
  // db.collection("users").find({age:21}).toArray(function(error,user){
  //   if(error){
  //     console.log("error")
  //   }
  //   console.log(user)
  // })
  // db.collection("users").find({age:21}).count(function(error,user){
  //   if(error){
  //     console.log("error")
  //   }
  //   console.log(user)
  // })







})
