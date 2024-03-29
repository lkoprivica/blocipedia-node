const userQueries = require("../db/queries.users.js");
const passport = require("passport");

module.exports = {
  create(req, res, next) {
    console.log(req.body);
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        console.log(err);
        req.flash("error", err);
        res.redirect("/users/sign_up");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        });
      }
    });
  },
  signUp(req, res, next) {
    res.render("users/sign_up");
  },

  signInForm(req, res, next) {
    res.render("users/sign_in");
  }, 
  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
      if(!req.user){
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    })
  },
  signOut(req,res,next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  }
};
