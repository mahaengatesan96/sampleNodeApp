const jwt = require('jsonwebtoken')
const secretKey = "Hanish"

const generateToken = function(user) {
    const token = jwt.sign({user}, secretKey, {expiresIn: 30 })
    console.log("Token is:", token)
    return token
}

const verifyToken = function(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretKey, (err, res) => {
            if(err) {
                console.log("Error occured while verifying token: ", err)
                reject(err)
            }
            else{
                console.log("Verified :", res)
                resolve(res)
            }
        })
    })
    
}

module.exports = {generateToken, verifyToken}