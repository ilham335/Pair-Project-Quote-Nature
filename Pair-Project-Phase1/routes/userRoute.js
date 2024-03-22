const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/main', Controller.main)
router.get('/:userId/registAuthor', Controller.registAuthor)
router.post('/:userId/registAuthor', Controller.handlerRegistAuthor)

module.exports = router