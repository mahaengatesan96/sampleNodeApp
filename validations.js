const { body } = require('express-validator');

const sampleValidator1 = body('username').isEmail()
.withMessage("Enter a valid email")

const sampleValdiator2 = body('password').isString()
.withMessage("Enter a valid string")


module.exports.sampleRules = [sampleValdiator2, sampleValidator1]
