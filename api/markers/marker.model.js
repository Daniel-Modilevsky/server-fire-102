const mongoose = require('mongoose');
const logger = require('../../lib/logs');

const markerSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    key:  {type: String , require: true },
    coordinate: { type: Object , require: true },
    displayName: { type: String , require: true },
    isActive: {type: Boolean, default: true},
    isdeleted: {type: Boolean, default: false}
},{ collection: 'markers'});

markerSchema.pre('save', next => {
    logger.info('prepring for save');
    return next();
});

module.exports = mongoose.model('marker', markerSchema);




