module.exports = (sequelize, Sequelize) => {
    const Booking = sequelize.define("booking", {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        surname: {
            type: Sequelize.STRING,
            allowNull: false
        },
        start_time: {
            type: Sequelize.STRING,
            allowNull: false
        },
        end_time: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        phone: {
            type: Sequelize.STRING,
            allowNull: false
        },
        message: {
            type: Sequelize.STRING
        }
    });

    return Booking;
};
