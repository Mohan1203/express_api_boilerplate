const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require("../database/dbConnection")
const { User } = require("../models/userModel")

const Request = sequelize.define(
    'request',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        requestStatus: {
            type: DataTypes.INTEGER,
            defaultValue: 1
            // 0 = Rejected
            // 1 = Pending
            // 2 = Accepted
        },
        requestToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    }
)
Request.belongsTo(User, { foreignKey: 'userId' });

module.exports = Request