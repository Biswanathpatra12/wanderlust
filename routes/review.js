const express=require("express");
const router=express.Router({mergeParams: true});
const wrapAsync=require("../utils/wrapAsync.js"); 
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schemas.js");
const Review= require("../models/review.js");
const Listing=require("../models/listing.js");
const reviewController=require("../controllers/reviews.js");

const validateReview = (req, res, next) => {
  if (req.body.review && req.body.review.rating !== undefined) {
    req.body.review.rating = Number(req.body.review.rating);
  }

  const { error } = reviewSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(e => e.message).join(",");
    throw new ExpressError(400, msg);
  }

  next();
};


//Reviews
//Post Route
router.post("/",validateReview,wrapAsync(reviewController.createReview));
  //Delete Review Route
  router.delete("/:reviewId", wrapAsync(reviewController.destroyReview)
  );
  

  module.exports=router;