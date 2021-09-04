const express = require('express')
const expressHandlebars = require('express-handlebars')
const fortune = require('./lib/fortune')

const app = express()

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main",
    section: function (name, options) {
      if (!this.sections) this._sections = {};
      (this._sections[name] = options), fn(this);
      return null;
    },
  })
);
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000
app.use(express.static(__dirname + '/public'))


app.get('/', (req, res) => {
   res.render('home')
})

app.get('/essays', (req, res) => {
    res.render('essays')
})

app.get('/poems', (req, res) => {
    res.render('poems')
})

app.get('/about', (req, res) => {
    res.render('about', {fortune: fortune.getFortune()})
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res) => {
    res.type('text/plain')
    res.status(404)
    res.send('404 - Not Found')
})


app.use((err, req, res, next) => {
    console.error(err.message)
    res.type('text/plain')
    res.status(500)
    res.send('500 - Server Error')
})


app.listen(port, () => console.log(
    `Express started on http://localhost:${port} ` +
    `press Ctrl-C to terminate.`
))