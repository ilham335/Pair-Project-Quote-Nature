const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.quote)

module.exports = router