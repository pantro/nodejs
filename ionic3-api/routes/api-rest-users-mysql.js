var express = require('express');
var router = express.Router();
var User = require("../models/users");

router
    .get('/', (req, res, next) => {
        User.fetchAll((error, data) => {
            return User.response(res, error, data);
        })
    })

    .get('/:id', (req, res, next) => {
        User.findById(req.params.id, (error, data) => {
            return User.response(res, error, data);
        })
    })

    .post('/login', (req, res, next) => {
        User.findOne(req.body.username, req.body.password, (error, user) => {
            if ( ! error) {
                return res.json({user});
            }
            return res.json({user: null});
        })
    })

    .post('/', (req, res, next) => {
        const user = {
            id: null,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        User.insert(user, (error, data) => {
            return User.response(res, error, data);
        })
    })

    .put('/:id', (req, res, next) => {
        const user = {
            id: req.params.id,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        };

        User.update(user, (error, data) => {
            return User.response(res, error, data);
        })
    })

    .delete('/:id', (req, res, next) => {
        User.remove(req.params.id, (error, data) => {
            return User.response(res, error, data);
        })
    })

module.exports = router;
