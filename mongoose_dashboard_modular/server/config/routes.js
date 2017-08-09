var mongoose = require('mongoose');
var Frog = mongoose.model('Frog');
var frogs = require('../controllers/frogs.js');

module.exports = function (app) {

    app.get('/', function (req, res) {
        frogs.show(req, res);
    })

    app.get('/new', function (req, res) {
        res.render("new");
    })

    app.get('/delete/:id', function (req, res) {
        frogs.delete(req, res);
    })

    app.get('/:id/edit', function (req, res) {
        frogs.edit(req, res);
    })

    app.get('/:id', function (req, res) {
        frogs.theFrog(req, res);
    })

    app.post('/process', function (req, res) {
        frogs.update(req, res);
    })
}