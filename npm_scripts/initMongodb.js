const mongoose = require("mongoose");
(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/PortalForStudents", {useNewUrlParser: true});
        await mongoose.connection.createCollection("students");
        await mongoose.connection.createCollection("contracts");
<<<<<<< HEAD
        await mongoose.connection.createCollection("workdays");
        await mongoose.disconnect();
        console.log("Three collections are created!");
=======
        await mongoose.disconnect();
        console.log("Two collections are created!");
>>>>>>> 7870939... add mongodb's initializing npm scripts (#3)
        console.log("Connection closed.");
    } catch (e) {
        console.log("When mongodb inits:");
        console.error(e);
    }
})();