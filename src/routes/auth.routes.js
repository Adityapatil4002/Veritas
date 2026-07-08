const {Router} = require("express")
const authController = require("../Controller/auth.controller")
const authRouter = Router()
const authMiddleWare = require("../Middlewares/auth.middleware")

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

/**
 * @route GET/api/auth/get-me
 * @description get the current logged in user details
 * @access private
 */

authRouter.get("/get-me", authMiddleWare.authUser, authController.getMeController)


module.exports = authRouter
