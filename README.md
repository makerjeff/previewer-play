#Previewer Play
RnD for Helena's previewer

### Linksies!
- [Uploading Files Locally](https://www.terlici.com/2015/05/16/uploading-files-locally.html)  **(DEPRECATED)**
- [Express 4: File Upload](http://lollyrock.com/articles/express4-file-upload/)
- [Using Multer requires middleware function error fix](http://stackoverflow.com/questions/31496100/cannot-app-usemulter-requires-middleware-function-error)
- [File Upload using Node / Express / Multer](http://code.runnable.com/VNX-T8fdt5Y4X-mv/fileupload-for-node-js-and-hello-world) **(NEW!)** **(WORKS!)**
- [MDN: Date.now() (Epoch time)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/now) **(NEW!)**
- [Multer: NPM](https://github.com/expressjs/multer/issues/203) **(IMPORTANT!)**
- [Vivus.JS](https://github.com/maxwellito/vivus) **(NEW!)**
- [HTML5 Progress bar](http://www.matlus.com/html5-file-upload-with-progress/)
- [HTML5 Rocks: XHR2](http://www.html5rocks.com/en/tutorials/file/xhr2/)

### Reference
- [Express JS - Middleware (book) (Has all the methods!)](https://ewiggin.gitbooks.io/expressjs-middleware/content/multer.html)
- [Multer - Github](https://github.com/expressjs/multer)
- [FormData-MDN](https://developer.mozilla.org/en-US/docs/Web/API/FormData/append)
- [Request and Response Objects](http://www.murvinlai.com/req-and-res-in-nodejs.html)
- [Parsing POST data in Express: Use BodyParser](http://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters-in-express)
- [HTML Goodies: Drag and Drop files](http://www.htmlgoodies.com/html5/javascript/drag-files-into-the-browser-from-the-desktop-HTML5.html#fbid=uZVFQQwBxeJ)
- [Mongoose Quick Start](http://mongoosejs.com/docs/)
- [Form EncType](http://www.w3schools.com/jsref/prop_form_enctype.asp)
- [Body-Parser for Express](https://github.com/expressjs/body-parser)
- [Node.JS: File System](http://www.tutorialspoint.com/nodejs/nodejs_file_system.htm)
- [XHR.upload.onprogress](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
- [Scotch.io: Using Mongoose.js in Node.js and MongoDB applications](https://scotch.io/tutorials/using-mongoosejs-in-node-js-and-mongodb-applications) **(NEW!)**

### Technologies
- [adm-zip: backend zip file handling](https://github.com/cthackers/adm-zip)
- [Multer: File upload](https://www.npmjs.com/package/multer)
- [bcrypt](https://www.npmjs.com/package/bcryptjs)

## Notes/Major Discoveries

- File Upload using node/express/multer tutorial works.

- **FormData() from the front end sends data as 'multipart/form-data', which bodyParser doesn't support. Use 'multer' for this.**

- **form.elements[0].value**; Access your form element values on the front end with this. (AJAX)
- **form.( variable name ).value**; Also works as well.
- ENCODE your URIs before posting!
- ** (number).toLocalString()** in Node.JS gives you numbers with commas.


**Using Multer:<br>
app.use(multer({dest:'./uploads/'}).single(...)); <br>
app.use(multer({dest:'./uploads/'}).array(...)); <br>
app.use(multer({dest:'./uploads/'}).fields(...)); <br>


TODO: Animated SVG as progress!





