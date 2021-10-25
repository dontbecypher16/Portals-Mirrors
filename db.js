const mongoose = require('mongoose')
//const connectionString = //'mongodb://localhost:27017/portals-mirrors'
const uri = process.env.MONGODB_URI;

module.exports = function() {
   mongoose.connect(uri,
 {useNewUrlParser: true,
 useUnifiedTopology: true }, (err) => {
    if(err)  {
        console.log('Something went wrong', err)
    } else {
        console.log('database connection successful')

    }
  })

}


   









