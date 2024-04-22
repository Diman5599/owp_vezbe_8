const express = require('express');
const session = require('express-session');
const passport = require('passport')

const SQLiteStore = require('connect-sqlite3')(session);

const postsRoutes = require('./routes/posts.js')
const indexRoutes = require('./routes/index.js')
const authRoutes = require('./routes/auth.js')

const {requestLog} = require('./middleware/winston-logging.js')

const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
//neophodno da bi radio passportjs (parsira telo post zahteva)
app.use(express.urlencoded({ extended: false }));
app.use(express.json())
app.use(session(
    {
        secret: 'secretkey',
        resave: false,
        saveUninitialized: false,
        store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
    }
))

app.use(passport.initialize())
app.use(passport.authenticate('session'))

//middleware-i na nivou aplikacije
app.use((req, res, next) => {
    console.log(req.query.term)
    next()
})
//definisanje middleware-a unapred
const myMwareFunc = (req, res, next) => {
    console.log("term is " + (typeof req.query.term === 'undefined' ? "undefined" : "defined"))
    next()
}
app.use(myMwareFunc)

//eksterni middleware
app.use(requestLog)
//end of middleware-i na nivou aplikacije

app.use(postsRoutes.router)
app.use(indexRoutes.router)
app.use(authRoutes.router)

const port = process.env.SERVER_PORT
const host = process.env.SERVER_HOST

app.listen(port, host)

console.log(`Listening on http://${host}:${port}`)