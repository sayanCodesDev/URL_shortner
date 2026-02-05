const express=require("express");
const user=require("../models/user");

const router=express.Router();

router.get("/",async(req, res)=>{
    if(!req.user) return res.redirect("/user/login");
    const allUrl=await user.find({createdBy:req.user._id});
    return res.render("home",{
        urls:allUrl,
    });
});
module.exports=router;