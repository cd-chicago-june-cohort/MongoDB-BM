var mongoose = require('mongoose');
var Person = mongoose.model('Person');

module.exports = {

    show: function (req, res) {
        Person.find({}, function (err, persons) {
            if (err) {
                console.log('something went horribly wrong - show');
            } else {
                res.json(persons);
            }
        })
    },

    create: function (req, res) {
        var newPerson = new Person({ name: req.params.name});
        newPerson.save(function (err) {
            if (err) {
                console.log('something went horribly wrong - create');
            } else {
                console.log('create');
                res.redirect('/');
            }
        })
    },

    remove: function (req, res) {
        Person.remove({name: req.params.name }, function (err) {
            if (err) {
                console.log('something went horribly wrong - remove');
            } else {
                console.log('remove');
                res.redirect('/');
            }
        })
    },
    
    add: function(req, res){
        Person.find({name: req.params.name}, function(err, person){
            if (err) {
                console.log('something went horribly wrong - view');
            } else {
                res.json(person);
            }
        })
    }
}