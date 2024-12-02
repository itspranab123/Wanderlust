const Listing = require("./models/listing.js");
const { listingSchema } = require("./Schema.js");
const ExpressError = require("./utilis/ExpressError.js");
const { reviewSchema } = require("./Schema.js");
const Review = require("./models/review.js");


module.exports.validateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.boby);
    if (error) {
        let errMsg = error.deletes.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


module.exports.valideteReview = (req, res, next) => {
    let { error } = reviewSchema.validate(req.boby);
    if (error) {
        let errMsg = error.deletes.map((el) => el.message).join(",");
        throw new ExpressError(400, errMsg);
    } else {
        next();
    }
};


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "you must be logged in to create listing");
        return res.redirect("/login");
    }
    next();
};


module.exports.saveredirectUrl = (req, res, next) => {
    if (req.session.redirectUrl) {
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};


module.exports.isowner = async (req, res, next) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing.owner.equals(res.locals.currUser._id)) {
        req.flash("error", "Permission denied");
        return res.redirect(`/listings/${id}`);
    }
    next();
};


module.exports.isReviewAuthor = async (req, res, next) => {
    let { id, reviewId } = req.params;
    let review = await Review.findById(reviewId);
    if (!review.author.equals(res.locals.currUser._id)) {
        req.flash("error", "Permission denied");
        return res.redirect(`/listings/${id}`);
    }
    next();
};






