const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("satsang_book", "root", "Root@123", {
    host: 'localhost',
    dialect: 'mysql'
})

const connection = async () => {

    await sequelize.authenticate().then(() => {
        // console.log("Database connected successfully")
    }).catch((e) => {
        console.log(e)
    })
}

module.exports = { connection, sequelize };
