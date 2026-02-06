const mongoose=require("mongoose");

const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            required:true,
            default:"NORMAL",
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:Number,
            required:true,
        }
    },
    {timestamps:true}
);
const userAuth=mongoose.model("userAuth", userSchema);

module.exports= userAuth;