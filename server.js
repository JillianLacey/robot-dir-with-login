const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const sessionConfig = require("./sessionConfig");
const checkAuth = require("./middlewares/checkAuth");
// const users = require("./data.js");
const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const app = express();
const port = process.env.PORT || 8050;

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/mongoRobots");//name of the db

// let DB;
let Robots;


///VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");


// MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));


//INITIAL CHECK 
// MongoClient.connect(dbUrl, (err, db) => {
//   if (err) {
//     return console.log("Error connecting to the database:", err);
//   }

//   DB = db;
//   Robots = db.collection("robots");
// });


//ENDPOINT THAT CONNECTS TO OUR DB
app.get("/insertMany", function (req, res) {
  MongoClient.connect(dbUrl, function (err, db) {
    if (err) {
      res.status(500).send(err);
    }

    let Robots = db.collection("robots");

    Robots.insertMany(data.users, function (err, savedRobots) {
      if (err) {
        res.status(500).send(err);
      }
      res.send(savedRobots);
      db.close();
    });
  });
});


app.get("/profile/:_id", (req, res) => {
  Robots.findOne({ _id: ObjectId(req.params._id) }, function (err, foundRobot) {
    if (err) {
      return res.status(500).send(err);
    }
    else if (!foundRobot) {
      return res.send("No user found");
    }
    return res.render("profile", { user: foundRobot });
  });
});

app.get("/", (req, res) => {
  Robots.find({}).toArray((err, foundRobots) => {
    if (err) res.status(500).send(err);
    res.render("index", { users: foundRobots });
  });
});



/////////////////// EMPLOYED & UNEMPLOYED/////////////////////

app.get("/employed", (req, res) => {
  Robots.find({ job: { $ne: null } }).toArray(function (err, employedRobots) {
    if (err) res.status(500).send(err);
    res.render("index", { users: employedRobots });
  });
});

app.get("/unemployed", (req, res) => {
  Robots.find({ job: null }).toArray(function (err, unemployedRobots) {
    if (err) res.status(500).send(err);
    res.render("index", { users: unemployedRobots });
  });
});





////////////////from login project///////////////////////

//BASE ROUTE
app.get("/", (req, res) => {
  if (req.session.user) {
    return res.render("home", { user: req.session.user });
  } else {
    return res.render("login");
  }
});

//ROUTES
app.get("/signup", (req, res) => {
  res.render("signup");
});

app.post("/signup", (req, res) => {
  let newUser = req.body;
  users.push(newUser);
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {

  let reqUsername = req.body.username;
  let reqPassword = req.body.password;

  let foundUser = users.find(user => user.username === reqUsername);
  if (!foundUser) {
    return res.render("login", { errors: ["user not found"] });
  }

  if (foundUser.password === reqPassword) {
    delete foundUser.password;
    req.session.user = foundUser;
    res.redirect("/");
  } else {
    return res.render("login", { errors: ["passwords do not match"] });
  }
});

//NEW ROUTE FOR PROFILE PAGE
app.get("/profile", checkAuth, (req, res) => {
  res.render("profile", { user: req.session.user });
})

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});




/////// Listen to port ////////
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
