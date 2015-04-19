/**
 * This file runs some configuration settings on your express application.
 */ 
var debug = 0;
var win7 = 1;

var fdate = new Date();
Date.prototype.addHours = function(h){
    this.setHours(this.getHours()+h);
    return this;
};
fdate.addHours(-12);
var fdatestring = ("0" + (fdate.getMonth() + 1).toString()).substr(-2) + "_" + ("0" + fdate.getDate().toString()).substr(-2)  + "_" + (fdate.getFullYear().toString()).substr(2);
var eventfolder = 'scan';

console.log(fdatestring);
var nasServePath = ['/Volumes/OCULTO/'+fdatestring+'/'+eventfolder, 'Z:/'+fdatestring+'/'+eventfolder];
var debugServePath = __dirname + '/images/'+fdatestring+'/'+eventfolder;
var servePath = [nasServePath[win7], debugServePath];


console.log(__dirname);
// Include the handlebars templating library
var handlebars = require('express3-handlebars'),
	express = require('express'),
	serveStatic = require( "serve-static" );
// Require()-ing this module will return a function
// that the index.js file will use to configure the
// express application

module.exports = function(app){

	// Register and configure the handlebars templating engine
	app.engine('html', handlebars({ 
		defaultLayout: 'main',
		extname: ".html",
		layoutsDir: __dirname + '/views/layouts'
	}));

	// Set .html as the default template extension 
	app.set('view engine', 'html');

	// Tell express where it can find the templates
	app.set('views', __dirname + '/views');

	// Make the files in the public folder available to the world
	app.use(express.static(__dirname + '/public'));

	// static directory for serving image files
	// app.use('/images', serveStatic('/Volumes/OCULTO/Photocopier'));
	app.use('/images', serveStatic(servePath[debug]));
	// app.use(express.bodyParser({uploadDir:'/public/uploaded'}));

	// Parse POST request data. It will be available in the req.body object
	app.use(express.urlencoded({limit: '50mb'}));

};
