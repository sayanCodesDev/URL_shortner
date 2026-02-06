const {getUser}=require("../service/auth");

function checkedForAuthentication(req,res,next){
    // const userUid=req.cookies?.uid;
    const tokenCookie=req.cookies?.token // for stateless auth we can use header and for statefull auth we can use cookie
    if(!tokenCookie) return res.redirect("/user/login");

    const token=tokenCookie; 
    const user=getUser(token);
    if(!user) return res.redirect("/user/login");
    
    req.user=user;
    return next();
}

function restrictTo(roles=[]){
    return function(req,res,next){
        if(!req.user) return res.redirect("/user/login");
        if(!roles.includes(req.user.role)) return res.status(403).send( {error:"Access Denied"});
        return next();
    }
}

module.exports={
    checkedForAuthentication,
    restrictTo,
}