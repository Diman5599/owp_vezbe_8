const express = require('express')
const postsCtrl = require('../../controllers/posts.js')
const { authApiRoute } = require('../../middleware/auth.js')

const router = new express.Router()

router.get('/kadeti', authApiRoute, postsCtrl.apiGetAllKdPosts)

module.exports = {
    router: router
}