const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require("../database/dbConnection")

const Admin = sequelize.define(
    'admin',
    {
        adminEmail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        adminPassword: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

module.exports = Admin;