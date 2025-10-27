//require("dotenv").config();
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect("mongodb+srv://sr6129454_db_user:X8ASnUG7pSrZ2QFn@node.pebwzla.mongodb.net/devtinder");

};
module.exports = connectDB;
