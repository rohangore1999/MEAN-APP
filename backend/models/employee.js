// Importing mongoose from package.json
const mongoose = require('mongoose');

// Creating the data Interface
const Employee = mongoose.model('Employee',{
    name: {type: String},
    position: {type: String},
    department: {type: String}
})

// Exporting the module so other can use
module.exports = Employee;