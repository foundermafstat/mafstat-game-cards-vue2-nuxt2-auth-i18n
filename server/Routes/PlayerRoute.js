import Router from 'express'
import PlayerController from "../Controllers/PlayerController.js"

const playerrouter = new Router()

playerrouter.post('/players', PlayerController.create)
playerrouter.get('/players', PlayerController.getAll)
playerrouter.get('/players/all', PlayerController.playersAll)
playerrouter.get('/players/list', PlayerController.listAll)
playerrouter.get('/players/profile/:id', PlayerController.profile)
playerrouter.get('/players/:id', PlayerController.getOne)
playerrouter.put('/players', PlayerController.update)
playerrouter.delete('/players/:id', PlayerController.delete)

export default playerrouter
