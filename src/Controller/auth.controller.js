const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model")

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

    const token = jwt.sign(
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

/**
 * @name loginUserController
 * @description login a use, expects email and password in the request body
 * @access public
 */

async function loginUserController(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    
    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d"}
    )

    res.cookie("token", token)
    res.status(200).json ({
        message: "user logged in successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
    })

}

/**
 * @name logoutUserController
 * @description clar token from user cookie and add the token in blacklist 
 * @access public
 */
async function logoutUserController(req, res) {
    const token = req.cookies.token

    if (token) {
        await tokenBlackListModel.create({token})
    }

    res.clearCookie("token")

    res.status(200).json ({
        message: "User logged out successfully"
    })
}

/**
 * @name getMeController
 * @description get the current logged in user details
 * @access private
 */
async function getMeController(req, res) {
    const user = await userModel.findById(req.res.id)
    res.status(200).json({
        message: "user details fetched successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}