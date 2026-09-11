const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./model/listing");
const path = require("path");
const methodOverride = require("method-override")

main()
  .then((res) => {
    console.log("connection succesfull");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"))

app.get("/", (req, res) => {
  res.send("hi i am root");
});

//Index Route
app.get("/listings", async (req, res) => {
  const allListings = await Listing.find({ title: { $ne: "" } });
  res.render("./listing/index.ejs", { allListings });
});

//New Route
app.get("/listings/new", (req, res) => {
  res.render("./listing/new.ejs");
});

//Show Route
app.get("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("./listing/show.ejs", { listing });
});

//Create Route
app.post("/listings", async (req, res) => {
  let listing = new Listing(req.body);
  await listing.save();
  res.redirect("/listings");
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  res.render("./listing/edit.ejs", { listing });
});

// Update Route
app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
});

// Delete Route
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  res.redirect("/listings");
});

// app.get("/listing", async (req, res) => {
//   let sampleListing = new listing({
//     title: "My new willa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangut Goa",
//     country: "India",
//   });

//   await sampleListing
//     .save()
//     .then((res) => {
//       console.log("saved data");
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   console.log("saved succesfull");
//   res.send("saved succesfull");
// });

app.listen(8080, () => {
  console.log(`listen to port 8080`);
});
