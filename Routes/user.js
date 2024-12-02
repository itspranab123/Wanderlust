const express = require("express");
const router = express.Router();
const wrapAsync = require("../utilis/wrapAsync.js");
const passport = require("passport");
const { saveredirectUrl } = require("../middleware.js");

const userController = require("../Controllers/users.js");

router.route("/signup")
    .get(userController.signupForm)
    .post(wrapAsync(userController.signup));

router.route("/login")
    .get(userController.loginform)
    .post(saveredirectUrl, passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), userController.login);

router.get("/logout", userController.logout);

module.exports = router;