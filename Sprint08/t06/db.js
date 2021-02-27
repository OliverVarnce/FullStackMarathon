const mysql = require("mysql");
const readConfig = require('read-config');
const config = readConfig('./config.json');

const connection = mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
});


connection.connect(err => {
    if (err) throw error;
    console.log("all good");
});

module.exports = connection;