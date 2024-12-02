const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const { isLoggedIn, isowner, validateListing } = require("../middleware.js");
const listingController = require("../Controllers/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });


router.route("/")
    .get(wrapAsync(listingController.index))
    .post(isLoggedIn, upload.single('listing[image]'), validateListing, wrapAsync(listingController.createRoute));

router.route("/:id")
    .get(wrapAsync(listingController.showRoute))
    .put(isLoggedIn, isowner, wrapAsync(listingController.updateRoute))
    .delete(isLoggedIn, isowner, wrapAsync(listingController.deleteRoute));

router.get("/new/listing", isLoggedIn, listingController.newForm);
router.get("/:id/edit", isLoggedIn, isowner, wrapAsync(listingController.editRoute));

module.exports = router;