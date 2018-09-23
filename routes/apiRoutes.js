'use strict';
var db = require("../models");
require('dotenv').config();
const yelp = require('yelp-fusion');
const client = yelp.client(process.env.YELP_API_KEY);

module.exports = function (app) {
  // Get all examples
  app.get("/api/examples", function (req, res) {
    db.Search.findAll({}).then(function (dbExamples) {
      // console.log(dbExamples);
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/out", function (req, res) {
    console.log("this is server req.body: " + JSON.stringify(req.body));

    var zipCode = req.body.zipcode;
    var categories = req.body.category;
    var price = req.body.spend;

    client.search({
      location: zipCode,
      price: price,
      categories: categories
    }).then(response => {
      // for (var i = 0; i < 11; i++) {

        var yelpObject = {
        
                yelpBusinesses: response.jsonBody.businesses.slice(0,9)
        }
      
      db.Search.create({
        inorout: req.body.inorout,
        zipcode: req.body.zipcode,
        category: req.body.category,
        spend: req.body.spend
      })
        .then(function (dbSearch) {
          res.json(yelpObject);
        });
    }).catch(e => {
      console.log(e);
    });
    // return res;
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
      res.json(dbExample);
    });
  });
};
