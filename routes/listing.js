const express = require("express");
const router = express.Router();
const Listing = require("../model/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const { listingSchema } = require("../schema.js");
const ExpressError = require("../utils/ExpressError.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};


//Index Route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allListings = await Listing.find({ title: { $ne: "" } });
    res.render("./listing/index.ejs", { allListings });
  }),
);

//New Route
router.get("/new", (req, res) => {
  res.render("./listing/new.ejs");
});

//Show Route
router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id).populate("review");
    res.render("./listing/show.ejs", { listing });
  }),
);

//Create Route
router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res, next) => {
    let listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect("/listings");
  }),
);

//Edit Route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("./listing/edit.ejs", { listing });
  }),
);

// Update Route
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings/${id}`);
  }),
);

// Delete Route
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    res.redirect("/listings");
  }),
);




module.exports = router;