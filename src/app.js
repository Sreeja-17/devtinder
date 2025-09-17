const express=require ("express");
const app=express();
const { adminAuth }=require("./middlewares/auth")


app.use("/admin",adminAuth);
app.get("/admin/getAllData",(req,res)=>{
    console.log("requesting data");
    res.send("Data received");
});
app.get("/admin/deleteData",(req,res)=>{

    res.send("Deleted data");
    });
    
app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong please contact customer support");
    }
})





app.listen(3000,()=>{
    console.log("server is successfully on port 3000....")
});
