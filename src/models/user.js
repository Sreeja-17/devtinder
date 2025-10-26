const mongoose=require("mongoose");
const validator= require('validator');
const jwt= require("jsonwebtoken");
const bcrypt=require("bcrypt");



const userSchema = new mongoose.Schema({
firstName:{
    type:String,
    required:[true,"Please enter a mail Id"],
    minLength:[4,"Min length should be atleast 4"],
    maxLength:[20,"Reached maximum length"]
  },
  lastName:{
    type:String
  },
  emailId:{
    type:String,
    required:true,
    unique:true,
    index: true,
    lowercase:true,
    trim:true,
    validate(value){
      
      if(!validator.isEmail(value)){
        throw new Error("Invalid email address" + value);

      }
    }
  },
  password:{
    type:String,
    required:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Invalid password. Please enter strong password" + value);


      }
    }

  
  },
  age:{
    type:Number,
    min:[18,"Min age should be 18"],
  },
  gender:{
    type: String,
    validate(value){
      if(!["male","female","others"].includes(value)){
        throw new Error("Gender data is not valid");
      }
    }
  },
  photoUrl:{
    type:String,
    default:"https://cdn-icons-png.flaticon.com/512/2922/2922561.png",
    validate(value){
      
      if(!validator.isURL(value)){
        throw new Error("Invalid photoURL" + value);

      }
    }
    
  },
  about:{
    type:String,
    default:"This is a default about user!",
  },
  skills:{
    type:[String],
  }

},{
  timestamps:true,
}
);

userSchema.index({firstName:1,lastName:1});
userSchema.methods.getJWT = async function(){
  const user=this;
  const token = jwt.sign({ _id: user._id }, "Devtinder@123", { expiresIn: "7d"});
  return token;
}
userSchema.methods.validatePassword=async function(passwordInputByUser){
  const user=this;
const passwordHash=user.password;

  const isPasswordValid =await bcrypt.compare(passwordInputByUser , passwordHash);
  return isPasswordValid;

}



const User= mongoose.model("User",userSchema);
module.exports= User;