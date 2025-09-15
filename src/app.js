const express=require ("express");
const app=express();
app.listen(3000);

app.use((req,res)=>{
    res.send("Hello from the server!")
})

app.listen(3000,()=>{
    console.log("server is successfully on port 3000....")
});
