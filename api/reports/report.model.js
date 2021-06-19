const mongoose = require('mongoose');
const logger = require('../../lib/logs');

/*
    const marker = {
        key: "-1",
        coordinate: {
            latitude: 37.78825,
            longitude: -122.4324,
        },
        displayName: "none",
    }
*/


const reportSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName:  {type: String , require: true },
    phoneNumber: { type: String , require: true },
    marker: { type: Object , require: true },
    type: { type: String , require: true },
    time: { type: String , require: true },
    comment: { type: String , default: "אין" },
    image: {type: String, require: true },
    isActive: {type: Boolean, default: true},
    isdeleted: {type: Boolean, default: false}
},{ collection: 'reports'});

reportSchema.pre('save', next => {
    logger.info('prepring for save');
    return next();
});

module.exports = mongoose.model('report', reportSchema);




