const mongoose=require("mongoose");



const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignored","accepted","interested","rejected"],
            message:`{value} is incorrect status type`,
        }
    }
},{ timestamps: { createdAt: 'created_at' }}
);

connectionRequestSchema.index({fromUserId:1,toUserId:1});

const ConnectionRequestModel= mongoose.model( "ConnectionRequest",
    connectionRequestSchema,
)
module.exports=ConnectionRequestModel;