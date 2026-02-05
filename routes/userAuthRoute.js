const express=require("express");
const {
    handleUserSignup,
    handleUserLogin,
}=require("../controllers/authControl")

const router=express.Router();

router.post("/",handleUserSignup);
router.post("/login",handleUserLogin);
router.get("/signup",(req,res)=>{
    res.render("signup", { error: null })
});
router.get("/login",(req,res)=>{
    res.render("login", { error: null })
});

module.exports = router;