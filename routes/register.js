const express = require("express")
const router = express.Router()
const models = require("../models")
const bcrypt = require("bcryptjs")

router.get("/register", function(req, res) {
  res.render("register")
})

//posting to our register page
router.post("/register", function(req, res) {
  //building a new row into our users model
  const newUser = models.users.build({
    //key is coming form users model and values are coming from the form on register.mustache
    username: req.body.username,
    displayName: req.body.displayName
  })
  //save the newUser and run the function(user) then redirect /login
  newUser.password = bcrypt.hashSync(req.body.password, 8)
  newUser
    .save()
    .then(function(user) {
      res.redirect("/login")
    })
    //catch error
    .catch(function(error) {
      res.render("register", {
        errorMessage: "Something went wrong",
        error: error.errors
      })
    })
})

module.exports = router
