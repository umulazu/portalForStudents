PortalForStudents
=====================
Usage
-----------------------------------
### Before you start
1. Install mongodb at the default location (`C:/Program Files/`);
2. Stop the dafault `mongod` service.

### NPM Scripts
`npm run init:all` - set up MongoDB:
   * creates `mongodb` folder in project's root;
   * creates `mongod` service and starts it;
   * creates database `PortalForStudents` with two empty collections (`students`, `contracts`);
   * database will be automatically connected when `PortalForStudents` server starts.

`npm run build` - builds server and client applications into `dist` folder.

`npm run prod` - starts `npm run build` script and then starts PortalForStudents server in `production mode` from `dist` folder.

`npm run dev` - starts PortalForStudents server in `development mode`.

Configuration
-----------------------------------
### Server configuration file
Location: `_{project directory}_/server/server.config.js`
```
const serverConfig = {
  port: 3000,
  databaseConnectionURL: "mongodb://localhost:27017/PortalForStudents"
}

module.exports = serverConfig
```
`port` _(number, default: 3000)_ - server port number.

`databaseConnectionURL` _(string, default: "mongodb://localhost:27017/PortalForStudents")_ - MongoDB connection URL.

### Authorization configuration file
Location: `_{project directory}_/server/authorization.config.js`
```
const authorizationConfig = {
  allowedLogins: [],
  sessionSecret: 'secret'
}

module.exports = authorizationConfig
```
`allowedLogins` _(array, default: empty)_ - login list for users allowed to register and login. 
If empty, all users are allowed to register and login.

`sessionSecret` _(string, default: "secret")_ - secret session key used for authorization system.

### Data examples
`workdays` collection:
```
{
    "_id" : "SergeiIv2019September26",
    "student" : "SergeiIv",
    "times" : [ 
        {
            "_id" : ObjectId("5d8c73cf46876f31a07a6c67"),
            "startTime" : ISODate("2019-09-26T08:16:15.377Z")
        }
    ]
}
```

`students` collection:
```
{
    "_id" : "AndreyRi",
    "workdays" : [
        "SergeiIv2019September23", 
        "SergeiIv2019September24", 
        "SergeiIv2019September25", 
        "SergeiIv2019September26"
    ],
    "contracts" : [],
    "name" : "Сергей Иванов",
    "birthday" : ISODate("2000-01-01T06:02:22.111Z"),
}
```

`contracts` collection:
```
{
    "_id" : "SergeiIv1",
    "status" : "expired",
    "startingDay" : ISODate("2019-04-16T13:00:26.426Z"),
    "endingDay" : ISODate("2019-06-15T13:00:26.426Z"),
    "hoursPerWeek" : "20",
    "mentor" : "Иван Сергеев",
    "task" : "Портал для студентов",
    "student" : [ 
        "SergeiIv"
    ],
}

{
    "_id" : "SergeiIv2",
    "status" : "active",
    "startingDay" : ISODate("2019-07-16T13:00:26.426Z"),
    "endingDay" : ISODate("2019-09-29T13:00:26.426Z"),
    "hoursPerWeek" : "30",
    "mentor" : "Иван Сергеев",
    "task" : "Портал для студентов",
    "student" : [ 
        "SergeiIv"
    ],
}
```

### Creating Holidays, Postponed collections
To create 2 collections: `holidays` and `postponedDays` at first configuring there is npm command: `create-special-days-collection`.  

File `_{project directory}_/server/calendar/russia.ics` should exist.  
Actual `.ics` could be downloaded from `https://www.officeholidays.com/ics/russia` for several years.  
One need to add the same logic to postponedDays.  

All this logic should be moved into admin rights.

