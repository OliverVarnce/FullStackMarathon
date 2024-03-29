const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// создаем парсер для данных application/x-www-form-urlencoded
const urlencodedParser = bodyParser.urlencoded({extended: false});

let engines = require('consolidate');

app.set('views', __dirname + '/');
app.engine('html', engines.mustache);
app.set('view engine', 'html');


app.get("/", urlencodedParser, function (req, res) {
    //res.sendFile(__dirname + "/index.html");
    res.render("index",
        {
            answer: ' '
        });
});
app.post("/", urlencodedParser, (req, res) => {
    if(!req.body) return res.sendStatus(400);

    if (req.body["1"] === '3') {
        res.render("index.html", { answer: 'U are true!' })
    } else {
        res.render("index.html", { answer: 'Shame on you! Go and watch Avengers!' })
    }
});



app.listen(process.env.PORT || 8080, () => {
     console.log('Server listening on port 8080...');
 })

