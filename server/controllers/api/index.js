const router = require('express').Router()
const userRoutes = require('./usersRoutes')
const signupRoutes = require('./signupRoutes')


router.use('/users', userRoutes)
router.use('/signup', signupRoutes)


module.exports = router