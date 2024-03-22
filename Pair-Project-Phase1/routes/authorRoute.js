const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.author)
router.get('/add', Controller.addAuthor)
router.post('/add', Controller.handlerAddAuthor)
router.get('/detail/:authorId', Controller.authorDetail)

module.exports = router