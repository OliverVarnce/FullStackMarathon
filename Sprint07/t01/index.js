const express = require('express'),
    app = express(),
    bodyParser = require("body-parser");

const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());
let engines = require('consolidate');

app.set('views', __dirname + '/');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.post("/", urlencodedParser, function (req, res) {
    let counter = 0;
    Object.entries(req.body).forEach(([key, value]) => {
        if (value === "on" && key) {
            counter++;
        }
    });
    let purpose;
    switch (req.body.publicity) {
        case "unknown":
            purpose = 0;
            break;
        case "like-a-ghost":
            purpose = 1;
            break;
        case "i-am-in-comics":
            purpose = 2;
            break;
        case "i-have-fun-club":
            purpose = 3;
            break;
        case "superstar":
            purpose = 4;
            break;
    }

    res.render("success", {
        name: req.body.name,
        alias: req.body.alias,
        age: req.body.age,
        about: req.body.about,
        photo: req.body.photo,
        counter: counter,
        levelOfControl: req.body.levelOfControl,
        purpose: purpose,
    });
    console.log(req.body);
});

app.get("/", (req, res) => {
    res.render("index");
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port 8080...');
})