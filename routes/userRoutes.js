const express = require("express");
userRoutes = express.Router();

userRoutes.get("/profile", (req, res) => {
    res.render("profile", { user: req.session.user });
});

module.exports = userRoutes;


//Here is where you add the routes to Update a page

//Add the logout to this route
// LOGOUT
// app.get('/logout', function (req, res) {
//   req.session.destroy();
//   res.redirect('/');
// });



///////////////// TO UPDATE ENTRY //////////////////////////
// app.post("/vinylcollection/:id", function (req, res) {
//     VinylCollection.findByIdAndUpdate(req.params.id, req.body)
//       .then(function (updatedAlbum) {
//         if (!updatedAlbum) {
//           return res.send({ msg: "Could not update collection" });
//         }
//         let redirectURL =
//           res.redirect(`/vinylcollection/${req.params.id}`);
//       })
//       .catch(function (err) {
//         res.status(500).send(err);
//       });
//   });

  ///////////////// TO DELETE AN ENTRY ////////////////////////
//   app.get("/deleteAlbum/:id", function (req, res) {
//     VinylCollection.findByIdAndRemove(req.params.id)
//       .then(function (message) {
//         return res.redirect("/");
//       })
//       .catch(function (err) {
//         res.status(500).send(err);
//       });
//   });
