
'use strict';
require('dotenv').config();

const yelp = require('yelp-fusion');

const client = yelp.client(process.env.YELP_API_KEY);

client.search({
  location: '60607',
  price: '1',
  categories: 'pizza'
}).then(response => {
    for (var i=0;i<11;i++){
  console.log(response.jsonBody.businesses[i].name);
  console.log(response.jsonBody.businesses[i].location.address1);
  console.log(response.jsonBody.businesses[i].location.city);
  console.log(response.jsonBody.businesses[i].display_phone);
  console.log(response.jsonBody.businesses[i].price);
  console.log(response.jsonBody.businesses[i].image_url);
//   console.log(response.jsonBody.businesses[i].categories);
    }
}).catch(e => {
  console.log(e);
});