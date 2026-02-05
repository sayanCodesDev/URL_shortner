const mongoose=require("mongoose");

//Schema
 const userSchema=new mongoose.Schema({
    shortId:{
        type: String,
        required: true,
        unique:true,
    },
    originalUrl:{
        type: String,
        required: true,
    },
    viewHistory:[{timestamp: Number }],
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
    }
 },
 {timestamps: true});

//model
    const User = mongoose.model("user", userSchema);

    module.exports=User;