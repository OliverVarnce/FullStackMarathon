const Sequelize = require('sequelize');
const sequelize = require('../db');
const Model = require('../model');

const user = sequelize.define('users', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.INTEGER
    },
    login: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        isEmail: true,
        allowNull: false
    }
}, {
    timestamps: false
});


module.exports = class User extends Model {
    async createUser(login, hash_pass, full_name, email) {
        try {
            return await user.create({
                login: login,
                password: hash_pass,
                full_name: full_name,
                email: email,
            })
        }
        catch (e) {
            console.log(e)
            return null
        }
    }

    async getUserByEmail(email) {
        try {
            return await user.findOne({where: {email: [email]}})
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async getUserByLogin(login) {
        try {
            return await user.findOne({where: {login: [login]}})
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async getUserById(id) {
        try {
            return await user.findOne({where: {id: [id]}})
        } catch (e) {
            console.log(e)
            return null
        }
    }

    async updatePass(email, password) {
        try {
            return await user.update({password: password}, {where: {email: email}})
        } catch (e) {
            console.log(e)
            return null
        }
    }
}