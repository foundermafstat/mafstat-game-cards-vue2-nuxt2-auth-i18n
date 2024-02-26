import jwt from 'jsonwebtoken'

export default function(roles) {
  return function (req, res, next) {
    if (req.method === "OPTIONS") {
      next()
    }

    try {
      console.log(req.headers.authorization)

      const token = req.headers.authorization.split(' ')[1]

      if (!token) {
        return res.status(403).json({ message: "Пользователь не авторизован" })
      }

      const {roles: userRoles} = jwt.verify(token, process.env.TOKEN_SECRET)

      let hasRole = false

      console.log(`1: ${userRoles}`)
      console.log(`2: ${roles}`)

      let arr = []

      let push = arr.push(userRoles)

      arr.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true
        }
      })

      if (!hasRole) {
        return res.status(403).json({ message: "У вас нет доступа" })
      }

      next()

    } catch (e) {
      console.log(e)

      return res.status(403).json({ message: "Пользователь не авторизован" })
    }
  }
}
