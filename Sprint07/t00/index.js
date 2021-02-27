const express = require('express'),
    app = express(),
    bodyParser = require("body-parser"),
    moment = require('moment'),
    cookieSession = require('cookie-session');

const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());
let engines = require('consolidate');

app.set('views', __dirname + '/');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

let upSession = moment(new Date()).add(1, 'm').toDate();

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2'],
    maxAge: 60 * 1000
}))

app.get('/', urlencodedParser, (req, res) => {
    if (Number(upSession) <= Number(new Date())) {
        req.session.views = 0;
        upSession = moment(new Date()).add(1, 'm').toDate();
    }
    req.session.views = (req.session.views || 0) + 1


    res.render("index",
        {
            answer: req.session.views
        });
})

app.get('/', urlencodedParser, (req, res) => {

    res.render("index",
        {
            answer: ' '
        });
})


app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port 8080...');
})