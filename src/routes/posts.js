const express = require('express')
const postsCtrl = require('../controllers/posts.js')

const {checkAuthenticated, checkKdRole, checkStRole, checkKdAdRole, checkStAdRole} = require('../middleware/auth.js')

const router = new express.Router()

router.get('/kadeti', [checkAuthenticated, checkKdRole], postsCtrl.getAllKdPosts)

router.get('/staresine', [checkAuthenticated, checkStRole], postsCtrl.getAllStPosts)

router.get('/add-st-post', [checkAuthenticated, checkStAdRole], postsCtrl.showAddStPost)
router.get('/add-kd-post', [checkAuthenticated, checkKdAdRole], postsCtrl.showAddKdPost)

router.post('/add-kd-post', [checkAuthenticated, checkKdAdRole], postsCtrl.addKdPost)
router.post('/add-st-post', [checkAuthenticated, checkStAdRole], postsCtrl.addStPost)

router.post('/kadeti/delete-post', [checkAuthenticated, checkKdAdRole], postsCtrl.delKdPost)
router.post('/staresine/delete-post', [checkAuthenticated, checkStAdRole], postsCtrl.delStPost)

module.exports = {
    router: router
}