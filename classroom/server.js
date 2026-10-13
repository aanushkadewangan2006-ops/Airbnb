const express = require("express");
const app = express();
const session = require("express-session");

app.use(
  session({
    secret: "mySuperSecretString",
  }),
);

app.get("/reqcount", (req, res) => {
  res.send("you sent a request x time");
});

app.get("/", (req, res) => {
  res.send("Test successfull");
});

app.listen("3000", () => {
  console.log("server is listening to port 3000 ");
});
