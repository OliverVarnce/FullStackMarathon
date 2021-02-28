const mysql = require("mysql");
const readConfig = require('read-config');
const config = readConfig('./config.json');

const connection = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

connection.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
        if (values.hasOwnProperty(key)) {
            return this.escape(values[key]);
        }
        return txt;
    }.bind(this));
};


connection.connect(err => {
    if (err) throw error;
    console.log("all good");
});

module.exports = connection;