const db = require("../models");
const Booking = db.bookings;

// Create and Save a new Booking
exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }

    // Create a Booking
    const booking = {
        name: req.body.name,
        message: req.body.message,
        date_time: req.body.date_time,
        email: req.body.email,
        phone: req.body.phone
    };

    // Save Booking in the database
    Booking.create(booking)
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while creating the Booking."
            });
        });
};

exports.findAll = (req, res) => {
    const condition = req.query.name;

    Booking.findAll({ where: condition })
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    "Some error occurred while retrieving bookings."
            });
        });
};
