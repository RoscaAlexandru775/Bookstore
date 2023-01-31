import { Router } from 'express'
import checkAuthorisation from '../../middleware/checkAuthorisations'
import * as controllers from '../../controllers/cart.controller'
const routes = Router()


routes.route('/add-to-cart').post(checkAuthorisation, controllers.addToCart)
routes.route('/remove-from-cart').post(checkAuthorisation, controllers.removeFromCart)
routes.route('/get-user-cart').post(checkAuthorisation, controllers.getUserCart)

export default routes