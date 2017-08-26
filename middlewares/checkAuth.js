// module.exports = (req, res, next) => {
//     if (req.session.user) {
//         next();
//     } else {
//         res.redirect("/auth/login");
//     }
// };




module.exports = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        return res.redirect("/auth/login");///if issue check the redirect link
    }
}