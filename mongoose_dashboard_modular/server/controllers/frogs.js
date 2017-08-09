var mongoose = require('mongoose');
var Frog = mongoose.model('Frog');

module.exports = {

    show: function (req, res) {
        Frog.find({}, function (err, frogs) {
            if (err) {
                console.log('something went horribly wrong');
            } else {
                console.log('Got all frogs!');
                res.render("index", { 'frogs': frogs });
            }
        })
    },
    delete: function (req, res) {
        Frog.remove({ _id: req.params.id }, function (err) {
            if (err) {
                console.log('something went horribly wrong');
            } else {
                console.log('Frog gone!');
                res.redirect('/');
            }
        })
    },
    edit: function (req, res) {
        Frog.find({ _id: req.params.id }, function (err, frog) {
            if (err) {
                console.log('something went horribly wrong');
            } else {
                console.log('Frog Edited');
                console.log(frog);
                res.render('edit', { 'frog': frog });
            }
        })
    },
    update: function (req, res) {
        if (req.body.update) {
            Frog.update({ _id: req.body.id }, { $set: { name: req.body.name, animal: req.body.animal } }, function (err) {
                if (err) {
                    console.log('something went horribly wrong');
                } else {
                    console.log('Frog Update!');
                    res.redirect('/');
                }
            })
        } else {
            var date = new Date();
            var newFrog = new Frog({ name: req.body.name, animal: req.body.animal, time: date });
            newFrog.save(function (err) {
                if (err) {
                    console.log('something went horribly wrong');
                } else {
                    console.log('New Frog');
                    res.redirect('/');
                }
            })
        }
    },
    theFrog: function(req, res){
        Frog.find({ _id: req.params.id }, function (err, frog) {
            if (err) {
                console.log('something went horribly wrong');
            } else {
                console.log('got frog');
                res.render('show', { 'frog': frog });
            }
        })
    }
}