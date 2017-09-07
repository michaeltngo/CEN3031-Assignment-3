'use strict';
/* 
  Import modules/files you may need to correctly run the script. 
  Make sure to save your DB's uri in the config file, then import it with a require statement!
 */
var fs = require('fs'),
    mongoose = require('mongoose'), 
    Schema = mongoose.Schema, 
    Listing = require('./ListingSchema.js'), 
    config = require('./config');
    var newListing = new Listing

/* Connect to your database */
mongoose.connect('mongodb://michaeltngo:pw@ds159493.mlab.com:59493/assignment3');


/* 
  Instantiate a mongoose model for each listing object in the JSON file, 
  and then save it to your Mongo database 
 */

fs.readFile('listings.json', 'utf8', function(err, data) {
  
  if (err) {
    console.log(err);
    return;
  }
  


  else {
    
    data = JSON.parse(data);
    data = data["entries"];
    var arrayLength = data.length;



    for (var i = 0; i < arrayLength; i++) {
        



      var newListing = new Listing({
        code: data[i].code, 
        name: data[i].name
        
      });

      if (data[i].coordinates) {
          newListing.coordinates.latitude = data[i].coordinates.latitude;
          newListing.coordinates.longitude = data[i].coordinates.longitude;
        }

      if (data[i].address) {
          newListing.address = data[i].address;
        }

      if (data[i].created_at) {
          newListing.created_at = data[i].created_at;
        }

      if (data[i].updated_at) {
          newListing.updated_at = data[i].updated_at;
        }

    newListing.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully!');
    });


    }



  }

});



/* 
  Once you've written + run the script, check out your MongoLab database to ensure that 
  it saved everything correctly. 
 */