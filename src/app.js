const express=require ("express");
const connectDB= require("./config/database.js");
const app=express();
const User= require("./models/user.js")

app.use(express.json());

app.post("/signup",async(req,res)=>{
    const user=new User(req.body);
    
    try{
        await user.save();
        res.send("Successully saved the data");

    }catch(err){
        res.status(400).send("Error saving user" + err.message);

    }
})
app.get("/user",async(req,res)=>{
    const userName= req.body.firstName;

    try{
        const user=await User.find({firstName:userName});
        if(user.length===0){
            res.status(400).send("Name not found")
            
        }else{
        res.send(user);
        }
    }catch(err){
        console.log(err);
        res.status(400).send("email id not found")
    }
})


connectDB()
.then(()=>{
    console.log("successfully connect to database");
    app.listen(3000,()=>{
    console.log("server is successfully on port 3000....")
});
})
.catch((err)=>{
    console.log(err);
});










