import Player from '../Models/PlayerModel.js'
import Role from '../Models/RoleModel.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { validationResult } from 'express-validator'

const generateAccessToken = (id, nickname, email, club_id, club_name, roles) => {
  const payload = {
    id,
    nickname,
    email,
    club_id,
    club_name,
    roles
  }

  return jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "48h"})
}

class AuthController {

  async register(req, res) {

    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(400).json({message: "Ошибка при регистрации", errors})
      }

      console.log("Auth Controller register")
      console.log(req.body)

      const email = req.body.email.toLowerCase()
      const {nickname, club, password, repassword} = req.body


      const unicNick = await Player.findOne({nickname})

      if (unicNick) {
        return res.status(400).json({message: 'Никнейм уже зарегистрирован'})
      }

      const candidate = await Player.findOne({email})

      if (candidate) {
        return res.status(400).json({message: 'Email уже зарегистрирован'})
      }

      if (password != repassword) {
        return res.status(400).json({message: 'Пароли не совпадают'})
      }

      const hashPassword = bcrypt.hashSync(password, 7)

      const userRole = await Role.findOne({value: "USER"})

      console.log(`Email: ${email}, Password: ${hashPassword}`)

      const player = new Player({nickname:nickname, club:club, email: email, password: hashPassword, roles: [userRole.value]})

      await player.save()

      return res.status(200).json({message: 'Вы успешно зарегистрированы'})

    } catch (e) {
      console.log(e)

      res.status(400).json(e)
    }

  }

  async login(req, res) {
    try {
      console.log("Auth Controller login")
      console.log(req.body)

      const email = req.body.email.toLowerCase()
      const password = req.body.password

      const player = await Player.findOne({email})

      if (!player) {
        return res.status(400).json({message: `Email ${email} не найден`})
      }

      const validPass = bcrypt.compareSync(password, player.password)

      if (!validPass) {
        return res.status(400).json({message: `Введен неверный пароль`})
      }

      const status = player.roles[0]

      const token = generateAccessToken(player._id, player.nickname, player.email, player.club.id, player.club.name, status)

      return res.json({token, message: player.nickname})

    } catch (e) {
      console.log(e)

      return res.status(400).json(e)
    }
  }

  async user(req, res) {
    const token = jwt.decode(req.headers.authorization.split(" ")[1])

    console.log(token)
    res.json({token})
  }

  async logout(req, res) {
    res.status(200).json({ message: "Вы успешно разлогинились" });
  }

  async getUsers(req, res) {
    try {

      res.json('work')
    } catch (e) {
      console.log(e)

      res.status(400).json(e)
    }
  }

}

export default new AuthController()
