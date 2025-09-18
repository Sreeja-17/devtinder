const mongoose = require ('mongoose');

const connectDB= async()=>{
    await mongoose.connect
    ("mongodb+srv://sr6129454_db_user:3p3lyf8laiv8WwaU@node.pebwzla.mongodb.net/devtinder");

};
module.exports= connectDB;
