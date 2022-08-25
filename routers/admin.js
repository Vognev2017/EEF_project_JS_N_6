const express = require('express')
const routerA = express.Router()
bodyParser = require('body-parser')
const {
    getUser
} = require('../db/users');
const {
    getAllUsers
} = require('../db/users');
const {
    PASS
} = require('../db/users');
const {
    NAME
} = require('../db/users');
let auth = false;

routerA.use('/login', bodyParser.urlencoded({
    extended: true
}));

routerA.post('/login', function (req, res, next) {
    const {
        pass,
        name
    } = req.body;

    if (name == NAME && pass == PASS) {
        auth = true
        res.redirect('/admin/user');
        next()
    } else {
        next(new Error("users"))
    }
});

routerA.get('/user', (req, res, next) => {
    if (auth) {
        const users = getAllUsers()
        res.render('admin-page', {
            users
        });
    } else {
        next(new Error("users"))
    }
});

module.exports = routerA;