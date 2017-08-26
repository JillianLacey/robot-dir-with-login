const express = require("express");
const profileRoutes = express.Router();
const Robot = require("../models/Robot");
const bcrypt = require("bcryptjs");


profileRoutes.get("/:id", (req, res) => {

    Robot.findById(req.params.id).then(foundRobot => {
        if (!foundRobot) {
            res.status(500).send(err);
        }
        res.render("profile", { users: foundRobot });
    });
});


//to assign every current robot a password
// profileRoutes.get("/updatemany", (req, res) => {
//     let allUsers;
//     Robot.find()
//         .then(function (foundUsers) {
//             allUsers = foundUsers;
//             console.log('allUsers: ', allUsers.length);
//             let salt = bcrypt.genSaltSync(10);
//             let password = bcrypt.hashSync("password", salt)
//             Robot.update({}, { $set: { password: password } }, { multi: true })
//                 .then(function (updatedUsers) {
//                     res.send(updatedUsers);
//                     console.log('updatedUsers: ', updatedUsers);
//                 })
//                 .catch(function (err) {
//                     if (!updatedUsers) res.status(500).send("Error saving users!");
//                 });
//         })

// });

//in url type in localhost:8000/profile/updatemany



module.exports = profileRoutes; 