var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

port = 8000;

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var connection = mongoose.connect('mongodb://localhost/animals_db');

var FrogSchema = new mongoose.Schema({
    name: String,
    age: Number,
    superpower: String,
})

var Frog = mongoose.model('Frog', FrogSchema);

app.use(express.static(path.join(__dirname, './static')));

// ROUTES-----------------------------
app.get('/', function(req, res){
    
    Frog.find({}, function(err, results){
        if(err) { console.log(err); }
        res.render('index', { frogs: results });
    });
});

// CREATE-----------------------------
app.post('/', function(req, res){
    console.log('CREATE ROUTE HIT');
    Frog.create(req.body, function(err, result){
        if (err) { console.log(err); }
        res.redirect('/')
    });
});

// NEW--------------------------------
app.get('/new', function(req, res) {
    console.log('NEW ROUTE HIT');
    res.render('new');
})

// SHOW-------------------------------
app.get('/:id', function(req, res) {
    console.log('SHOW ROUTE HIT');
    Frog.find({_id: req.params.id}, function(err, response) {
        if (err) {console.log(err);}
        res.render('show', { frog: response[0] });
    });
});

app.get('/:id/edit/', function(req, res) {
    console.log('SHOW/EDIT ROUTE HIT')
    Frog.find({ _id: req.params.id }, function(err, response) {
        if (err) { console.log(err); }
        res.render('edit', { frog: response[0] });
    });
});

// UPDATE----------------------------
app.post('/:id', function(req, res) {
    console.log('UPDATE ROUTE HIT')
    Frog.update({ _id: req.params.id }, req.body, function(err, result) {
        if (err) { console.log(err); }
        res.redirect('/');
    });
});

// DELETE----------------------------
app.post('/:id/delete', function(req, res) {
    Frog.remove({ _id: req.params.id }, function(err, result) {
        if (err) { console.log(err); }
        res.redirect('/');
    });
});




app.listen(port, function() {
    console.log("The World is listening on port ", port);
});
