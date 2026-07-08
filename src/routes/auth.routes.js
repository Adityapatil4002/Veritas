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

/**
 * @route Get/api/auth/logout
 * @description clear token from user cookie and add the token into the blacklist
 * @access public
 */

authRouter.get("/logout", authController.logoutUserController)



module.exports = authRouter
