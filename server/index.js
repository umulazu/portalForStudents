import express from 'express'
import path from 'path'
import minimist from 'minimist'
import bodyParser from 'body-parser'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'
import { connect } from './mongoose'
import { Student } from './mongoose/api/student'
import expressSession  from 'express-session'
import passport from 'passport'
import LocalStrategy from 'passport-local'


import {addStudent} from "./mongoose/api/student";
//import authorizationRouter from './routes/authorization'
/*import avatarRouter from './routes/avatar'
import resumeRouter from './routes/resume'
import commentAttachmentRouter from './routes/commentAttachment'
import graphqlRouter from './routes/graphql'*/
import template from './template'
import mongoose from "mongoose";

const argv = minimist(process.argv.slice(2));
const productionMode = argv.mode === 'production';

const serverConfig =
    productionMode ?
        require('./production.server.config')
        :
        require('./development.server.config');

/*console.log(
    productionMode ?
        'PortalForStudents server is starting with production mode...'
        :
        'PortalForStudents server is starting with development mode...')*/

const app = express();

app.set('port', serverConfig.port);
app.set('view endine', 'ejs');

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(expressSession({ secret: serverConfig.authorization.sessionSecret, resave: false, saveUninitialized: false }));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(Student.authenticate()));
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

//app.use(authorizationRouter)
/*app.use(avatarRouter)
app.use(resumeRouter)
app.use(commentAttachmentRouter)
app.use(graphqlRouter)
*/
app.get('/*', (req, res) => {
    res.send(template({
        assetsRoot: serverConfig.assetsRoot,
        username: req.isAuthenticated() ? req.user.username : ''
    }))
})
import {getContractById, getActiveContractByStudent, updateContract, deleteContract, addWorkday, updateWorkday, addTime, addContract} from "./mongoose/api/contract";
connect();
/*const contract = {
    number: "001",
    status: "Active",
    startingDay: "2017-01-01",
    endingDay: "2020-01-01",
    hoursPerWeek: 20,
    workdays: [{
        date: "2018-05-05",
        time: [{
            startingTime: "15:43",
            endingTime: "17:29",
        }],
        timeWorked: 25
    }],
    studentId: mongoose.Types.ObjectId("5c51ecb252bf67279cb1f84b")
};*/
const workday = {
    date: "22018-05-05 00:00:00.000Z",
    time: [{
        startingTime: "15:43",
        endingTime: "15:43",
    }],
    timeWorked: 125
}
const time = {
    startingTime: "00:43",
    endingTime: "02:43",
}
addTime("5c51f030a927c61904856b62", "5c51f48783c94a2760b1384f", time)
   /* .then((contract) => {
        console.log(contract);
    });*/

app.listen(app.get('port'), () => {
    console.log('PortalForStudents server is listening on port', app.get('port'))
});