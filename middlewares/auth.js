const {getUser}=require("../service/auth");

function restrictToLoggedinUSerOnly(req,res,next){
    // const userUid=req.cookies?.uid;
    const authHeader=req.headers["authorization"];
    
    if(!authHeader) return res.redirect("/user/login");
    
    const token=authHeader.split(" ")[1]; // Bearer tokenstring
    const user=getUser(token);
    if(!user) return res.redirect("/user/login");

    req.user=user;
    next();
}

function checkAuth(req,res,next){
    // const userUid=req.cookies?.uid;
    const authHeader=req.headers["authorization"];
    
    
    if (authHeader && authHeader.startsWith("Bearer ")) {
        const token = authHeader.split(" ")[1];
        req.user = getUser(token);
    } else {
        req.user = null;
    }

    
    next();
}

module.exports={
    restrictToLoggedinUSerOnly,
    checkAuth,
}