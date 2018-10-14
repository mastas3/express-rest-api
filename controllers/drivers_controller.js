const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ hi: 'there' });
    },

    async index(req, res, next) {
        try {
            const { lng, lat } = req.query;

            const drivers = await Driver.aggregate([{
                '$geoNear': {
                    near: {
                        'type': 'Point',
                        'coordinates': [parseFloat(lng), parseFloat(lat)]
                    },
                    spherical: true,
                    maxDistance: 200000,
                    distanceField: 'dist',
                }
            }]);

            res.send(drivers);
        } catch (err) {
            console.log()
            next(err);
        }
    },

    async create(req, res, next) {
        try {
            const driverProps = req.body;
            const driver = await Driver.create(driverProps);
            res.send(driver);
        } catch (err) {
            next(err);
        }
    },

    async edit(req, res, next) {
        try {
            const driverId = req.params.id;
            const driverProps = req.body;
            await Driver.findByIdAndUpdate(driverId, driverProps);
            const driver = await Driver.findById(driverId);
            res.send(driver);
        } catch (err) {
            next(err);
        }
    },

    async delete(req, res, next) {
        try {
            const driverId = req.params.id;
            const driver = await Driver.findByIdAndRemove(driverId);
            res.status(204).send(driver);
        } catch (err) {
            next(err);
        }
    }
};
