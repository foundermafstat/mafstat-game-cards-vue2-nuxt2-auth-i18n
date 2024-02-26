import Router from 'express'
import GameController from "../Controllers/GameController.js"
import AuthWare from "../Middlewares/AuthWare.js"
import RoleWare from "../Middlewares/RoleWare.js"

const gamerouter = new Router()

gamerouter.post('/games/game', GameController.game)
gamerouter.get('/game', GameController.game)
gamerouter.get('/games', GameController.getAll)
gamerouter.get('/games/list', GameController.listAll)
gamerouter.get('/games/all', GameController.listGames)
gamerouter.get('/games/:id', GameController.getOne)

gamerouter.post('/games', RoleWare(['ADMIN', 'MODER']), GameController.create)
gamerouter.put('/games', RoleWare(['ADMIN']), GameController.update)
gamerouter.delete('/games/:id', RoleWare(['ADMIN']), GameController.delete)

export default gamerouter
