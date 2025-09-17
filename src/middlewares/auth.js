const adminAuth=(req,res,next)=>{
    console.log("Admin auth is getting checked");
    const token="xyz";
    const isAdminAuthorized= token==="xyz";
    if(!isAdminAuthorized){
        res.send("Unauthorized admin");
    }else{
        next();
    }
};

module.exports= {adminAuth,};