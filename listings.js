// ********************************
//  it is MVC [model,View,Controller] frameWork.
//  it's purpose of that the code more structured and also progrommer frindly.
// **********************************

const { render } = require("ejs");
const Listing = require("../models/listing.js");

module.exports.index = async (req, res) => {
    let alllistings = await Listing.find({});
    res.render("./listings/index.ejs", { alllistings });
};

module.exports.newForm = (req, res) => {
    res.render("./listings/new.ejs");
};

module.exports.showRoute = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate({ path: "reviews", populate: { path: "author" }, }).populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    // console.log(listing);
    res.render('./listings/show.ejs', { listing });
};

module.exports.createRoute = async (req, res) => {
    console.log(Error);
    let Newlisting = new Listing(req.body.listing);
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
    }
    Newlisting.owner = req.user._id;
    await Newlisting.save();
    req.flash("success", "new Listing Created");
    res.redirect('/listings');
};

module.exports.editRoute = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    req.flash("success", "Listing Edit Successfully");
    if (!listing) {
        req.flash("error", "Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    res.render("./listings/edit.ejs", { listing });
};

module.exports.updateRoute = async (req, res) => {
    if (!req.body.listing) {
        throw new ExpressError(400, "Send valid data for listing");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated");
    res.redirect(`/listings/${id}`);
};

module.exports.deleteRoute = async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted");
    res.redirect("/listings");
};