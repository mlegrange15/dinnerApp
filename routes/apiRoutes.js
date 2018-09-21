var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", function(req, res) {
    db.Search.findAll({}).then(function(dbExamples) {
      // console.log(dbExamples);
      
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/out", function(req, res) {
    console.log("this is server req.body: " + JSON.stringify(req.body));

    db.Search.create({
      inorout: req.body.inorout,
      zipcode: req.body.zipcode,
      category: req.body.category,
      spend: req.body.spend
    })
      .then(function(dbSearch) {
        
        
        
        
        
        res.json(dbSearch);
      });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
