const {Router} = require("express")
const authController = require("../Controller/auth.controller")
const authRouter = Router()

/** 
 * @route POST/api/auth/register
 * @description register anew user
 * @access public
*/

authRouter.post("/register", authController.registerUserController)

/**
 * @route POST/api/auth/login
 * @description login user with email and password
 * @access public
 */

authRouter.post("/login", authController.loginUserController)

module.exports = authRouter