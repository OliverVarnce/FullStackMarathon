const mysql = require('mysql2');
const dbConnection = mysql.createPool({
    host     : 'localhost', // MYSQL HOST NAME
    user     : 'ovoitenko', // MYSQL USERNAME
    password : 'securepass', // MYSQL PASSWORD
    database : 'sprint09' // MYSQL DB NAME
}).promise();
module.exports = dbConnection;