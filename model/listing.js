const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let listingSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  description: String,
  image: {
    type: String,
    default:
      "https://unsplash.com/photos/person-in-silhouette-overlooking-sea-HC8e7cOY-90",
    set: (v) =>
      v === ""
        ? "https://unsplash.com/photos/person-in-silhouette-overlooking-sea-HC8e7cOY-90"
        : v,
  },
  price: Number,
  location: String,
  country: String,
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
