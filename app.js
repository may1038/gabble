const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mustache = require("mustache-express")
const session = require("express-session")
const bcrypt = require("bcryptjs")
app.engine("mustache", mustache())
app.set("view engine", "mustache")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: false }))

var sess = {
  secret: "keyboard cat",
  cookie: {},
  saveUninitialized: true,
  resave: true
}

app.use(session(sess))

const login = require("./routes/login")
app.use(login)

const register = require("./routes/register")
app.use(register)

const newGab = require("./routes/newGab")
app.use(newGab)

const homePage = require("./routes/homePage")
app.use(homePage)

app.listen(3000, function(req, res) {
  console.log("Gabble app is listening")
})
