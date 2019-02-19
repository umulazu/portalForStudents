import express from 'express'
import { getActiveContractByStudent, getWorkdayIdByDate, addTime, addWorkday} from '../mongoose/api/contract'
import passport from 'passport'
import authenticationCheckMiddleware from '../middlewares/authenticationCheck'

const router = express.Router();

router.route('/addTime')
    .all(authenticationCheckMiddleware)
    .post((req, res) => {
        getActiveContractByStudent(req.body.username)
            .then(contractId => {
                getWorkdayIdByDate(contractId, req.body.date)
                    .then(workdayId => {
                        if(!workdayId)
                            addWorkday(contractId, req.body.date)
                                .then(workdayId => {
                                    return addTime(contractId, workdayId, {
                                        startingTime: req.body.start,
                                        endingTime: req.body.finish
                                    }, (error, diff) => {
                                        if (error) {
                                            return res.status(500).end();
                                        }
                                        if (diff) {
                                            passport.authenticate('local')(req, res, () => {
                                                res.json({diff})
                                            });
                                        }
                                    });
                                })
                        
                        return addTime(contractId, workdayId, {
                            startingTime: req.body.start,
                            endingTime: req.body.finish
                        }, (error, diff) => {
                            if (error) {
                                return res.status(500).end();
                            }
                            if (diff) {
                                passport.authenticate('local')(req, res, () => {
                                    res.json({diff})
                                });
                            }
                        });
                    })
            })
    });

export default router