const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const bcrypt = require("bcrypt");
let engines = require("consolidate");

let passwordToSave;

app.set('views', __dirname + '/');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.get("/", urlencodedParser, function (req, res) {
    res.render("index");
});

app.post("/", urlencodedParser, (req,
                                 res) => {
    if(!req.body) {
        return res.sendStatus(400);
    }

    let passwordFromUser = req.body.savePassword;
    let salt = bcrypt.genSaltSync(Number(req.body.salt));

    passwordToSave = bcrypt.hashSync(passwordFromUser, salt);

    res.render("success", {
        hashPassword: passwordToSave
    });

});

app.post("/check", urlencodedParser, (req,
                                      res) => {
    if(!req.body) {
        return res.sendStatus(400);
    }
    let passwordFromUser = req.body.passwordToCheck;

    if (bcrypt.compareSync(passwordFromUser, passwordToSave)) {
        res.render("index", {
            answer: "Hacked!"
        });
    }
    else {
        res.render("index", {
            answer: "Access denied!",
            hashPassword: passwordToSave
        });
    }
});

app.listen(process.env.PORT || 8080, () => {
    console.log('Server listening on port 8080...');
})