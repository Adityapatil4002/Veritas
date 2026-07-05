const {Router} = require("express")
const authController = require("../Controller/auth.controller")
const authRouter = Router()

/** 
 * @route POST/api/auth/register
 * @description register anew user
 * @access public
*/

authRouter.post("register", authController.registerUserController)

module.exports = authRouter