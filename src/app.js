const bodyParser = require('body-parser')
const dbMiddleware = require('./middleware/db')
const express = require('express')

const homeController = require('./controllers/home')
const usersController = require('./controllers/users')
const accountsController = require('./controllers/accounts')

const router = express.Router()
router.get('/users', usersController.index)
router.get('/users/:id', usersController.show)
router.post('/users', usersController.create)
router.patch('/users/:id', usersController.update)
router.delete('/users/:id', usersController.destroy)
router.get('/users/:userId/accounts', accountsController.index)
router.get('/users/:userId/accounts/:id', accountsController.show)
router.post('/users/:userId/accounts', accountsController.create)
router.patch('/users/:userId/accounts/:id', accountsController.update)
router.delete('/users/:userId/accounts/:id', accountsController.destroy)
router.get('/', homeController.root)

const app = express()
app.use(dbMiddleware)
app.use(bodyParser.json())
app.use(router)
app.listen(3000)
console.log('Server listening on port 3000')