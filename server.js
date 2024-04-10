const http = require('http')
const app = require("./index")

const server = http.createServer(app)

server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server is listening on ${process.env.SERVER_PORT}`)
})