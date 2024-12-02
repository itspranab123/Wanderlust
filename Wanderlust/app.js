if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const ExpressError = require("./utilis/ExpressError.js");
const cookieParser = require("cookie-parser");

const session = require("express-session");
const flash = require("connect-flash");

const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


const listingsRouter = require("./Routes/listings.js");
const reviewsRouter = require("./Routes/reviews.js");
const userRouter = require("./Routes/user.js");


app.set("views", path.join(__dirname, ("views")));
app.set("view engine", 'ejs');
app.use(express.urlencoded({ express: true, extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

main().then(res => {
    console.log("DB also Connected.");
}).catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const sessionOptions = {
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
    Cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

app.get("/", (req, res) => {
    res.redirect("/listings");
});

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});


// app.get("/demouser", async (req, res) => {
//     let fakeuser = new User({
//         email: 'pranabadas424@gmail.com',
//         username: "1234"
//     });
//     let resitereduser = await User.register(fakeuser, "helloworld"); // used to save the fakeuser with helloworld password,
//     res.send(resitereduser);
// });


// listing Route
app.use("/listings", listingsRouter);

//reviews Route
app.use("/listings/:id/reviews", reviewsRouter);

// user Route
app.use("/", userRouter);

app.all("*", (req, res, next) => {
    next(new ExpressError(404, "Page not Found"));
});

// it is use for handling error
app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'something is wrong' } = err;
    res.render("error.ejs", { message });
    // res.status(statusCode).send(message);
});

app.listen('8080', () => {
    console.log("Server Connected");
});
