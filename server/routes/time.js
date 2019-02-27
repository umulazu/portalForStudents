import express from 'express'
import { getActiveContractByStudent, getWorkdayIdByDate, addTime, addWorkday} from '../mongoose/api/contract'
import authenticationCheckMiddleware from '../middlewares/authenticationCheck'

const router = express.Router();

router.route('/addTime')
    .all(authenticationCheckMiddleware)
    .post((req, res) => {
        return (async () => {
            const contractId = await getActiveContractByStudent(req.body.username);
            let workdayId = await  getWorkdayIdByDate(contractId, req.body.date);
            if(!workdayId) {
                await addWorkday(contractId, req.body.date);
                workdayId = await getWorkdayIdByDate(contractId, req.body.date);
            }

            const diff = await addTime(contractId, workdayId, {
                startingTime: req.body.start,
                endingTime: req.body.finish
            });

            return res.json({diff});
        })()
    });

export default router