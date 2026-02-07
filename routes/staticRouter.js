const express=require("express");
const user=require("../models/user");
const { restrictTo } = require("../middlewares/auth");

const router=express.Router();

router.get("/admin/urls", restrictTo(["ADMIN","admin","Admin"]), async(req, res)=>{     //inline authorization
    const allUrl=await user.find({});
    return res.render("home",{
        urls:allUrl,
    });
});

router.get("/",async(req, res)=>{
    if(!req.user) return res.redirect("/user/login");
    const allUrl=await user.find({createdBy:req.user._id});
    return res.render("home",{
        urls:allUrl,
    });
});
module.exports=router;