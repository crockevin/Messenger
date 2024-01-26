const router = require('express').Router()
const { User } = require('../../models/')

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Username and Email are required' })
        }
        const newUser = await User.create({ email, password })
        req.session.save(() => {
            req.session.user_id = newUser._id
            req.session.logged_in = true
        })
        res.status(201).json({ message: 'User created', user: newUser._id })
    } catch (error) {
        res.status(500).json({ message: `error ${error.message}` })
    }
})


module.exports = router
