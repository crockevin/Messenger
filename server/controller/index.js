const router = require('express').Router()
const uploads = require('./uploads')

router.use('/uploads', uploads)

module.exports = router
