import Router from 'express'
import RatingController from "../Controllers/RatingController.js"
import AuthWare from "../Middlewares/AuthWare.js"
import RoleWare from "../Middlewares/RoleWare.js"

const ratingrouter = new Router()

ratingrouter.post('/ratings', RoleWare(['ADMIN', 'MODER']), RatingController.create)
ratingrouter.put('/ratings', RoleWare(['ADMIN']), RatingController.update)
ratingrouter.delete('/ratings/:id', RoleWare(['ADMIN']), RatingController.delete)

ratingrouter.get('/ratings', RatingController.getAll)
ratingrouter.get('/ratings/list', RatingController.listRatings)
ratingrouter.get('/ratings/test', RatingController.test)
ratingrouter.get('/ratings/:id', RatingController.getOne)

export default ratingrouter
