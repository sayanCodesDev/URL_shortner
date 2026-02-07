const {v4: uuidv4}=require("uuid")
const userAuth=require("../models/userAuth");
const{getUser,setUser}=require("../service/auth");

async function handleUserSignup(req,res){
    const {name, email, password,role}=req.body;

    const existingUser= await userAuth.findOne({email});
    if(existingUser){
        return res.render("signup",{
            error:"User already exist, Login yourself",
        });
    }

    await userAuth.create({
        name,
        email,
        password,
        role,
    });
    res.redirect("/user/login");
}

async function handleUserLogin(req,res){
    const {email, password}=req.body;

    const user= await userAuth.findOne({email,password});
    if(!user){ 
        return res.render("login",{
            error:"Invalid info",
        });
    }
    // const sessionId=uuidv4();    // used for statefull auth
    // setUser(sessionId,user);
    // res.cookie("uid",sessionId);
    
    const token=setUser(user)  //this is stateless auth
    res.cookie("token",token);        //we can set the domain and expiry also
    return res.redirect("/");
    
}

module.exports={
    handleUserSignup,
    handleUserLogin,
}