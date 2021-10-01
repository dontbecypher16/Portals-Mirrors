const mongoose = require('mongoose')
const connectionString = 'mongodb://localhost:27017/portals-mirrors'

const User = require('./src/models/userSchema')

module.exports = function() {
   mongoose.connect(connectionString,
 {useNewUrlParser: true,
 useUnifiedTopology: true }, (err) => {
    if(err)  {
        console.log('Something went wrong', err)
    } else {
        console.log('database connection successful')

    }
  })

}


   









