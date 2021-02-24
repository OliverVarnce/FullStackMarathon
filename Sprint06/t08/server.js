const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());

let engines = require('consolidate');

app.set('views', __dirname + '/');
app.engine('html', engines.mustache);
app.set('view engine', 'html');


app.get("/", urlencodedParser, function (req, res) {
    res.render("index",
        {
            answer: ' '
        });
});
app.post("/", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);
        res.render("index.html", {
            method: req.method,
            name: req.body.Name,
            email: req.body.email,
            age: req.body.age,
            about: req.body.about,
            photo: req.body.photo
        })

        console.log(req.body)
});



app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port 8080...');
})
