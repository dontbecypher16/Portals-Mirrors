const mongoose = require('mongoose')
const connectionString = 'mongodb://localhost:27017/portals-mirrors'
const uri = process.env.MONGODB_URI;

module.exports = function() {
   mongoose.connect(uri,
 {useNewUrlParser: true,
 useUnifiedTopology: true }, (err) => {
    if(err)  {
        mongoose.connect(connectionString, (err) => {
          if(err){
            console.log(err);
           }else {
            console.log('mongoose connection is successful on: ' + db);
           }
        })
    } else {
        console.log('database connection successful')

    }
  })

}


   









