/**
 * Previewer
 */

/* MODULES */
var express = require('express');
var multer = require('multer');
var colors = require('colors');

/* INSTANCES */
var app = express();
var storage = multer.diskStorage({
    destination: function(request, response, callback) {
        callback(null, './uploads');
    },
    filename: function(request, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

var upload = multer({storage: storage}).single('userPhoto');

/* MIDDLEWARE */
app.use(express.static(__dirname + "/public/"));

/* ROUTES */
app.get('/', function(request, response){
    response.sendFile(__dirname + '/public/index.html');
});

/* POST */
app.post('/api/photo', function(request, response){
    upload(request, response, function(error){
        if(error) {
            return response.end("error uploading file!");
        }
        response.type('text/html');
        response.end('File is uploaded. ' + '<a href="../index.html">Upload more!</a>');
    });
});

// start server
app.listen(3000, function(){
    console.log('Working on Port 3000'.blue);
});

//TODO get file name, and append to uploaded file.
//TODO strip exif data
//TODO check for file size before uploading. If it's 0kb, say try again.