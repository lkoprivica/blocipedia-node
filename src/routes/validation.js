module.exports = {
  validateUsers(req, res, next) {
    if (req.method === "POST") {
     // req
      //  .checkParams("userId", "must be valid")
      //  .notEmpty()
       // .isInt();
      req
        .checkBody("username", "must be at least 2 characters in length")
        .isLength({ min: 4 });
      req.checkBody("email", "must be valid").isEmail();
      req
        .checkBody("password", "must be at least 6 characters in length")
        .isLength({ min: 7 });
      req
        .checkBody("passwordConfirmation", "must match the password provided")
        .optional()
        .matches(req.body.password);
    }

    const errors = req.validationErrors();
    console.log(errors);
    if (errors) {
      req.flash("error", errors);
      return res.redirect(303, req.headers.referer);
    } else {
      return next();
    }
  }
};
