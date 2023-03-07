'use strict';

const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User = require('./models/user');
const ejs = require('ejs');
const nodemailer = require('nodemailer');

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

let transporter = nodemailer.createTransport({
        host: 'smtp.ukr.net',
        port: 465 ,
        secure: true,
        auth: {
            user: '',
            pass: ''
        }
    },
    {
        from: 'Mailer test <olx2004@ukr.net>',
    })

const mailer = message => {
    transporter.sendMail(message,(err, info) => {
        if(err) return console.log(err)
        console.log('Send mail: ', info)
    })
}

function sendRemindEmail(email, pass) {
    const message = {
        to: email,
        subject: 'password reset',
        html: `<h2>Для смены пароля перейдите по ссылке <h2>
                    <p>Ваш пароль: <strong>${pass}</strong></p>`
    }
    mailer(message)
}

function passGenerator() {
    let result       = '';
    let words        = '0123456789abcdefghiklmnopqrstuxyzABCDEFGHIGKLMNOPQRSTUXYZ';
    let max_position = words.length - 1;
    let position = 0;
    for( let i = 0; i < 10; ++i ) {
        position = Math.floor( Math.random() * max_position );
        result = result + words.substring(position, position + 1);
    }
    return  result;

}

const ifNotLoggedin = (req, res, next) => {
    if(!req.session.isLoggedIn){
        return res.render('remind');
    }
    next();
}

const ifLoggedin = (req, res, next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/home');
    }
    next();
}

let user = new User;

app.get('/', ifNotLoggedin, (req,res,next) => {
    const userId = user.getUserById(req.session.userID)
    return userId
        .then((userId) => {
            res.render('home',{
                full_name:userId.full_name
            });
        });

});

app.post('/', ifLoggedin, [
    body('email').custom((value) => {
        console.log(value);
        const userLog = user.getUserByEmail(value)
            return userLog
            .then((userLog) => {
                if(userLog){
                    return true;
                }
                return Promise.reject('Invalid Email!');
            });
    }),
], (req, res) => {
    const validation_result = validationResult(req);
    const {email} = req.body;
    if(validation_result.isEmpty()){
        const userEml = user.getUserByEmail(email)
        return userEml

            .then((userEml) => {
                if (userEml !== undefined) {
                    let newPass = passGenerator()
                    // bcrypt.hash(newPass, 12).then((hash_pass) => {
                    //     const us = user.updatePass(req.body.email,hash_pass)
                    //     console.log(us)
                    //     })
                    bcrypt.hash(newPass, 12).then((hash_pass) => {
                        user.updatePass(req.body.email,hash_pass)
                        sendRemindEmail(req.body.email, newPass);
                    })
                        .then(result => {
                            res.status(201).send("Your password send to your email!")
                        })
                } else {
                    res.render('remind',{
                        login_errors:['Invalid email']
                    });
                }
            }).catch(err => {
            if (err) throw err;
        });
    }
    else{
        let allErrors = validation_result.errors.map((error) => {
            return error.msg;
        });
        res.render('remind',{
            login_errors:allErrors
        });
    }
});

app.use('/', (req,res) => {
    res.status(404).send('<h1>404 Page Not Found!</h1>');
});

app.listen(8080, () => console.log("Server is Running..."));
