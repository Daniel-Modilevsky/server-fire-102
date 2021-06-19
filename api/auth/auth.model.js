const mongoose = require('mongoose');
const logger = require('../../lib/logs');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user_name: { type: String, require: true, unique: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phoneNumber: { type: String, require: true },
    identityNumer: { type: String, require: true },

    isAdmin: {type: Boolean, default: false},
    isdeleted: {type: Boolean, default: false}
},{ collection: 'users'});

userSchema.pre('save', next => {
    logger.info('saving');
    return next();
});

module.exports = mongoose.model('User', userSchema);