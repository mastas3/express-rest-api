const mongoose = require('mongoose');
const { Schema } = mongoose;

const PointSchema = new Schema({
    type: {
        type: String,
        default: 'Point',
    },
    coordinates: {
        type: [Number],
        index: '2dshpere',
    }
});

const DriverSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    driving: {
        type: Boolean,
        default: false,
    },
    geometry: PointSchema,
});
  
module.exports = mongoose.model('driver', DriverSchema);