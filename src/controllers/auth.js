const nodemailer = require('nodemailer')

const userService = require('../services/users.js')

const jwt = require('jsonwebtoken')

const bcrypt = require('bcrypt')

const generateToken = (email) => {
    const expirationDate = new Date()
    expirationDate.setMinutes(new Date().getMinutes() + 10)
    return jwt.sign({email,expirationDate}, process.env.APP_SECRET)
}

//definisemo funkciju za slanje mejla
const sendEmail =  async (user, token) => {
    // "ubaciti" korisnika u bazu (sa neverifikovanim mejlom)
    const dbUser = await userService.getUserByEmail(user.email)
    console.log(dbUser)
    if (dbUser && dbUser.emailVerified){
        return false
    } else {
        hashedPass = bcrypt.hashSync(user.password, 10)
        userService.insertKdUser(
            {
                username: user.username,
                password: hashedPass,
                email: user.email,
            }
        ).catch(
           (err) => console.log('Desila se greska pri ubacivanju korisnika',err)
        )
        // PREPORUKA: ova logika (za slanje mejla) bi trebala da se 'izvuce' u poseban service modul u kome bi
        // bila sakrivena sva logika kreiranja transportera i samo slanje preko njega
        const verificationLink = `http://${process.env.APP_URL}/api/verify?token=${token}`
        const mailConfig = {
            to: user.email,
            from: process.env.APP_MAIL_ADDRESS,
            subject: 'Verifikujte svoju email adresu',
            text: 'Klikom na link ispod, verifikujte svoju email adresu',
            html: '<a href=\"' + verificationLink + '\">VERIFIKUJTE<a>'
        }
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.APP_MAIL_ADDRESS,
                pass: process.env.APP_MAIL_PASS
            }
        })
        transporter.sendMail(mailConfig, (error, info) => {
            if (error) {
                console.error("Greska pri slanju: ", error)
            } else {
                console.log('Uspesno poslat mejl!', info)
            }
        })
        return true
    }
}

const registerUser = async (req,res) => {
    //iz zahteva izvucemo korisnicki email
    const email = req.body.email
    if (!email) {
        res.status(400)
        res.send({
          message: "Nema mejl adrese!",
        })
    }

    const newJWT = generateToken(email)
    if (await sendEmail({
        username: req.body.username,
        password: req.body.password,
        email: email
    }, newJWT)) {
        res.status(200)
        res.send(
            {
                message: "Link poslat na mejl korisnika"
            }
        )
    } else {
        res.status(400)
        res.send(
            {
                message: "Korisnik sa datim mejlom je vec registrovan"
            }
        )
    }
}

const verifyEmail = (req,res) => {
    const token = req.query.token
    if (token) {
        let decodedToken
        try {
            decodedToken = jwt.verify(token, process.env.APP_SECRET)
        } catch {
            res.status(401)
            res.render('pages/errors/error', {status: 401, errors: ["Nevazeci token!"]})
        }

        if (!decodedToken.hasOwnProperty('email') || !decodedToken.hasOwnProperty('expirationDate')) {
            res.status(401)
            res.render('pages/errors/error', {status:401, errors: ["Nevazeci token!"]})
        }

        expDate = decodedToken.expirationDate
        console.log(expDate)
        if (expDate < new Date()) {
            res.status(401)
            res.render('pages/errors/error', {status: 401, errors: ["Token istekao! Morate se ponovo registrovati"]})
        }

        userService.verifyUserEmail(decodedToken.email)
        res.status(200)
        res.render('pages/auth/register-success')
    } else {
        res.status(401)
        res.render('pages/errors/error', {status: 500, errors: ["Nema tokena!"]})
    }
}

const loginUser = (req, res) => {
    userService.getUserByEmail(req.body.email).then(
        (user) => {
            if (user && bcrypt.compareSync(req.body.password, user.password)) {
                const expirationDate = new Date()
                expirationDate.setMinutes(new Date().getMinutes() + 30)
                email = req.body.email
                uuid = user.id
                res.status(200)
                res.send(
                    {
                        success: true,
                        token: jwt.sign({email, uuid, expirationDate}, process.env.APP_SECRET)
                    }
                )
            } else {
                res.status(401)
                res.send({success: false, message: "Email ili lozinka nisu tačni"})
            }
        }
    )
}

module.exports = {
    registerUser: registerUser,
    verifyEmail: verifyEmail,
    loginUser: loginUser
}