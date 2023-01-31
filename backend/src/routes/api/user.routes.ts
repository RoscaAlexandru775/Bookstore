import { Router } from 'express'
import * as controllers from '../../controllers/user.controller'

const routes = Router()

routes.route('/register').post(controllers.register)
routes.route('/login').post(controllers.login)

export default routes