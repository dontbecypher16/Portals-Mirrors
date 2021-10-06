const express = require("express");
const app = express();
const expressHandlebars = require("express-handlebars");
//const fileUpoad = require('express-fileupload')// optional, still thinking on it
const moment =require("moment")// parse dates and time
const Post = require("./src/models/postsSchema");
const User = require("./src/models/userSchema");

const createPostController = require('./src/controllers/createPost')
const homePageController = require('./src/controllers/homePage')
const storePostController = require('./src/controllers/storePosts')
const getPostController = require('./src/controllers/getPost')
const createUserController = require('./src/controllers/createUser')
const storeUserController = require('./src/controllers/storeUser');

const dbSetup = require("./db");
const port = process.env.PORT || 3000;
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.engine(
  "hbs",
  expressHandlebars({
    layoutsDir: `${__dirname}/views/layouts`,
    extname: "hbs",
    defaultLayout: "main",
    partialsDir: `${__dirname}/views/partials`,
    helpers: {
      section: function(name, options) {
        if (!this._sections) this._sections = {}
        this._sections[name] = options.fn(this)
        return null
       }
    }
    // Dynamic values are examples of fortune and weather
    // Helper blocks help with conditionals and iterating over items
    // Look into hbs docs if need to register partials with following: hbs.registerPartials(partialsDir)
  })

);
app.set("view engine", "hbs");


app.get("/", homePageController);
app.get("/posts/:id", getPostController);
app.get("/posts", createPostController);
app.post("/posts", storePostController);
app.get("/auth/register", createUserController);
app.post("/users", storeUserController);


app.get("/essays", (req, res) => {
  res.render("essays");
});

app.get("/poems", (req, res) => {
  res.render("poems");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.get("/admin", (req, res) => {
  res.render("admin");
});




dbSetup();

// middleware

app.use((req, res) => {
  res.type("text/plain");
  res.status(404);
  res.send("404 - Page Not Found");
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.type("text/plain");
  res.status(500);
  res.send("500 - Server Error");
});

app.listen(port, () =>
  console.log(
    `Server started on http://localhost:${port} ` + `press Ctrl-C to terminate.`
  )
);
