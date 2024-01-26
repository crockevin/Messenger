const router = require('express').Router()
const path = require('path')

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end().json({ message: "lodded out "})
        })
    }
    else {
        res.status(404).end()
    }
})


module.exports = router