module.exports = (app) => {
    const bookings = require("../controllers/booking.controller.js");

    var router = require("express").Router();

    // Create a new Tutorial
    router.post("/", bookings.create);

    // Retrieve all Bookings
    router.get("/", bookings.findAll);

    app.use("/api/bookings", router);
};
