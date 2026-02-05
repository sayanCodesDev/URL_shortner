const express=require("express");
const {
    handleCreateNewShortId,
    handleRedirectShortId,
    handleViewAnalytics,
}=require("../controllers");

const router=express.Router();

router.post("/",handleCreateNewShortId);
router.get("/:shortId",handleRedirectShortId);
router.get("/analytics/:shortId",handleViewAnalytics);

module.exports=router;