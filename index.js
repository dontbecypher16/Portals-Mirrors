const express = require("express")
const app = express()
const dotenv = require('dotenv')
dotenv.config()
let port = process.env.PORT
if (port == null || port == "") {
  port = 8000;
}
const uri = process.env.MONGODB_URI;
const expressHandlebars = require("express-handlebars")
const expressSession = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const methodOverride = require('method-override')
const marked = require("marked")
const createDomPurify = require('dompurify')
const { JSDOM } = require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)

const isLoggedIn = require('./src/middleware/isLoggedIn')
const notLoggedInRedirect = require('./src/middleware/notLoggedInRedirect')
const notLoggedInUnauthorized = require('./src/middleware/notLoggedInUnauthorized')


const createPostController = require('./src/controllers/createPost')
const homePageController = require('./src/controllers/homePage')
const storePostController = require('./src/controllers/storePosts')
const getPostController = require('./src/controllers/getPost')
const createUserController = require('./src/controllers/createUser')
const storeUserController = require('./src/controllers/storeUser')
const loginController = require("./src/controllers/login")
const loginUserController = require('./src/controllers/loginUser')
const logoutController = require('./src/controllers/logout')
const deletePostController = require('./src/controllers/deletePost')
const updatePostController = require('./src/controllers/updatePost')
const createEditController = require('./src/controllers/createEdit')

const dbSetup = require("./db")


app.use(express.static(__dirname + "/public"))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(expressSession({
  secret: process.env.SESSION_SECRET,
  store: MongoStore.create({ 
    mongoUrl: process.env.MONGODB_URI }),
    resave: true,
    saveUninitialized: true

  }))


  

  
  
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
app.use(isLoggedIn)
const morePost = require('./src/middleware/morePost')
app.use('/posts/store', morePost)


    
    
// user views
app.get("/", homePageController)
app.get("/posts/:id", getPostController)
app.get('/auth/login', loginController)
app.get("/auth/logout",  logoutController)
app.get("/auth/register", createUserController)

// user actions
app.post("/users/register",  storeUserController)
app.post('/users/login', loginUserController)

// admin views
app.get("/posts", notLoggedInRedirect, createPostController)
app.get("/edit/:id", notLoggedInRedirect, createEditController)

// admin actions
app.post("/posts/store", notLoggedInUnauthorized, storePostController)
app.delete("/posts/:id", notLoggedInUnauthorized, deletePostController)
app.put("/edit/:id", notLoggedInUnauthorized, updatePostController)



app.get("/about", (req, res) => {
  res.render("about");
});



dbSetup();

// middleware

app.all("*", (req, res) => {
  res.type("text/plain")
  res.status(404)
  res.send("404 - Page Not Found")
})

// app.use((err, req, res, next) => {
//   if(err){
//     console.error(err.message)
//    return res.status(500).send("500 - Server Error")
    

//   }
// })

app.listen(port, () =>
  console.log(
    `Server started on http://localhost:${port} ` + `press Ctrl-C to terminate.`
  )
)
