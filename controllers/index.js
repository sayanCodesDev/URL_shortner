const shortid = require('shortid');
const user= require("../models/user");


async function handleCreateNewShortId(req, res) {
    const info=req.body;
    if(!info.Url) return res.status(400).json({error: "Url needed"});
    const shortId=shortid();
    
    await user.create({            
        shortId: shortId,
        originalUrl: info.Url,
        viewHistory: [],
        createdBy: req.user._id,
    });
    return res.render("home", {
        shortId:shortId,
    });
    // return res.json({
    //     shortId:shortId,
    //     msg:"success"
    // });
};

async function handleRedirectShortId(req, res) {
    const shortId=req.params.shortId;
    if(!shortId) return res.send("Data not found");
    const entry=await user.findOneAndUpdate(
        {
            shortId: shortId, //can use shorthand by writing ...... shortId ...... only
        },
        {
            $push:{
                viewHistory:{
                    timestamp:Date.now(),
                },
            },
        },
        { new: true }
    );
    res.redirect(entry.originalUrl);
};

async function handleViewAnalytics(req, res) {
    const shortId=req.params.shortId;
    const data=await user.findOne({shortId});
    if(!data) return res.status(400).send("Data not found");
    return res.json({
        TotalClicks: data.viewHistory.length,
        viewHistory: data.viewHistory,
    });
};

module.exports={
    handleCreateNewShortId,
    handleRedirectShortId,
    handleViewAnalytics,
};