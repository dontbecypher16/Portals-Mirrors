const express = require("express")
const app = express()
const expressHandlebars = require("express-handlebars")
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const passport = require('passport'),
 LocalStrategy = require('passport-local').Strategy
const auth = require('./src/middleware/auth')
const redirectIfAuthenticated = require('./src/middleware/redirectIfAuthenticated')
const moment = require("moment")// parse dates and time

//const fileUpoad = require('express-fileupload')// optional, still thinking on it

const createPostController = require('./src/controllers/createPost')
const homePageController = require('./src/controllers/homePage')
const storePostController = require('./src/controllers/storePosts')
const getPostController = require('./src/controllers/getPost')
const createUserController = require('./src/controllers/createUser')
const storeUserController = require('./src/controllers/storeUser')
const loginController = require("./src/controllers/login")
const loginUserController = require('./src/controllers/loginUser')

const dbSetup = require("./db")
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(expressSession({
  secret: 'secret',
  store: MongoStore.create({ 
    mongoUrl: 'mongodb://localhost:27017/portals-mirrors' }),
    resave: true,
    saveUninitialized: true

  }))
app.use(passport.initialize())
app.use(passport.session())
  
  
  
  
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

    app.use(flash())
    app.use((req, res, next) => {
      res.locals.registrationErrors = req.flash('registrationErrors')
      next()
      
    })

const morePost = require('./src/middleware/morePost')
app.use('/posts/store', morePost)
    
    
    
app.get("/", homePageController)
app.get("/posts/:id", getPostController)
app.get("/posts", auth,  createPostController)
app.post("/posts/store",auth, morePost, storePostController)
app.get('/auth/login', redirectIfAuthenticated, loginController)
app.post('/users/login', redirectIfAuthenticated, loginUserController)
app.get("/auth/register", redirectIfAuthenticated, createUserController)
app.post("/users/register", redirectIfAuthenticated, storeUserController)



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
  res.type("text/plain")
  res.status(404)
  res.send("404 - Page Not Found")
})

app.use((err, req, res, next) => {
  console.error(err.message)
  res.type("text/plain")
  res.status(500)
  res.send("500 - Server Error")
})

app.listen(port, () =>
  console.log(
    `Server started on http://localhost:${port} ` + `press Ctrl-C to terminate.`
  )
)
