const router = require('express').Router()

const workRoutes = require('./workouts')
const api = require('./api/')

router.use('/', workRoutes)
router.use('/api', api)

module.exports = router