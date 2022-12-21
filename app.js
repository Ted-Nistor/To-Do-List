const express = require("express");
const mongoose = require("mongoose");
const app = express();
// app.use(express.static("public"));
const path = require("path");
const port = process.env.PORT || 3000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
mongoose.connect(
  "mongodb+srv://NTSabertooth:adamantium1@testcluster.abq4udc.mongodb.net/todo-list"
);
const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
};

const listSchema = new mongoose.Schema({
  name: { type: String, required: true },
  date: {
    type: Date,
    default: Date.now(),
    get: (date) => date.toLocaleDateString("en-us", options),
  },
});

const List = mongoose.model("Item", listSchema);

app.get("/", (req, res) => {
  List.find({}, (err, foundItems) => {
    if (err) console.log(err);
    res.render("index", {
      newListItems: foundItems,
      date: new Date().toLocaleDateString("en-us", options),
    });
  }).sort({ date: -1 });
});

app.post("/", (req, res) => {
  const itemName = req.body.newItem;
  List.create({ name: itemName, date: new Date() }, (err, item) =>
    console.log(err || `Added item: ${item.name} to the list`)
  );
  res.redirect("/");
});

app.post("/delete-item", (req, res) => {
  const deletedItem = req.body.deleteItem;
  List.deleteOne({ _id: deletedItem }, (err) =>
    console.log(err || `Removed item ${deletedItem}`)
  );
  res.redirect("/");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
