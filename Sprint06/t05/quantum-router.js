'use strict'

module.exports.calculateTime = function calculateTime() {
    let result = [];
    let date = new Date(1939, 0, 1);
    let now = new Date();
    let difference = (Math.abs(date) + Number(now)) / 7;
    let quantumDate = new Date(Number(date) + Number(difference));
    result.push(quantumDate.getYear() - date.getYear());
    result.push(quantumDate.getMonth() - date.getMonth());
    result.push(quantumDate.getDate() - date.getDate());
    return result;
}

