const userModel = require("../models/user.model")


/** 
 * @name registerUserController
 * @description register anew user, exprects username , email ans password in the request
 * @access public
*/
async function registerUserController(req, res) {
    const { username, email, password } = req.body
    
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please provide username, email and passowrd"
        })
    }

    const isUserAlreadyExits = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if (isUserAlreadyExits) {
        return res.status(400).json({
            message: "Account is already exists with this email address or username"
        })
    }
}

module.exports = {
    registerUserController
}