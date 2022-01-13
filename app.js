const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

// // mysql connection
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     passowrd: '',
//     database: 'tester'
// });


const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


const itemsSchema = {
    name: String
};

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item ({
    name: "Welcome to your todolist"
});

const item2 = new Item ({
    name: "Hit the + button to add to the list"
});

const item3 = new Item ({
    name: "<-- Hit this to delete an item"
});

const defaultItems = [item1, item2, item3];

app.get("/", function(req,res) {



    Item.find({}, function(err, foundItems) {

        if(foundItems.length === 0) {
            Item.insertMany(defaultItems, function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("Successfully saved default items to database");
            }
        });
        res.redirect("/");
        } else {
            res.render("list", {listTitle: day, newlistitems: foundItems});
        }
    });
    
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };
    const day = today.toLocaleDateString("en-US", options);
});

app.post("/", function(req, res) {

    const itemName = req.body.food;

    const item = new Item({
        name: itemName
    });

    item.save();

    res.redirect("/")
});

app.post("/delete", function(req, res) {
    const checkItemId = req.body.checkbox;

    Item.findByIdAndRemove(checkItemId, function(err) {
        if(!err) {
            console.log("Successfully deleted checked item.");
            res.redirect("/");
        }
    })
});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Work", newlistitems: workitems});
});

app.get("/about", function(req,res) {
    res.render("about");
});

app.listen(2000, function() {
    console.log("Server running on port 2000");
});