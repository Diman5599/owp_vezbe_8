const express = require('express')

const router = new express.Router()

router.get('/', (req, res) => {
    res.render('pages/index', {loggedInUser: req.user})
})

module.exports = {
    router: router
}