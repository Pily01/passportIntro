const router = require("express").Router();
const User = require("../models/User");
const passport = require("passport");

function checkIfIsHere(req, res, next) {
  console.log("polloyon?", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/auth/login");
}

router.get("/private", checkIfIsHere, (req, res) => {
  res.send("esto es privao");
});

router.post("/login", passport.authenticate("local"), (req, res, next) => {
  const email = req.user.email;
  res.send("Tu eres un usuario real con email: " + email);
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  User.register(req.body, req.body.password)
    .then(user => {
      res.json(user);
    })
    .catch(e => next(e));
});

module.exports = router;
