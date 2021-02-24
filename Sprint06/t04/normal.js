'use strict'

module.exports.calculateTime = function calculateTime() {
    let date = new Date(1939, 0, 1);
    return date
}

let dateNow = new Date ();

Date.prototype.years = function() {
    return (dateNow.getFullYear() - this.getFullYear());
}

Date.prototype.months = function() {
    return -(this.getMonth() - dateNow.getMonth());
}

Date.prototype.days = function() {
    return -(this.getDate() - dateNow.getDate());
}

