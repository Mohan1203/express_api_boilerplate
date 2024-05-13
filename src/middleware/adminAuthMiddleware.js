const jwt = require("jsonwebtoken")

const adminAuth = async (req, res, next) => {

    try {
        const token = req.cookies.token;
        if (!token) {
            return res.redirect("/login")
        }

        const admin = await jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(admin)
        if (!admin) {
            return res.redirect("/login")
        }
        req.admin = admin.id;
        console.log(req.path.split("/")[0])
        next()
    } catch (error) {
        console.log('hello')
        // res.clearCookie("token");
        return res.redirect("/login")
    }

}

module.exports = adminAuth