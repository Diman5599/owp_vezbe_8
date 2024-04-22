const express = require('express')
const passport = require('passport')

const LocalStrategy = require('passport-local');

const {PrismaClient} = require('@prisma/client')

const bcrypt = require('bcrypt')

const prisma = new PrismaClient()

passport.serializeUser((user, done) => {
        done(null, user.id);
    });

passport.deserializeUser((id, done) => {
        prisma.user.findUnique({where: {id: id}, include: {role: true}}).then((user) => done(null, user)).catch((err) => done(err))
    });

passport.use('mlocalstrat', new LocalStrategy(
    //strategija da se pronadje korisnik i proveri sifra, u suprotnom odbija pristup
    function verify (username, password, cb) {
        prisma.user.findUnique(
            {
                where: {
                    username: username
                }
            }
        ).then((user) => {
            if (!user) { 
                return cb(null, false, {message: 'Pogresno korisnicko ime ili lozinka'})
            }
            if (!bcrypt.compareSync(password, user.password)){
                return cb(null, false, {message: 'Pogresno korisnicko ime ili lozinka'})
            }

            return cb(null, user)
        }).catch((reason)=>{
            return cb(reason)
        })
    }
))


const router = new express.Router()

router.get('/login', (req, res) => {
    var msgs = req.session.messages || [];
    res.locals.messages = msgs;
    res.locals.hasMessages = !! msgs.length;
    req.session.messages = [];
    res.render('pages/auth/login')
})

router.post('/login/password', passport.authenticate('mlocalstrat', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureMessage: true,
  }));

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    })
})

module.exports = {
    router: router
}