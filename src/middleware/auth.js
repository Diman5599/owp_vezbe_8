const usersSvc = require('../services/users.js')

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) next()
    else {
        res.status(401)
        res.render('pages/errors/error', {status: 401, errors: ["Нисте пријављени"]})
    }
}

const checkKdRole = (req, res, next) => {
    usersSvc.checkUserRole(req.user).then((role) => {
        if (role.roleName === "KdAdmin" || role.roleName === "Kadet") {
            next()
        } else {
            res.status(401)
            res.render('pages/errors/error', {status: 401, errors: [
                "Нисте пријављени са одговарајућом привилегијом",
                `Ви сте: ${role.roleName} - потребно Kadet или KdAdmin`]})
        }
    })
}

const checkStRole = (req, res, next) => {
    usersSvc.checkUserRole(req.user).then((role) => {
        if (role.roleName === "StAdmin" || role.roleName === "Staresina") {
            next()
        } else {
            res.status(401)
            res.render('pages/errors/error', {status: 401, errors: [
                "Нисте пријављени са одговарајућом привилегијом",
                `Ви сте: ${role.roleName} - потребно Staresina или StAdmin`]})
        }
    })
}

const checkKdAdRole = (req, res, next) => {
    usersSvc.checkUserRole(req.user).then((role) => {
        if (role.roleName === "KdAdmin") {
            next()
        } else {
            res.status(401)
            res.render('pages/errors/error', {status: 401, errors: [
                "Нисте пријављени са одговарајућом привилегијом",
                `Ви сте: ${role.roleName} - потребно KdAdmin`]})
        }
    })
}

const checkStAdRole = (req, res, next) => {
    usersSvc.checkUserRole(req.user).then((role) => {
        if (role.roleName === "StAdmin") {
            next()
        } else {
            res.status(401)
            res.render('pages/errors/error', {status: 401, errors: [
                "Нисте пријављени са одговарајућом привилегијом",
                `Ви сте: ${role.roleName} - потребно StAdmin`]})
        }
    })
}

module.exports = {
    checkAuthenticated: checkAuthenticated,
    checkKdRole: checkKdRole,
    checkStRole: checkStRole,
    checkKdAdRole: checkKdAdRole,
    checkStAdRole: checkStAdRole
}