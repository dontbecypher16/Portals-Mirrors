const express = require('express')
const expressHandlebars = require('express-handlebars')

const app = express()

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'main',

}))
app.set('view engine', 'handlebars')

const port = process.env.PORT || 3000
app.use(express.static(__dirname + '/public'))


const fortunes = [    
    "Conquer your fears.",
    "Rivers need springs",
    "Do not fear the unknown",
    "A pleasant surprise"
  ]
   

app.get('/', (req, res) => {
    res.type('text/plain')
    res.send('Portals/Mirrors')
})


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
    const randomFortune = fortunes[Math.floor(Math.random()*fortunes.length)]
    res.render('about', {fortune: randomFortune})
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

// middleware
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