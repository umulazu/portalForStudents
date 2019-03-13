import express from 'express'
import { Student } from '../mongoose/api/student'
import passport from 'passport'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
const serverConfig =
    argv.mode === 'production' ?
        require('../production.server.config')
        :
        require('../development.server.config');

const router = express.Router();

router.route('/signup')
    .post((req, res) => {
        return Student.findOne({ email: req.body.email }, (error, user) => {
            if (error) {
                return res.status(500).end();
            }
            if (user) {
                return res.status(500).end();
            } else {
                Student.register(new Student({ email: req.body.email, username: req.body.username }), req.body.password, (error) => {
                    if (error) {
                        return res.status(500).end()
                    }
                    passport.authenticate('local')(req, res, () => {
                        res.json({ username: req.body.username })
                    })
                })
            }
        })
    });

router.route('/signin')
    .get((req, res) => {
        const username =
            req.isAuthenticated() ?
                req.user.username
                :
                '';
        res.json({ username })
    })
    .post((req, res) => {
        const allowedLogins = serverConfig.authorization.allowedLogins;
        if (allowedLogins && allowedLogins.length > 0 && !allowedLogins.includes(req.body.email)) {
            return res.status(403).end()
        }

        return Student.findOne({ email: req.body.email }, (error, user) => {
            if (error) {
                return res.status(500).end()
            }
            if (user) {
                passport.authenticate('local')(req, res, () => {
                    res.json({ username: user.username })
                });
            } else {
                return res.status(500).end()
            }
        })
    })

router.route('/signout')
    .get((req, res) => {
        req.logout();
        req.session.destroy(() => {
            res.redirect('/')
        })
    });

export default router