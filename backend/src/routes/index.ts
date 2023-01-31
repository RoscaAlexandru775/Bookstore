import express from 'express'
import usersRoutes from '../routes/api/user.routes'
import bookRoutes from '../routes/api/book.routes'
import cartRoutes from '../routes/api/cart.routes'
const routes = express.Router()

routes.use('/user', usersRoutes)
routes.use('/book', bookRoutes)
routes.use('/cart', cartRoutes)

export default routes