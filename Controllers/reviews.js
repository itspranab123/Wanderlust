const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createRoute = async (req, res) => {
    // console.log(req.params.id);
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    req.flash("success", "Revirew Posted");
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteRoute = async (req, res) => {
    let { id, reviewId } = req.params;
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash("success", "Revirew Deleted");
    res.redirect(`/listings/${id}`);
};