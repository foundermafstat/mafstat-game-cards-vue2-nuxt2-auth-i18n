import jwt from 'jsonwebtoken'

class AuthWare {
  async check(req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      console.log(req.headers.authorization)

      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" })
      }

      const decodedData = jwt.verify(token, process.env.TOKEN_SECRET)

      req.user = decodedData

      next()

    } catch (e) {
      console.log(e)

      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
  }
}

export default new AuthWare()
