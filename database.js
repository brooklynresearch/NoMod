/**
 * This file configures the data sets used in the app
 *
 * It uses the nedb module for storing data, and returns 
 * an object with all the datasets. It is required in 
 * routes.js
 */ 


// Require the nedb module
var Datastore = require('nedb'),
	fs = require('fs');

// Initialize two nedb databases. Notice the autoload parameter.
var photos = new Datastore({ filename: __dirname + '/data/photos', autoload: true }),
	users = new Datastore({ filename: __dirname + '/data/users', autoload: true });

// Create a "unique" index for the photo name and user ip
photos.ensureIndex({fieldName: 'name', unique: true});
users.ensureIndex({fieldName: 'ip', unique: true});

// Load all images from the public/photos folder in the database
var photos_on_disk = fs.readdirSync(__dirname + '/public/photos');

// Insert the photos in the database. This is executed on every 
// start up of your application, but because there is a unique
// constraint on the name field, subsequent writes will fail 
// and you will still have only one record per image:

photos_on_disk.forEach(function(photo){
	photos.insert({
		name: photo,
		likes: 0,
		dislikes: 0,
		viewed: 0,
		time_added: 0,
		time_viewed: 0,
		time_saved: 0
	});
});

// Make the photos and users data sets available to the code
// that uses require() on this module:

module.exports = {
	photos: photos,
	users: users
};