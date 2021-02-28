const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const bcrypt = require('bcryptjs');
const dbConnection = require('./db');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.urlencoded({extended:false}));

app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs');

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

app.get('/', ifNotLoggedin, (req,res,next) => {
    dbConnection.execute("SELECT `full_name` FROM `users` WHERE `id`=?",[req.session.userID])
        .then(([rows]) => {
            res.render('home',{
                full_name:rows[0].full_name
            });
        });

});

app.post('/register', ifLoggedin,
    [
        body('user_email','Invalid email address!').isEmail().custom((value) => {
            return dbConnection.execute('SELECT email FROM users WHERE email=?', [value])
                .then(([rows]) => {
                    if(rows.length > 0){
                        return Promise.reject('This E-mail already in use!');
                    }
                    return true;
                });
        }),
        body('confirm_user_pass','Invalid confirm password!').custom((value, {req}) => {
            return value == req.body.user_pass;
        }),
        body('login','Invalid login!').custom((value) => {
            return dbConnection.execute('SELECT login FROM users WHERE login=?', [value])
                .then(([rows]) => {
                    if(rows.length > 0){
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
                dbConnection.execute("INSERT INTO users(full_name, login, email, password) VALUES(?,?,?,?)",[user_name, login, user_email, hash_pass])
                    .then(result => {
                        res.send(`your account has been created successfully, Now you can <a href="/">Login</a>`);
                    }).catch(err => {
                    if (err) throw err;
                });
            })
                .catch(err => {
                    if (err) throw err;
                })
        }
        else{
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

app.listen(3000, () => console.log("Server is Running..."));