const { Sequelize, DataTypes } = require("sequelize")
const { sequelize } = require("../database/dbConnection")


// Put this model into same file because loading problems of models when both are in separate file important for

// User model
const User = sequelize.define(
    'registereduser',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        isAuthenticated: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }

    }
)


// JWT tokens model
const JwtTokens = sequelize.define(
    "Jwttokens",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        jwtToken: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)

User.hasMany(JwtTokens, { foreignKey: 'userId' })
JwtTokens.belongsTo(User, { foreignKey: 'userId' })

module.exports = { User, JwtTokens };
