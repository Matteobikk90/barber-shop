module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "Peccido1!",
    DB: "blendon_booking",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
