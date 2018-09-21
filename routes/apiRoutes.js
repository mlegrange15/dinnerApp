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
    // console.log(req);
    // console.log("express " + zipCode);
    // console.log("express " + categories);
    // console.log("express " + price);

    client.search({
      location: zipCode,
      price: price,
      categories: categories
    }).then(response => {
      // for (var i = 0; i < 11; i++) {

        var yelpObject = {
        
                yelpBusinesses: response.jsonBody.businesses.slice(0,9)
        }
        // {

        //  name: response.jsonBody.businesses[i].name,
        //  address: response.jsonBody.businesses[i].location.address1,
        //  city: response.jsonBody.businesses[i].location.city,
        //  phone: response.jsonBody.businesses[i].display_phone,
        //  price: response.jsonBody.businesses[i].price,
        //  image: response.jsonBody.businesses[i].image_url,
        // }
     

              // console.log(response.jsonBody.businesses);

      //   console.log(response.jsonBody.businesses[i].name);
      //   console.log(response.jsonBody.businesses[i].location.address1);
      //   console.log(response.jsonBody.businesses[i].location.city);
      //   console.log(response.jsonBody.businesses[i].display_phone);
      //   console.log(response.jsonBody.businesses[i].price);
      //   console.log(response.jsonBody.businesses[i].image_url);
      //   //   console.log(response.jsonBody.businesses[i].categories);
      // }
      
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
