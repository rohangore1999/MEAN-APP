// Importing mongoose from package.json
const mongoose = require('mongoose');

// Connecting to Mongo DB
mongoose.connect('mongodb://localhost:27017/meanDB', (err)=> {
    if (!err){
        console.log("Connected");
    }
    else {
        console.log("failed");
    }
})

// Exporting the module so other can use
module.exports = mongoose;