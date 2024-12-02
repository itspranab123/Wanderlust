const User = require("../models/user.js");

module.exports.signupForm = (req, res) => {
    res.render("user/signup.ejs");
};

module.exports.signup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        const newUser = new User({ username, email });
        let registeredUser = await User.register(newUser, password);
        // console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Walcame Wanderlust");
            res.redirect("/listings");
        })
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};

module.exports.loginform = (req, res) => {
    res.render("user/login.ejs");
}


module.exports.login = async (req, res) => {
    req.flash("success", "Walcame to Wanderlust");
    // console.log(req.user);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("success", "You are Logged out");
        res.redirect("/listings");
    })
};
