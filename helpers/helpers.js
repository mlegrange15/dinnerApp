var db = require("../models");

var helpers = {

    mostPopSearch: function(){

        db.Search.findAndCountAll({
            where: {
               inorout: 'out'
            },  
         })
         .then(function(result){
      
           var outTotal = result.count;
           console.log("this is the count from helpers: " + outTotal);
           
         });
    },
    mostPopZip: function(){

        return data
    },
    mostPopCategory: function(){

        return data
    },
    mostPopSpend: function(){

        return data
    }
};



module.exports = helpers;





