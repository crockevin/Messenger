const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/mern-test')

module.exports = mongoose.connection
