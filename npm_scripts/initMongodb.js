const mongoose = require("mongoose");
(async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/PortalForStudents", {
            useNewUrlParser: true,
        });
        await mongoose.connection.createCollection("students");
        await mongoose.connection.createCollection("contracts");
        await mongoose.connection.createCollection("workdays");
        await mongoose.connection.createCollection("holidays");
        await mongoose.connection.createCollection("postponedDays");
        await mongoose.disconnect();
        console.log("Five collections are created!");
        console.log("Connection closed.");
    } catch (e) {
        console.log("When mongodb inits:");
        console.error(e);
    }
})();
