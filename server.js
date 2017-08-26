const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const session = require("express-session");
const path = require("path");
const logger = require("morgan");
const sessionConfig = require("./sessionConfig");
const checkAuth = require("./middlewares/checkAuth");
const indexRoutes = require("./routes/indexRoutes");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const employmentRoutes = require("./routes/employmentRoutes");
const mongoose = require("mongoose");
const bluebird = require("bluebird");
const bcrypt = require("bcryptjs");

const app = express();
const port = process.env.PORT || 8050;

mongoose.Promise = bluebird;
mongoose.connect("mongodb://localhost:27017/mongoRobots");

// VIEW ENGINE
app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");


// MIDDLEWARE
app.use(express.static(path.join(__dirname, "./public")));
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session(sessionConfig));


//ROUTES
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/user", checkAuth, userRoutes);
app.use("/profile", profileRoutes);
app.use("/employment", employmentRoutes);
app.use("/login", authRoutes);
app.use("/signup", authRoutes);



// PORT
app.listen(port, () => {
  console.log(`Server is running on port ${port}!`);
});
