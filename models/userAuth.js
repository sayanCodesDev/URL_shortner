const mongoose=require("mongoose");

const userSchema= new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
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