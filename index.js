const express = require("express");
const app = express();
const expressHandlebars = require("express-handlebars");
const Post = require("./src/models/postsSchema");

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
    // Dynamic values are examples of fortune and weather
    // Helper blocks help with conditionals and iterating over items
    // Look into hbs docs if need to register partials with following: hbs.registerPartials(partialsDir)
  })
);
app.set("view engine", "hbs");

app.get("/", async (req, res) => {
  const posts = await Post.find({}).lean();
  console.log(posts);
  res.render("home", {
    posts,
  });
});

app.post("/posts", (req, res) => {
  Post.create(req.body, (error, posts) => {
    res.redirect("/");
  });
});

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

app.get("/posts/new", (req, res) => {
  res.render("create");
});

app.get("/posts/:id", async (req, res) => {
  const posts = await Post.findById(req.params.id).lean();
  res.render("singlepost", {
    posts,
  });
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
