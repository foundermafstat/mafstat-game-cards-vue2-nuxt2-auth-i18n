import Router from 'express'
import ClubController from "../Controllers/ClubController.js"
import AuthWare from "../Middlewares/AuthWare.js"
import RoleWare from "../Middlewares/RoleWare.js"

const clubrouter = new Router()

clubrouter.post('/clubs', RoleWare(['ADMIN']), ClubController.create)
clubrouter.put('/clubs', RoleWare(['ADMIN']), ClubController.update)
clubrouter.delete('/clubs/:id', RoleWare(['ADMIN']), ClubController.delete)

clubrouter.get('/clubs', ClubController.getAll)
clubrouter.get('/clubs/list', ClubController.listAll)
clubrouter.get('/clubs/:id', ClubController.getOne)

export default clubrouter
