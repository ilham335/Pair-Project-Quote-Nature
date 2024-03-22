const router = require('express').Router()
const Controller = require('../controllers/controller')
// const authorRoute = require('./authorRoute')
// const quoteRoute = require('./quoteRoute')
// const userRoute = require('./userRoute')

router.get('/', (req, res) => {
  res.redirect('/landingPage')
})

router.get('/landingPage', Controller.landingPage)
router.get('/regist', Controller.regist)
router.post('/regist', Controller.handlerRegist)
router.get('/login', Controller.login)
router.post('/login', Controller.handlerLogin)

// router.use((req, res, next) => {
//   console.log(req.session)
//   if (!req.session.userId) {
//     const msg = "Please login first!"
//     res.redirect(`/login?error=${msg}`)
//   }

//   next()
// })

router.get('/logout', Controller.getLogout)

router.get('/users/:userId', Controller.main)


router.get('/users/:userId/loginAuthor', Controller.loginAuthor)
router.post('/users/:userId/loginAuthor', Controller.handlerLoginAuthor)

router.get('/users/:userId/registAuthor', Controller.registAuthor)
router.post('/users/:userId/registAuthor', Controller.handlerRegistAuthor)

// router.use((req, res, next) => {
//   // console.log(req.session)
//   if (!req.session.authorId) {
//     const msg = "Please login first!"
//     res.redirect(`/users/1/loginAuthor/?error=${msg}`)
//   }

//   next()
// })

// router.use((req, res, next) => {
//   console.log(req.session)
//   if (!req.session.isAuthor) {
//     const msg = "Register as an author first"
//     res.redirect(`/users/1/registAuthor/?error=${msg}`)
//   }

//   next()
// })

router.get('/authors/:authorId', Controller.authorDetail)
router.get('/authors/:authorId/rewards', Controller.authorRewards)
router.get('/authors/:authorId/addQuote', Controller.addQuote)
router.post('/authors/:authorId/addQuote', Controller.handlerAddQoute)

router.get('/authors/:authorId/:quoteId/delete', Controller.deleteQuote)
router.get('/authors/:authorId/:quoteId/edit', Controller.editQuote)
router.post('/authors/:authorId/:quoteId/edit', Controller.handlerEditQuote)

// router.use('/authors', authorRoute)
// router.use('/quotes', quoteRoute)
// router.use('/users', userRoute)

module.exports = router