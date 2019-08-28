import express from "express";
import path from "path";
import minimist from "minimist";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cookieParser from "cookie-parser";
import { connect } from "./mongoose";
import { Student } from "./mongoose/api/student";
import expressSession from "express-session";
import passport from "passport";

import authorizationRouter from "./routes/authorizationRoute";
import timeRouter from "./routes/timeRoute";
import studentInfoRouter from "./routes/studentRoute";
import calendarRouter from "./routes/specialDaysRoute";
import contractRouter from "./routes/contractRoute";

import template from "./template";

const argv = minimist(process.argv.slice(2));
const productionMode = argv.mode === "production";

const serverConfig = productionMode
    ? require("./production.server.config")
    : require("./development.server.config");

const app = express();

app.set("port", serverConfig.port);
app.set("view endine", "ejs");

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(
    expressSession({
        secret: serverConfig.authorization.sessionSecret,
        resave: false,
        saveUninitialized: false,
    })
);
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(Student.createStrategy());
passport.serializeUser(Student.serializeUser());
passport.deserializeUser(Student.deserializeUser());

app.use(authorizationRouter);
app.use(timeRouter);
app.use(studentInfoRouter);
app.use(calendarRouter);
app.use(contractRouter);

app.get("/*", (req, res) => {
    res.send(
        template({
            assetsRoot: serverConfig.assetsRoot,
            _id: req.isAuthenticated() ? req.user._id : "",
        })
    );
});

connect();

app.listen(app.get("port"), () => {
    console.log(
        "PortalForStudents server is listening on port",
        app.get("port")
    );
});
