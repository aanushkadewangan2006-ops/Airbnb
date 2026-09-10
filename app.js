const express = require("express");
const app = express();
const mongoose = require("mongoose");
const listing = require("./model/listing");
const path = require("path");

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

app.get("/", (req, res) => {
  res.send("hi i am root");
});

app.get("/listing", async (req, res) => {
  const allListing = await listing.find({});
  res.render("./listing/index.ejs", { allListing });
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
