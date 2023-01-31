import { Router } from 'express'
import * as controllers from '../../controllers/book.controller'
import checkAuthorisation from '../../middleware/checkAuthorisations'
const routes = Router()

routes.route('/get-newest-books').get( controllers.getNewestBooks)
routes.route('/get-top-rated-books').get( controllers.getTopRatedBooks)
routes.route('/get-filtered-books').get(checkAuthorisation, controllers.getFilteredBooks)
routes.route('/search-books').get(checkAuthorisation, controllers.searchBooks)


export default routes