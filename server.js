var express = require('express');
var path= require('path');
var expressLayouts = require('express-ejs-layouts');
var app = express();
var $ = require('jquery');
var i18n=require('i18n-express');
var fs = require('fs');
var path = require('path');

// set the view engine to ejs
app.set('views',__dirname + '/views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use(i18n({
  translationsPath: path.join(__dirname, 'assets/i18n'), // <--- use here. Specify translations files path.
  siteLangs: ['en'],
  textsVarName: 'translation'
}));
app.use(express.static(__dirname + '/dist'));
app.use('/bootstrap', express.static(__dirname + '/node_modules/bootstrap/dist/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

// invest index
app.get('/', function(req, res) {
  fs.readFile('./data/carousel.json', 'utf8', function (err, data) {
    if (err) throw err;
    var myVar = JSON.parse(data);
    res.render('pages/home', {locals: myVar});
  });
});

app.get('/articles/:id', function(req, res) {
  fs.readFile('./data/carousel.json', 'utf8', function (err, data) {
    if (err) throw err;
    var myVar = JSON.parse(data);
    res.render('pages/article-details', {locals: myVar[req.params.id-1]});
  });
});

if (!module.parent) {
  // listen on port config.port
  app.listen(1221, onStarted);
  app.on('error', onError);
  app.on('listening', onListening);
}

function onStarted() {
  console.info(`Server started on port 1221`);
}

function onError(e) {
  console.error(`ERROR: ${e}`);
}

function onListening() {
  console.info(`Server is listening on port 1221`);
}
module.exports = app;
