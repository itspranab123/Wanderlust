const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utilis/wrapAsync.js");
const { valideteReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");

const revirewController = require("../Controllers/reviews.js");
//reviews post route
router.post("/", valideteReview, isLoggedIn, wrapAsync(revirewController.createRoute));

// review delete route
router.delete("/:reviewId", isLoggedIn, isReviewAuthor, wrapAsync(revirewController.deleteRoute));

module.exports = router;