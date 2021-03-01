'use strict';

const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('./models/user');
const ejs = require('ejs')

const app = express();

app.use(express.urlencoded({extended:false}));

app.set('views', __dirname + '/views');
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

app.use('/public', express.static('public'));

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge:  3600 * 1000 // 1hr
}));

const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('register');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}

let user = new User;

app.get('/', ifNotLoggedin, (req, res, next) => {

});

app.post('/register', ifLoggedin,
    [
        body('user_email','Invalid email address!').isEmail().custom((value) => {
            //return dbConnection.execute('SELECT email FROM users WHERE email=?', [value])
            const userEm = user.getUserByEmail([value])
            console.log(userEm)
            return userEm
                .then((userEm) => {
                    if(userEm){
                        return Promise.reject('This E-mail already in use!');
                    }
                    return true;
                });
        }),
        body('confirm_user_pass','Invalid confirm password!').custom((value, {req}) => {
            return value == req.body.user_pass;
        }),
        body('login','Invalid login!').custom((value) => {
            const userLogin = user.getUserByLogin([value])
            console.log(userLogin)
            return userLogin
                .then((userLogin) => {
                    if(userLogin){
                        return Promise.reject('This Login already in use!');
                    }
                    return true;
                });
        }),
        body('user_name','Username is Empty!').trim().not().isEmpty(),
        body('login','Login is Empty!').trim().not().isEmpty(),
        body('confirm_user_pass','Confirm password is empty!').trim().not().isEmpty(),
        body('user_pass','The password must be of minimum length 6 characters').trim().isLength({ min: 6 }),
    ],
    (req,res,next) => {

        const validation_result = validationResult(req);
        const {user_name, login, user_pass, user_email} = req.body;
        if(validation_result.isEmpty()){
            bcrypt.hash(user_pass, 12).then((hash_pass) => {
                user.createUser(login, hash_pass, user_name, user_email)
                    .then(result => {
                        res.send(`your account has been created successfully, Now you can <a href="/">Login</a>`);
                    }).catch(err => {
                    if (err) throw err;
                });
            })
                .catch(err => {
                    if (err) throw err;
                })
        } else {
            let allErrors = validation_result.errors.map((error) => {
                return error.msg;
            });
            res.render('register',{
                register_error:allErrors,
                old_data:req.body
            });
        }
    });

app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});

app.listen(8080, () => console.log("Server is Running..."));