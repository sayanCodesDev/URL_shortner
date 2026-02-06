// const storeSessionId= new Map();  //map lives in ram so after resatrt the server then map get empty //this is prb

// function setUser(id,user){
//     storeSessionId.set(id, user);
// };
// function getUser(id){
//     return storeSessionId.get(id);
// };

// module.exports={
//     setUser,
//     getUser,
// };
const jwt=require("jsonwebtoken");
const secret ="Sayan@&!12435!!#@&@*#";
function setUser(user){
    
    return jwt.sign({
    _id: user._id,
    email: user.email,
    role: user.role,
    },
    secret);
};

function getUser(token){
    try {
        return jwt.verify(token,secret);
    } catch (error) {
    return null;    
    }
};

module.exports={
    setUser,
    getUser,
};
