import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
const app=express()

app.use(express.json())

app.use(express.urlencoded({extended:true}))

dotenv.config()

const PORT=process.env.PORT || 7000
const MONGO_URL=process.env.MONGO_URL

mongoose.connect(MONGO_URL)
.then(()=>{
  console.log("database is created");
  app.listen(PORT,()=>{
    console.log("server is runnig "+PORT)
  })
})
.catch((err)=>console.log("server is error found "+err))

const userSchema= new mongoose.Schema({
  name:String,
  age:Number
})

const userModel=mongoose.model("users",userSchema)

app.get("/getusers",async (req,res)=>{
    const userData = await userModel.find()
    res.json(userData)
})

app.get("/getusers/:id",async (req,res)=>{
    const product = await userModel.findById(req.params.id)
    if(product===null){
      res.json({message:"you entered id is not available this site"})
    }else{
      res.json(product)
    }
})

app.post("/getusers",async (req,res)=>{
    const newData = new userModel(req.body)
    const saved = await newData.save()
    res.json(saved)
})

