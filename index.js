const express=require("express")
const app=express()

const MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/store', (err, client) => {
  if (err) throw err

  const db = client.db('store')

  db.collection('product').find().toArray((err, result) => {
    if (err) throw err

    console.log(result)
  })
})


app.get('/',(req,res)=>{
   res.send("hello world")
})

app.listen(3000,()=>{
    console.log("the server 3000")
})