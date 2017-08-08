var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

port = 8000;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost/my_first_db');

var QuoteSchema = new mongoose.Schema({
    name: String,
    quote: String,
})

var Quote = mongoose.model('quotes', QuoteSchema);

app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index')
});

// Root Request
app.get('/quotes', function(req, res){
  // Logic to grab all quotes and pass into the rendered view
  Quote.find({}, function(err, results){
    if(err) { console.log(err); }
    res.render('quotes', { quotes: results });
  });
});

app.post('/quotes', function(req, res){
  Quote.create(req.body, function(err){
    if(err) { console.log(err); }
    res.redirect('/quotes');
  });
});

app.post('/remove', function(req, res) {
    console.log("REMOVE ROUTE HIT")
    Quote.remove(req.body, function(err) {
        if(err) {console.log(err); }
        res.redirect('/quotes');
    });
});

app.listen(8000, function() {
    console.log("The World is listening on port 8000");
});
