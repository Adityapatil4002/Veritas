const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


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

    const hash = await bcrypt.hash(password, 10)

    const user = await userModel.create({
        username,
        email,
        password: hash
    })

    const token = user.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    res.cookie("token", token)
    res.status(201).json({
        message: "user registeres successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController
}