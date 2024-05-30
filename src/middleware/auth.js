const { JsonWebTokenError } = require('jsonwebtoken')
const usersSvc = require('../services/users.js')

const jwt = require('jsonwebtoken')
const { json } = require('express')

const checkAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) next()
    else {
        res.status(401)
        res.render('pages/errors/error', { status: 401, errors: ["Нисте пријављени"] })
    }
}

const checkKdRole = (req, res, next) => {
    usersSvc.checkUserRole(req.user).then((role) => {
        if (role.roleName === "KdAdmin" || role.roleName === "Kadet") {
            next()
        } else {
            res.status(401)
            res.render('pages/errors/error', {
                status: 401, errors: [
                    "Нисте пријављени са одговарајућом привилегијом",
                    `Ви сте: ${role.roleName} - потребно Kadet или KdAdmin`]
            })
        }
    })
}

const checkStRole = (req, res, next) => {
    usersSvc.checkUserRole(req.user).then((role) => {
        if (role.roleName === "StAdmin" || role.roleName === "Staresina") {
            next()
        } else {
            res.status(401)
            res.render('pages/errors/error', {
                status: 401, errors: [
                    "Нисте пријављени са одговарајућом привилегијом",
                    `Ви сте: ${role.roleName} - потребно Staresina или StAdmin`]
            })
        }
    })
}

const checkKdAdRole = (req, res, next) => {
    usersSvc.checkUserRole(req.user).then((role) => {
        if (role.roleName === "KdAdmin") {
            next()
        } else {
            res.status(401)
            res.render('pages/errors/error', {
                status: 401, errors: [
                    "Нисте пријављени са одговарајућом привилегијом",
                    `Ви сте: ${role.roleName} - потребно KdAdmin`]
            })
        }
    })
}

const checkStAdRole = (req, res, next) => {
    usersSvc.checkUserRole(req.user).then((role) => {
        if (role.roleName === "StAdmin") {
            next()
        } else {
            res.status(401)
            res.render('pages/errors/error', {
                status: 401, errors: [
                    "Нисте пријављени са одговарајућом привилегијом",
                    `Ви сте: ${role.roleName} - потребно StAdmin`]
            })
        }
    })
}

const authApiRoute = (req, res, next) => {
    const requestJWT = req.header('Authorization')

    if (!requestJWT) {
        res.status(401)
        res.send({
            message: "Nevazeci token"
        })
        return
    }

    let decodedToken
    try {
        decodedToken = jwt.decode(requestJWT, process.env.APP_SECRET)
    } catch {
        res.status(401)
        res.send({
            message: "Nevazeci token"
        })
        return
    }

    if (!decodedToken) {
        res.status(401)
        res.send({
            message: "Nevazeci token"
        })
        return
    }

    if (!decodedToken.hasOwnProperty('email') || !decodedToken.hasOwnProperty('expirationDate')) {
        res.status(401)
        res.send({
            message: "Nevazeci token"
        })
        return
    }

    if (decodedToken.expirationDate < new Date()) {
        res.status(401)
        res.send({
            message: "Istekao token"
        })
        return
    }

    //ovde samo u bazi proveravamo postoji li korisnik ... dodatno bi trebalo proveriti privilegije kategorije korisnika itd.ž
    usersSvc.getUserByEmail(decodedToken.email).then((user) => {
        if (user) {
            next()
        } else {
            res.status(401)
            res.send({
                message: "Nepostoji korisnik"
            })
            return
        }
    })
}

module.exports = {
    checkAuthenticated: checkAuthenticated,
    checkKdRole: checkKdRole,
    checkStRole: checkStRole,
    checkKdAdRole: checkKdAdRole,
    checkStAdRole: checkStAdRole,
    authApiRoute: authApiRoute
}