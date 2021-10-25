const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI;

module.exports = function() {
   mongoose.connect(uri, (err) => {
    if(err)  {
        console.log(err.message)
    } else {
        console.log('database connection successful')

    }
  })

}


   









