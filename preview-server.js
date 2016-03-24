/**
 * 180 Previewer (transporter)
 */

/* ============ MODULES ============ */
var express = require('express');
var multer = require('multer');
var colors = require('colors');
var fileType = require('file-type');
var bodyParser = require('body-parser');
var fs = require('fs');

var previewer = require('./previewer-module');

/* ============ GLOBALS ============ */
var done = false;


/* ============ INSTANCES ============ */
var app = express();
var storage = multer.diskStorage({
    destination: function(request, response, callback) {
        callback(null, './uploads');
    },
    filename: function(request, file, callback){
        callback(null, file.originalname);
    }
});

//Multer upload module
var upload = multer({storage: storage}).single('uploadFile');

/* ============ MIDDLEWARE ============ */

//server static files
app.use(express.static(__dirname + "/public/"));

//enable bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
     extended: true
 }));

//enable CORS
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// = logs to node console with every transaction
//TODO Make this log to local file.
app.use(function(request, response, next){
    console.log('%s %s %s %s', request.method, request.url, request.path, colors.yellow(Date().toString()));
    next();
});

/* ============ ROUTES ============ */

//default route
app.get('/', function(request, response){
    response.sendFile(__dirname + '/public/index.html');
});


/* Standard form POST route */
app.post('/api/signup', function(request, response){

    var bString = '';

    //request.body.<variable> comes across unresolved according to webstorm, but works.
    bString = request.body.firstname + ' ' + request.body.lastname + ' pin: ' + request.body.pin;

    console.dir(bString);

    //createRandomFolder();
    previewer.logToFile(bString);

    response.type('text/html');
    response.end(bString);
});


/* AJAX file upload route */
app.post('/api/upload', function(request, response){

    // multer singleFile upload
    upload(request, response, function(error){

        if(error) {
            return response.end("error uploading file!");
        }

        response.type('text/html');
        response.end('File is uploaded. ' + '<a href="/">Upload more!</a>');
        console.log(request.body);
        console.log('file uploaded.');
    });
});

// basic 404 catch-all middleware
app.get('*', function(request, response){
    response.sendFile(__dirname + '/public/404.html');
});

/* ===== START SERVER ===== */
app.listen(3000, function(){
    console.log('Working on Port 3000'.blue);
});


//TODO create folderArray of existing folders
//TODO create random string folder, if folder exists in folderArray, try again.
//TODO auto-unzip


/* ============ HELPER FUNCTIONS ============ */
