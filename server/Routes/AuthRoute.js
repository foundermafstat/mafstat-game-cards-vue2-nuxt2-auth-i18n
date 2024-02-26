import Router from 'express'
import AuthController from "../Controllers/AuthController.js"
import {check} from 'express-validator'
import AuthWare from "../Middlewares/AuthWare.js"
import RoleWare from "../Middlewares/RoleWare.js"

const authrouter = new Router()

authrouter.post('/auth/login', AuthController.login)

authrouter.post('/auth/register', [
  check('nickname', "Никнейм не может быть пустым").notEmpty(),
  check('password', "Пароль должен иметь более 8 символов").isLength({min:8})
], AuthController.register)
authrouter.get('/auth/user', AuthController.user)
authrouter.delete('/auth/logout', AuthController.logout)
authrouter.get('/auth/users', RoleWare(['USER']), AuthController.getUsers)


export default authrouter
