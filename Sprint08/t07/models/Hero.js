'use strict'

let db = require('./db')
const Model = require('./Model')

class Hero extends Model {
    constructor () {
        super();
        let id = this.id;
    }

}

module.exports = Model;