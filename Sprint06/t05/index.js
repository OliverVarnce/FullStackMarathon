const express = require('express');
const app = express();

const normal = require('./normal-router')
const quantum = require('./quantum-router')

const PORT = 8080;

const time = normal.calculateTime();
const quantumTime = quantum.calculateTime();

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}...`);
});

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req, res, next) => {
    res.render("index");
});

app.get("/normal", (req, res, next) => {
    res.render("normal",
        {
            year: time.years(),
            month: time.months(),
            day: time.days()
        });
});

app.get("/quantum", (req, res, next) => {
    res.render("quantum",
        {
            quantumYear : quantumTime[0],
            quantumMonth : quantumTime[1],
            quantumDay: quantumTime[2]
        });
});
