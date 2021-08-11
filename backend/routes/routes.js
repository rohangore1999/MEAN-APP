// Importing Express; Router module needs
const express = require('express');
const router = express.Router();

// Importing data interface(data format) from employee.js
const Employee = require('../models/employee.js');

// get ID from mongoos
const ObjectId = require('mongoose').Types.ObjectId;

// GET, POST, PUT, DELETE
// BASE path: http://localhost:3000/employees ==> '/'

// Post Api [Angular will send data through POST to MONGO DB through express(as server)]

// When Angular send data to express it will be present in req.body

// req => get data from Angular
// res => send data to mongodb

// GET request
router.get('/', (req, res) => {
    Employee.find((err, doc) => {
        if (err) {
            console.log("ERROR " + err)
        }
        else {
            // no error then send the res
            res.send(doc)
        }
    });
});

// GET reqiuest for single employee
router.get('/:id', (req, res) => {
    // req.params.id => contain the id which we passed
    if (ObjectId.isValid(req.params.id)) {
        // if id is valid;
        Employee.findById(req.params.id, (err, doc) => {
            if (err) {
                console.log("Error in GET Employee by id" + err);
            }
            else {
                res.send(doc);
            }
        });
    }
    else {
        return res.status(400).send("ID not found");
    }
});

// POST request
router.post('/', (req, res) => {
    // making obj of Employee
    let emp = new Employee({
        name: req.body.name,
        position: req.body.position,
        department: req.body.department
    });

    // Now send data to MongoDB
    emp.save((err, doc) => {
        if (err) {
            console.log("Error is: " + err)
        }
        else {
            // no error then send the res
            res.send(doc)
        }
    })

});



// PUT request
router.put('/:id', (req, res) => {

    // req.params.id => contain the id which we passed
    if (ObjectId.isValid(req.params.id)) {
        // if id is valid;
        // Creating new object with updated values
        let emp = {
            name: req.body.name,
            position: req.body.position,
            dept: req.body.dept
        };

        Employee.findByIdAndUpdate(req.params.id, {$set:emp}, {new:true} , (err, doc) => {
            if (err) {
                console.log("Error in UPDATE Employee by id" + err);
            }
            else {
                res.send(doc);
            }
        });
    }
    else {
        return res.status(400).send("ID not found");
    }
});


// DELETE request

router.delete('/:id', (req, res) => {
    // req.params.id => contain the id which we passed
    if (ObjectId.isValid(req.params.id)) {
        // if id is valid;
        Employee.findByIdAndRemove(req.params.id, (err, doc) => {
            if (err) {
                console.log("Error in DELETE Employee by id" + err);
            }
            else {
                res.send(doc);
            }
        });
    }
    else {
        return res.status(400).send("ID not found");
    }
});


module.exports = router;