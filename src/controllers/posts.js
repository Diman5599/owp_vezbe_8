const postsSvc = require('../services/posts.js')

const getAllKdPosts = (req, res) => {
    postsSvc.getKdPosts(req.query.term).then(
        (posts) => { 
            res.render('pages/kadeti', {loggedInUser: req.user, myTitle: "ВА | Кадети", myPosts: posts, term: req.query.term})
        }
    )
}

const getAllStPosts = (req, res) => {
    postsSvc.getStPosts(req.query.term).then(
        (posts) => { 
            res.render('pages/staresine', {loggedInUser: req.user, myTitle: "ВА | Старешине", myPosts: posts, term: req.query.term})
        }
    )
}

const showAddKdPost = (req, res) => {
    res.render('pages/posts/new-kd-post')
}

const showAddStPost = (req, res) => {
    res.render('pages/posts/new-st-post')
}

const addKdPost = (req, res) => {
    const mPost = {
        content: req.body.content,
        title: req.body.title,
        user: req.user
    }
    postsSvc.insertPost(mPost).then((post) => {res.redirect('/kadeti')}).catch((err) => {
        res.status(500)
        res.render('pages/errors/error', {status: 500, errors: [err]})
    })
}

const addStPost = (req, res) => {
    const mPost = {
        content: req.body.content,
        title: req.body.title,
        user: req.user
    }
    postsSvc.insertPost(mPost).then((post) => {res.redirect('/staresine')}).catch((err) => {
        res.status(500)
        res.render('pages/errors/error', {status: 500, errors: [err]})
    })
}

const delKdPost = (req, res) => {
    postsSvc.deletePost(req.body.postID).then((post) => {res.redirect('/kadeti')}).catch((err) => {
        res.status(500)
        res.render('pages/errors/error', {status: 500, errors: [err]})
    })
}

const delStPost = (req, res) => {
    postsSvc.deletePost(req.body.postID).then((post) => {res.redirect('/staresine')}).catch((err) => {
        res.status(500)
        res.render('pages/errors/error', {status: 500, errors: [err]})
    })
}

const apiGetAllKdPosts = (req, res) => {
    postsSvc.getKdPosts(req.query.term).then(
        (posts) => { 
            res.status = 200
            res.json(posts)
        }
    )
}

module.exports = {
    apiGetAllKdPosts: apiGetAllKdPosts,
    getAllKdPosts: getAllKdPosts,
    getAllStPosts: getAllStPosts,
    showAddKdPost: showAddKdPost,
    showAddStPost, showAddStPost,
    addKdPost: addKdPost,
    addStPost: addStPost,
    delKdPost: delKdPost,
    delStPost: delStPost
}