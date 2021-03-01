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
        return res.render('login');
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

app.get('/', ifNotLoggedin, (req,res,next) => {
    //dbConnection.execute("SELECT full_name FROM users WHERE id=?",[req.session.userID])
    const userId = user.getUserById(req.session.userID)
    return userId
        .then((userId) => {
            res.render('home',{
                full_name:userId.full_name
            });
        });

});

app.post('/', ifLoggedin, [
    body('user_login').custom((value) => {
        const userLog = user.getUserByLogin(value)
            return userLog
            .then((userLog) => {
                if(userLog){
                    return true;

                }
                return Promise.reject('Invalid Login!');

            });
    }),
    body('user_pass','Password is empty!').trim().not().isEmpty(),
], (req, res) => {
    const validation_result = validationResult(req);
    const {user_pass, user_login} = req.body;
    if(validation_result.isEmpty()){
        const userL = user.getUserByLogin(user_login)
        return userL
            .then((userL) => {
                bcrypt.compare(user_pass, userL.password).then(compare_result => {
                    if(compare_result === true){
                        req.session.isLoggedIn = true;
                        req.session.userID = userL.id;

                        res.redirect('/');
                    }
                    else{
                        res.render('login',{
                            login_errors:['Invalid Password!']
                        });
                    }
                })
                    .catch(err => {
                        if (err) throw err;
                    });


            }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        res.render('login',{
            login_errors:allErrors
        });
    }
});

app.get('/logout',(req,res)=>{
    //session destroy
    req.session = null;
    res.redirect('/');
});

app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});

app.listen(8080, () => console.log("Server is Running..."));