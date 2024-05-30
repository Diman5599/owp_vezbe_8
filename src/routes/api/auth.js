const express = require('express')
const {registerUser, verifyEmail, loginUser} = require('../../controllers/auth')

const { body, validationResult } = require("express-validator");

const router = new express.Router()

const checkPassMatch = (v1, v2) => {
    if (v1 !== v2){
        throw "Passes don't match"
    }
}
//validacija da li je ponnovljena sifra jednaka i da li je mejl validan
//PREPORUKA: validacija bi trebala da se izdvoji u poseban middleware
router.post('/register', [body("password").notEmpty().custom(async (v,{req}) => checkPassMatch(v,req.body.passwordConfirmation)), body('email').isEmail()], 
    (req, res, next) => {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            next()
        } else {
            res.status(400)
            res.send(
                {
                    message: errors
                }
            )
        }
    }
,registerUser)
router.get('/verify', verifyEmail)

router.post('/login', loginUser)


module.exports = {
    router: router
}