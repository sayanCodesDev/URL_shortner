const express=require("express");
const {connectToMongodb}=require("./connect");
const path=require("path");
const cookieParser=require("cookie-parser");

const userAuthRouter=require("./routes/userAuthRoute");
const userRouter=require("./routes/route");
const staticRoute=require("./routes/staticRouter");

const {
    checkedForAuthentication,
    restrictTo,
}=require("./middlewares/auth")

const PORT =8001;
const app=express();

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json({extended:false}));      
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

//Connection
connectToMongodb("mongodb://127.0.0.1:27017/shortUrl")
    .then(()=> console.log("MongoDb Connected")
);

//Routes
app.use("/user", userAuthRouter);

app.use(checkedForAuthentication);

app.use("/", restrictTo(["NORMAL","ADMIN","admin","Admin"]), staticRoute);
app.use("/users",userRouter);



app.listen(PORT, ()=>console.log("Server Started!!"));
