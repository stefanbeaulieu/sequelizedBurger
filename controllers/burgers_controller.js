"use strict";

var express = require("express");
var router = express.Router();
var models = require('../models');

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
    res.redirect("/burgers");
});

router.get("/burgers", function(req, res) {
    models.Burger.findAll({ order: 'burger_name ASC' })
        .then(function(data) {
            var hbsObject = {
                burgers: data
            };
            res.render('index', hbsObject);
        });
});

router.post("/burgers/create", function(req, res) {
    models.Burger.create({
            burger_name: req.body.burger_name
        })
        .then(function() {
            res.redirect('/burgers');
        });
});

router.put("/burgers/update/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    models.Burger.update({
            devoured: true,
        }, {
            where: {
                id: req.params.id
            }
        })
        .then(function() {
            res.redirect('/burgers');
        })
});

// Export routes for server.js to use.
module.exports = router;