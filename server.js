/**
 * 180 Previewer (transporter)
 */

/* MODULES */
var express = require('express');
var multer = require('multer');
var colors = require('colors');
var fileType = require('file-type');
var bodyParser = require('body-parser');

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
var upload = multer({storage: storage}).single('userPhoto');

/* MIDDLEWARE */

//server static files
app.use(express.static(__dirname + "/public/"));

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

// FORM DATA SUBMISSION TEST (to debug file upload)
app.post('/api/text', function(request, response){

    response.type('text/html');
    response.end('<h1>Server response: </h1>' + request.body.firstname + '<br>' + request.body.lastname);

    console.log('User submitted stuff: ' + request.body.firstname + ', ' + request.body.lastname);

});

// API routes (uploading)
app.post('/api/photo', function(request, response){

    //multer singleFile upload
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

/* START SERVER */
app.listen(3000, function(){
    console.log('Working on Port 3000'.blue);
});


//TODO create folderArray of existing folders
//TODO create random string folder, if folder exists in folderArray, try again.
//TODO auto-unzip