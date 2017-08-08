var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://localhost/my_first_db');

var UserSchema = new mongoose.Schema({
    name: String,
    age: Number
})

mongoose.model('User', UserSchema);
var User = mongoose.model('User');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, './static')));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

// Root Request
app.get('/', function(req, res) {
    User.find({}, function(err, users) {
        if(err) {
            console.log('Something went terribly wrong.');
        }
        res.render('index', {users: users});
    });
    
    // This is where we retrieve the users from the database and include them in the view page we will be rendering.

    res.render('index');
});

app.post('/users', function(req, res) {
    console.log("POST DATA", req.body);

    var user = new User({name: request.body.name, age: request.body.age});

    user.save(function(err) {
        if (err) {
            console.log("Whoopsie Daisy!  Someone F'ed Up!");
        } else {
            console.log("User added");
        }
    }); res.redirect('/');
});

app.listen(8000, function() {
    console.log("The World is listening on port 8000");
});
