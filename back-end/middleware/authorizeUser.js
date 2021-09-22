const jwt = require("jsonwebtoken")
const SECRET = "This is the secret which will be changed in .env file..."

const userAuth = async(req,res,next)=> {
    const token = req.header("auth-token")
    if(!token) {
        res.status(401).send("Access Denied")
    }

    try {
        const decryptedData = jwt.verify(token, SECRET);
        req.userData = decryptedData.userData
        next()
    } catch (error) {
        res.status(400).send("Bad request")
    }
}

module.exports = userAuth