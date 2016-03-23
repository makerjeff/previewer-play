/**
 * 180 Previewer (transporter)
 */

/* MODULES */
var express = require('express');
var multer = require('multer');
var colors = require('colors');
var fileType = require('file-type');
var bodyParser = require('body-parser');
var fs = require('fs');

/*GLOBALS*/
var done = false;


/* INSTANCES */
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
//var jsonParser = bodyParser.json();
//var urlencodedParser = bodyParser.urlencoded({extended: true });

/* MIDDLEWARE */

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

/* ROUTES */

//default route
app.get('/', function(request, response){
    response.sendFile(__dirname + '/public/index.html');
});


// FORM DATA SUBMISSION TEST2 (to debug file upload)
app.post('/api/signup', function(request, response){

    var bString = '';

    bString = request.body.firstname + ' ' + request.body.lastname + ' pin: ' + request.body.pin;

    console.dir(bString);

    //createRandomFolder();
    logToFile(bString);

    response.type('text/html');
    response.end(bString);
});


/* API routes (uploading) */
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


// ===== HELPER FUNCTIONS =====
function logToFile(textString){

    var logObject = {};

    //logObject.timestamp = Date.now() ;
    logObject.timestamp = new Date().toString();

    logObject.content =  ': ' + '"' + textString + '"\n';

    fs.appendFile('server-log.txt', logObject.timestamp + logObject.content, function(error){
        if(error) {
            return console.log(Error(error));
        }
    });
}

/**
 * Make an ID.
 * @param chars Number of characters to generate.
 * @returns {string} Returns a random string of characters based on 'chars'.
 */
function createRandomString(chars){

    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < chars; i++ ){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

/**
 * Make an random folder
 * @returns {string} creates a new random folder.
 */
function createRandomFolder(){
    fs.mkdir(__dirname + '/public/creative/' + createRandomString(10), function(error){
        if(error) {
            return console.log(Error(error));
        }
    });
}