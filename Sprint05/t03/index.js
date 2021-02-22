'use strict'

const firstUp = (str) => {
    if (str) {
        str = str.toUpperCase().trim();
        return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();

    } else {
        return str = " ";
    }
}

module.exports.firstUpper = firstUp;