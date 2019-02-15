import express from 'express'
import { getActiveContractByStudent, getWorkdayIdByDate, addTime} from '../mongoose/api/contract'
import passport from 'passport'
import authenticationCheckMiddleware from '../middlewares/authenticationCheck'

const router = express.Router();

router.route('/addTime')
    .all(authenticationCheckMiddleware)
    .post((req, res) => {
        console.log('Success');
        const contractId = getActiveContractByStudent(req.body.username);
        const workdayId = getWorkdayIdByDate(req.body.date);
        return addTime(contractId, workdayId, {startingTime: req.body.startingTime, endingTime: req.body.endingTime}, (error, diff) => {
            if (error) {
                return res.status(500).end();
            }
            if (diff) {
                passport.authenticate('local')(req, res, () => {
                    res.json({ diff })
                });
            }
        });
    });

export default router