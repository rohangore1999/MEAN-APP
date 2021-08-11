// get modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

// get module from db.js exported file
const mongoose = require('./db.js');

// get module from routes exported file
const routes = require('./routes/routes.js');

// initize express
const app = express();

// to use

app.use(bodyParser());

// Cors use in Angular 
app.use(cors({origin:'http://localhost:4200'}));

// Express port Listening on 3000
app.listen(3000, ()=> console.log('Index Server started'));

// Express create routes after listening
app.use('/employees', routes);

// BASE path: http://localhost:3000/employees ==> '/'